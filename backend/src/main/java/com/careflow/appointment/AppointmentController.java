package com.careflow.appointment;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping
    public ResponseEntity<Appointment> scheduleAppointment(@RequestBody Appointment appointment, @RequestParam(required = false) String actorId) {
        return ResponseEntity.ok(appointmentService.scheduleAppointment(appointment, actorId));
    }

    @PostMapping("/{id}/attend")
    public ResponseEntity<Appointment> markAttended(@PathVariable String id, @RequestParam(required = false) String actorId) {
        return ResponseEntity.ok(appointmentService.markAttended(id, actorId));
    }

    @GetMapping("/facility/{facilityId}")
    public ResponseEntity<List<Appointment>> getAppointmentsForFacility(@PathVariable String facilityId) {
        return ResponseEntity.ok(appointmentService.getAppointmentsForFacility(facilityId));
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Appointment>> getAppointmentsForPatient(@PathVariable String patientId) {
        return ResponseEntity.ok(appointmentService.getAppointmentsForPatient(patientId));
    }
}
