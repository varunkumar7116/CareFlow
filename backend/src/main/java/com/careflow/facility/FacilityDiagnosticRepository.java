package com.careflow.facility;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FacilityDiagnosticRepository extends JpaRepository<FacilityDiagnosticService, String> {
    List<FacilityDiagnosticService> findByFacilityId(String facilityId);
    List<FacilityDiagnosticService> findByFacilityIdAndAvailability(String facilityId, String availability);
}
