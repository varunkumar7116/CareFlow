package com.careflow.facility;

import com.careflow.common.BaseEntity;
import com.careflow.common.SourceType;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.ZonedDateTime;

@Entity
@Table(name = "appointment_slots")
public class AppointmentSlot extends BaseEntity {

    @Column(nullable = false)
    private String facilityId;

    private String doctorId;
    private String doctorName;
    private String serviceName; // Obstetrics Consultation, General Medicine

    @Column(nullable = false)
    private LocalDate slotDate;

    @Column(nullable = false)
    private String startTime; // 10:00 AM

    @Column(nullable = false)
    private String endTime; // 10:30 AM

    private Integer maxCapacity = 1;
    private Integer bookedCount = 0;

    @Column(nullable = false)
    private String status; // AVAILABLE, FULL, CANCELLED

    private ZonedDateTime lastVerifiedAt;
    private String lastVerifiedBy;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SourceType sourceType = SourceType.CAREFLOW_TRANSACTION;

    public AppointmentSlot() {}

    public AppointmentSlot(String facilityId, String doctorId, String doctorName, String serviceName, LocalDate slotDate, String startTime, String endTime, Integer maxCapacity, String lastVerifiedBy) {
        this.facilityId = facilityId;
        this.doctorId = doctorId;
        this.doctorName = doctorName;
        this.serviceName = serviceName;
        this.slotDate = slotDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.maxCapacity = maxCapacity != null ? maxCapacity : 1;
        this.bookedCount = 0;
        this.status = "AVAILABLE";
        this.lastVerifiedBy = lastVerifiedBy;
        this.lastVerifiedAt = ZonedDateTime.now();
        this.sourceType = SourceType.CAREFLOW_TRANSACTION;
    }

    public String getFacilityId() { return facilityId; }
    public void setFacilityId(String facilityId) { this.facilityId = facilityId; }

    public String getDoctorId() { return doctorId; }
    public void setDoctorId(String doctorId) { this.doctorId = doctorId; }

    public String getDoctorName() { return doctorName; }
    public void setDoctorName(String doctorName) { this.doctorName = doctorName; }

    public String getServiceName() { return serviceName; }
    public void setServiceName(String serviceName) { this.serviceName = serviceName; }

    public LocalDate getSlotDate() { return slotDate; }
    public void setSlotDate(LocalDate slotDate) { this.slotDate = slotDate; }

    public String getStartTime() { return startTime; }
    public void setStartTime(String startTime) { this.startTime = startTime; }

    public String getEndTime() { return endTime; }
    public void setEndTime(String endTime) { this.endTime = endTime; }

    public Integer getMaxCapacity() { return maxCapacity; }
    public void setMaxCapacity(Integer maxCapacity) { this.maxCapacity = maxCapacity; }

    public Integer getBookedCount() { return bookedCount; }
    public void setBookedCount(Integer bookedCount) { this.bookedCount = bookedCount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public ZonedDateTime getLastVerifiedAt() { return lastVerifiedAt; }
    public void setLastVerifiedAt(ZonedDateTime lastVerifiedAt) { this.lastVerifiedAt = lastVerifiedAt; }

    public String getLastVerifiedBy() { return lastVerifiedBy; }
    public void setLastVerifiedBy(String lastVerifiedBy) { this.lastVerifiedBy = lastVerifiedBy; }

    public SourceType getSourceType() { return sourceType; }
    public void setSourceType(SourceType sourceType) { this.sourceType = sourceType; }
}
