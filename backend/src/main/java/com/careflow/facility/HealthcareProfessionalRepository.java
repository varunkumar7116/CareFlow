package com.careflow.facility;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HealthcareProfessionalRepository extends JpaRepository<HealthcareProfessional, String> {
    List<HealthcareProfessional> findByFacilityId(String facilityId);
    List<HealthcareProfessional> findByFacilityIdAndActive(String facilityId, Boolean active);
    List<HealthcareProfessional> findByFacilityIdAndAvailabilityStatus(String facilityId, String availabilityStatus);
}
