import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar, NavTab } from './components/Sidebar';
import { FacilityViews } from './components/FacilityViews';
import { SignInModal } from './components/SignInModal';
import { IVRSimulatorModal } from './components/IVRSimulatorModal';
import { LanguageSelection } from './components/LanguageSelection';
import { LoginPage } from './components/LoginPage';
import { LanguageItem, PRIMARY_LANGUAGES, ALL_SCHEDULED_LANGUAGES } from './data/languages';

type EntryStep = 'LANGUAGE_SELECTION' | 'LOGIN' | 'DASHBOARD';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isIVROpen, setIsIVROpen] = useState(false);

  const savedToken = localStorage.getItem('careflow_token') || '';
  const savedLangCode = localStorage.getItem('careflow_language') || '';

  const initialLang = ALL_SCHEDULED_LANGUAGES.find((l) => l.code === savedLangCode) || PRIMARY_LANGUAGES[1]; // Marathi default

  const [selectedLanguage, setSelectedLanguage] = useState<LanguageItem>(initialLang);
  const [entryStep, setEntryStep] = useState<EntryStep>(
    savedToken ? 'DASHBOARD' : (savedLangCode ? 'LOGIN' : 'LANGUAGE_SELECTION')
  );

  const [authToken, setAuthToken] = useState<string>(savedToken);
  const [username, setUsername] = useState<string>(localStorage.getItem('careflow_username') || 'MH-PHC-ADMIN');
  const [fullName, setFullName] = useState<string>(localStorage.getItem('careflow_fullname') || 'MH Facility Administrator');
  const [userRole, setUserRole] = useState<string>(localStorage.getItem('careflow_role') || 'FACILITY_ADMIN');
  const [facilityId, setFacilityId] = useState<string>(localStorage.getItem('careflow_facilityId') || 'NIN-TN-CBE-001');

  const [facilityDetails, setFacilityDetails] = useState<any>(null);
  const [dashboardSummary, setDashboardSummary] = useState<any>(null);
  const [patient, setPatient] = useState<any>({ id: 'PAT-P1001', uhid: 'CF-P1001', firstName: 'Meena', lastName: 'Devi', gender: 'FEMALE', age: 28, channel: 'ASHA / CHW' });
  const [journey, setJourney] = useState<any>({ id: 'CFJ-1001', currentStage: 'REGISTRATION', status: 'ACTIVE', assignedChwId: 'USER-CHW-001', facilityId: 'NIN-TN-CBE-001' });
  const [referral, setReferral] = useState<any>(null);
  const [gaps, setGaps] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [matchedFacility, setMatchedFacility] = useState<any>(null);
  const [demoStep, setDemoStep] = useState<number>(1);
  const [statusMessage, setStatusMessage] = useState('Step 1: Patient Meena Devi (CF-P1001) registered via ASHA/CHW assisted entry. Care Journey CFJ-1001 initialized.');

  const API_BASE = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8085/api/v1';

  // Demo user credentials mapping for seamless prototype authentication
  const DEMO_USERS_MAP: Record<string, { pass: string; role: string; name: string; fac: string }> = {
    'MH-PHC-ADMIN': { pass: 'CareFlow@123', role: 'FACILITY_ADMIN', name: 'MH Facility Administrator', fac: 'NIN-TN-CBE-001' },
    'MH-DOCTOR-001': { pass: 'CareFlow@123', role: 'DOCTOR', name: 'Dr. Anand Joshi', fac: 'NIN-TN-CBE-001' },
    'MH-STAFF-001': { pass: 'CareFlow@123', role: 'FACILITY_STAFF', name: 'Sowmya R (Facility Staff)', fac: 'NIN-TN-CBE-001' },
    'MH-DISTRICT-001': { pass: 'CareFlow@123', role: 'DISTRICT_SUPERVISOR', name: 'Dr. V. Sundaram (District Supervisor)', fac: 'NIN-TN-CBE-001' },
    'admin': { pass: 'password', role: 'FACILITY_ADMIN', name: 'Karamadai Facility Admin', fac: 'NIN-TN-CBE-001' },
    'doctor1': { pass: 'password', role: 'DOCTOR', name: 'Dr. Rajesh Kumar', fac: 'NIN-TN-CBE-001' },
    'staff1': { pass: 'password', role: 'FACILITY_STAFF', name: 'Sowmya R (Nurse Supervisor)', fac: 'NIN-TN-CBE-001' },
    'supervisor1': { pass: 'password', role: 'DISTRICT_SUPERVISOR', name: 'Dr. V. Sundaram', fac: 'NIN-TN-CBE-001' },
    'chw1': { pass: 'password', role: 'CHW', name: 'CHW Meera Bai', fac: 'NIN-TN-CBE-001' },
    'sysadmin': { pass: 'password', role: 'SYSTEM_ADMIN', name: 'System Administrator', fac: 'NIN-TN-CBE-001' },
  };

  const login = async (user = 'MH-PHC-ADMIN', pass = 'CareFlow@123'): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass }),
      });
      if (res.ok) {
        const data = await res.json();
        setAuthToken(data.token);
        setUsername(data.username);
        setFullName(data.fullName || user);
        setUserRole(data.role || 'FACILITY_ADMIN');
        setFacilityId(data.facilityId || 'NIN-TN-CBE-001');

        localStorage.setItem('careflow_token', data.token);
        localStorage.setItem('careflow_username', data.username);
        localStorage.setItem('careflow_fullname', data.fullName || user);
        localStorage.setItem('careflow_role', data.role || 'FACILITY_ADMIN');
        localStorage.setItem('careflow_facilityId', data.facilityId || 'NIN-TN-CBE-001');

        setIsSignInOpen(false);
        setEntryStep('DASHBOARD');
        return true;
      }
    } catch (e) {
      console.warn('Backend server connection attempt failed, evaluating demo user credentials locally...', e);
    }

    // Local Demo Account Fallback (ensures 100% reliable login on Vercel deployments & offline demos)
    const demoInfo = DEMO_USERS_MAP[user];
    if (demoInfo && demoInfo.pass === pass) {
      const dummyToken = `demo_jwt_token_${user}_${Date.now()}`;
      setAuthToken(dummyToken);
      setUsername(user);
      setFullName(demoInfo.name);
      setUserRole(demoInfo.role);
      setFacilityId(demoInfo.fac);

      localStorage.setItem('careflow_token', dummyToken);
      localStorage.setItem('careflow_username', user);
      localStorage.setItem('careflow_fullname', demoInfo.name);
      localStorage.setItem('careflow_role', demoInfo.role);
      localStorage.setItem('careflow_facilityId', demoInfo.fac);

      setIsSignInOpen(false);
      setEntryStep('DASHBOARD');
      return true;
    }

    return false;
  };

  const authFetch = async (url: string, options: RequestInit = {}) => {
    let token = authToken;
    if (!token) {
      token = localStorage.getItem('careflow_token') || '';
    }
    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string>),
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    let res = await fetch(url, { ...options, headers });
    if (res.status === 401 || res.status === 403) {
      token = localStorage.getItem('careflow_token') || '';
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        res = await fetch(url, { ...options, headers });
      }
    }
    return res;
  };

  const refreshData = async () => {
    try {
      const currentFacId = facilityId || 'NIN-TN-CBE-001';

      const detRes = await authFetch(`${API_BASE}/facilities/${currentFacId}/details`);
      if (detRes.ok) {
        const detData = await detRes.json();
        setFacilityDetails(detData);
      }

      const sumRes = await authFetch(`${API_BASE}/facilities/${currentFacId}/dashboard`);
      if (sumRes.ok) {
        const sumData = await sumRes.json();
        setDashboardSummary(sumData);
      }
    } catch (err) {
      // Backend fetch fallback
    }
  };

  useEffect(() => {
    if (authToken) {
      refreshData();
    }
  }, [authToken, facilityId]);

  const handleSelectLanguage = (lang: LanguageItem) => {
    setSelectedLanguage(lang);
    localStorage.setItem('careflow_language', lang.code);
  };

  const handleRunDemoStep = async (stepNum: number) => {
    setDemoStep(stepNum);
    switch (stepNum) {
      case 1:
        setStatusMessage('Step 1: Patient Meena Devi (CF-P1001) registered via ASHA/CHW assisted entry. Care Journey CFJ-1001 initialized.');
        setJourney((j: any) => ({ ...j, currentStage: 'REGISTRATION', status: 'ACTIVE' }));
        setReferral(null);
        setGaps([]);
        setTasks([]);
        setMatchedFacility(null);
        break;
      case 2:
        setStatusMessage('Step 2: Field screening & Clinical Triage completed. High-risk maternal pregnancy flagged (BP: 160/100 mmHg, Priority: HIGH).');
        setJourney((j: any) => ({ ...j, currentStage: 'TRIAGE', status: 'ACTIVE' }));
        break;
      case 3:
        setStatusMessage('Step 3: Consultation completed. Obstetric ultrasound scan & lab diagnostics ordered.');
        setJourney((j: any) => ({ ...j, currentStage: 'DIAGNOSTICS', status: 'ACTIVE' }));
        break;
      case 4:
        setStatusMessage('Step 4: Referral REF-CFJ-1001 created from Government PHC Karamadai to District Hospital A (Obstetrics & Ultrasound).');
        setJourney((j: any) => ({ ...j, currentStage: 'REFERRAL', status: 'ACTIVE' }));
        setReferral({
          id: 'REF-CFJ-1001',
          referringFacilityName: 'Government PHC Karamadai',
          targetFacilityId: 'FAC-DISTRICT-HOSPITAL-A',
          targetFacilityName: 'District Hospital A (Coimbatore)',
          specialtyRequired: 'Obstetrics',
          capabilityRequired: 'Ultrasound',
          priority: 'HIGH',
          status: 'SENT'
        });
        break;
      case 5:
        setStatusMessage('Step 5: District Hospital A accepted referral. Awaiting specialist appointment slot confirmation.');
        setJourney((j: any) => ({ ...j, currentStage: 'APPOINTMENT', status: 'ACTIVE' }));
        if (referral) {
          setReferral((r: any) => ({ ...r, status: 'ACCEPTED' }));
        }
        break;
      case 6:
        setStatusMessage('Step 6 (Controlled Failure): Specialist appointment confirmation exceeded 24h SLA at District Hospital A!');
        setJourney((j: any) => ({ ...j, currentStage: 'APPOINTMENT', status: 'ACTIVE' }));
        if (referral) {
          setReferral((r: any) => ({ ...r, status: 'ACCEPTED', appointmentStatus: 'DELAYED' }));
        }
        break;
      case 7:
        setStatusMessage('Step 7: Automated Care Gap Engine triggered ⚠ CARE GAP DETECTED. Action Task TSK-CFJ-1001 dispatched to CHW Meera Bai.');
        setGaps([{
          id: 'GAP-CFJ-1001',
          patientId: 'PAT-P1001',
          journeyId: 'CFJ-1001',
          gapType: 'UNCONFIRMED_REFERRAL',
          description: 'Referral accepted by District Hospital A, but specialist appointment confirmation exceeded 24h SLA.',
          priority: 'HIGH',
          status: 'OPEN'
        }]);
        setTasks([{
          id: 'TSK-CFJ-1001',
          careGapId: 'GAP-CFJ-1001',
          title: 'Follow up on delayed specialist appointment for Meena Devi',
          assignedUser: 'CHW-001 (Meera Bai)',
          priority: 'HIGH',
          status: 'OPEN',
          actionText: 'Reroute to available matching facility'
        }]);
        break;
      case 8:
        setStatusMessage('Step 8: Operational Escalation initiated. Rerouting matcher identified District Hospital B (Matches Obstetrics & Ultrasound requirements).');
        setMatchedFacility({
          id: 'FAC-DISTRICT-HOSPITAL-B',
          name: 'District Hospital B (Rampur)',
          district: 'Rampur',
          specialtyAvailable: 'Obstetrics',
          equipmentAvailable: 'Ultrasound Scanner (Mindray DC-40)',
          status: 'MATCHED'
        });
        break;
      case 9:
        setStatusMessage('Step 9 (Recovery): District Hospital B accepted referral & confirmed appointment! Care Gap resolved.');
        setReferral({
          id: 'REF-CFJ-1001-REROUTED',
          referringFacilityName: 'Government PHC Karamadai',
          targetFacilityId: 'FAC-DISTRICT-HOSPITAL-B',
          targetFacilityName: 'District Hospital B (Rampur)',
          specialtyRequired: 'Obstetrics',
          capabilityRequired: 'Ultrasound Scanner',
          priority: 'HIGH',
          status: 'ACCEPTED',
          doctorName: 'Dr. Rajesh Kumar',
          appointmentTime: 'Today 11:30 AM'
        });
        setGaps([]);
        setTasks([]);
        setMatchedFacility(null);
        setJourney((j: any) => ({ ...j, currentStage: 'APPOINTMENT', status: 'ACTIVE' }));
        break;
      case 10:
        setStatusMessage('Step 10: 108 Ambulance / CHW Escort transport complete. Patient Meena Devi arrived at District Hospital B.');
        setJourney((j: any) => ({ ...j, currentStage: 'HOSPITAL', status: 'ACTIVE' }));
        break;
      case 11:
        setStatusMessage('Step 11: Specialist obstetric treatment completed. Prenatal & antihypertensive medicine dispensed.');
        setJourney((j: any) => ({ ...j, currentStage: 'MEDICINE', status: 'ACTIVE' }));
        break;
      case 12:
        setStatusMessage('Step 12: Closed-Loop Follow-Up completed! ✅ CARE JOURNEY CFJ-1001 SAFELY CLOSED.');
        setJourney((j: any) => ({ ...j, currentStage: 'COMPLETED', status: 'COMPLETED' }));
        setGaps([]);
        setTasks([]);
        break;
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('careflow_token');
    localStorage.removeItem('careflow_username');
    localStorage.removeItem('careflow_fullname');
    localStorage.removeItem('careflow_role');
    localStorage.removeItem('careflow_facilityId');
    setAuthToken('');
    setUsername('');
    setFullName('');
    setUserRole('');
    setFacilityDetails(null);
    setEntryStep('LOGIN');
  };

  const facName = facilityDetails?.governmentReference?.name || 'Government PHC, Karamadai';

  if (entryStep === 'LANGUAGE_SELECTION') {
    return (
      <LanguageSelection
        selectedLanguage={selectedLanguage}
        onSelectLanguage={handleSelectLanguage}
        onContinue={() => setEntryStep('LOGIN')}
      />
    );
  }

  if (entryStep === 'LOGIN') {
    return (
      <LoginPage
        selectedLanguage={selectedLanguage}
        onChangeLanguage={() => setEntryStep('LANGUAGE_SELECTION')}
        onLogin={login}
      />
    );
  }

  return (
    <div className="portal-wrapper">
      <Header
        facilityName={facName}
        userFullName={fullName}
        userRole={userRole}
        onOpenIVR={() => setIsIVROpen(true)}
        onOpenSignIn={() => setIsSignInOpen(true)}
        onSignOut={handleSignOut}
        isAuthenticated={!!authToken}
        currentLanguage={selectedLanguage}
        onChangeLanguage={() => setEntryStep('LANGUAGE_SELECTION')}
      />

      <div className="portal-body">
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          userRole={userRole}
          currentLanguage={selectedLanguage}
        />

        <main className="gov-content">
          <FacilityViews
            activeTab={activeTab}
            facilityDetails={facilityDetails}
            dashboardSummary={dashboardSummary}
            onRefresh={refreshData}
            authFetch={authFetch}
            API_BASE={API_BASE}
            facilityId={facilityId}
            demoStep={demoStep}
            onRunDemoStep={handleRunDemoStep}
            journey={journey}
            referrals={referral ? [referral] : []}
            gaps={gaps}
            tasks={tasks}
            statusMessage={statusMessage}
            currentLanguage={selectedLanguage}
          />
        </main>
      </div>

      <SignInModal
        isOpen={isSignInOpen}
        onLogin={login}
        onClose={() => setIsSignInOpen(false)}
      />

      <IVRSimulatorModal
        isOpen={isIVROpen}
        onClose={() => setIsIVROpen(false)}
      />
    </div>
  );
}

export default App;
