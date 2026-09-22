package com.careflow.patient;

import com.careflow.journey.CareJourney;
import com.careflow.journey.CareJourneyEngine;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PatientService {

    private final PatientRepository patientRepository;
    private final CareJourneyEngine journeyEngine;

    public PatientService(PatientRepository patientRepository, CareJourneyEngine journeyEngine) {
        this.patientRepository = patientRepository;
        this.journeyEngine = journeyEngine;
    }

    @Transactional
    public Patient registerPatient(Patient patient, String chwId, String facilityId) {
        if (patient.getUhid() == null || patient.getUhid().isBlank()) {
            patient.setUhid("CF-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        Patient saved = patientRepository.save(patient);

        // Auto-start Care Journey for new patient
        journeyEngine.startJourney(saved.getId(), chwId, facilityId, chwId);
        return saved;
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Optional<Patient> getPatientById(String id) {
        return patientRepository.findById(id);
    }

    public Optional<Patient> getPatientByUhid(String uhid) {
        return patientRepository.findByUhid(uhid);
    }

    public List<Patient> getPatientsByChw(String chwId) {
        return patientRepository.findByChwId(chwId);
    }
}
