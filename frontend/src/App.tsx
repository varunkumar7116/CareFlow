import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar, NavTab } from './components/Sidebar';
import { FacilityViews } from './components/FacilityViews';
import { SignInModal } from './components/SignInModal';
import { IVRSimulatorModal } from './components/IVRSimulatorModal';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isIVROpen, setIsIVROpen] = useState(false);

  const [authToken, setAuthToken] = useState<string>(localStorage.getItem('careflow_token') || '');
  const [username, setUsername] = useState<string>(localStorage.getItem('careflow_username') || 'admin');
  const [fullName, setFullName] = useState<string>(localStorage.getItem('careflow_fullname') || 'Karamadai Facility Admin');
  const [userRole, setUserRole] = useState<string>(localStorage.getItem('careflow_role') || 'FACILITY_ADMIN');
  const [facilityId, setFacilityId] = useState<string>(localStorage.getItem('careflow_facilityId') || 'NIN-TN-CBE-001');

  const [facilityDetails, setFacilityDetails] = useState<any>(null);
  const [dashboardSummary, setDashboardSummary] = useState<any>(null);
  const [patient, setPatient] = useState<any>({ id: 'PAT-P1001', uhid: 'CF-P1001', firstName: 'Meena', lastName: 'Devi' });
  const [journey, setJourney] = useState<any>({ id: 'CJ-P1001-01', currentStage: 'SCREENING', status: 'ACTIVE' });
  const [referral, setReferral] = useState<any>(null);
  const [gaps, setGaps] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [demoStep, setDemoStep] = useState<number>(1);
  const [statusMessage, setStatusMessage] = useState('CareFlow Operational Facility Portal initialized with seed scenario for Meena (CF-P1001).');

  const API_BASE = 'http://localhost:8085/api/v1';

  const login = async (user = 'admin', pass = 'password'): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass })
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
        return true;
      }
    } catch (e) {
      console.error('Failed login attempt', e);
    }
    return false;
  };

  const authFetch = async (url: string, options: RequestInit = {}) => {
    let token = authToken;
    if (!token) {
      await login();
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
      await login();
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

      const cgRes = await authFetch(`${API_BASE}/caregaps/open`);
      if (cgRes.ok) {
        const cgData = await cgRes.json();
        setGaps(cgData);
      }

      const tRes = await authFetch(`${API_BASE}/tasks`);
      if (tRes.ok) {
        const tData = await tRes.json();
        setTasks(tData);
      }
    } catch (err) {
      // Backend fetch fallback
    }
  };

  useEffect(() => {
    if (!authToken) {
      login();
    } else {
      refreshData();
    }
  }, [facilityId]);

  const handleRunDemoStep = async (stepNum: number) => {
    setDemoStep(stepNum);
    switch (stepNum) {
      case 1:
        setStatusMessage('Step 1: Patient Meena (CF-P1001) registered at Government PHC, Karamadai.');
        setJourney((j: any) => ({ ...j, currentStage: 'REGISTRATION' }));
        break;
      case 2:
        setStatusMessage('Step 2: Field screening completed. High risk flagged (BP 140/90 mmHg).');
        setJourney((j: any) => ({ ...j, currentStage: 'SCREENING' }));
        break;
      case 3:
        setStatusMessage('Step 3: Referral created from Karamadai PHC to District Hospital Rampur Obstetrics.');
        setJourney((j: any) => ({ ...j, currentStage: 'REFERRAL' }));
        setReferral({ id: 'REF-001', targetFacilityId: facilityId, specialtyRequired: 'Obstetrics', status: 'SENT' });
        break;
      case 4:
        setStatusMessage('Step 4: Appointment booked at District Hospital with Dr. Rajesh Kumar.');
        setJourney((j: any) => ({ ...j, currentStage: 'APPOINTMENT' }));
        if (referral) setReferral({ ...referral, status: 'ACCEPTED' });
        break;
      case 5:
        setStatusMessage('Step 5: Simulating 24h SLA Breach — Patient missed follow-up.');
        setJourney((j: any) => ({ ...j, currentStage: 'FOLLOW_UP' }));
        setGaps([{ id: 'GAP-001', description: 'Overdue Follow-up Visit (24h SLA Breach)', status: 'OPEN' }]);
        setTasks([{ id: 'TASK-001', title: 'CHW Callback: Conduct home visit for Meena Devi', status: 'OPEN' }]);
        break;
      case 6:
        setStatusMessage('Step 6: Automated Care Gap generated & task dispatched to CHW Meera Bai.');
        break;
      case 7:
        setStatusMessage('Step 7: CHW recorded home visit. Patient attended clinic.');
        setGaps([]);
        setTasks([]);
        setJourney((j: any) => ({ ...j, currentStage: 'MEDICINE' }));
        break;
      case 8:
        setStatusMessage('Step 8: Closed-Loop Care completed successfully! Patient treatment recorded.');
        setJourney((j: any) => ({ ...j, currentStage: 'COMPLETED', status: 'COMPLETED' }));
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
    setIsSignInOpen(true);
  };

  const facName = facilityDetails?.governmentReference?.name || 'Government PHC, Karamadai';

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
      />

      <div className="portal-body">
        <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} userRole={userRole} />

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
