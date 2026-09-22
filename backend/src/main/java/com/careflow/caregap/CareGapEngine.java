package com.careflow.caregap;

import com.careflow.appointment.Appointment;
import com.careflow.appointment.AppointmentRepository;
import com.careflow.appointment.AppointmentStatus;
import com.careflow.diagnostic.DiagnosticOrder;
import com.careflow.diagnostic.DiagnosticOrderRepository;
import com.careflow.diagnostic.DiagnosticStatus;
import com.careflow.followup.FollowUp;
import com.careflow.followup.FollowUpRepository;
import com.careflow.followup.FollowUpStatus;
import com.careflow.referral.Referral;
import com.careflow.referral.ReferralRepository;
import com.careflow.referral.ReferralStatus;
import com.careflow.task.CareTask;
import com.careflow.task.CareTaskRepository;
import com.careflow.task.TaskPriority;
import com.careflow.task.TaskStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;

@Component
public class CareGapEngine {

    private final CareGapRepository careGapRepository;
    private final CareTaskRepository taskRepository;
    private final ReferralRepository referralRepository;
    private final AppointmentRepository appointmentRepository;
    private final FollowUpRepository followUpRepository;
    private final DiagnosticOrderRepository diagnosticRepository;

    public CareGapEngine(
            CareGapRepository careGapRepository,
            CareTaskRepository taskRepository,
            ReferralRepository referralRepository,
            AppointmentRepository appointmentRepository,
            FollowUpRepository followUpRepository,
            DiagnosticOrderRepository diagnosticRepository
    ) {
        this.careGapRepository = careGapRepository;
        this.taskRepository = taskRepository;
        this.referralRepository = referralRepository;
        this.appointmentRepository = appointmentRepository;
        this.followUpRepository = followUpRepository;
        this.diagnosticRepository = diagnosticRepository;
    }

    @Scheduled(fixedRate = 60000) // Scan every 60 seconds
    @Transactional
    public void scanAndDetectCareGaps() {
        ZonedDateTime now = ZonedDateTime.now();

        // 1. Unconfirmed Referrals (Created > 48h ago without confirmed appointment)
        List<Referral> pendingReferrals = referralRepository.findByStatus(ReferralStatus.SENT);
        for (Referral ref : pendingReferrals) {
            if (ref.getCreatedAt() != null && ref.getCreatedAt().plusHours(48).isBefore(now)) {
                triggerCareGap(
                        ref.getJourneyId(),
                        ref.getPatientId(),
                        CareGapType.UNCONFIRMED_REFERRAL,
                        "Referral to target facility " + ref.getTargetFacilityId() + " remains unconfirmed past 48h SLA.",
                        TaskPriority.HIGH,
                        ref.getReferringUserId(),
                        ref.getTargetFacilityId(),
                        "SYSTEM_REFERRAL_SLA"
                );
            }
        }

        // 2. Missed Appointments (Scheduled date passed > 24h ago without attendance)
        List<Appointment> scheduledApps = appointmentRepository.findByStatus(AppointmentStatus.CONFIRMED);
        for (Appointment app : scheduledApps) {
            if (app.getScheduledDate() != null && app.getScheduledDate().plusHours(24).isBefore(now)) {
                app.setStatus(AppointmentStatus.MISSED);
                appointmentRepository.save(app);

                triggerCareGap(
                        app.getJourneyId(),
                        app.getPatientId(),
                        CareGapType.MISSED_APPOINTMENT,
                        "Patient missed scheduled appointment on " + app.getScheduledDate(),
                        TaskPriority.HIGH,
                        null,
                        app.getFacilityId(),
                        "SYSTEM_APPOINTMENT_SLA"
                );
            }
        }

        // 3. Overdue Follow-ups (Due date passed > 24h ago without completion)
        List<FollowUp> scheduledFollowUps = followUpRepository.findByStatus(FollowUpStatus.SCHEDULED);
        for (FollowUp fu : scheduledFollowUps) {
            if (fu.getDueDate() != null && fu.getDueDate().plusHours(24).isBefore(now)) {
                fu.setStatus(FollowUpStatus.MISSED);
                followUpRepository.save(fu);

                triggerCareGap(
                        fu.getJourneyId(),
                        fu.getPatientId(),
                        CareGapType.OVERDUE_FOLLOW_UP,
                        "Follow-up for " + fu.getType() + " is overdue past 24h SLA.",
                        TaskPriority.MEDIUM,
                        fu.getAssignedChwId(),
                        null,
                        "SYSTEM_FOLLOWUP_SLA"
                );
            }
        }

        // 4. Missing Diagnostics (Order placed > 72h ago without result)
        List<DiagnosticOrder> pendingDiagnostics = diagnosticRepository.findByStatus(DiagnosticStatus.ORDERED);
        for (DiagnosticOrder diag : pendingDiagnostics) {
            if (diag.getCreatedAt() != null && diag.getCreatedAt().plusHours(72).isBefore(now)) {
                triggerCareGap(
                        diag.getJourneyId(),
                        diag.getPatientId(),
                        CareGapType.MISSING_DIAGNOSTICS,
                        "Diagnostic test '" + diag.getTestName() + "' result missing past 72h SLA.",
                        TaskPriority.MEDIUM,
                        diag.getOrderingDoctorId(),
                        diag.getFacilityId(),
                        "SYSTEM_DIAGNOSTIC_SLA"
                );
            }
        }
    }

    @Transactional
    public CareGap triggerCareGap(
            String journeyId,
            String patientId,
            CareGapType gapType,
            String description,
            TaskPriority priority,
            String assignedUserId,
            String assignedFacilityId,
            String sourceEvent
    ) {
        // Prevent duplicate open gap of same type for patient
        List<CareGap> existing = careGapRepository.findByPatientId(patientId);
        for (CareGap gap : existing) {
            if (gap.getGapType() == gapType && gap.getStatus() == CareGapStatus.OPEN) {
                return gap; // Already open
            }
        }

        CareGap careGap = new CareGap(journeyId, patientId, gapType, description, ZonedDateTime.now().plusDays(2));
        careGap = careGapRepository.save(careGap);

        CareTask task = new CareTask(
                careGap.getId(),
                patientId,
                assignedUserId,
                assignedFacilityId,
                "RESOLVE CARE GAP: " + gapType,
                description,
                priority,
                ZonedDateTime.now().plusDays(1),
                sourceEvent
        );
        taskRepository.save(task);

        return careGap;
    }

    @Transactional
    public void resolveCareGap(String careGapId) {
        CareGap gap = careGapRepository.findById(careGapId).orElse(null);
        if (gap != null) {
            gap.setStatus(CareGapStatus.RESOLVED);
            gap.setResolvedAt(ZonedDateTime.now());
            careGapRepository.save(gap);

            // Also complete associated tasks
            List<CareTask> tasks = taskRepository.findByPatientId(gap.getPatientId());
            for (CareTask t : tasks) {
                if (careGapId.equals(t.getCareGapId()) && t.getStatus() != TaskStatus.COMPLETED) {
                    t.setStatus(TaskStatus.COMPLETED);
                    t.setResolvedAt(ZonedDateTime.now());
                    taskRepository.save(t);
                }
            }
        }
    }
}
