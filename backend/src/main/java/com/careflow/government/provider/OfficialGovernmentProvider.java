package com.careflow.government.provider;

import com.careflow.government.dto.GovFacilityDTO;
import com.careflow.government.dto.ProviderMode;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 * Future Official Government API Provider Adapter.
 * Replaces DatasetGovernmentProvider when official live government APIs are authorized & connected.
 */
@Component("officialGovernmentProvider")
public class OfficialGovernmentProvider implements GovernmentFacilityProvider {

    @Override
    public ProviderMode getProviderMode() {
        return ProviderMode.OFFICIAL_API;
    }

    @Override
    public List<GovFacilityDTO> getFacilities(String district, String facilityType, String search) {
        // Future live HTTP client invocation to official government API Gateway (e.g. https://api.health.gov.in/v1/facilities)
        return Collections.emptyList();
    }

    @Override
    public Optional<GovFacilityDTO> getFacilityById(String id) {
        // Future live HTTP client invocation to official government API Gateway
        return Optional.empty();
    }
}
