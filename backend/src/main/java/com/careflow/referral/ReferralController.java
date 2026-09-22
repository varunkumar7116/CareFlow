package com.careflow.referral;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/referrals")
public class ReferralController {

    private final ReferralService referralService;

    public ReferralController(ReferralService referralService) {
        this.referralService = referralService;
    }

    @PostMapping
    public ResponseEntity<Referral> createReferral(@RequestBody Referral referral, @RequestParam(required = false) String actorId) {
        return ResponseEntity.ok(referralService.createReferral(referral, actorId));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Referral> updateStatus(@PathVariable String id, @RequestParam ReferralStatus status, @RequestParam(required = false) String actorId) {
        return ResponseEntity.ok(referralService.updateStatus(id, status, actorId));
    }

    @GetMapping("/facility/{facilityId}")
    public ResponseEntity<List<Referral>> getReferralsForTargetFacility(@PathVariable String facilityId) {
        return ResponseEntity.ok(referralService.getReferralsForTargetFacility(facilityId));
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Referral>> getReferralsForPatient(@PathVariable String patientId) {
        return ResponseEntity.ok(referralService.getReferralsForPatient(patientId));
    }
}
