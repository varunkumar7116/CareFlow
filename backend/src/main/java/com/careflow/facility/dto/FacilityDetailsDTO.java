package com.careflow.facility.dto;

import com.careflow.facility.*;
import com.careflow.government.dto.GovFacilityDTO;
import com.careflow.government.dto.SourceMetadataDTO;

import java.util.List;

public class FacilityDetailsDTO {

    private GovFacilityDTO governmentReference;
    private FacilityOperationalStatus operationalStatus;
    private List<FacilityServiceEntity> services;
    private List<HealthcareProfessional> professionals;
    private List<FacilityEquipment> equipment;
    private List<FacilityDiagnosticService> diagnostics;
    private List<AppointmentSlot> appointmentSlots;
    private SourceMetadataDTO facilityManagedSourceMetadata;

    public FacilityDetailsDTO() {}

    public FacilityDetailsDTO(GovFacilityDTO governmentReference, FacilityOperationalStatus operationalStatus, List<FacilityServiceEntity> services, List<HealthcareProfessional> professionals, List<FacilityEquipment> equipment, List<FacilityDiagnosticService> diagnostics, List<AppointmentSlot> appointmentSlots, SourceMetadataDTO facilityManagedSourceMetadata) {
        this.governmentReference = governmentReference;
        this.operationalStatus = operationalStatus;
        this.services = services;
        this.professionals = professionals;
        this.equipment = equipment;
        this.diagnostics = diagnostics;
        this.appointmentSlots = appointmentSlots;
        this.facilityManagedSourceMetadata = facilityManagedSourceMetadata;
    }

    public GovFacilityDTO getGovernmentReference() { return governmentReference; }
    public void setGovernmentReference(GovFacilityDTO governmentReference) { this.governmentReference = governmentReference; }

    public FacilityOperationalStatus getOperationalStatus() { return operationalStatus; }
    public void setOperationalStatus(FacilityOperationalStatus operationalStatus) { this.operationalStatus = operationalStatus; }

    public List<FacilityServiceEntity> getServices() { return services; }
    public void setServices(List<FacilityServiceEntity> services) { this.services = services; }

    public List<HealthcareProfessional> getProfessionals() { return professionals; }
    public void setProfessionals(List<HealthcareProfessional> professionals) { this.professionals = professionals; }

    public List<FacilityEquipment> getEquipment() { return equipment; }
    public void setEquipment(List<FacilityEquipment> equipment) { this.equipment = equipment; }

    public List<FacilityDiagnosticService> getDiagnostics() { return diagnostics; }
    public void setDiagnostics(List<FacilityDiagnosticService> diagnostics) { this.diagnostics = diagnostics; }

    public List<AppointmentSlot> getAppointmentSlots() { return appointmentSlots; }
    public void setAppointmentSlots(List<AppointmentSlot> appointmentSlots) { this.appointmentSlots = appointmentSlots; }

    public SourceMetadataDTO getFacilityManagedSourceMetadata() { return facilityManagedSourceMetadata; }
    public void setFacilityManagedSourceMetadata(SourceMetadataDTO facilityManagedSourceMetadata) { this.facilityManagedSourceMetadata = facilityManagedSourceMetadata; }
}
