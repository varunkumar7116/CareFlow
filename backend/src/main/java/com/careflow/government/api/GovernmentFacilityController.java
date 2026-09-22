package com.careflow.government.api;

import com.careflow.government.dto.GovFacilityDTO;
import com.careflow.government.service.GovernmentFacilityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/gov/facilities")
public class GovernmentFacilityController {

    private final GovernmentFacilityService facilityService;

    public GovernmentFacilityController(GovernmentFacilityService facilityService) {
        this.facilityService = facilityService;
    }

    @GetMapping
    public ResponseEntity<List<GovFacilityDTO>> getFacilities(
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String search
    ) {
        List<GovFacilityDTO> result = facilityService.searchFacilities(district, type, search);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GovFacilityDTO> getFacilityById(@PathVariable String id) {
        return facilityService.getFacilityById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
