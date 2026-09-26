package com.careflow.facility;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FacilityServiceRepository extends JpaRepository<FacilityServiceEntity, String> {
    List<FacilityServiceEntity> findByFacilityId(String facilityId);
    List<FacilityServiceEntity> findByFacilityIdAndAvailabilityStatus(String facilityId, String availabilityStatus);
}
