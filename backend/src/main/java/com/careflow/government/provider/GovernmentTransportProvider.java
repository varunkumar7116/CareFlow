package com.careflow.government.provider;

import com.careflow.government.dto.ProviderMode;

import java.time.ZonedDateTime;
import java.util.Map;
import java.util.UUID;

/**
 * Extension Interface for Government Emergency Transport & Ambulance Services (e.g. 108 Emergency Fleet).
 * Connects CareFlow Core to external government emergency ambulance dispatch systems.
 */
public interface GovernmentTransportProvider {

    ProviderMode getProviderMode();

    /**
     * Dispatches an emergency or non-emergency patient transport request.
     * Returns a response tagged with DEMO_TRANSACTION in prototype mode.
     */
    Map<String, Object> requestTransport(String patientId, String pickupFacilityId, String dropoffFacilityId, String urgency);

    /**
     * Default Prototype Implementation for Government Transport Service.
     */
    class PrototypeGovernmentTransportAdapter implements GovernmentTransportProvider {

        @Override
        public ProviderMode getProviderMode() {
            return ProviderMode.PROTOTYPE_DATASET;
        }

        @Override
        public Map<String, Object> requestTransport(String patientId, String pickupFacilityId, String dropoffFacilityId, String urgency) {
            return Map.ofEntries(
                    Map.entry("transactionType", "DEMO_TRANSACTION"),
                    Map.entry("dispatchId", "AMB-108-DEMO-" + UUID.randomUUID().toString().substring(0, 8)),
                    Map.entry("serviceProvider", "National 108 Emergency Ambulance Dispatch Network (Mock/Demo Boundary)"),
                    Map.entry("patientId", patientId),
                    Map.entry("pickupFacilityId", pickupFacilityId),
                    Map.entry("dropoffFacilityId", dropoffFacilityId),
                    Map.entry("urgency", urgency),
                    Map.entry("status", "DISPATCH_CONFIRMED"),
                    Map.entry("estimatedEtaMinutes", "20"),
                    Map.entry("timestamp", ZonedDateTime.now().toString()),
                    Map.entry("disclaimer", "DEMO_TRANSACTION: External government 108 ambulance dispatch simulated.")
            );
        }
    }
}
