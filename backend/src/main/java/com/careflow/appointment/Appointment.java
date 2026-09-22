package com.careflow.appointment;

import com.careflow.common.BaseEntity;
import jakarta.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "appointments")
public class Appointment extends BaseEntity {

    @Column(nullable = false)
    private String patientId;

    private String referralId;
    private String journeyId;

    @Column(nullable = false)
    private String facilityId;

    private String department;
    private ZonedDateTime requestedDate;
    private ZonedDateTime scheduledDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AppointmentStatus status = AppointmentStatus.REQUESTED;

    private String doctorId;
    private String notes;

    public Appointment() {}

    public Appointment(String patientId, String referralId, String journeyId, String facilityId, String department, ZonedDateTime requestedDate, ZonedDateTime scheduledDate) {
        this.patientId = patientId;
        this.referralId = referralId;
        this.journeyId = journeyId;
        this.facilityId = facilityId;
        this.department = department;
        this.requestedDate = requestedDate;
        this.scheduledDate = scheduledDate;
        this.status = AppointmentStatus.REQUESTED;
    }

    public String getPatientId() { return patientId; }
    public void setPatientId(String patientId) { this.patientId = patientId; }

    public String getReferralId() { return referralId; }
    public void setReferralId(String referralId) { this.referralId = referralId; }

    public String getJourneyId() { return journeyId; }
    public void setJourneyId(String journeyId) { this.journeyId = journeyId; }

    public String getFacilityId() { return facilityId; }
    public void setFacilityId(String facilityId) { this.facilityId = facilityId; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public ZonedDateTime getRequestedDate() { return requestedDate; }
    public void setRequestedDate(ZonedDateTime requestedDate) { this.requestedDate = requestedDate; }

    public ZonedDateTime getScheduledDate() { return scheduledDate; }
    public void setScheduledDate(ZonedDateTime scheduledDate) { this.scheduledDate = scheduledDate; }

    public AppointmentStatus getStatus() { return status; }
    public void setStatus(AppointmentStatus status) { this.status = status; }

    public String getDoctorId() { return doctorId; }
    public void setDoctorId(String doctorId) { this.doctorId = doctorId; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
