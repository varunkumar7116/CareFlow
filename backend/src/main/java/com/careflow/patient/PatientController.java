package com.careflow.patient;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/patients")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @PostMapping
    public ResponseEntity<Patient> registerPatient(@RequestBody Patient patient,
                                                    @RequestParam(required = false) String chwId,
                                                    @RequestParam(required = false) String facilityId) {
        Patient saved = patientService.registerPatient(patient, chwId, facilityId);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<Patient>> getAllPatients() {
        return ResponseEntity.ok(patientService.getAllPatients());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable String id) {
        return patientService.getPatientById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/uhid/{uhid}")
    public ResponseEntity<Patient> getPatientByUhid(@PathVariable String uhid) {
        return patientService.getPatientByUhid(uhid)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
