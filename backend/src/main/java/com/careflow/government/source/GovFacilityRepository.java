package com.careflow.government.source;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface GovFacilityRepository extends JpaRepository<GovFacilityEntity, String> {
    Optional<GovFacilityEntity> findByNinId(String ninId);
    List<GovFacilityEntity> findByDistrictIgnoreCase(String district);
    List<GovFacilityEntity> findByFacilityTypeIgnoreCase(String facilityType);
    List<GovFacilityEntity> findByDistrictIgnoreCaseAndFacilityTypeIgnoreCase(String district, String facilityType);
    List<GovFacilityEntity> findByNameContainingIgnoreCaseOrDistrictContainingIgnoreCase(String name, String district);
}
