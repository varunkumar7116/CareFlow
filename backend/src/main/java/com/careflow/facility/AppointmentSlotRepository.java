package com.careflow.facility;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface AppointmentSlotRepository extends JpaRepository<AppointmentSlot, String> {
    List<AppointmentSlot> findByFacilityId(String facilityId);
    List<AppointmentSlot> findByFacilityIdAndSlotDate(String facilityId, LocalDate slotDate);
    List<AppointmentSlot> findByFacilityIdAndStatus(String facilityId, String status);
}
