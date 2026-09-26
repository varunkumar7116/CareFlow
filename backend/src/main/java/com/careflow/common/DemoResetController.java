package com.careflow.common;

import com.careflow.appointment.AppointmentRepository;
import com.careflow.audit.AuditEvent;
import com.careflow.audit.AuditEventRepository;
import com.careflow.auth.Role;
import com.careflow.auth.User;
import com.careflow.auth.UserRepository;
import com.careflow.caregap.CareGapRepository;
import com.careflow.facility.Facility;
import com.careflow.facility.FacilityRepository;
import com.careflow.followup.FollowUpRepository;
import com.careflow.journey.*;
import com.careflow.patient.Patient;
import com.careflow.patient.PatientRepository;
import com.careflow.referral.ReferralRepository;
import com.careflow.task.CareTaskRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class DemoResetController {

    private final UserRepository userRepository;
    private final FacilityRepository facilityRepository;
    private final PatientRepository patientRepository;
    private final CareJourneyRepository journeyRepository;
    private final CareJourneyStageHistoryRepository stageRepository;
    private final ReferralRepository referralRepository;
    private final AppointmentRepository appointmentRepository;
    private final FollowUpRepository followUpRepository;
    private final CareGapRepository careGapRepository;
    private final CareTaskRepository taskRepository;
    private final AuditEventRepository auditRepository;
    private final PasswordEncoder passwordEncoder;

    public DemoResetController(UserRepository userRepository,
                               FacilityRepository facilityRepository,
                               PatientRepository patientRepository,
                               CareJourneyRepository journeyRepository,
                               CareJourneyStageHistoryRepository stageRepository,
                               ReferralRepository referralRepository,
                               AppointmentRepository appointmentRepository,
                               FollowUpRepository followUpRepository,
                               CareGapRepository careGapRepository,
                               CareTaskRepository taskRepository,
                               AuditEventRepository auditRepository,
                               PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.facilityRepository = facilityRepository;
        this.patientRepository = patientRepository;
        this.journeyRepository = journeyRepository;
        this.stageRepository = stageRepository;
        this.referralRepository = referralRepository;
        this.appointmentRepository = appointmentRepository;
        this.followUpRepository = followUpRepository;
        this.careGapRepository = careGapRepository;
        this.taskRepository = taskRepository;
        this.auditRepository = auditRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/reset-demo")
    @Transactional
    public ResponseEntity<Map<String, Object>> resetDemoScenario() {
        taskRepository.deleteAll();
        careGapRepository.deleteAll();
        followUpRepository.deleteAll();
        appointmentRepository.deleteAll();
        referralRepository.deleteAll();
        stageRepository.deleteAll();
        journeyRepository.deleteAll();
        patientRepository.deleteAll();

        // 1. Seed Facilities
        Facility villagePhc = new Facility();
        villagePhc.setId("FAC-VILLAGE-PHC");
        villagePhc.setName("Village Primary Health Centre");
        villagePhc.setFacilityType("PHC");
        villagePhc.setDistrict("Rampur");
        villagePhc.setState("Uttar Pradesh");
        villagePhc.setLatitude(28.8050);
        villagePhc.setLongitude(79.0250);
        facilityRepository.save(villagePhc);

        Facility districtHospital = new Facility();
        districtHospital.setId("FAC-DISTRICT-HOSPITAL");
        districtHospital.setName("District Hospital Rampur");
        districtHospital.setFacilityType("DISTRICT_HOSPITAL");
        districtHospital.setDistrict("Rampur");
        districtHospital.setState("Uttar Pradesh");
        districtHospital.setLatitude(28.8120);
        districtHospital.setLongitude(79.0320);
        facilityRepository.save(districtHospital);

        // 2. Seed Demo Patient (Meena)
        Patient meena = new Patient();
        meena.setId("PAT-P1001");
        meena.setUhid("CF-P1001");
        meena.setFirstName("Meena");
        meena.setLastName("Devi");
        meena.setGender("FEMALE");
        meena.setDateOfBirth(LocalDate.of(1996, 5, 15));
        meena.setPhoneNumber("+919876543210");
        meena.setPreferredLanguage("hi");
        meena.setChwId("USER-CHW-001");
        patientRepository.save(meena);

        // 3. Seed Initial Care Journey for Meena
        CareJourney journey = new CareJourney();
        journey.setId("CJ-P1001-01");
        journey.setPatientId("PAT-P1001");
        journey.setCurrentStage(CareStage.SCREENING);
        journey.setStatus(JourneyStatus.ACTIVE);
        journey.setAssignedChwId("USER-CHW-001");
        journey.setFacilityId("FAC-VILLAGE-PHC");
        journeyRepository.save(journey);

        CareJourneyStageHistory s1 = new CareJourneyStageHistory(
                journey.getId(), CareStage.REGISTRATION, JourneyStatus.COMPLETED, TransitionAction.START, "Patient registered at Village PHC", "USER-CHW-001"
        );
        stageRepository.save(s1);

        CareJourneyStageHistory s2 = new CareJourneyStageHistory(
                journey.getId(), CareStage.SCREENING, JourneyStatus.ACTIVE, TransitionAction.PROGRESS, "Maternal screening recorded high blood pressure (140/90 mmHg)", "USER-CHW-001"
        );
        stageRepository.save(s2);

        // Audit Event log
        AuditEvent audit = new AuditEvent(
                "DEMO_RESET", "USER-CHW-001", "CHW", "PAT-P1001", "PATIENT", "Demo scenario reset for patient Meena (CF-P1001)"
        );
        auditRepository.save(audit);

        return ResponseEntity.ok(Map.of(
                "status", "SUCCESS",
                "message", "CareFlow demo scenario reset successfully for Meena (CF-P1001)",
                "patientId", "PAT-P1001",
                "uhid", "CF-P1001"
        ));
    }
}
