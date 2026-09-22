package com.careflow.journey;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CareJourneyStageHistoryRepository extends JpaRepository<CareJourneyStageHistory, String> {
    List<CareJourneyStageHistory> findByJourneyIdOrderByCreatedAtAsc(String journeyId);
}
