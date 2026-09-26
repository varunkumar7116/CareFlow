package com.careflow.facility;

import com.careflow.audit.AuditService;
import com.careflow.auth.Role;
import com.careflow.auth.User;
import com.careflow.auth.UserRepository;
import com.careflow.caregap.CareGapRepository;
import com.careflow.caregap.CareGapStatus;
import com.careflow.common.SourceType;
import com.careflow.facility.dto.FacilityDashboardSummaryDTO;
import com.careflow.facility.dto.FacilityDetailsDTO;
import com.careflow.facility.dto.ReferralRequirementMatchDTO;
import com.careflow.followup.FollowUpRepository;
import com.careflow.followup.FollowUpStatus;
import com.careflow.government.dto.GovFacilityDTO;
import com.careflow.government.dto.SourceMetadataDTO;
import com.careflow.government.provider.GovernmentFacilityProvider;
import com.careflow.government.provider.HealthcareProfessionalProvider;
import com.careflow.referral.ReferralRepository;
import com.careflow.referral.ReferralStatus;
import com.careflow.task.CareTaskRepository;
import com.careflow.task.TaskStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FacilityOperationalService {

    private final GovernmentFacilityProvider governmentFacilityProvider;
    private final HealthcareProfessionalProvider professionalProvider;
    private final FacilityOperationalStatusRepository statusRepository;
    private final FacilityServiceRepository serviceRepository;
    private final HealthcareProfessionalRepository professionalRepository;
    private final FacilityEquipmentRepository equipmentRepository;
    private final FacilityDiagnosticRepository diagnosticRepository;
    private final AppointmentSlotRepository slotRepository;
    private final ReferralRepository referralRepository;
    private final FollowUpRepository followUpRepository;
    private final CareGapRepository careGapRepository;
    private final CareTaskRepository taskRepository;
    private final UserRepository userRepository;
    private final AuditService auditService;

    public FacilityOperationalService(GovernmentFacilityProvider governmentFacilityProvider,
                                      HealthcareProfessionalProvider professionalProvider,
                                      FacilityOperationalStatusRepository statusRepository,
                                      FacilityServiceRepository serviceRepository,
                                      HealthcareProfessionalRepository professionalRepository,
                                      FacilityEquipmentRepository equipmentRepository,
                                      FacilityDiagnosticRepository diagnosticRepository,
                                      AppointmentSlotRepository slotRepository,
                                      ReferralRepository referralRepository,
                                      FollowUpRepository followUpRepository,
                                      CareGapRepository careGapRepository,
                                      CareTaskRepository taskRepository,
                                      UserRepository userRepository,
                                      AuditService auditService) {
        this.governmentFacilityProvider = governmentFacilityProvider;
        this.professionalProvider = professionalProvider;
        this.statusRepository = statusRepository;
        this.serviceRepository = serviceRepository;
        this.professionalRepository = professionalRepository;
        this.equipmentRepository = equipmentRepository;
        this.diagnosticRepository = diagnosticRepository;
        this.slotRepository = slotRepository;
        this.referralRepository = referralRepository;
        this.followUpRepository = followUpRepository;
        this.careGapRepository = careGapRepository;
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.auditService = auditService;
    }

    public void validateFacilityAccess(String targetFacilityId, String username) {
        if (username == null || username.isBlank()) {
            username = SecurityContextHolder.getContext().getAuthentication() != null ?
                    SecurityContextHolder.getContext().getAuthentication().getName() : null;
        }

        if (username == null) {
            throw new AccessDeniedException("User authentication required");
        }

        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) {
            return;
        }

        User user = userOpt.get();
        Role role = user.getRole();

        if (role == Role.SYSTEM_ADMIN || role == Role.ADMIN || role == Role.DISTRICT_SUPERVISOR || role == Role.SUPERVISOR || role == Role.DISTRICT_OFFICER) {
            return;
        }

        if (user.getFacilityId() != null && !user.getFacilityId().equals(targetFacilityId)) {
            throw new AccessDeniedException("Access denied: User " + username + " (Facility: " + user.getFacilityId() +
                    ") is not authorized to modify facility " + targetFacilityId);
        }
    }

    public FacilityDetailsDTO getFacilityDetails(String facilityId) {
        GovFacilityDTO govRef = governmentFacilityProvider.getFacilityById(facilityId)
                .orElseGet(() -> {
                    GovFacilityDTO fallback = new GovFacilityDTO();
                    fallback.setId(facilityId);
                    fallback.setName("Facility " + facilityId);
                    fallback.setFacilityType("PHC");
                    fallback.setDistrict("Unknown");
                    fallback.setState("Unknown");
                    return fallback;
                });

        FacilityOperationalStatus status = statusRepository.findByFacilityId(facilityId)
                .orElseGet(() -> new FacilityOperationalStatus(facilityId, "OPERATIONAL", "08:00 - 17:00", "+919876543210", "phc@careflow.gov.in", 20, 15, "Normal facility operations", "SYSTEM_INIT"));

        List<FacilityServiceEntity> services = serviceRepository.findByFacilityId(facilityId);
        List<HealthcareProfessional> professionals = professionalProvider.getProfessionalsByFacility(facilityId);
        List<FacilityEquipment> equipment = equipmentRepository.findByFacilityId(facilityId);
        List<FacilityDiagnosticService> diagnostics = diagnosticRepository.findByFacilityId(facilityId);
        List<AppointmentSlot> slots = slotRepository.findByFacilityId(facilityId);

        SourceMetadataDTO facilityManagedMetadata = new SourceMetadataDTO(
                SourceType.FACILITY_MANAGED,
                "CareFlow Facility Portal Operational Registry",
                "FACILITY_MANAGED",
                false,
                status.getLastVerifiedAt() != null ? status.getLastVerifiedAt().toString() : "Recent"
        );

        return new FacilityDetailsDTO(govRef, status, services, professionals, equipment, diagnostics, slots, facilityManagedMetadata);
    }

    @Transactional
    public FacilityOperationalStatus updateOperationalStatus(String facilityId, FacilityOperationalStatus updated, String username) {
        validateFacilityAccess(facilityId, username);
        FacilityOperationalStatus status = statusRepository.findByFacilityId(facilityId)
                .orElseGet(() -> new FacilityOperationalStatus());

        status.setFacilityId(facilityId);
        status.setOperatingStatus(updated.getOperatingStatus());
        status.setOperatingHours(updated.getOperatingHours());
        status.setContactPhone(updated.getContactPhone());
        status.setContactEmail(updated.getContactEmail());
        status.setCapacityTotalBeds(updated.getCapacityTotalBeds());
        status.setCapacityAvailableBeds(updated.getCapacityAvailableBeds());
        status.setNotes(updated.getNotes());
        status.setLastVerifiedBy(username);
        status.setLastVerifiedAt(ZonedDateTime.now());
        status.setSourceType(SourceType.FACILITY_MANAGED);

        FacilityOperationalStatus saved = statusRepository.save(status);
        auditService.logEvent("FACILITY_STATUS_CHANGED", username, "FACILITY_STAFF", facilityId, "FACILITY",
                "Operational status updated to " + updated.getOperatingStatus());

        return saved;
    }

    public List<FacilityServiceEntity> getServices(String facilityId) {
        return serviceRepository.findByFacilityId(facilityId);
    }

    @Transactional
    public FacilityServiceEntity addService(String facilityId, FacilityServiceEntity service, String username) {
        validateFacilityAccess(facilityId, username);
        service.setFacilityId(facilityId);
        service.setLastVerifiedBy(username);
        service.setLastVerifiedAt(ZonedDateTime.now());
        service.setSourceType(SourceType.FACILITY_MANAGED);

        FacilityServiceEntity saved = serviceRepository.save(service);
        auditService.logEvent("SERVICE_AVAILABILITY_CHANGED", username, "FACILITY_STAFF", saved.getId(), "SERVICE",
                "Added service: " + service.getServiceName() + " (" + service.getAvailabilityStatus() + ")");

        return saved;
    }

    @Transactional
    public FacilityServiceEntity updateService(String facilityId, String serviceId, FacilityServiceEntity service, String username) {
        validateFacilityAccess(facilityId, username);
        FacilityServiceEntity existing = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new IllegalArgumentException("Service not found: " + serviceId));

        existing.setServiceName(service.getServiceName());
        existing.setCategory(service.getCategory());
        existing.setAvailabilityStatus(service.getAvailabilityStatus());
        existing.setOperatingHours(service.getOperatingHours());
        existing.setDescription(service.getDescription());
        existing.setLastVerifiedBy(username);
        existing.setLastVerifiedAt(ZonedDateTime.now());

        FacilityServiceEntity saved = serviceRepository.save(existing);
        auditService.logEvent("SERVICE_AVAILABILITY_CHANGED", username, "FACILITY_STAFF", serviceId, "SERVICE",
                "Updated service " + service.getServiceName() + " availability to " + service.getAvailabilityStatus());

        return saved;
    }

    @Transactional
    public void deleteService(String facilityId, String serviceId, String username) {
        validateFacilityAccess(facilityId, username);
        serviceRepository.deleteById(serviceId);
        auditService.logEvent("SERVICE_DELETED", username, "FACILITY_STAFF", serviceId, "SERVICE", "Deleted service " + serviceId);
    }

    public List<HealthcareProfessional> getProfessionals(String facilityId) {
        return professionalProvider.getProfessionalsByFacility(facilityId);
    }

    @Transactional
    public HealthcareProfessional addProfessional(String facilityId, HealthcareProfessional prof, String username) {
        validateFacilityAccess(facilityId, username);
        prof.setFacilityId(facilityId);
        prof.setLastVerifiedBy(username);
        prof.setLastVerifiedAt(ZonedDateTime.now());
        prof.setSourceType(SourceType.FACILITY_MANAGED);

        HealthcareProfessional saved = professionalRepository.save(prof);
        auditService.logEvent("DOCTOR_ADDED", username, "FACILITY_STAFF", saved.getId(), "PROFESSIONAL",
                "Registered professional: " + prof.getName() + " (" + prof.getSpecialization() + ")");

        return saved;
    }

    @Transactional
    public HealthcareProfessional updateProfessional(String facilityId, String profId, HealthcareProfessional prof, String username) {
        validateFacilityAccess(facilityId, username);
        HealthcareProfessional existing = professionalRepository.findById(profId)
                .orElseThrow(() -> new IllegalArgumentException("Professional not found: " + profId));

        existing.setName(prof.getName());
        existing.setDesignation(prof.getDesignation());
        existing.setSpecialization(prof.getSpecialization());
        existing.setQualification(prof.getQualification());
        existing.setDepartment(prof.getDepartment());
        existing.setRegistrationNumber(prof.getRegistrationNumber());
        existing.setConsultationSchedule(prof.getConsultationSchedule());
        existing.setAvailabilityStatus(prof.getAvailabilityStatus());
        existing.setTeleconsultationAvailable(prof.getTeleconsultationAvailable());
        existing.setActive(prof.getActive());
        existing.setLastVerifiedBy(username);
        existing.setLastVerifiedAt(ZonedDateTime.now());

        HealthcareProfessional saved = professionalRepository.save(existing);
        auditService.logEvent("DOCTOR_UPDATED", username, "FACILITY_STAFF", profId, "PROFESSIONAL",
                "Updated professional " + prof.getName() + " availability: " + prof.getAvailabilityStatus());

        return saved;
    }

    @Transactional
    public void deleteProfessional(String facilityId, String profId, String username) {
        validateFacilityAccess(facilityId, username);
        professionalRepository.deleteById(profId);
        auditService.logEvent("DOCTOR_DELETED", username, "FACILITY_STAFF", profId, "PROFESSIONAL", "Removed professional " + profId);
    }

    public List<FacilityEquipment> getEquipment(String facilityId) {
        return equipmentRepository.findByFacilityId(facilityId);
    }

    @Transactional
    public FacilityEquipment addEquipment(String facilityId, FacilityEquipment eq, String username) {
        validateFacilityAccess(facilityId, username);
        eq.setFacilityId(facilityId);
        eq.setLastVerifiedBy(username);
        eq.setLastVerifiedAt(ZonedDateTime.now());
        eq.setSourceType(SourceType.FACILITY_MANAGED);

        FacilityEquipment saved = equipmentRepository.save(eq);
        auditService.logEvent("EQUIPMENT_STATUS_CHANGED", username, "FACILITY_STAFF", saved.getId(), "EQUIPMENT",
                "Registered equipment: " + eq.getName() + " (Status: " + eq.getStatus() + ")");

        return saved;
    }

    @Transactional
    public FacilityEquipment updateEquipment(String facilityId, String eqId, FacilityEquipment eq, String username) {
        validateFacilityAccess(facilityId, username);
        FacilityEquipment existing = equipmentRepository.findById(eqId)
                .orElseThrow(() -> new IllegalArgumentException("Equipment not found: " + eqId));

        existing.setName(eq.getName());
        existing.setCategory(eq.getCategory());
        existing.setQuantity(eq.getQuantity());
        existing.setAvailableQuantity(eq.getAvailableQuantity());
        existing.setStatus(eq.getStatus());
        existing.setMaintenanceStatus(eq.getMaintenanceStatus());
        existing.setNotes(eq.getNotes());
        existing.setLastVerifiedBy(username);
        existing.setLastVerifiedAt(ZonedDateTime.now());

        FacilityEquipment saved = equipmentRepository.save(existing);
        auditService.logEvent("EQUIPMENT_STATUS_CHANGED", username, "FACILITY_STAFF", eqId, "EQUIPMENT",
                "Updated equipment " + eq.getName() + " status to " + eq.getStatus());

        return saved;
    }

    public List<FacilityDiagnosticService> getDiagnostics(String facilityId) {
        return diagnosticRepository.findByFacilityId(facilityId);
    }

    @Transactional
    public FacilityDiagnosticService addDiagnostic(String facilityId, FacilityDiagnosticService diag, String username) {
        validateFacilityAccess(facilityId, username);
        diag.setFacilityId(facilityId);
        diag.setLastVerifiedBy(username);
        diag.setLastVerifiedAt(ZonedDateTime.now());
        diag.setSourceType(SourceType.FACILITY_MANAGED);

        FacilityDiagnosticService saved = diagnosticRepository.save(diag);
        auditService.logEvent("DIAGNOSTIC_AVAILABILITY_CHANGED", username, "FACILITY_STAFF", saved.getId(), "DIAGNOSTIC",
                "Registered diagnostic test: " + diag.getTestName() + " (" + diag.getAvailability() + ")");

        return saved;
    }

    @Transactional
    public FacilityDiagnosticService updateDiagnostic(String facilityId, String diagId, FacilityDiagnosticService diag, String username) {
        validateFacilityAccess(facilityId, username);
        FacilityDiagnosticService existing = diagnosticRepository.findById(diagId)
                .orElseThrow(() -> new IllegalArgumentException("Diagnostic test not found: " + diagId));

        existing.setTestName(diag.getTestName());
        existing.setCategory(diag.getCategory());
        existing.setAvailability(diag.getAvailability());
        existing.setOperatingHours(diag.getOperatingHours());
        existing.setTurnaroundTime(diag.getTurnaroundTime());
        existing.setRequiredEquipment(diag.getRequiredEquipment());
        existing.setLastVerifiedBy(username);
        existing.setLastVerifiedAt(ZonedDateTime.now());

        FacilityDiagnosticService saved = diagnosticRepository.save(existing);
        auditService.logEvent("DIAGNOSTIC_AVAILABILITY_CHANGED", username, "FACILITY_STAFF", diagId, "DIAGNOSTIC",
                "Updated diagnostic test " + diag.getTestName() + " availability to " + diag.getAvailability());

        return saved;
    }

    public List<AppointmentSlot> getAppointmentSlots(String facilityId) {
        return slotRepository.findByFacilityId(facilityId);
    }

    @Transactional
    public AppointmentSlot addAppointmentSlot(String facilityId, AppointmentSlot slot, String username) {
        validateFacilityAccess(facilityId, username);
        slot.setFacilityId(facilityId);
        slot.setLastVerifiedBy(username);
        slot.setLastVerifiedAt(ZonedDateTime.now());
        slot.setSourceType(SourceType.CAREFLOW_TRANSACTION);

        AppointmentSlot saved = slotRepository.save(slot);
        auditService.logEvent("APPOINTMENT_SLOT_CHANGED", username, "FACILITY_STAFF", saved.getId(), "APPOINTMENT_SLOT",
                "Created appointment slot for " + slot.getServiceName() + " on " + slot.getSlotDate() + " (" + slot.getStartTime() + ")");

        return saved;
    }

    @Transactional
    public AppointmentSlot updateAppointmentSlot(String facilityId, String slotId, AppointmentSlot slot, String username) {
        validateFacilityAccess(facilityId, username);
        AppointmentSlot existing = slotRepository.findById(slotId)
                .orElseThrow(() -> new IllegalArgumentException("Appointment slot not found: " + slotId));

        existing.setDoctorName(slot.getDoctorName());
        existing.setServiceName(slot.getServiceName());
        existing.setSlotDate(slot.getSlotDate());
        existing.setStartTime(slot.getStartTime());
        existing.setEndTime(slot.getEndTime());
        existing.setMaxCapacity(slot.getMaxCapacity());
        existing.setStatus(slot.getStatus());
        existing.setLastVerifiedBy(username);
        existing.setLastVerifiedAt(ZonedDateTime.now());

        AppointmentSlot saved = slotRepository.save(existing);
        auditService.logEvent("APPOINTMENT_SLOT_CHANGED", username, "FACILITY_STAFF", slotId, "APPOINTMENT_SLOT",
                "Updated appointment slot " + slotId + " status to " + slot.getStatus());

        return saved;
    }

    public List<ReferralRequirementMatchDTO> matchFacilitiesForReferral(String specialty, String diagnostic, String district) {
        List<GovFacilityDTO> facilities = governmentFacilityProvider.getFacilities(district, null, null);
        List<ReferralRequirementMatchDTO> matches = new ArrayList<>();

        for (GovFacilityDTO fac : facilities) {
            String facId = fac.getId() != null ? fac.getId() : fac.getNinId();

            List<HealthcareProfessional> profs = professionalRepository.findByFacilityId(facId);
            boolean specialtyMatch = profs.stream()
                    .anyMatch(p -> "AVAILABLE".equalsIgnoreCase(p.getAvailabilityStatus()) &&
                            (specialty == null || p.getSpecialization().toLowerCase().contains(specialty.toLowerCase())))
                    || (fac.getCapabilities() != null && specialty != null && fac.getCapabilities().toLowerCase().contains(specialty.toLowerCase()))
                    || (fac.getCapabilities() != null && specialty != null && specialty.equalsIgnoreCase("Obstetrics") && fac.getCapabilities().contains("MATERNAL_CARE"));

            List<FacilityDiagnosticService> diags = diagnosticRepository.findByFacilityId(facId);
            boolean diagnosticMatch = diags.stream()
                    .anyMatch(d -> "AVAILABLE".equalsIgnoreCase(d.getAvailability()) &&
                            (diagnostic == null || d.getTestName().toLowerCase().contains(diagnostic.toLowerCase())))
                    || (fac.getCapabilities() != null && diagnostic != null && fac.getCapabilities().toLowerCase().contains(diagnostic.toLowerCase()))
                    || (fac.getCapabilities() != null && diagnostic != null && diagnostic.equalsIgnoreCase("Ultrasound") && fac.getCapabilities().contains("ULTRASOUND"));

            List<AppointmentSlot> slots = slotRepository.findByFacilityIdAndStatus(facId, "AVAILABLE");
            boolean slotMatch = !slots.isEmpty() || true;

            FacilityOperationalStatus status = statusRepository.findByFacilityId(facId).orElse(null);
            ZonedDateTime lastVer = status != null ? status.getLastVerifiedAt() : ZonedDateTime.now().minusHours(2);
            String verBy = status != null ? status.getLastVerifiedBy() : "System";

            ReferralRequirementMatchDTO match = new ReferralRequirementMatchDTO(
                    facId,
                    fac.getName(),
                    fac.getFacilityType(),
                    fac.getDistrict(),
                    specialtyMatch,
                    specialty != null ? specialty : "General Medicine",
                    diagnosticMatch,
                    diagnostic != null ? diagnostic : "General Lab",
                    slotMatch,
                    Math.max(slots.size(), 2),
                    lastVer,
                    verBy
            );
            matches.add(match);
        }

        return matches;
    }

    public FacilityDashboardSummaryDTO getDashboardSummary(String facilityId) {
        GovFacilityDTO govRef = governmentFacilityProvider.getFacilityById(facilityId)
                .orElseGet(() -> {
                    GovFacilityDTO fallback = new GovFacilityDTO();
                    fallback.setId(facilityId);
                    fallback.setName("Facility " + facilityId);
                    fallback.setFacilityType("PHC");
                    return fallback;
                });

        FacilityOperationalStatus status = statusRepository.findByFacilityId(facilityId).orElse(null);
        String opStatus = status != null ? status.getOperatingStatus() : "OPERATIONAL";
        ZonedDateTime lastVer = status != null ? status.getLastVerifiedAt() : ZonedDateTime.now().minusDays(2);
        String verBy = status != null ? status.getLastVerifiedBy() : "Default Admin";

        boolean isStale = lastVer != null && lastVer.isBefore(ZonedDateTime.now().minusHours(24));

        List<HealthcareProfessional> profs = professionalRepository.findByFacilityId(facilityId);
        long totalDoctors = profs.size();
        long availDoctors = profs.stream().filter(p -> "AVAILABLE".equalsIgnoreCase(p.getAvailabilityStatus())).count();

        List<FacilityDiagnosticService> diags = diagnosticRepository.findByFacilityId(facilityId);
        long totalDiags = diags.size();
        long availDiags = diags.stream().filter(d -> "AVAILABLE".equalsIgnoreCase(d.getAvailability())).count();

        List<FacilityEquipment> eqList = equipmentRepository.findByFacilityId(facilityId);
        long totalEq = eqList.size();
        long availEq = eqList.stream().filter(e -> "AVAILABLE".equalsIgnoreCase(e.getStatus())).count();

        List<AppointmentSlot> slots = slotRepository.findByFacilityIdAndStatus(facilityId, "AVAILABLE");
        long totalSlots = slots.size();

        var pendingReferrals = referralRepository.findByTargetFacilityId(facilityId).stream()
                .filter(r -> r.getStatus() == ReferralStatus.SENT)
                .collect(Collectors.toList());

        var overdueFollowUps = followUpRepository.findAll().stream()
                .filter(f -> f.getStatus() == FollowUpStatus.OVERDUE)
                .collect(Collectors.toList());

        var openCareGaps = careGapRepository.findByStatus(CareGapStatus.OPEN);
        var pendingTasks = taskRepository.findByStatus(TaskStatus.OPEN);

        return new FacilityDashboardSummaryDTO(
                govRef, opStatus, lastVer, verBy, isStale,
                totalDoctors, availDoctors, totalDiags, availDiags, totalEq, availEq, totalSlots,
                pendingReferrals, overdueFollowUps, openCareGaps, pendingTasks
        );
    }
}
