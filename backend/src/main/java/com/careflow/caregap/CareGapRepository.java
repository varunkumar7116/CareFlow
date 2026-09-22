package com.careflow.caregap;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CareGapRepository extends JpaRepository<CareGap, String> {
    List<CareGap> findByPatientId(String patientId);
    List<CareGap> findByJourneyId(String journeyId);
    List<CareGap> findByStatus(CareGapStatus status);
}
