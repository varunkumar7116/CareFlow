package com.careflow.followup;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/followups")
@PreAuthorize("hasAnyRole('CHW', 'FACILITY_STAFF', 'DISTRICT_OFFICER', 'ADMIN', 'SYSTEM_ADMIN')")
public class FollowUpController {

    private final FollowUpService followUpService;

    public FollowUpController(FollowUpService followUpService) {
        this.followUpService = followUpService;
    }

    @PostMapping
    public ResponseEntity<FollowUp> scheduleFollowUp(@RequestBody FollowUp followUp) {
        return ResponseEntity.ok(followUpService.scheduleFollowUp(followUp));
    }

    @PostMapping("/{id}/complete")
    public ResponseEntity<FollowUp> completeFollowUp(@PathVariable String id, @RequestParam(required = false) String outcomeNotes, @RequestParam(required = false) String actorId) {
        return ResponseEntity.ok(followUpService.completeFollowUp(id, outcomeNotes, actorId));
    }

    @GetMapping("/chw/{chwId}")
    public ResponseEntity<List<FollowUp>> getFollowUpsByChw(@PathVariable String chwId) {
        return ResponseEntity.ok(followUpService.getFollowUpsByChw(chwId));
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<FollowUp>> getFollowUpsByPatient(@PathVariable String patientId) {
        return ResponseEntity.ok(followUpService.getFollowUpsByPatient(patientId));
    }
}
