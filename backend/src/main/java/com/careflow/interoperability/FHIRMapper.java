package com.careflow.interoperability;

import com.careflow.appointment.Appointment;
import com.careflow.patient.Patient;
import com.careflow.referral.Referral;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class FHIRMapper {

    public Map<String, Object> toFHIRPatient(Patient patient) {
        Map<String, Object> fhir = new HashMap<>();
        fhir.put("resourceType", "Patient");
        fhir.put("id", patient.getId());
        fhir.put("identifier", List.of(Map.of("system", "https://careflow.org/uhid", "value", patient.getUhid())));
        fhir.put("name", List.of(Map.of("use", "official", "family", patient.getLastName(), "given", List.of(patient.getFirstName()))));
        fhir.put("gender", patient.getGender() != null ? patient.getGender().toLowerCase() : "unknown");
        fhir.put("birthDate", patient.getDateOfBirth() != null ? patient.getDateOfBirth().toString() : null);
        fhir.put("telecom", List.of(Map.of("system", "phone", "value", patient.getPhoneNumber())));
        return fhir;
    }

    public Map<String, Object> toFHIRServiceRequest(Referral referral, Patient patient) {
        Map<String, Object> fhir = new HashMap<>();
        fhir.put("resourceType", "ServiceRequest");
        fhir.put("id", referral.getId());
        fhir.put("status", referral.getStatus().name().toLowerCase());
        fhir.put("intent", "order");
        fhir.put("priority", referral.getPriority().toLowerCase());
        fhir.put("subject", Map.of("reference", "Patient/" + referral.getPatientId(), "display", patient != null ? patient.getFirstName() + " " + patient.getLastName() : "Patient"));
        fhir.put("performer", List.of(Map.of("reference", "Organization/" + referral.getTargetFacilityId())));
        fhir.put("reasonCode", List.of(Map.of("text", referral.getReason())));
        return fhir;
    }

    public Map<String, Object> toFHIRAppointment(Appointment appointment, Patient patient) {
        Map<String, Object> fhir = new HashMap<>();
        fhir.put("resourceType", "Appointment");
        fhir.put("id", appointment.getId());
        fhir.put("status", appointment.getStatus().name().toLowerCase());
        fhir.put("start", appointment.getScheduledDate() != null ? appointment.getScheduledDate().toString() : null);
        fhir.put("participant", List.of(
                Map.of("actor", Map.of("reference", "Patient/" + appointment.getPatientId(), "display", patient != null ? patient.getFirstName() : "Patient"), "status", "accepted"),
                Map.of("actor", Map.of("reference", "Location/" + appointment.getFacilityId()), "status", "accepted")
        ));
        return fhir;
    }
}
