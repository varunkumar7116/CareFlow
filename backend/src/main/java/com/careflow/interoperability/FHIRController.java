package com.careflow.interoperability;

import com.careflow.appointment.Appointment;
import com.careflow.appointment.AppointmentRepository;
import com.careflow.patient.Patient;
import com.careflow.patient.PatientRepository;
import com.careflow.referral.Referral;
import com.careflow.referral.ReferralRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/interoperability/fhir")
@PreAuthorize("hasAnyRole('FACILITY_STAFF', 'DISTRICT_OFFICER', 'ADMIN', 'SYSTEM_ADMIN')")
public class FHIRController {

    private final PatientRepository patientRepository;
    private final ReferralRepository referralRepository;
    private final AppointmentRepository appointmentRepository;
    private final FHIRMapper fhirMapper;

    public FHIRController(PatientRepository patientRepository, ReferralRepository referralRepository, AppointmentRepository appointmentRepository, FHIRMapper fhirMapper) {
        this.patientRepository = patientRepository;
        this.referralRepository = referralRepository;
        this.appointmentRepository = appointmentRepository;
        this.fhirMapper = fhirMapper;
    }

    @GetMapping("/Patient/{id}")
    public ResponseEntity<Map<String, Object>> getFHIRPatient(@PathVariable String id) {
        return patientRepository.findById(id)
                .map(fhirMapper::toFHIRPatient)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/ServiceRequest/{id}")
    public ResponseEntity<Map<String, Object>> getFHIRServiceRequest(@PathVariable String id) {
        Referral ref = referralRepository.findById(id).orElse(null);
        if (ref == null) return ResponseEntity.notFound().build();

        Patient pat = patientRepository.findById(ref.getPatientId()).orElse(null);
        return ResponseEntity.ok(fhirMapper.toFHIRServiceRequest(ref, pat));
    }

    @GetMapping("/Appointment/{id}")
    public ResponseEntity<Map<String, Object>> getFHIRAppointment(@PathVariable String id) {
        Appointment app = appointmentRepository.findById(id).orElse(null);
        if (app == null) return ResponseEntity.notFound().build();

        Patient pat = patientRepository.findById(app.getPatientId()).orElse(null);
        return ResponseEntity.ok(fhirMapper.toFHIRAppointment(app, pat));
    }
}
