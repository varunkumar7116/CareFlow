package com.careflow.sync;

public enum SyncStatus {
    LOCAL_ONLY,
    PENDING_SYNC,
    SYNCING,
    SYNCED,
    FAILED,
    CONFLICT
}
