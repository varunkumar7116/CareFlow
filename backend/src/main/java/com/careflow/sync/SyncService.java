package com.careflow.sync;

import com.careflow.patient.Patient;
import com.careflow.patient.PatientRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class SyncService {

    private final SyncOperationRepository syncRepository;
    private final PatientRepository patientRepository;
    private final ObjectMapper objectMapper;

    public SyncService(SyncOperationRepository syncRepository, PatientRepository patientRepository) {
        this.syncRepository = syncRepository;
        this.patientRepository = patientRepository;
        this.objectMapper = new ObjectMapper();
        this.objectMapper.findAndRegisterModules();
    }

    @Transactional
    public List<SyncOperation> processSyncBatch(List<SyncOperation> incomingBatch) {
        List<SyncOperation> results = new ArrayList<>();

        for (SyncOperation op : incomingBatch) {
            try {
                final SyncOperation currentOp = op;
                // Idempotency check by entityId & operationType
                List<SyncOperation> existing = syncRepository.findByDeviceId(op.getDeviceId());
                boolean alreadyProcessed = existing.stream()
                        .anyMatch(e -> e.getEntityId().equals(currentOp.getEntityId()) &&
                                       e.getOperationType().equals(currentOp.getOperationType()) &&
                                       e.getStatus() == SyncStatus.SYNCED);

                if (alreadyProcessed) {
                    op.setStatus(SyncStatus.SYNCED);
                    results.add(op);
                    continue;
                }

                // Process payload based on entityType
                if ("PATIENT".equalsIgnoreCase(op.getEntityType())) {
                    Patient patientPayload = objectMapper.readValue(op.getPayload(), Patient.class);
                    if (patientRepository.findByUhid(patientPayload.getUhid()).isEmpty() &&
                        patientRepository.findById(patientPayload.getId()).isEmpty()) {
                        patientRepository.save(patientPayload);
                    }
                }

                op.setStatus(SyncStatus.SYNCED);
                op = syncRepository.save(op);
                results.add(op);
            } catch (Exception e) {
                op.setRetryCount(op.getRetryCount() + 1);
                if (op.getRetryCount() >= 3) {
                    op.setStatus(SyncStatus.FAILED);
                } else {
                    op.setStatus(SyncStatus.PENDING_SYNC);
                }
                op.setErrorMessage(e.getMessage());
                op = syncRepository.save(op);
                results.add(op);
            }
        }

        return results;
    }

    public List<SyncOperation> getOperationsForUser(String userId) {
        return syncRepository.findByUserId(userId);
    }
}
