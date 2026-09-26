package com.careflow.caregap;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/caregaps")
@PreAuthorize("hasAnyRole('CHW', 'FACILITY_STAFF', 'DISTRICT_OFFICER', 'ADMIN', 'SYSTEM_ADMIN')")
public class CareGapController {

    private final CareGapRepository careGapRepository;
    private final CareGapEngine careGapEngine;

    public CareGapController(CareGapRepository careGapRepository, CareGapEngine careGapEngine) {
        this.careGapRepository = careGapRepository;
        this.careGapEngine = careGapEngine;
    }

    @GetMapping
    public ResponseEntity<List<CareGap>> getAllCareGaps() {
        return ResponseEntity.ok(careGapRepository.findAll());
    }

    @GetMapping("/open")
    public ResponseEntity<List<CareGap>> getOpenCareGaps() {
        return ResponseEntity.ok(careGapRepository.findByStatus(CareGapStatus.OPEN));
    }

    @PostMapping("/scan")
    public ResponseEntity<String> triggerScan() {
        careGapEngine.scanAndDetectCareGaps();
        return ResponseEntity.ok("Care Gap Engine scan triggered successfully.");
    }

    @PostMapping("/{id}/resolve")
    public ResponseEntity<String> resolveCareGap(@PathVariable String id) {
        careGapEngine.resolveCareGap(id);
        return ResponseEntity.ok("Care Gap resolved.");
    }
}
