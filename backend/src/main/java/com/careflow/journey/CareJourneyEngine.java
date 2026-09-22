package com.careflow.journey;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class CareJourneyEngine {

    private final CareJourneyRepository journeyRepository;
    private final CareJourneyStageHistoryRepository historyRepository;

    public CareJourneyEngine(CareJourneyRepository journeyRepository, CareJourneyStageHistoryRepository historyRepository) {
        this.journeyRepository = journeyRepository;
        this.historyRepository = historyRepository;
    }

    private static final List<CareStage> DEFAULT_STAGE_ORDER = Arrays.asList(
        CareStage.REGISTRATION,
        CareStage.SCREENING,
        CareStage.TRIAGE,
        CareStage.CONSULTATION,
        CareStage.DIAGNOSTICS,
        CareStage.REFERRAL,
        CareStage.APPOINTMENT,
        CareStage.TRANSPORT,
        CareStage.HOSPITAL,
        CareStage.TREATMENT,
        CareStage.MEDICINE,
        CareStage.FOLLOW_UP,
        CareStage.COMPLETED
    );

    @Transactional
    public CareJourney startJourney(String patientId, String chwId, String facilityId, String actorId) {
        CareJourney journey = new CareJourney(patientId, chwId, facilityId);
        journey = journeyRepository.save(journey);

        recordHistory(journey.getId(), CareStage.REGISTRATION, JourneyStatus.ACTIVE, TransitionAction.START, "Care journey started", actorId);
        return journey;
    }

    @Transactional
    public CareJourney transition(String journeyId, TransitionAction action, CareStage targetStage, String notes, String actorId) {
        CareJourney journey = journeyRepository.findById(journeyId)
                .orElseThrow(() -> new IllegalArgumentException("CareJourney not found: " + journeyId));

        CareStage currentStage = journey.getCurrentStage();
        CareStage nextStage = currentStage;
        JourneyStatus nextStatus = journey.getStatus();

        switch (action) {
            case START:
                nextStatus = JourneyStatus.ACTIVE;
                break;

            case PROGRESS:
                int currentIndex = DEFAULT_STAGE_ORDER.indexOf(currentStage);
                if (currentIndex >= 0 && currentIndex < DEFAULT_STAGE_ORDER.size() - 1) {
                    nextStage = DEFAULT_STAGE_ORDER.get(currentIndex + 1);
                }
                if (nextStage == CareStage.COMPLETED) {
                    nextStatus = JourneyStatus.COMPLETED;
                }
                break;

            case PAUSE:
                nextStatus = JourneyStatus.PAUSED;
                break;

            case RESUME:
                nextStatus = JourneyStatus.ACTIVE;
                break;

            case REPEAT:
            case SKIP:
            case REFER:
                if (targetStage != null) {
                    nextStage = targetStage;
                }
                nextStatus = JourneyStatus.ACTIVE;
                break;

            case ESCALATE:
                nextStatus = JourneyStatus.ESCALATED;
                break;

            case COMPLETE:
                nextStage = CareStage.COMPLETED;
                nextStatus = JourneyStatus.COMPLETED;
                break;
        }

        journey.setCurrentStage(nextStage);
        journey.setStatus(nextStatus);
        journey.setUpdatedAt(ZonedDateTime.now());
        journey = journeyRepository.save(journey);

        recordHistory(journey.getId(), nextStage, nextStatus, action, notes, actorId);
        return journey;
    }

    private void recordHistory(String journeyId, CareStage stage, JourneyStatus status, TransitionAction action, String notes, String actorId) {
        CareJourneyStageHistory history = new CareJourneyStageHistory(journeyId, stage, status, action, notes, actorId);
        historyRepository.save(history);
    }
}
