package com.careflow.facility;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FacilityRepository extends JpaRepository<Facility, String> {
    List<Facility> findByDistrict(String district);
    List<Facility> findByFacilityType(String facilityType);
}
