package com.careflow.appointment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, String> {
    List<Appointment> findByPatientId(String patientId);
    List<Appointment> findByFacilityId(String facilityId);
    Optional<Appointment> findByReferralId(String referralId);
    List<Appointment> findByStatus(AppointmentStatus status);
}
