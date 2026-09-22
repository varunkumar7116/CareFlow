package com.careflow.journey;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface CareJourneyRepository extends JpaRepository<CareJourney, String> {
    List<CareJourney> findByPatientId(String patientId);
    Optional<CareJourney> findTopByPatientIdAndStatusOrderByCreatedAtDesc(String patientId, JourneyStatus status);
    List<CareJourney> findByAssignedChwId(String assignedChwId);
    List<CareJourney> findByFacilityId(String facilityId);
    List<CareJourney> findByStatus(JourneyStatus status);
}
