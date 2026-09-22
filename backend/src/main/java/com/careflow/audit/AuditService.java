package com.careflow.audit;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AuditService {

    private final AuditEventRepository auditRepository;

    public AuditService(AuditEventRepository auditRepository) {
        this.auditRepository = auditRepository;
    }

    public void logEvent(String eventType, String actorId, String actorRole, String targetEntityId, String targetEntityType, String details) {
        AuditEvent event = new AuditEvent(eventType, actorId, actorRole, targetEntityId, targetEntityType, details);
        auditRepository.save(event);
    }

    public List<AuditEvent> getAuditEventsForActor(String actorId) {
        return auditRepository.findByActorId(actorId);
    }

    public List<AuditEvent> getRecentAuditEvents() {
        return auditRepository.findAll();
    }
}
