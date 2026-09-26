package com.careflow.facility;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/facilities")
@PreAuthorize("hasAnyRole('CHW', 'FACILITY_STAFF', 'DISTRICT_OFFICER', 'ADMIN', 'SYSTEM_ADMIN')")
public class FacilityController {

    private final FacilityService facilityService;

    public FacilityController(FacilityService facilityService) {
        this.facilityService = facilityService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'SYSTEM_ADMIN')")
    public ResponseEntity<Facility> createFacility(@RequestBody Facility facility) {
        return ResponseEntity.ok(facilityService.createFacility(facility));
    }

    @GetMapping
    public ResponseEntity<List<Facility>> getAllFacilities() {
        return ResponseEntity.ok(facilityService.getAllFacilities());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Facility> getFacilityById(@PathVariable String id) {
        return facilityService.getFacilityById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
