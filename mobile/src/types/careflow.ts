// CareFlow Mobile Application - TypeScript Types

export type CareStage =
  | 'REGISTRATION'
  | 'SCREENING'
  | 'TRIAGE'
  | 'CONSULTATION'
  | 'DIAGNOSTICS'
  | 'REFERRAL'
  | 'APPOINTMENT'
  | 'TRANSPORT'
  | 'HOSPITAL'
  | 'TREATMENT'
  | 'MEDICINE'
  | 'FOLLOW_UP'
  | 'COMPLETED';

export type JourneyStatus = 'ACTIVE' | 'PAUSED' | 'ESCALATED' | 'COMPLETED';

export type ProvenanceCategory =
  | 'GOVERNMENT_REFERENCE'
  | 'FACILITY_MANAGED'
  | 'CAREFLOW_TRANSACTION'
  | 'OFFICIAL_API'
  | 'SYNTHETIC_DEMO';

export interface Patient {
  id: string;
  uhid: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth?: string;
  age?: number;
  phoneNumber?: string;
  preferredLanguage?: string;
  village?: string;
  chwId?: string;
  channel?: string;
  provenance: ProvenanceCategory;
}

export interface CareJourney {
  id: string;
  patientId: string;
  currentStage: CareStage;
  status: JourneyStatus;
  assignedChwId?: string;
  facilityId?: string;
  updatedAt?: string;
  provenance: ProvenanceCategory;
}

export interface CareGap {
  id: string;
  journeyId: string;
  patientId: string;
  gapType: 'UNCONFIRMED_REFERRAL' | 'MISSED_APPOINTMENT' | 'OVERDUE_FOLLOW_UP' | 'MISSING_DIAGNOSTICS';
  description: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'OPEN' | 'RESOLVED';
  createdAt?: string;
  provenance: ProvenanceCategory;
}

export interface CareTask {
  id: string;
  careGapId?: string;
  patientId: string;
  title: string;
  assignedUser: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED';
  dueDate?: string;
  actionText?: string;
  provenance: ProvenanceCategory;
}

export interface Referral {
  id: string;
  journeyId: string;
  patientId: string;
  referringFacilityId: string;
  referringFacilityName?: string;
  targetFacilityId: string;
  targetFacilityName?: string;
  specialtyRequired: string;
  capabilityRequired?: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'CREATED' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'REROUTED';
  appointmentStatus?: 'CONFIRMED' | 'DELAYED' | 'MISSED';
  doctorName?: string;
  appointmentTime?: string;
  provenance: ProvenanceCategory;
}

export interface FacilityCandidate {
  id: string;
  name: string;
  district: string;
  state: string;
  facilityType: string;
  specialtyAvailable: string;
  equipmentAvailable: string;
  matchesRequirements: boolean;
  provenance: ProvenanceCategory;
}

export type SyncState = 'PENDING_SYNC' | 'SYNCING' | 'SYNCED' | 'SYNC_FAILED';

export interface LocalSyncQueueItem {
  id: string;
  actionType: string;
  entityType: string;
  entityId: string;
  payload: any;
  timestamp: string;
  status: SyncState;
  retryCount: number;
}
