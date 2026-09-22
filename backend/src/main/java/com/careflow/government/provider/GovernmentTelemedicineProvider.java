package com.careflow.government.provider;

import com.careflow.government.dto.ProviderMode;

import java.time.ZonedDateTime;
import java.util.Map;
import java.util.UUID;

/**
 * Extension Interface for Government Telemedicine Services (e.g. eSanjeevani Gateway).
 * Connects CareFlow Core to external government tele-consultation portals.
 */
public interface GovernmentTelemedicineProvider {

    ProviderMode getProviderMode();

    /**
     * Dispatches a tele-consultation request for a patient.
     * Returns a response tagged with DEMO_TRANSACTION in prototype mode.
     */
    Map<String, Object> requestTeleConsultation(String patientId, String specialty, String urgencyNotes);

    /**
     * Default Prototype Implementation for Government Telemedicine Service.
     */
    class PrototypeGovernmentTelemedicineAdapter implements GovernmentTelemedicineProvider {

        @Override
        public ProviderMode getProviderMode() {
            return ProviderMode.PROTOTYPE_DATASET;
        }

        @Override
        public Map<String, Object> requestTeleConsultation(String patientId, String specialty, String urgencyNotes) {
            return Map.of(
                    "transactionType", "DEMO_TRANSACTION",
                    "transactionId", "TELECONS-DEMO-" + UUID.randomUUID().toString().substring(0, 8),
                    "serviceProvider", "eSanjeevani National Tele-Consultation Portal (Mock/Demo Boundary)",
                    "patientId", patientId,
                    "specialty", specialty,
                    "status", "QUEUED_FOR_SPECIALIST",
                    "estimatedWaitMinutes", 15,
                    "timestamp", ZonedDateTime.now().toString(),
                    "disclaimer", "DEMO_TRANSACTION: External government telemedicine gateway simulated."
            );
        }
    }
}
