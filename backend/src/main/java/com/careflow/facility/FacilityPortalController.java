package com.careflow.facility;

import com.careflow.facility.dto.FacilityDashboardSummaryDTO;
import com.careflow.facility.dto.FacilityDetailsDTO;
import com.careflow.facility.dto.ReferralRequirementMatchDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/facilities")
@PreAuthorize("hasAnyRole('CHW', 'FACILITY_STAFF', 'FACILITY_ADMIN', 'DOCTOR', 'DISTRICT_SUPERVISOR', 'SYSTEM_ADMIN', 'ADMIN')")
public class FacilityPortalController {

    private final FacilityOperationalService operationalService;

    public FacilityPortalController(FacilityOperationalService operationalService) {
        this.operationalService = operationalService;
    }

    // --- NORMALIZED FACILITY DETAILS ---
    @GetMapping("/{facilityId}/details")
    public ResponseEntity<FacilityDetailsDTO> getFacilityDetails(@PathVariable String facilityId) {
        return ResponseEntity.ok(operationalService.getFacilityDetails(facilityId));
    }

    // --- OPERATIONAL STATUS ---
    @PutMapping("/{facilityId}/status")
    public ResponseEntity<FacilityOperationalStatus> updateOperationalStatus(@PathVariable String facilityId,
                                                                             @RequestBody FacilityOperationalStatus status,
                                                                             Authentication authentication) {
        String username = authentication != null ? authentication.getName() : "system";
        return ResponseEntity.ok(operationalService.updateOperationalStatus(facilityId, status, username));
    }

    // --- SERVICES ---
    @GetMapping("/{facilityId}/services")
    public ResponseEntity<List<FacilityServiceEntity>> getServices(@PathVariable String facilityId) {
        return ResponseEntity.ok(operationalService.getServices(facilityId));
    }

    @PostMapping("/{facilityId}/services")
    public ResponseEntity<FacilityServiceEntity> addService(@PathVariable String facilityId,
                                                             @RequestBody FacilityServiceEntity service,
                                                             Authentication authentication) {
        String username = authentication != null ? authentication.getName() : "system";
        return ResponseEntity.ok(operationalService.addService(facilityId, service, username));
    }

    @PutMapping("/{facilityId}/services/{serviceId}")
    public ResponseEntity<FacilityServiceEntity> updateService(@PathVariable String facilityId,
                                                                @PathVariable String serviceId,
                                                                @RequestBody FacilityServiceEntity service,
                                                                Authentication authentication) {
        String username = authentication != null ? authentication.getName() : "system";
        return ResponseEntity.ok(operationalService.updateService(facilityId, serviceId, service, username));
    }

    @DeleteMapping("/{facilityId}/services/{serviceId}")
    public ResponseEntity<Void> deleteService(@PathVariable String facilityId,
                                               @PathVariable String serviceId,
                                               Authentication authentication) {
        String username = authentication != null ? authentication.getName() : "system";
        operationalService.deleteService(facilityId, serviceId, username);
        return ResponseEntity.noContent().build();
    }

    // --- PROFESSIONALS / DOCTORS ---
    @GetMapping("/{facilityId}/professionals")
    public ResponseEntity<List<HealthcareProfessional>> getProfessionals(@PathVariable String facilityId) {
        return ResponseEntity.ok(operationalService.getProfessionals(facilityId));
    }

    @PostMapping("/{facilityId}/professionals")
    public ResponseEntity<HealthcareProfessional> addProfessional(@PathVariable String facilityId,
                                                                  @RequestBody HealthcareProfessional prof,
                                                                  Authentication authentication) {
        String username = authentication != null ? authentication.getName() : "system";
        return ResponseEntity.ok(operationalService.addProfessional(facilityId, prof, username));
    }

    @PutMapping("/{facilityId}/professionals/{professionalId}")
    public ResponseEntity<HealthcareProfessional> updateProfessional(@PathVariable String facilityId,
                                                                     @PathVariable String professionalId,
                                                                     @RequestBody HealthcareProfessional prof,
                                                                     Authentication authentication) {
        String username = authentication != null ? authentication.getName() : "system";
        return ResponseEntity.ok(operationalService.updateProfessional(facilityId, professionalId, prof, username));
    }

    @DeleteMapping("/{facilityId}/professionals/{professionalId}")
    public ResponseEntity<Void> deleteProfessional(@PathVariable String facilityId,
                                                    @PathVariable String professionalId,
                                                    Authentication authentication) {
        String username = authentication != null ? authentication.getName() : "system";
        operationalService.deleteProfessional(facilityId, professionalId, username);
        return ResponseEntity.noContent().build();
    }

