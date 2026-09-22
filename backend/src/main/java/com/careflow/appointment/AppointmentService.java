package com.careflow.appointment;

import com.careflow.journey.CareJourneyEngine;
import com.careflow.journey.CareStage;
import com.careflow.journey.TransitionAction;
import com.careflow.referral.ReferralService;
import com.careflow.referral.ReferralStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final ReferralService referralService;
    private final CareJourneyEngine journeyEngine;

    public AppointmentService(AppointmentRepository appointmentRepository, ReferralService referralService, CareJourneyEngine journeyEngine) {
        this.appointmentRepository = appointmentRepository;
        this.referralService = referralService;
        this.journeyEngine = journeyEngine;
    }

    @Transactional
    public Appointment scheduleAppointment(Appointment appointment, String actorId) {
        appointment.setStatus(AppointmentStatus.CONFIRMED);
        Appointment saved = appointmentRepository.save(appointment);

        if (appointment.getReferralId() != null) {
            referralService.updateStatus(appointment.getReferralId(), ReferralStatus.APPOINTMENT_CONFIRMED, actorId);
        }

        if (appointment.getJourneyId() != null) {
            journeyEngine.transition(appointment.getJourneyId(), TransitionAction.PROGRESS, CareStage.APPOINTMENT, "Appointment scheduled on " + appointment.getScheduledDate(), actorId);
        }

        return saved;
    }

    @Transactional
    public Appointment markAttended(String appointmentId, String actorId) {
        Appointment app = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found: " + appointmentId));

        app.setStatus(AppointmentStatus.ATTENDED);
        Appointment saved = appointmentRepository.save(app);

        if (app.getReferralId() != null) {
            referralService.updateStatus(app.getReferralId(), ReferralStatus.ATTENDED, actorId);
        }

        if (app.getJourneyId() != null) {
            journeyEngine.transition(app.getJourneyId(), TransitionAction.PROGRESS, CareStage.HOSPITAL, "Patient attended appointment at facility", actorId);
        }

        return saved;
    }

    public List<Appointment> getAppointmentsForFacility(String facilityId) {
        return appointmentRepository.findByFacilityId(facilityId);
    }

    public List<Appointment> getAppointmentsForPatient(String patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    public Optional<Appointment> getAppointmentById(String id) {
        return appointmentRepository.findById(id);
    }
}
