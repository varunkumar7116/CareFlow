package com.careflow.government.service;

import com.careflow.government.dto.GovIntegrationStatusDTO;
import com.careflow.government.dto.ProviderMode;
import com.careflow.government.source.GovIntegrationLogEntity;
import com.careflow.government.source.GovIntegrationLogRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class IntegrationAuditLogService {

    private final GovIntegrationLogRepository logRepository;

    public IntegrationAuditLogService(GovIntegrationLogRepository logRepository) {
        this.logRepository = logRepository;
    }

    @Transactional
    public void logInvocation(String service, ProviderMode mode, String operation, String status, long latencyMs, String details) {
        GovIntegrationLogEntity entity = new GovIntegrationLogEntity(
                service,
                mode,
                operation,
                UUID.randomUUID().toString(),
                status,
                latencyMs,
                details,
                ZonedDateTime.now()
        );
        logRepository.save(entity);
    }

    public GovIntegrationStatusDTO getIntegrationStatus(String service, ProviderMode activeMode) {
        List<GovIntegrationLogEntity> logs = logRepository.findByService(service);
        long total = logs.size();
        long success = logs.stream().filter(l -> "SUCCESS".equals(l.getStatus())).count();
        long errors = logs.stream().filter(l -> "ERROR".equals(l.getStatus())).count();
        double avgLatency = logs.isEmpty() ? 0.0 : logs.stream().mapToLong(GovIntegrationLogEntity::getLatencyMs).average().orElse(0.0);

        Map<String, Object> details = new HashMap<>();
        details.put("activeProvider", activeMode.name());
        details.put("compatibilityLayerStatus", "OPERATIONAL");
        details.put("notice", "Prototype Government Service Compatibility Layer active using verified public dataset.");

        return new GovIntegrationStatusDTO(
                service,
                activeMode,
                errors == 0,
                total,
                success,
                errors,
                avgLatency,
                ZonedDateTime.now(),
                details
        );
    }
}
