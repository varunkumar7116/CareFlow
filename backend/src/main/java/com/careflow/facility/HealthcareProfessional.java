package com.careflow.facility;

import com.careflow.common.BaseEntity;
import com.careflow.common.SourceType;
import jakarta.persistence.*;

import java.time.ZonedDateTime;

@Entity
@Table(name = "healthcare_professionals")
public class HealthcareProfessional extends BaseEntity {

    @Column(nullable = false)
    private String facilityId;

    @Column(nullable = false)
    private String name;

    private String designation; // Medical Officer, Senior Consultant, Obstetrician, CHW Supervisor
    private String specialization; // General Medicine, Obstetrics & Gynecology, Pediatrics, Cardiology
    private String qualification; // MBBS, MD, DGO
    private String department;
    private String registrationNumber; // Reference ID if legitimately available
    private String consultationSchedule; // Mon-Fri 09:00 - 14:00

    @Column(nullable = false)
    private String availabilityStatus; // AVAILABLE, ON_LEAVE, BUSY, UNAVAILABLE

    private Boolean teleconsultationAvailable = false;
    private Boolean active = true;

    private ZonedDateTime lastVerifiedAt;
    private String lastVerifiedBy;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SourceType sourceType = SourceType.FACILITY_MANAGED;

    public HealthcareProfessional() {}

    public HealthcareProfessional(String facilityId, String name, String designation, String specialization, String qualification, String department, String registrationNumber, String consultationSchedule, String availabilityStatus, Boolean teleconsultationAvailable, String lastVerifiedBy) {
        this.facilityId = facilityId;
        this.name = name;
        this.designation = designation;
        this.specialization = specialization;
        this.qualification = qualification;
        this.department = department;
        this.registrationNumber = registrationNumber;
        this.consultationSchedule = consultationSchedule;
        this.availabilityStatus = availabilityStatus;
        this.teleconsultationAvailable = teleconsultationAvailable != null ? teleconsultationAvailable : false;
        this.active = true;
        this.lastVerifiedBy = lastVerifiedBy;
        this.lastVerifiedAt = ZonedDateTime.now();
        this.sourceType = SourceType.FACILITY_MANAGED;
    }

    public String getFacilityId() { return facilityId; }
    public void setFacilityId(String facilityId) { this.facilityId = facilityId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }

    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }

    public String getQualification() { return qualification; }
    public void setQualification(String qualification) { this.qualification = qualification; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getRegistrationNumber() { return registrationNumber; }
    public void setRegistrationNumber(String registrationNumber) { this.registrationNumber = registrationNumber; }

    public String getConsultationSchedule() { return consultationSchedule; }
    public void setConsultationSchedule(String consultationSchedule) { this.consultationSchedule = consultationSchedule; }

    public String getAvailabilityStatus() { return availabilityStatus; }
    public void setAvailabilityStatus(String availabilityStatus) { this.availabilityStatus = availabilityStatus; }

    public Boolean getTeleconsultationAvailable() { return teleconsultationAvailable; }
    public void setTeleconsultationAvailable(Boolean teleconsultationAvailable) { this.teleconsultationAvailable = teleconsultationAvailable; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }

    public ZonedDateTime getLastVerifiedAt() { return lastVerifiedAt; }
    public void setLastVerifiedAt(ZonedDateTime lastVerifiedAt) { this.lastVerifiedAt = lastVerifiedAt; }

    public String getLastVerifiedBy() { return lastVerifiedBy; }
    public void setLastVerifiedBy(String lastVerifiedBy) { this.lastVerifiedBy = lastVerifiedBy; }

    public SourceType getSourceType() { return sourceType; }
    public void setSourceType(SourceType sourceType) { this.sourceType = sourceType; }
}
