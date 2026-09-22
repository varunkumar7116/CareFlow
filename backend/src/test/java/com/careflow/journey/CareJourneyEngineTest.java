package com.careflow.journey;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class CareJourneyEngineTest {

    private CareJourneyRepository journeyRepository;
    private CareJourneyStageHistoryRepository historyRepository;
    private CareJourneyEngine journeyEngine;

    @BeforeEach
    void setUp() {
        journeyRepository = Mockito.mock(CareJourneyRepository.class);
        historyRepository = Mockito.mock(CareJourneyStageHistoryRepository.class);
        journeyEngine = new CareJourneyEngine(journeyRepository, historyRepository);
    }

    @Test
    void testStartJourney() {
        CareJourney journey = new CareJourney("p-123", "chw-1", "fac-1");
        journey.setId("j-100");

        when(journeyRepository.save(any(CareJourney.class))).thenReturn(journey);

        CareJourney result = journeyEngine.startJourney("p-123", "chw-1", "fac-1", "actor-1");

        assertNotNull(result);
        assertEquals(CareStage.REGISTRATION, result.getCurrentStage());
        assertEquals(JourneyStatus.ACTIVE, result.getStatus());
        verify(historyRepository, times(1)).save(any(CareJourneyStageHistory.class));
    }

    @Test
    void testProgressJourney() {
        CareJourney journey = new CareJourney("p-123", "chw-1", "fac-1");
        journey.setId("j-100");
        journey.setCurrentStage(CareStage.REGISTRATION);

        when(journeyRepository.findById("j-100")).thenReturn(Optional.of(journey));
        when(journeyRepository.save(any(CareJourney.class))).thenAnswer(i -> i.getArgument(0));

        CareJourney updated = journeyEngine.transition("j-100", TransitionAction.PROGRESS, null, "Moved to screening", "actor-1");

        assertEquals(CareStage.SCREENING, updated.getCurrentStage());
        assertEquals(JourneyStatus.ACTIVE, updated.getStatus());
    }
}
