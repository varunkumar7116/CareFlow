package com.careflow.government.service;

import com.careflow.government.dto.GovFacilityDTO;
import com.careflow.government.dto.ProviderMode;
import com.careflow.government.provider.GovernmentFacilityProvider;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GovernmentFacilityService {

    private final GovernmentFacilityProvider facilityProvider;

    public GovernmentFacilityService(GovernmentFacilityProvider facilityProvider) {
        this.facilityProvider = facilityProvider;
    }

    public ProviderMode getActiveProviderMode() {
        return facilityProvider.getProviderMode();
    }

    public List<GovFacilityDTO> searchFacilities(String district, String facilityType, String search) {
        return facilityProvider.getFacilities(district, facilityType, search);
    }

    public Optional<GovFacilityDTO> getFacilityById(String id) {
        return facilityProvider.getFacilityById(id);
    }
}
