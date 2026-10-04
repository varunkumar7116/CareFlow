// Local Database & Persistence Storage Service for CareFlow Mobile
// Supports SQLite DB abstraction with fallback local persistence for offline field workers

import { Patient, CareJourney, CareGap, CareTask, LocalSyncQueueItem, SyncState } from '../types/careflow';

const STORAGE_KEYS = {
  SYNC_QUEUE: 'careflow_mobile_sync_queue',
  OFFLINE_PATIENTS: 'careflow_mobile_offline_patients',
  OFFLINE_JOURNEY: 'careflow_mobile_offline_journey',
  OFFLINE_TASKS: 'careflow_mobile_offline_tasks',
  OFFLINE_GAPS: 'careflow_mobile_offline_gaps',
};

class SQLiteDatabaseService {
  private memoryCache: Map<string, any> = new Map();

  constructor() {
    this.initializeSeedData();
  }

  private initializeSeedData() {
    // Seed default offline patient (Meena Devi) and journey (CFJ-1001)
    const seedPatient: Patient = {
      id: 'PAT-P1001',
      uhid: 'CF-P1001',
      firstName: 'Meena',
      lastName: 'Devi',
      gender: 'FEMALE',
      age: 28,
      phoneNumber: '+919876543210',
      preferredLanguage: 'hi',
      village: 'Karamadai Village',
      chwId: 'USER-CHW-001',
      channel: 'ASHA / CHW Assisted Entry',
      provenance: 'SYNTHETIC_DEMO',
    };

    const seedJourney: CareJourney = {
      id: 'CFJ-1001',
      patientId: 'PAT-P1001',
      currentStage: 'REGISTRATION',
      status: 'ACTIVE',
      assignedChwId: 'USER-CHW-001',
      facilityId: 'NIN-TN-CBE-001',
      updatedAt: new Date().toISOString(),
      provenance: 'CAREFLOW_TRANSACTION',
    };

    this.savePatient(seedPatient);
    this.saveJourney(seedJourney);
  }

  // Sync Queue Storage
  public getSyncQueue(): LocalSyncQueueItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SYNC_QUEUE);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return this.memoryCache.get(STORAGE_KEYS.SYNC_QUEUE) || [];
    }
  }

  public saveSyncQueue(queue: LocalSyncQueueItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SYNC_QUEUE, JSON.stringify(queue));
    } catch (e) {
      this.memoryCache.set(STORAGE_KEYS.SYNC_QUEUE, queue);
    }
  }

  public enqueueAction(actionType: string, entityType: string, entityId: string, payload: any): LocalSyncQueueItem {
    const queue = this.getSyncQueue();
    const newItem: LocalSyncQueueItem = {
      id: `SYNC-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      actionType,
      entityType,
      entityId,
      payload,
      timestamp: new Date().toISOString(),
      status: 'PENDING_SYNC',
      retryCount: 0,
    };
    queue.push(newItem);
    this.saveSyncQueue(queue);
    return newItem;
  }

  public updateSyncItemStatus(id: string, status: SyncState): void {
    const queue = this.getSyncQueue();
    const item = queue.find((i) => i.id === id);
    if (item) {
      item.status = status;
      if (status === 'SYNC_FAILED') item.retryCount += 1;
      this.saveSyncQueue(queue);
    }
  }

  public clearSyncedItems(): void {
    const queue = this.getSyncQueue().filter((i) => i.status !== 'SYNCED');
    this.saveSyncQueue(queue);
  }

  // Offline Patients Storage
  public getPatients(): Patient[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.OFFLINE_PATIENTS);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return this.memoryCache.get(STORAGE_KEYS.OFFLINE_PATIENTS) || [];
  }

  public savePatient(patient: Patient): void {
    const patients = this.getPatients();
    const existingIdx = patients.findIndex((p) => p.id === patient.id);
    if (existingIdx >= 0) {
      patients[existingIdx] = patient;
    } else {
      patients.push(patient);
    }
    try {
      localStorage.setItem(STORAGE_KEYS.OFFLINE_PATIENTS, JSON.stringify(patients));
    } catch (e) {
      this.memoryCache.set(STORAGE_KEYS.OFFLINE_PATIENTS, patients);
    }
  }

  // Offline Journey Storage
  public getJourney(journeyId: string): CareJourney | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.OFFLINE_JOURNEY + '_' + journeyId);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return this.memoryCache.get(STORAGE_KEYS.OFFLINE_JOURNEY + '_' + journeyId) || null;
  }

  public saveJourney(journey: CareJourney): void {
    try {
      localStorage.setItem(STORAGE_KEYS.OFFLINE_JOURNEY + '_' + journey.id, JSON.stringify(journey));
    } catch (e) {
      this.memoryCache.set(STORAGE_KEYS.OFFLINE_JOURNEY + '_' + journey.id, journey);
    }
  }
}

export const sqliteDb = new SQLiteDatabaseService();
