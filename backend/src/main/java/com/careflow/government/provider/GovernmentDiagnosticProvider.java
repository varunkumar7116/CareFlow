package com.careflow.government.provider;

import com.careflow.government.dto.ProviderMode;

import java.time.ZonedDateTime;
import java.util.Map;
import java.util.UUID;

/**
 * Extension Interface for Government Diagnostic & Laboratory Services.
 * Connects CareFlow Core to external government lab networks and diagnostic centers.
 */
public interface GovernmentDiagnosticProvider {

    ProviderMode getProviderMode();

    /**
     * Orders a diagnostic lab test or imaging procedure.
     * Returns a response tagged with DEMO_TRANSACTION in prototype mode.
     */
    Map<String, Object> orderDiagnosticTest(String patientId, String targetFacilityId, String testType, String priority);

    /**
     * Default Prototype Implementation for Government Diagnostic Service.
     */
    class PrototypeGovernmentDiagnosticAdapter implements GovernmentDiagnosticProvider {

        @Override
        public ProviderMode getProviderMode() {
            return ProviderMode.PROTOTYPE_DATASET;
        }

        @Override
        public Map<String, Object> orderDiagnosticTest(String patientId, String targetFacilityId, String testType, String priority) {
            return Map.of(
                    "transactionType", "DEMO_TRANSACTION",
                    "orderId", "DIAG-DEMO-" + UUID.randomUUID().toString().substring(0, 8),
                    "serviceProvider", "National Health Laboratory Information System (Mock/Demo Boundary)",
                    "patientId", patientId,
                    "targetFacilityId", targetFacilityId,
                    "testType", testType,
                    "priority", priority,
                    "status", "ORDER_REGISTERED",
                    "timestamp", ZonedDateTime.now().toString(),
                    "disclaimer", "DEMO_TRANSACTION: External government diagnostic order simulated."
            );
        }
    }
}
