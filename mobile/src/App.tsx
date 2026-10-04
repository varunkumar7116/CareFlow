import React, { useState, useEffect } from 'react';
import { LanguageSelectionScreen } from './screens/LanguageSelectionScreen';
import { LoginScreen } from './screens/LoginScreen';
import { FieldDashboardScreen } from './screens/FieldDashboardScreen';
import { CareJourneyScreen } from './screens/CareJourneyScreen';
import { ScreeningFormScreen } from './screens/ScreeningFormScreen';
import { CareGapTaskScreen } from './screens/CareGapTaskScreen';
import { FacilityMatcherScreen } from './screens/FacilityMatcherScreen';
import { FollowUpScreen } from './screens/FollowUpScreen';

import { Patient, CareJourney } from './types/careflow';
import { syncEngine, SyncEngineStatus } from './services/syncEngine';
import { sqliteDb } from './services/sqliteDatabase';

type MobileScreen =
  | 'LANGUAGE_SELECTION'
  | 'LOGIN'
  | 'FIELD_DASHBOARD'
  | 'CARE_JOURNEY'
  | 'SCREENING_FORM'
  | 'CARE_GAP_TASK'
  | 'FACILITY_MATCHER'
  | 'FOLLOW_UP';

export function App() {
  const [selectedLang, setSelectedLang] = useState<string>('mr');
  const [currentScreen, setCurrentScreen] = useState<MobileScreen>('LANGUAGE_SELECTION');
  const [workerName, setWorkerName] = useState<string>('मीरा बाई (आशा - CHW-001)');
  const [syncStatus, setSyncStatus] = useState<SyncEngineStatus>(syncEngine.getStatus());

  // Demo single patient state
  const [patient, setPatient] = useState<Patient>({
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
  });

  const [journey, setJourney] = useState<CareJourney>({
    id: 'CFJ-1001',
    patientId: 'PAT-P1001',
    currentStage: 'REGISTRATION',
    status: 'ACTIVE',
    assignedChwId: 'USER-CHW-001',
    facilityId: 'NIN-TN-CBE-001',
    provenance: 'CAREFLOW_TRANSACTION',
  });

  const [demoStep, setDemoStep] = useState<number>(1);

  useEffect(() => {
    const unsubscribe = syncEngine.subscribe(setSyncStatus);
    return () => unsubscribe();
  }, []);

  const handleRunDemoStep = (stepNum: number) => {
    setDemoStep(stepNum);
    switch (stepNum) {
      case 1:
        setJourney((j) => ({ ...j, currentStage: 'REGISTRATION', status: 'ACTIVE' }));
        break;
      case 2:
        setJourney((j) => ({ ...j, currentStage: 'TRIAGE', status: 'ACTIVE' }));
        break;
      case 3:
        setJourney((j) => ({ ...j, currentStage: 'DIAGNOSTICS', status: 'ACTIVE' }));
        break;
      case 4:
        setJourney((j) => ({ ...j, currentStage: 'REFERRAL', status: 'ACTIVE' }));
        break;
      case 5:
        setJourney((j) => ({ ...j, currentStage: 'APPOINTMENT', status: 'ACTIVE' }));
        break;
      case 6:
        setJourney((j) => ({ ...j, currentStage: 'APPOINTMENT', status: 'ACTIVE' }));
        break;
      case 7:
        setJourney((j) => ({ ...j, currentStage: 'APPOINTMENT', status: 'ACTIVE' }));
        break;
      case 8:
        setJourney((j) => ({ ...j, currentStage: 'APPOINTMENT', status: 'ACTIVE' }));
        break;
      case 9:
        setJourney((j) => ({ ...j, currentStage: 'APPOINTMENT', status: 'ACTIVE' }));
        break;
      case 10:
        setJourney((j) => ({ ...j, currentStage: 'HOSPITAL', status: 'ACTIVE' }));
        break;
      case 11:
        setJourney((j) => ({ ...j, currentStage: 'MEDICINE', status: 'ACTIVE' }));
        break;
      case 12:
        setJourney((j) => ({ ...j, currentStage: 'COMPLETED', status: 'COMPLETED' }));
        break;
    }
  };

  const handleLoginSuccess = (res: any) => {
    setWorkerName(res.fullName || 'मीरा बाई (आशा - CHW-001)');
    setCurrentScreen('FIELD_DASHBOARD');
  };

  const handleToggleNetwork = () => {
    syncEngine.toggleNetworkForTesting(!syncStatus.isOnline);
  };

  if (currentScreen === 'LANGUAGE_SELECTION') {
    return (
      <LanguageSelectionScreen
        selectedLang={selectedLang}
        onSelectLang={setSelectedLang}
        onContinue={() => setCurrentScreen('LOGIN')}
      />
    );
  }

  if (currentScreen === 'LOGIN') {
    return (
      <LoginScreen
        selectedLang={selectedLang}
        onChangeLang={() => setCurrentScreen('LANGUAGE_SELECTION')}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  if (currentScreen === 'CARE_JOURNEY') {
    return (
      <CareJourneyScreen
        selectedLang={selectedLang}
        patient={patient}
        journey={journey}
        demoStep={demoStep}
        onRunDemoStep={handleRunDemoStep}
        onBack={() => setCurrentScreen('FIELD_DASHBOARD')}
        onOpenCareGap={() => setCurrentScreen('CARE_GAP_TASK')}
      />
    );
  }

  if (currentScreen === 'SCREENING_FORM') {
    return (
      <ScreeningFormScreen
        selectedLang={selectedLang}
        patient={patient}
        onBack={() => setCurrentScreen('FIELD_DASHBOARD')}
        onSubmitSuccess={() => {
          handleRunDemoStep(2);
          setCurrentScreen('CARE_JOURNEY');
        }}
      />
    );
  }

  if (currentScreen === 'CARE_GAP_TASK') {
    return (
      <CareGapTaskScreen
        selectedLang={selectedLang}
        patient={patient}
        journey={journey}
        demoStep={demoStep}
        onRunDemoStep={handleRunDemoStep}
        onBack={() => setCurrentScreen('FIELD_DASHBOARD')}
        onOpenFacilityMatcher={() => setCurrentScreen('FACILITY_MATCHER')}
      />
    );
  }

  if (currentScreen === 'FACILITY_MATCHER') {
    return (
      <FacilityMatcherScreen
        selectedLang={selectedLang}
        patient={patient}
        onBack={() => setCurrentScreen('CARE_GAP_TASK')}
        onConfirmReroute={() => {
          handleRunDemoStep(9);
          setCurrentScreen('CARE_JOURNEY');
        }}
      />
    );
  }

  if (currentScreen === 'FOLLOW_UP') {
    return (
      <FollowUpScreen
        selectedLang={selectedLang}
        patient={patient}
        journey={journey}
        onBack={() => setCurrentScreen('FIELD_DASHBOARD')}
        onCompleteCare={() => {
          handleRunDemoStep(12);
          setCurrentScreen('CARE_JOURNEY');
        }}
      />
    );
  }

  return (
    <FieldDashboardScreen
      selectedLang={selectedLang}
      workerName={workerName}
      syncStatus={syncStatus}
      onToggleNetwork={handleToggleNetwork}
      patient={patient}
      journey={journey}
      demoStep={demoStep}
      onRunDemoStep={handleRunDemoStep}
      onOpenJourney={() => setCurrentScreen('CARE_JOURNEY')}
      onOpenScreening={() => setCurrentScreen('SCREENING_FORM')}
      onOpenCareGap={() => setCurrentScreen('CARE_GAP_TASK')}
      onSignOut={() => setCurrentScreen('LOGIN')}
    />
  );
}

export default App;
