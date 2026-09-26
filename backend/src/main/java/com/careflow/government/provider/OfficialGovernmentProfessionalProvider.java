package com.careflow.government.provider;

import com.careflow.facility.HealthcareProfessional;
import com.careflow.government.dto.ProviderMode;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 * Future Official Government Professional Registry (HPR / ABDM) Provider Placeholder.
 */
@Component("officialGovernmentProfessionalProvider")
public class OfficialGovernmentProfessionalProvider implements HealthcareProfessionalProvider {

    @Override
    public ProviderMode getProviderMode() {
        return ProviderMode.OFFICIAL_API;
    }

    @Override
    public List<HealthcareProfessional> getProfessionalsByFacility(String facilityId) {
        // Future live connection to National Healthcare Professional Registry (HPR) API
        return Collections.emptyList();
    }

    @Override
    public Optional<HealthcareProfessional> getProfessionalById(String professionalId) {
        // Future live lookup from HPR API
        return Optional.empty();
    }
}
