package com.careflow.government.provider;

import com.careflow.government.dto.GovFacilityDTO;
import com.careflow.government.dto.ProviderMode;
import com.careflow.government.dto.SourceMetadataDTO;
import com.careflow.government.service.IntegrationAuditLogService;
import com.careflow.government.source.GovFacilityEntity;
import com.careflow.government.source.GovFacilityRepository;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@Primary
public class DatasetGovernmentProvider implements GovernmentFacilityProvider {

    private final GovFacilityRepository facilityRepository;
    private final IntegrationAuditLogService auditLogService;

    public DatasetGovernmentProvider(GovFacilityRepository facilityRepository, IntegrationAuditLogService auditLogService) {
        this.facilityRepository = facilityRepository;
        this.auditLogService = auditLogService;
    }

    @Override
    public ProviderMode getProviderMode() {
        return ProviderMode.PROTOTYPE_DATASET;
    }

    @Override
    public List<GovFacilityDTO> getFacilities(String district, String facilityType, String search) {
        long startTime = System.currentTimeMillis();
        List<GovFacilityEntity> entities;

        if (search != null && !search.isBlank()) {
            entities = facilityRepository.findByNameContainingIgnoreCaseOrDistrictContainingIgnoreCase(search, search);
        } else if (district != null && !district.isBlank() && facilityType != null && !facilityType.isBlank()) {
            entities = facilityRepository.findByDistrictIgnoreCaseAndFacilityTypeIgnoreCase(district, facilityType);
        } else if (district != null && !district.isBlank()) {
            entities = facilityRepository.findByDistrictIgnoreCase(district);
        } else if (facilityType != null && !facilityType.isBlank()) {
            entities = facilityRepository.findByFacilityTypeIgnoreCase(facilityType);
        } else {
            entities = facilityRepository.findAll();
        }

        List<GovFacilityDTO> result = entities.stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());

        long duration = System.currentTimeMillis() - startTime;
        auditLogService.logInvocation("FACILITY_DIRECTORY", getProviderMode(), "SEARCH_FACILITIES", "SUCCESS", duration, "Returned " + result.size() + " facilities");

        return result;
    }

    @Override
    public Optional<GovFacilityDTO> getFacilityById(String id) {
        long startTime = System.currentTimeMillis();
        Optional<GovFacilityEntity> entity = facilityRepository.findById(id);

        if (entity.isEmpty()) {
            entity = facilityRepository.findByNinId(id);
        }

        Optional<GovFacilityDTO> dto = entity.map(this::mapToDTO);
        long duration = System.currentTimeMillis() - startTime;
        auditLogService.logInvocation("FACILITY_DIRECTORY", getProviderMode(), "GET_FACILITY_BY_ID", dto.isPresent() ? "SUCCESS" : "NOT_FOUND", duration, "Lookup ID: " + id);

        return dto;
    }

    private GovFacilityDTO mapToDTO(GovFacilityEntity e) {
        SourceMetadataDTO metadata = new SourceMetadataDTO(
                e.getSourceName(),
                e.getSourceOrganization(),
                e.getDatasetTitle(),
                e.getSourceReference(),
                e.getPublicationDate(),
                e.getImportTimestamp(),
                e.getProviderMode(),
                e.getDataFreshness()
        );

        return new GovFacilityDTO(
                e.getId(),
                e.getNinId(),
                e.getName(),
                e.getFacilityType(),
                e.getDistrict(),
                e.getState(),
                e.getLatitude(),
                e.getLongitude(),
                e.getCapabilities(),
                e.getOwnership(),
                e.getContactPhone(),
                metadata
        );
    }
}
