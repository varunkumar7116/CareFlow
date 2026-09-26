package com.careflow.journey;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/journeys")
@PreAuthorize("hasAnyRole('CHW', 'FACILITY_STAFF', 'DISTRICT_OFFICER', 'ADMIN', 'SYSTEM_ADMIN')")
public class CareJourneyController {

    private final CareJourneyRepository journeyRepository;
    private final CareJourneyStageHistoryRepository historyRepository;
    private final CareJourneyEngine journeyEngine;

    public CareJourneyController(CareJourneyRepository journeyRepository, CareJourneyStageHistoryRepository historyRepository, CareJourneyEngine journeyEngine) {
        this.journeyRepository = journeyRepository;
        this.historyRepository = historyRepository;
        this.journeyEngine = journeyEngine;
    }

    @PostMapping("/start")
    public ResponseEntity<CareJourney> startJourney(@RequestParam String patientId,
                                                      @RequestParam(required = false) String chwId,
                                                      @RequestParam(required = false) String facilityId,
                                                      @RequestParam(required = false) String actorId) {
        return ResponseEntity.ok(journeyEngine.startJourney(patientId, chwId, facilityId, actorId));
    }

    @PostMapping("/{id}/transition")
    public ResponseEntity<CareJourney> transition(@PathVariable String id,
                                                   @RequestParam TransitionAction action,
                                                   @RequestParam(required = false) CareStage targetStage,
                                                   @RequestParam(required = false) String notes,
                                                   @RequestParam(required = false) String actorId) {
        return ResponseEntity.ok(journeyEngine.transition(id, action, targetStage, notes, actorId));
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<CareJourney>> getJourneysForPatient(@PathVariable String patientId) {
        return ResponseEntity.ok(journeyRepository.findByPatientId(patientId));
    }

    @GetMapping("/{id}/history")
    public ResponseEntity<List<CareJourneyStageHistory>> getJourneyHistory(@PathVariable String id) {
        return ResponseEntity.ok(historyRepository.findByJourneyIdOrderByCreatedAtAsc(id));
    }
}
