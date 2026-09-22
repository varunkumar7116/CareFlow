package com.careflow.government.api;

import com.careflow.government.dto.GovIntegrationStatusDTO;
import com.careflow.government.service.GovernmentFacilityService;
import com.careflow.government.service.IntegrationAuditLogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/gov/integration")
public class GovernmentIntegrationController {

    private final IntegrationAuditLogService auditLogService;
    private final GovernmentFacilityService facilityService;

    public GovernmentIntegrationController(IntegrationAuditLogService auditLogService, GovernmentFacilityService facilityService) {
        this.auditLogService = auditLogService;
        this.facilityService = facilityService;
    }

    @GetMapping("/status")
    public ResponseEntity<GovIntegrationStatusDTO> getIntegrationStatus(
            @RequestParam(defaultValue = "FACILITY_DIRECTORY") String service
    ) {
        GovIntegrationStatusDTO status = auditLogService.getIntegrationStatus(
                service,
                facilityService.getActiveProviderMode()
        );
        return ResponseEntity.ok(status);
    }
}
