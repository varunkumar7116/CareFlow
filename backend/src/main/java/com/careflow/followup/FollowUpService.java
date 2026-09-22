package com.careflow.followup;

import com.careflow.caregap.CareGapEngine;
import com.careflow.journey.CareJourneyEngine;
import com.careflow.journey.CareStage;
import com.careflow.journey.TransitionAction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class FollowUpService {

    private final FollowUpRepository followUpRepository;
    private final CareJourneyEngine journeyEngine;
    private final CareGapEngine careGapEngine;

    public FollowUpService(FollowUpRepository followUpRepository, CareJourneyEngine journeyEngine, CareGapEngine careGapEngine) {
        this.followUpRepository = followUpRepository;
        this.journeyEngine = journeyEngine;
        this.careGapEngine = careGapEngine;
    }

    public FollowUp scheduleFollowUp(FollowUp followUp) {
        followUp.setStatus(FollowUpStatus.SCHEDULED);
        return followUpRepository.save(followUp);
    }

    @Transactional
    public FollowUp completeFollowUp(String followUpId, String outcomeNotes, String actorId) {
        FollowUp fu = followUpRepository.findById(followUpId)
                .orElseThrow(() -> new IllegalArgumentException("FollowUp not found: " + followUpId));

        fu.setStatus(FollowUpStatus.COMPLETED);
        fu.setCompletedAt(ZonedDateTime.now());
        fu.setOutcomeNotes(outcomeNotes);
        FollowUp saved = followUpRepository.save(fu);

        // Progress journey if in FOLLOW_UP stage or completing care episode
        if (fu.getJourneyId() != null) {
            journeyEngine.transition(fu.getJourneyId(), TransitionAction.COMPLETE, CareStage.COMPLETED, "Follow-up completed: " + outcomeNotes, actorId);
        }

        return saved;
    }

    public List<FollowUp> getFollowUpsByChw(String chwId) {
        return followUpRepository.findByAssignedChwId(chwId);
    }

    public List<FollowUp> getFollowUpsByPatient(String patientId) {
        return followUpRepository.findByPatientId(patientId);
    }

    public Optional<FollowUp> getFollowUpById(String id) {
        return followUpRepository.findById(id);
    }
}
