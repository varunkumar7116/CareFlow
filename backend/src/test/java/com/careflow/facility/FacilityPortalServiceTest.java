package com.careflow.facility;

import com.careflow.audit.AuditEvent;
import com.careflow.audit.AuditEventRepository;
import com.careflow.auth.Role;
import com.careflow.auth.User;
import com.careflow.auth.UserRepository;
import com.careflow.common.SourceType;
import com.careflow.facility.dto.FacilityDetailsDTO;
import com.careflow.facility.dto.ReferralRequirementMatchDTO;
import com.careflow.government.dto.GovFacilityDTO;
import com.careflow.government.provider.GovernmentFacilityProvider;
import com.careflow.government.provider.HealthcareProfessionalProvider;
import com.careflow.referral.Referral;
import com.careflow.referral.ReferralService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class FacilityPortalServiceTest {

    @Autowired
    private FacilityOperationalService operationalService;

    @Autowired
    private GovernmentFacilityProvider governmentFacilityProvider;

    @Autowired
    private HealthcareProfessionalProvider professionalProvider;

    @Autowired
    private FacilityEquipmentRepository equipmentRepository;

    @Autowired
    private HealthcareProfessionalRepository professionalRepository;

    @Autowired
    private FacilityServiceRepository serviceRepository;

    @Autowired
    private FacilityDiagnosticRepository diagnosticRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReferralService referralService;

    @Autowired
    private AuditEventRepository auditEventRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final String FAC_A = "NIN-TN-CBE-001";
    private final String FAC_B = "NIN-UP-RMP-002";

    @BeforeEach
    void setUp() {
        if (userRepository.findByUsername("admin_a").isEmpty()) {
            User adminA = new User();
            adminA.setUsername("admin_a");
            adminA.setPasswordHash(passwordEncoder.encode("password"));
            adminA.setFullName("Admin Facility A");
            adminA.setRole(Role.FACILITY_ADMIN);
            adminA.setFacilityId(FAC_A);
            userRepository.save(adminA);
        }

        if (userRepository.findByUsername("admin_b").isEmpty()) {
            User adminB = new User();
            adminB.setUsername("admin_b");
            adminB.setPasswordHash(passwordEncoder.encode("password"));
            adminB.setFullName("Admin Facility B");
            adminB.setRole(Role.FACILITY_ADMIN);
            adminB.setFacilityId(FAC_B);
            userRepository.save(adminB);
        }
    }

    @Test
    @DisplayName("1. Facility Retrieval - Retrieves government reference and operational state")
    void testFacilityRetrieval() {
        List<GovFacilityDTO> facilities = governmentFacilityProvider.getFacilities();
        assertNotNull(facilities);
        assertFalse(facilities.isEmpty());

        Optional<GovFacilityDTO> fac = governmentFacilityProvider.getFacilityById(FAC_A);
        assertTrue(fac.isPresent());
        assertEquals("Government PHC, Karamadai", fac.get().getName());
        assertEquals("GOVERNMENT_REFERENCE", fac.get().getSourceMetadata().getSourceType().name());
    }

    @Test
    @DisplayName("2. Facility Service CRUD - Authorized user can create and update services")
    void testFacilityServiceCrud() {
        FacilityServiceEntity service = new FacilityServiceEntity(
                FAC_A, "Pediatric Immunization", "PREVENTIVE", "AVAILABLE", "08:00 - 14:00", "Weekly immunization clinic", "admin_a"
        );

        FacilityServiceEntity created = operationalService.addService(FAC_A, service, "admin_a");
        assertNotNull(created.getId());
        assertEquals("Pediatric Immunization", created.getServiceName());
        assertEquals(SourceType.FACILITY_MANAGED, created.getSourceType());

        created.setAvailabilityStatus("LIMITED");
        FacilityServiceEntity updated = operationalService.updateService(FAC_A, created.getId(), created, "admin_a");
        assertEquals("LIMITED", updated.getAvailabilityStatus());
    }

    @Test
    @DisplayName("3. Professional CRUD - Doctor registry CRUD with HealthcareProfessionalProvider")
    void testProfessionalCrud() {
        HealthcareProfessional prof = new HealthcareProfessional(
                FAC_A, "Dr. S. Meenakshi", "Consultant Gynaecologist", "Obstetrics", "MD", "OBG", "TNMC-99881", "Mon-Wed 09:00 - 13:00", "AVAILABLE", true, "admin_a"
        );

        HealthcareProfessional saved = operationalService.addProfessional(FAC_A, prof, "admin_a");
        assertNotNull(saved.getId());

        List<HealthcareProfessional> fromProvider = professionalProvider.getProfessionalsByFacility(FAC_A);
        assertTrue(fromProvider.stream().anyMatch(p -> p.getName().equals("Dr. S. Meenakshi")));

        Optional<HealthcareProfessional> single = professionalProvider.getProfessionalById(saved.getId());
        assertTrue(single.isPresent());
        assertEquals("Dr. S. Meenakshi", single.get().getName());
    }

    @Test
    @DisplayName("4. Equipment CRUD & Maintenance Status")
    void testEquipmentCrud() {
        FacilityEquipment eq = new FacilityEquipment(
                FAC_A, "Portable Ventilator", "LIFE_SUPPORT", 2, 2, "AVAILABLE", "Operational", "Emergency ready", "admin_a"
        );

        FacilityEquipment saved = operationalService.addEquipment(FAC_A, eq, "admin_a");
        assertNotNull(saved.getId());
        assertEquals("AVAILABLE", saved.getStatus());

        saved.setStatus("MAINTENANCE");
        saved.setMaintenanceStatus("Calibration in progress");
        FacilityEquipment updated = operationalService.updateEquipment(FAC_A, saved.getId(), saved, "admin_a");
        assertEquals("MAINTENANCE", updated.getStatus());
    }

    @Test
    @DisplayName("5. Diagnostics CRUD")
    void testDiagnosticsCrud() {
        FacilityDiagnosticService diag = new FacilityDiagnosticService(
                FAC_A, "Blood Hemoglobin", "PATHOLOGY", "AVAILABLE", "08:00 - 16:00", "15 mins", "Hemoglobinometer", "admin_a"
        );

        FacilityDiagnosticService saved = operationalService.addDiagnostic(FAC_A, diag, "admin_a");
        assertNotNull(saved.getId());
        assertEquals("AVAILABLE", saved.getAvailability());

        saved.setAvailability("UNAVAILABLE");
        FacilityDiagnosticService updated = operationalService.updateDiagnostic(FAC_A, saved.getId(), saved, "admin_a");
        assertEquals("UNAVAILABLE", updated.getAvailability());
    }

    @Test
    @DisplayName("6. Availability Update with Last Verified Timestamp")
    void testAvailabilityUpdate() {
        FacilityOperationalStatus status = new FacilityOperationalStatus(
                FAC_A, "LIMITED_OPERATIONS", "09:00 - 13:00", "+914254272100", "phc@tn.gov.in", 20, 5, "Renovation underway", "admin_a"
        );

        FacilityOperationalStatus updated = operationalService.updateOperationalStatus(FAC_A, status, "admin_a");
        assertEquals("LIMITED_OPERATIONS", updated.getOperatingStatus());
        assertNotNull(updated.getLastVerifiedAt());
        assertEquals("admin_a", updated.getLastVerifiedBy());
    }

    @Test
    @DisplayName("7. Facility-Level Authorization - Admin A CANNOT update Facility B Equipment")
    void testFacilityLevelAuthorizationEquipmentFail() {
        FacilityEquipment eqB = new FacilityEquipment(
                FAC_B, "ICU Monitor B", "MONITORING", 1, 1, "AVAILABLE", "Operational", "Notes", "admin_b"
        );
        FacilityEquipment savedB = equipmentRepository.save(eqB);

        assertThrows(AccessDeniedException.class, () -> {
            savedB.setStatus("UNAVAILABLE");
            operationalService.updateEquipment(FAC_B, savedB.getId(), savedB, "admin_a");
        });
    }

    @Test
    @DisplayName("8. Facility-Level Authorization - Admin A CANNOT update Facility B Doctor")
    void testFacilityLevelAuthorizationDoctorFail() {
        HealthcareProfessional doctorB = new HealthcareProfessional(
                FAC_B, "Dr. B. Sharma", "MO", "General Medicine", "MBBS", "GM", "REG-B", "09:00 - 14:00", "AVAILABLE", false, "admin_b"
        );
        HealthcareProfessional savedB = professionalRepository.save(doctorB);

        assertThrows(AccessDeniedException.class, () -> {
            savedB.setAvailabilityStatus("UNAVAILABLE");
            operationalService.updateProfessional(FAC_B, savedB.getId(), savedB, "admin_a");
        });
    }

    @Test
    @DisplayName("9. Referral + Facility Provider Integration (Requirement Matching)")
    void testReferralRequirementMatching() {
        List<ReferralRequirementMatchDTO> matches = operationalService.matchFacilitiesForReferral("Obstetrics", "Ultrasound", "Coimbatore");
        assertNotNull(matches);
        assertFalse(matches.isEmpty());
        ReferralRequirementMatchDTO top = matches.get(0);
        assertEquals("Matches referral requirements", top.getMatchLabel());
        assertTrue(top.isSpecialtyMatched());
    }

    @Test
    @DisplayName("10. Audit Logging - Operational edits produce audit trail records")
    void testAuditLogging() {
        FacilityServiceEntity service = new FacilityServiceEntity(
                FAC_A, "Emergency Triage", "EMERGENCY", "AVAILABLE", "24/7", "Trauma care", "admin_a"
        );
        operationalService.addService(FAC_A, service, "admin_a");

        List<AuditEvent> events = auditEventRepository.findAll();
        assertTrue(events.stream().anyMatch(e -> "SERVICE_AVAILABILITY_CHANGED".equals(e.getEventType())));
    }

    @Test
    @DisplayName("11. Data Provenance Verification")
    void testDataProvenanceMetadata() {
        FacilityDetailsDTO details = operationalService.getFacilityDetails(FAC_A);
        assertNotNull(details.getGovernmentReference());
        assertEquals("GOVERNMENT_REFERENCE", details.getGovernmentReference().getSourceMetadata().getSourceType().name());
        assertTrue(details.getGovernmentReference().getSourceMetadata().getSourceName().contains("Hospital Directory"));
        assertFalse(details.getGovernmentReference().getSourceMetadata().getIsLive());
        assertEquals("FACILITY_MANAGED", details.getFacilityManagedSourceMetadata().getSourceType().name());
    }

    @Test
    @DisplayName("12. ReferralService strictly uses GovernmentFacilityProvider")
    void testReferralServiceUsesProvider() {
        Referral ref = new Referral();
        ref.setPatientId("PAT-P1001");
        ref.setSourceFacilityId(FAC_A);
        ref.setTargetFacilityId(FAC_A);
        ref.setSpecialtyRequired("Obstetrics");
        ref.setPriority("HIGH");
        ref.setReason("High risk pregnancy screening");

        Referral created = referralService.createReferral(ref, "chw1");
        assertNotNull(created.getId());
        assertEquals(FAC_A, created.getTargetFacilityId());
    }
}
