package com.careflow.patient;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<Patient, String> {
    Optional<Patient> findByUhid(String uhid);
    List<Patient> findByChwId(String chwId);
    List<Patient> findByHouseholdId(String householdId);
}
