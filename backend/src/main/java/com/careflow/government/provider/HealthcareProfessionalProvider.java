package com.careflow.government.provider;

import com.careflow.facility.HealthcareProfessional;
import com.careflow.government.dto.ProviderMode;

import java.util.List;
import java.util.Optional;

public interface HealthcareProfessionalProvider {

    ProviderMode getProviderMode();

    List<HealthcareProfessional> getProfessionalsByFacility(String facilityId);

    Optional<HealthcareProfessional> getProfessionalById(String professionalId);
}