    // --- EQUIPMENT ---
    @GetMapping("/{facilityId}/equipment")
    public ResponseEntity<List<FacilityEquipment>> getEquipment(@PathVariable String facilityId) {
        return ResponseEntity.ok(operationalService.getEquipment(facilityId));
    }

    @PostMapping("/{facilityId}/equipment")
    public ResponseEntity<FacilityEquipment> addEquipment(@PathVariable String facilityId,
                                                           @RequestBody FacilityEquipment eq,
                                                           Authentication authentication) {
        String username = authentication != null ? authentication.getName() : "system";
        return ResponseEntity.ok(operationalService.addEquipment(facilityId, eq, username));
    }

    @PutMapping("/{facilityId}/equipment/{equipmentId}")
    public ResponseEntity<FacilityEquipment> updateEquipment(@PathVariable String facilityId,
                                                              @PathVariable String equipmentId,
                                                              @RequestBody FacilityEquipment eq,
                                                              Authentication authentication) {
        String username = authentication != null ? authentication.getName() : "system";
        return ResponseEntity.ok(operationalService.updateEquipment(facilityId, equipmentId, eq, username));
    }

    // --- DIAGNOSTICS ---
    @GetMapping("/{facilityId}/diagnostics")
    public ResponseEntity<List<FacilityDiagnosticService>> getDiagnostics(@PathVariable String facilityId) {
        return ResponseEntity.ok(operationalService.getDiagnostics(facilityId));
    }

    @PostMapping("/{facilityId}/diagnostics")
    public ResponseEntity<FacilityDiagnosticService> addDiagnostic(@PathVariable String facilityId,
                                                                   @RequestBody FacilityDiagnosticService diag,
                                                                   Authentication authentication) {
        String username = authentication != null ? authentication.getName() : "system";
        return ResponseEntity.ok(operationalService.addDiagnostic(facilityId, diag, username));
    }

    @PutMapping("/{facilityId}/diagnostics/{diagnosticId}")
    public ResponseEntity<FacilityDiagnosticService> updateDiagnostic(@PathVariable String facilityId,
                                                                       @PathVariable String diagnosticId,
                                                                       @RequestBody FacilityDiagnosticService diag,
                                                                       Authentication authentication) {
        String username = authentication != null ? authentication.getName() : "system";
        return ResponseEntity.ok(operationalService.updateDiagnostic(facilityId, diagnosticId, diag, username));
    }

    // --- APPOINTMENT SLOTS ---
    @GetMapping("/{facilityId}/appointments/slots")
    public ResponseEntity<List<AppointmentSlot>> getAppointmentSlots(@PathVariable String facilityId) {
        return ResponseEntity.ok(operationalService.getAppointmentSlots(facilityId));
    }

    @PostMapping("/{facilityId}/appointments/slots")
    public ResponseEntity<AppointmentSlot> addAppointmentSlot(@PathVariable String facilityId,
                                                               @RequestBody AppointmentSlot slot,
                                                               Authentication authentication) {
        String username = authentication != null ? authentication.getName() : "system";
        return ResponseEntity.ok(operationalService.addAppointmentSlot(facilityId, slot, username));
    }

    @PutMapping("/{facilityId}/appointments/slots/{slotId}")
    public ResponseEntity<AppointmentSlot> updateAppointmentSlot(@PathVariable String facilityId,
                                                                   @PathVariable String slotId,
                                                                   @RequestBody AppointmentSlot slot,
                                                                   Authentication authentication) {
        String username = authentication != null ? authentication.getName() : "system";
        return ResponseEntity.ok(operationalService.updateAppointmentSlot(facilityId, slotId, slot, username));
    }

    // --- REFERRAL MATCHING ---
    @GetMapping("/{facilityId}/matching")
    public ResponseEntity<List<ReferralRequirementMatchDTO>> matchFacilitiesForReferral(@RequestParam(required = false) String specialty,
                                                                                         @RequestParam(required = false) String diagnostic,
                                                                                         @RequestParam(required = false) String district) {
        return ResponseEntity.ok(operationalService.matchFacilitiesForReferral(specialty, diagnostic, district));
    }

    // --- DASHBOARD SUMMARY ---
    @GetMapping("/{facilityId}/dashboard")
    public ResponseEntity<FacilityDashboardSummaryDTO> getDashboardSummary(@PathVariable String facilityId) {
        return ResponseEntity.ok(operationalService.getDashboardSummary(facilityId));
    }
}
