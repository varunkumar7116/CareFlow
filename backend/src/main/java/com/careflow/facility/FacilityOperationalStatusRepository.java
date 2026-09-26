package com.careflow.facility;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface FacilityOperationalStatusRepository extends JpaRepository<FacilityOperationalStatus, String> {
    Optional<FacilityOperationalStatus> findByFacilityId(String facilityId);
}
