package com.careflow.transport;

import com.careflow.common.BaseEntity;
import jakarta.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "transport_requests")
public class TransportRequest extends BaseEntity {

    @Column(nullable = false)
    private String patientId;

    private String journeyId;
    private String appointmentId;

    @Column(nullable = false)
    private String pickupLocation;

    @Column(nullable = false)
    private String dropoffLocation;

    private ZonedDateTime scheduledTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransportStatus status = TransportStatus.REQUESTED;

    private String vehicleNumber;
    private String driverContact;

    public TransportRequest() {}

    public TransportRequest(String patientId, String journeyId, String appointmentId, String pickupLocation, String dropoffLocation, ZonedDateTime scheduledTime) {
        this.patientId = patientId;
        this.journeyId = journeyId;
        this.appointmentId = appointmentId;
        this.pickupLocation = pickupLocation;
        this.dropoffLocation = dropoffLocation;
        this.scheduledTime = scheduledTime;
        this.status = TransportStatus.REQUESTED;
    }

    public String getPatientId() { return patientId; }
    public void setPatientId(String patientId) { this.patientId = patientId; }

    public String getJourneyId() { return journeyId; }
    public void setJourneyId(String journeyId) { this.journeyId = journeyId; }

    public String getAppointmentId() { return appointmentId; }
    public void setAppointmentId(String appointmentId) { this.appointmentId = appointmentId; }

    public String getPickupLocation() { return pickupLocation; }
    public void setPickupLocation(String pickupLocation) { this.pickupLocation = pickupLocation; }

    public String getDropoffLocation() { return dropoffLocation; }
    public void setDropoffLocation(String dropoffLocation) { this.dropoffLocation = dropoffLocation; }

    public ZonedDateTime getScheduledTime() { return scheduledTime; }
    public void setScheduledTime(ZonedDateTime scheduledTime) { this.scheduledTime = scheduledTime; }

    public TransportStatus getStatus() { return status; }
    public void setStatus(TransportStatus status) { this.status = status; }

    public String getVehicleNumber() { return vehicleNumber; }
    public void setVehicleNumber(String vehicleNumber) { this.vehicleNumber = vehicleNumber; }

    public String getDriverContact() { return driverContact; }
    public void setDriverContact(String driverContact) { this.driverContact = driverContact; }
}
