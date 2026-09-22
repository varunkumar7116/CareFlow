package com.careflow;

import com.careflow.appointment.Appointment;
import com.careflow.appointment.AppointmentRepository;
import com.careflow.appointment.AppointmentStatus;
import com.careflow.caregap.CareGap;
import com.careflow.caregap.CareGapEngine;
import com.careflow.caregap.CareGapRepository;
import com.careflow.caregap.CareGapStatus;
import com.careflow.caregap.CareGapType;
import com.careflow.followup.FollowUp;
import com.careflow.followup.FollowUpRepository;
import com.careflow.followup.FollowUpStatus;
import com.careflow.followup.FollowUpType;
import com.careflow.journey.*;
import com.careflow.patient.Patient;
import com.careflow.patient.PatientRepository;
import com.careflow.referral.Referral;
import com.careflow.referral.ReferralRepository;
import com.careflow.referral.ReferralStatus;
import com.careflow.task.CareTask;
import com.careflow.task.CareTaskRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class CareWorkflowIntegrationTest {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private CareJourneyEngine journeyEngine;

    @Autowired
    private CareJourneyRepository journeyRepository;

    @Autowired
    private ReferralRepository referralRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private FollowUpRepository followUpRepository;

    @Autowired
    private CareGapEngine careGapEngine;

    @Autowired
    private CareGapRepository careGapRepository;

    @Autowired
    private CareTaskRepository taskRepository;

    @Test
    @DisplayName("Complete V1 Vertical Slice Workflow: Patient -> Screening -> Referral -> Appointment -> Overdue Followup -> Care Gap -> Task -> Completion")
    void testEndToEndV1CareWorkflow() {
        // 1. Create Patient (Meena)
        Patient patient = new Patient();
        patient.setUhid("CF-P1001-TEST");
        patient.setFirstName("Meena");
        patient.setLastName("Devi");
        patient.setGender("FEMALE");
        patient.setDateOfBirth(LocalDate.of(1996, 5, 15));
        patient.setPhoneNumber("+919876543210");
        patient.setPreferredLanguage("hi");
        patient.setChwId("USER-CHW-001");
        patient = patientRepository.save(patient);

        assertNotNull(patient.getId());

        // 2. Start Care Journey (Registration)
        CareJourney journey = journeyEngine.startJourney(patient.getId(), "USER-CHW-001", "FAC-VILLAGE-PHC", "USER-CHW-001");
        assertEquals(CareStage.REGISTRATION, journey.getCurrentStage());

        // 3. Progress to Screening
        journey = journeyEngine.transition(journey.getId(), TransitionAction.PROGRESS, null, "Maternal screening completed", "USER-CHW-001");
        assertEquals(CareStage.SCREENING, journey.getCurrentStage());

        // 4. Create Referral from Village PHC to District Hospital
        journey = journeyEngine.transition(journey.getId(), TransitionAction.REFER, CareStage.REFERRAL, "High-risk pregnancy referral to District Hospital", "USER-CHW-001");
        assertEquals(CareStage.REFERRAL, journey.getCurrentStage());

        Referral referral = new Referral(
                patient.getId(),
                journey.getId(),
                "FAC-VILLAGE-PHC",
                "FAC-DISTRICT-HOSPITAL",
                "Obstetrics",
                "High blood pressure & elevated risk",
                "HIGH",
                "USER-CHW-001"
        );
        referral = referralRepository.save(referral);
        assertEquals(ReferralStatus.CREATED, referral.getStatus());

        // 5. Schedule & Confirm Appointment
        journey = journeyEngine.transition(journey.getId(), TransitionAction.PROGRESS, CareStage.APPOINTMENT, "Appointment booked at District Hospital", "USER-FACILITY-001");
        assertEquals(CareStage.APPOINTMENT, journey.getCurrentStage());

        Appointment appointment = new Appointment(
                patient.getId(),
                referral.getId(),
                journey.getId(),
                "FAC-DISTRICT-HOSPITAL",
                "Obstetrics Specialist",
                ZonedDateTime.now(),
                ZonedDateTime.now().plusDays(1)
        );
        appointment.setStatus(AppointmentStatus.CONFIRMED);
        appointment = appointmentRepository.save(appointment);

        // 6. Simulate Overdue Follow-Up check-in (>24h past due date)
        FollowUp followUp = new FollowUp(
                patient.getId(),
                journey.getId(),
                "USER-CHW-001",
                FollowUpType.MATERNAL_CARE,
                ZonedDateTime.now().minusHours(30)
        );
        followUp.setStatus(FollowUpStatus.SCHEDULED);
        followUp = followUpRepository.save(followUp);

        // 7. Trigger Care Gap Engine scan
        careGapEngine.scanAndDetectCareGaps();

        // 8. Verify Care Gap and auto-generated Task created
        List<CareGap> openGaps = careGapRepository.findByPatientId(patient.getId());
        assertFalse(openGaps.isEmpty(), "Care gap should be generated for overdue follow-up");
        CareGap gap = openGaps.get(0);
        assertEquals(CareGapType.OVERDUE_FOLLOW_UP, gap.getGapType());
        assertEquals(CareGapStatus.OPEN, gap.getStatus());

        List<CareTask> tasks = taskRepository.findByPatientId(patient.getId());
        assertFalse(tasks.isEmpty(), "Care task should be created and assigned to CHW");

        // 9. CHW completes follow-up visit & resolves Care Gap
        followUp.setStatus(FollowUpStatus.COMPLETED);
        followUp.setCompletedAt(ZonedDateTime.now());
        followUpRepository.save(followUp);

        careGapEngine.resolveCareGap(gap.getId());

        CareGap resolvedGap = careGapRepository.findById(gap.getId()).orElseThrow();
        assertEquals(CareGapStatus.RESOLVED, resolvedGap.getStatus());

        // 10. Complete Journey
        journey = journeyEngine.transition(journey.getId(), TransitionAction.COMPLETE, CareStage.COMPLETED, "Full care cycle completed successfully", "USER-CHW-001");
        assertEquals(CareStage.COMPLETED, journey.getCurrentStage());
    }
}
