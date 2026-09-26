package com.careflow.common;

import com.careflow.appointment.AppointmentRepository;
import com.careflow.audit.AuditEvent;
import com.careflow.audit.AuditEventRepository;
import com.careflow.auth.Role;
import com.careflow.auth.User;
import com.careflow.auth.UserRepository;
import com.careflow.facility.*;
import com.careflow.journey.*;
import com.careflow.patient.Patient;
import com.careflow.patient.PatientRepository;
import com.careflow.referral.ReferralRepository;
import com.careflow.task.CareTaskRepository;
import com.careflow.government.source.DatasetIngestionService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.ZonedDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final FacilityRepository facilityRepository;
    private final PatientRepository patientRepository;
    private final CareJourneyRepository journeyRepository;
    private final CareJourneyStageHistoryRepository stageRepository;
    private final ReferralRepository referralRepository;
    private final AppointmentRepository appointmentRepository;
    private final CareTaskRepository taskRepository;
    private final AuditEventRepository auditRepository;
    private final PasswordEncoder passwordEncoder;
    private final DatasetIngestionService datasetIngestionService;

    private final FacilityOperationalStatusRepository statusRepository;
    private final FacilityServiceRepository serviceRepository;
    private final HealthcareProfessionalRepository professionalRepository;
    private final FacilityEquipmentRepository equipmentRepository;
    private final FacilityDiagnosticRepository diagnosticRepository;
    private final AppointmentSlotRepository slotRepository;

    public DataInitializer(UserRepository userRepository,
                           FacilityRepository facilityRepository,
                           PatientRepository patientRepository,
                           CareJourneyRepository journeyRepository,
                           CareJourneyStageHistoryRepository stageRepository,
                           ReferralRepository referralRepository,
                           AppointmentRepository appointmentRepository,
                           CareTaskRepository taskRepository,
                           AuditEventRepository auditRepository,
                           PasswordEncoder passwordEncoder,
                           DatasetIngestionService datasetIngestionService,
                           FacilityOperationalStatusRepository statusRepository,
                           FacilityServiceRepository serviceRepository,
                           HealthcareProfessionalRepository professionalRepository,
                           FacilityEquipmentRepository equipmentRepository,
                           FacilityDiagnosticRepository diagnosticRepository,
                           AppointmentSlotRepository slotRepository) {
        this.userRepository = userRepository;
        this.facilityRepository = facilityRepository;
        this.patientRepository = patientRepository;
        this.journeyRepository = journeyRepository;
        this.stageRepository = stageRepository;
        this.referralRepository = referralRepository;
        this.appointmentRepository = appointmentRepository;
        this.taskRepository = taskRepository;
        this.auditRepository = auditRepository;
        this.passwordEncoder = passwordEncoder;
        this.datasetIngestionService = datasetIngestionService;
        this.statusRepository = statusRepository;
        this.serviceRepository = serviceRepository;
        this.professionalRepository = professionalRepository;
        this.equipmentRepository = equipmentRepository;
        this.diagnosticRepository = diagnosticRepository;
        this.slotRepository = slotRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Trigger Public Government Dataset Ingestion Pipeline
        datasetIngestionService.ingestPublicDataset();

        seedFacilityOperationalData("NIN-TN-CBE-001");
        seedFacilityOperationalData("NIN-UP-RMP-002");

        if (patientRepository.existsById("PAT-P1001")) {
            return;
        }

        // 1. Seed Facilities
        Facility villagePhc = new Facility();
        villagePhc.setId("FAC-VILLAGE-PHC");
        villagePhc.setName("Government PHC, Karamadai");
        villagePhc.setFacilityType("PHC");
        villagePhc.setDistrict("Coimbatore");
        villagePhc.setState("Tamil Nadu");
        villagePhc.setLatitude(11.2435);
        villagePhc.setLongitude(76.9602);
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

        // 2. Seed Users
        seedUser("USER-ADMIN-001", "admin", "password", "Karamadai Facility Admin", Role.FACILITY_ADMIN, "+919876543200", "en", "NIN-TN-CBE-001");
        seedUser("USER-DOC-001", "doctor1", "password", "Dr. Rajesh Kumar (Obstetrics)", Role.DOCTOR, "+919876543201", "en", "NIN-TN-CBE-001");
        seedUser("USER-STAFF-001", "staff1", "password", "Sowmya R (Nurse Supervisor)", Role.FACILITY_STAFF, "+919876543202", "en", "NIN-TN-CBE-001");
        seedUser("USER-SUP-001", "supervisor1", "password", "Dr. V. Sundaram (District Supervisor)", Role.DISTRICT_SUPERVISOR, "+919876543203", "en", null);
        seedUser("USER-SYS-001", "sysadmin", "password", "System Administrator", Role.SYSTEM_ADMIN, "+919876543204", "en", null);

        User chwUser = seedUser("USER-CHW-001", "chw1", "password", "CHW Meera Bai", Role.CHW, "+919876543210", "hi", "NIN-TN-CBE-001");
        User facilityUser = seedUser("USER-FACILITY-001", "facility1", "password", "Dr. Sharma (District Hospital Rampur)", Role.FACILITY_STAFF, "+919876543211", "en", "NIN-UP-RMP-002");

        // 3. Seed Demo Patient (Meena)
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

        // 4. Seed Initial Care Journey for Meena
        CareJourney journey = new CareJourney();
        journey.setId("CJ-P1001-01");
        journey.setPatientId("PAT-P1001");
        journey.setCurrentStage(CareStage.SCREENING);
        journey.setStatus(JourneyStatus.ACTIVE);
        journey.setAssignedChwId("USER-CHW-001");
        journey.setFacilityId("NIN-TN-CBE-001");
        journeyRepository.save(journey);

        CareJourneyStageHistory s1 = new CareJourneyStageHistory(
                journey.getId(), CareStage.REGISTRATION, JourneyStatus.COMPLETED, TransitionAction.START, "Patient registered at Government PHC, Karamadai", "USER-CHW-001"
        );
        stageRepository.save(s1);

        CareJourneyStageHistory s2 = new CareJourneyStageHistory(
                journey.getId(), CareStage.SCREENING, JourneyStatus.ACTIVE, TransitionAction.PROGRESS, "Maternal screening recorded high blood pressure (140/90 mmHg)", "USER-CHW-001"
        );
        stageRepository.save(s2);

        // Audit Event log
        AuditEvent audit = new AuditEvent(
                "DEMO_DATA_INIT", "USER-CHW-001", "CHW", "PAT-P1001", "PATIENT", "Seed scenario loaded for patient Meena (CF-P1001)"
        );
        auditRepository.save(audit);
    }

    private User seedUser(String id, String username, String rawPass, String fullName, Role role, String phone, String lang, String facilityId) {
        if (userRepository.findByUsername(username).isPresent()) {
            return userRepository.findByUsername(username).get();
        }
        User u = new User();
        u.setId(id);
        u.setUsername(username);
        u.setPasswordHash(passwordEncoder.encode(rawPass));
        u.setFullName(fullName);
        u.setRole(role);
        u.setPhoneNumber(phone);
        u.setLanguage(lang);
        u.setFacilityId(facilityId);
        return userRepository.save(u);
    }

    private void seedFacilityOperationalData(String facilityId) {
        if (statusRepository.findByFacilityId(facilityId).isPresent()) {
            return;
        }

        // Status
        FacilityOperationalStatus status = new FacilityOperationalStatus(
                facilityId, "OPERATIONAL", "Mon-Sat: 08:00 - 17:00, Sun: Emergency",
                "+914254272100", "phc.karamadai@tn.gov.in", 30, 24,
                "Regular operational state. All primary departments active.", "Facility Admin"
        );
        statusRepository.save(status);

        // Services
        serviceRepository.save(new FacilityServiceEntity(facilityId, "General Consultation", "CLINICAL", "AVAILABLE", "08:00 - 14:00", "Outpatient General Medicine", "Admin"));
        serviceRepository.save(new FacilityServiceEntity(facilityId, "Maternal & Antenatal Care", "PREVENTIVE", "AVAILABLE", "09:00 - 16:00", "ANC checkups and high-risk pregnancy screening", "Admin"));
        serviceRepository.save(new FacilityServiceEntity(facilityId, "Obstetric Ultrasound", "DIAGNOSTIC", "AVAILABLE", "10:00 - 15:00", "Fetal growth and anomaly scan", "Admin"));
        serviceRepository.save(new FacilityServiceEntity(facilityId, "NCD Screening", "PREVENTIVE", "AVAILABLE", "08:00 - 14:00", "Hypertension & Diabetes screening", "Admin"));
        serviceRepository.save(new FacilityServiceEntity(facilityId, "Digital X-Ray", "DIAGNOSTIC", "LIMITED", "09:00 - 13:00", "Digital Radiography", "Admin"));

        // Doctors / Professionals
        professionalRepository.save(new HealthcareProfessional(facilityId, "Dr. Rajesh Kumar", "Senior Medical Officer", "Obstetrics & Gynecology", "MD (OBG)", "Maternal Care", "TNMC-48201", "Mon-Sat 09:00 - 14:00", "AVAILABLE", true, "Admin"));
        professionalRepository.save(new HealthcareProfessional(facilityId, "Dr. Anitha Lakshmi", "Medical Officer", "General Medicine", "MBBS", "General Medicine", "TNMC-59302", "Mon-Fri 08:00 - 16:00", "AVAILABLE", true, "Admin"));
        professionalRepository.save(new HealthcareProfessional(facilityId, "Dr. S. Karthik", "Pediatric Specialist", "Pediatrics", "DCH, MBBS", "Pediatrics", "TNMC-61203", "Tue-Thu 10:00 - 13:00", "ON_LEAVE", false, "Admin"));

        // Equipment
        equipmentRepository.save(new FacilityEquipment(facilityId, "Ultrasound Scanner (Mindray DC-40)", "DIAGNOSTIC", 2, 2, "AVAILABLE", "Operational. Calibrated 15 Sep 2026", "2D/4D Probe configured", "Admin"));
        equipmentRepository.save(new FacilityEquipment(facilityId, "Digital ECG Machine", "MONITORING", 3, 3, "AVAILABLE", "Operational", "3-Channel ECG", "Admin"));
        equipmentRepository.save(new FacilityEquipment(facilityId, "Digital X-Ray Scanner", "DIAGNOSTIC", 1, 1, "PARTIALLY_AVAILABLE", "Tube calibration pending 30 Sep", "Reduced operational window", "Admin"));
        equipmentRepository.save(new FacilityEquipment(facilityId, "Autoclave Sterilizer", "SURGICAL", 2, 2, "AVAILABLE", "Operational", "Vertical high pressure", "Admin"));

        // Diagnostics
        diagnosticRepository.save(new FacilityDiagnosticService(facilityId, "Obstetric Ultrasound", "RADIOLOGY", "AVAILABLE", "09:00 - 14:00", "2 hours", "Ultrasound Scanner", "Admin"));
        diagnosticRepository.save(new FacilityDiagnosticService(facilityId, "Complete Blood Count (CBC)", "PATHOLOGY", "AVAILABLE", "08:00 - 16:00", "1 hour", "Automated Hematology Analyzer", "Admin"));
        diagnosticRepository.save(new FacilityDiagnosticService(facilityId, "Blood Glucose (HbA1c)", "BIOCHEMISTRY", "AVAILABLE", "08:00 - 16:00", "30 mins", "HbA1c Analyzer", "Admin"));
        diagnosticRepository.save(new FacilityDiagnosticService(facilityId, "Chest X-Ray", "RADIOLOGY", "LIMITED", "09:00 - 12:00", "Same day", "Digital X-Ray Scanner", "Admin"));

        // Slots
        slotRepository.save(new AppointmentSlot(facilityId, "USER-DOC-001", "Dr. Rajesh Kumar", "Obstetrics Consultation", LocalDate.now(), "10:00 AM", "10:30 AM", 2, "Admin"));
        slotRepository.save(new AppointmentSlot(facilityId, "USER-DOC-001", "Dr. Rajesh Kumar", "Obstetrics Consultation", LocalDate.now(), "10:30 AM", "11:00 AM", 2, "Admin"));
        slotRepository.save(new AppointmentSlot(facilityId, "USER-DOC-001", "Dr. Rajesh Kumar", "Obstetrics Consultation", LocalDate.now().plusDays(1), "09:30 AM", "10:00 AM", 2, "Admin"));
    }
}
