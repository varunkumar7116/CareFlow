package com.careflow.facility;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FacilityEquipmentRepository extends JpaRepository<FacilityEquipment, String> {
    List<FacilityEquipment> findByFacilityId(String facilityId);
    List<FacilityEquipment> findByFacilityIdAndStatus(String facilityId, String status);
}
