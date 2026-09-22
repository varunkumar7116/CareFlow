import React, { useState, useEffect } from 'react';
import {
  Activity,
  UserCheck,
  FileText,
  Send,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  PhoneCall,
  Play,
  RotateCcw,
  Building2,
  User,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { IVRSimulatorModal } from './components/IVRSimulatorModal';

interface Patient {
  id: string;
  uhid: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  preferredLanguage: string;
}

interface CareJourney {
  id: string;
  patientId: string;
  currentStage: string;
  status: string;
  assignedChwId: string;
  facilityId: string;
}

interface CareGap {
  id: string;
  journeyId: string;
  patientId: string;
  gapType: string;
  description: string;
  status: string;
}

interface CareTask {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  assignedUserId: string;
}

export function App() {
  const [patient, setPatient] = useState<Patient | null>({
    id: 'PAT-P1001',
    uhid: 'CF-P1001',
    firstName: 'Meena',
    lastName: 'Devi',
    phoneNumber: '+919876543210',
    gender: 'FEMALE',
    preferredLanguage: 'hi'
  });

  const [journey, setJourney] = useState<CareJourney | null>({
    id: 'CJ-P1001-01',
    patientId: 'PAT-P1001',
    currentStage: 'SCREENING',
    status: 'ACTIVE',
    assignedChwId: 'USER-CHW-001',
    facilityId: 'FAC-VILLAGE-PHC'
  });

  const [referral, setReferral] = useState<any>(null);
  const [appointment, setAppointment] = useState<any>(null);
  const [gaps, setGaps] = useState<CareGap[]>([]);
  const [tasks, setTasks] = useState<CareTask[]>([]);
  const [activeStep, setActiveStep] = useState(1);
  const [isIVROpen, setIsIVROpen] = useState(false);
  const [govFacilities, setGovFacilities] = useState<any[]>([]);
  const [govFilterDistrict, setGovFilterDistrict] = useState<string>('');
  const [govFilterType, setGovFilterType] = useState<string>('');
  const [selectedGovFacility, setSelectedGovFacility] = useState<any>(null);
  const [statusMessage, setStatusMessage] = useState('CareFlow V1 initialized with seed scenario for Meena (CF-P1001)');

  const API_BASE = 'http://localhost:8080/api/v1';

  const steps = [
    { num: 1, title: 'Patient Registered', desc: 'Meena (CF-P1001)' },
    { num: 2, title: 'Screening Complete', desc: 'High Blood Pressure' },
    { num: 3, title: 'Referral Created', desc: 'PHC → Hospital' },
    { num: 4, title: 'Appointment Booked', desc: 'District Hospital' },
    { num: 5, title: 'Overdue Follow-up', desc: 'Simulate SLA Breach' },
    { num: 6, title: 'Care Gap & Task', desc: 'Task assigned to CHW' },
    { num: 7, title: 'Follow-up Complete', desc: 'CHW Visit Recorded' },
    { num: 8, title: 'Completed Care', desc: 'Journey Closed' }
  ];

  const refreshData = async () => {
    try {
      const pRes = await fetch(`${API_BASE}/patients/PAT-P1001`);
      if (pRes.ok) {
        const pData = await pRes.json();
        setPatient(pData);
      }

      const cgRes = await fetch(`${API_BASE}/caregaps/open`);
      if (cgRes.ok) {
        const cgData = await cgRes.json();
        setGaps(cgData);
      }

      const tRes = await fetch(`${API_BASE}/tasks`);
      if (tRes.ok) {
        const tData = await tRes.json();
        setTasks(tData);
      }

      const govRes = await fetch(`${API_BASE}/gov/facilities`);
      if (govRes.ok) {
        const govData = await govRes.json();
        setGovFacilities(govData);
        if (govData.length > 1) {
          setSelectedGovFacility(govData[1]); // Default to District Hospital Rampur
        }
      }
    } catch (err) {
      // Backend fallback simulation mode
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const runStep = async (stepNum: number) => {
    setActiveStep(stepNum);
    switch (stepNum) {
      case 1:
        setStatusMessage('Step 1: Patient Meena (CF-P1001) registered at Village PHC.');
        setJourney((j) => (j ? { ...j, currentStage: 'REGISTRATION' } : j));
        break;
      case 2:
        setStatusMessage('Step 2: Field screening completed. High risk flagged (BP 140/90).');
        setJourney((j) => (j ? { ...j, currentStage: 'SCREENING' } : j));
        break;
      case 3:
        setStatusMessage('Step 3: Referral created from Village PHC to District Hospital Obstetrics.');
        setJourney((j) => (j ? { ...j, currentStage: 'REFERRAL' } : j));
        setReferral({
          id: 'REF-001',
          source: 'Village PHC',
          target: 'District Hospital Rampur',
          status: 'SENT',
          priority: 'HIGH'
        });
        break;
      case 4:
        setStatusMessage('Step 4: Specialist appointment confirmed at District Hospital.');
        setJourney((j) => (j ? { ...j, currentStage: 'APPOINTMENT' } : j));
        setAppointment({
          id: 'APP-001',
          department: 'Obstetrics Specialist',
          scheduledDate: '2026-09-23 10:00 AM',
          status: 'CONFIRMED'
        });
        break;
      case 5:
        setStatusMessage('Step 5: Simulated 24h+ overdue follow-up check-in SLA breach.');
        setJourney((j) => (j ? { ...j, currentStage: 'FOLLOW_UP' } : j));
        break;
      case 6:
        setStatusMessage('Step 6: Care Gap Engine triggered! Task created & assigned to CHW-001.');
        try {
          await fetch(`${API_BASE}/caregaps/scan`, { method: 'POST' });
        } catch (e) {}
        setGaps([
          {
            id: 'GAP-101',
            journeyId: 'CJ-P1001-01',
            patientId: 'PAT-P1001',
            gapType: 'OVERDUE_FOLLOW_UP',
            description: 'Maternal follow-up overdue past 24h SLA.',
            status: 'OPEN'
          }
        ]);
        setTasks([
          {
            id: 'TSK-201',
            title: 'RESOLVE CARE GAP: OVERDUE_FOLLOW_UP',
            description: 'Conduct home visit for patient Meena (CF-P1001)',
            priority: 'HIGH',
            status: 'OPEN',
            assignedUserId: 'USER-CHW-001'
          }
        ]);
        break;
      case 7:
        setStatusMessage('Step 7: CHW completed home check-in visit. Care Gap resolved.');
        try {
          await fetch(`${API_BASE}/caregaps/GAP-101/resolve`, { method: 'POST' });
        } catch (e) {}
        setGaps([]);
        setTasks((prev) => prev.map((t) => ({ ...t, status: 'COMPLETED' })));
        break;
      case 8:
        setStatusMessage('Step 8: Closed-loop care journey completed successfully!');
        setJourney((j) => (j ? { ...j, currentStage: 'COMPLETED', status: 'COMPLETED' } : j));
        break;
      default:
        break;
    }
  };

  return (
    <div className="app-container">
      {/* Top Header */}
      <header className="header">
        <div className="logo-group">
          <div className="logo-icon">CF</div>
          <div className="title-text">
            <h1>CareFlow V1</h1>
            <p>Community & Hospital Care Coordination Platform</p>
          </div>
        </div>

        <div className="header-actions">
          <div className="badge-synthetic">SYNTHETIC SCENARIO: DEMO READY</div>
          <button className="btn-ivr" onClick={() => setIsIVROpen(true)}>
            <PhoneCall size={18} />
            Test IVR Hotline
          </button>
        </div>
      </header>

      <main className="main-content">
        {/* Scenario Stepper Control Card */}
        <div className="scenario-card">
          <div className="scenario-header">
            <div className="scenario-title">
              <Activity size={22} color="#06b6d4" />
              <div>
                <h2>V1 Core Demo Workflow Runner</h2>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  Click steps to simulate the complete care lifecycle for patient Meena (CF-P1001)
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => runStep(1)}
                style={{
                  background: '#334155',
                  color: 'white',
                  border: 'none',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <RotateCcw size={14} /> Reset Flow
              </button>
              <button
                onClick={() => runStep(activeStep < 8 ? activeStep + 1 : 1)}
                style={{
                  background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                  color: 'white',
                  border: 'none',
                  padding: '0.4rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <Play size={14} /> Next Step ({activeStep}/8)
              </button>
            </div>
          </div>

          <div style={{ background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.3)', padding: '0.6rem 1rem', borderRadius: '8px', fontSize: '0.85rem', color: '#06b6d4', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={16} />
            Status: {statusMessage}
          </div>

          <div className="stepper-container">
            {steps.map((s) => (
              <div
                key={s.num}
                className={`step-item ${activeStep === s.num ? 'active' : ''} ${activeStep > s.num ? 'completed' : ''}`}
                onClick={() => runStep(s.num)}
              >
                <div className="step-number">{activeStep > s.num ? '✓' : s.num}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Main Column: Patient & Care Journey */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Patient Card */}
            <div className="card">
              <div className="card-title">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <User size={20} color="#3b82f6" />
                  <span>Patient Profile (Meena)</span>
                </div>
                <span className="tag-badge tag-high">UHID: {patient?.uhid}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', background: '#0f172a', padding: '1rem', borderRadius: '12px' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Full Name</div>
                  <div style={{ fontWeight: 700 }}>{patient?.firstName} {patient?.lastName}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Contact Phone</div>
                  <div style={{ fontWeight: 600 }}>{patient?.phoneNumber}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Assigned CHW</div>
                  <div style={{ fontWeight: 600 }}>CHW-001 (Village PHC)</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Language</div>
                  <div style={{ fontWeight: 600 }}>Hindi (हिंदी)</div>
                </div>
              </div>
            </div>

            {/* Care Journey Engine Timeline */}
            <div className="card">
              <div className="card-title">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Activity size={20} color="#06b6d4" />
                  <span>Care Journey Stage Lifecycle</span>
                </div>
                <span className={`tag-badge ${journey?.currentStage === 'COMPLETED' ? 'tag-done' : 'tag-med'}`}>
                  {journey?.currentStage}
                </span>
              </div>

              <div className="journey-timeline">
                <div className={`timeline-node ${activeStep >= 1 ? 'completed' : ''}`}>
                  <div className="node-header">
                    <span className="node-stage">1. REGISTRATION</span>
                    <span className="node-time">Village PHC Check-in</span>
                  </div>
                  <div className="node-details">Patient registered under CHW-001 jurisdiction.</div>
                </div>

                <div className={`timeline-node ${activeStep >= 2 ? 'completed' : ''}`}>
                  <div className="node-header">
                    <span className="node-stage">2. SCREENING</span>
                    <span className="node-time">Maternal Health Vitals</span>
                  </div>
                  <div className="node-details">Blood Pressure: 140/90 mmHg. Flagged high-risk maternal status.</div>
                </div>

                <div className={`timeline-node ${activeStep >= 3 ? 'completed' : ''}`}>
                  <div className="node-header">
                    <span className="node-stage">3. REFERRAL</span>
                    <span className="node-time">Inter-facility Transfer</span>
                  </div>
                  <div className="node-details">Referral created: Village PHC → District Hospital Rampur (Obstetrics).</div>
                </div>

                <div className={`timeline-node ${activeStep >= 4 ? 'completed' : ''}`}>
                  <div className="node-header">
                    <span className="node-stage">4. APPOINTMENT</span>
                    <span className="node-time">Specialist Consultation</span>
                  </div>
                  <div className="node-details">Appointment confirmed with Dr. Sharma (Obstetrics Specialist).</div>
                </div>

                <div className={`timeline-node ${activeStep >= 5 ? (activeStep >= 7 ? 'completed' : 'active') : ''}`}>
                  <div className="node-header">
                    <span className="node-stage">5. FOLLOW_UP</span>
                    <span className="node-time">Community Home Check-in</span>
                  </div>
                  <div className="node-details">
                    {activeStep === 5
                      ? '⚠️ Overdue follow-up detected past 24h SLA!'
                      : activeStep >= 7
                      ? '✓ CHW home check-in completed. Vitals stable.'
                      : 'Pending check-in schedule.'}
                  </div>
                </div>

                <div className={`timeline-node ${activeStep >= 8 ? 'completed' : ''}`}>
                  <div className="node-header">
                    <span className="node-stage">6. COMPLETED</span>
                    <span className="node-time">Care Journey Closed</span>
                  </div>
                  <div className="node-details">Closed-loop care completed with full patient tracking history.</div>
                </div>
              </div>
            </div>

            {/* Government Facility Compatibility Directory Card */}
            <div className="card">
              <div className="card-title">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Building2 size={20} color="#10b981" />
                  <span>Government Facility Directory (GovernmentFacilityProvider)</span>
                </div>
                <span className="tag-badge tag-done">
                  PROTOTYPE_DATASET (MoHFW)
                </span>
              </div>

              <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '12px', marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700, marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  Traceable Source Metadata (MoHFW Public Dataset)
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: '1.4' }}>
                  <strong>Source:</strong> Government of India National Health Directory - Public Dataset<br />
                  <strong>Organization:</strong> Ministry of Health and Family Welfare (MoHFW) Public Data Portal<br />
                  <strong>Reference:</strong> NIN/NHP-PUBLIC-2025 | <strong>Publication Date:</strong> 2025-01-15
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                {govFacilities.slice(0, 4).map((f) => (
                  <div
                    key={f.ninId}
                    onClick={() => setSelectedGovFacility(f)}
                    style={{
                      background: selectedGovFacility?.ninId === f.ninId ? 'rgba(16, 185, 129, 0.15)' : '#0f172a',
                      border: `1px solid ${selectedGovFacility?.ninId === f.ninId ? '#10b981' : '#334155'}`,
                      padding: '0.75rem',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>{f.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>NIN: {f.ninId} | {f.facilityType}</div>
                    <div style={{ fontSize: '0.7rem', color: '#06b6d4', marginTop: '0.2rem' }}>District: {f.district}, {f.state}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Care Gaps & CHW Task Inbox */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Care Gaps Engine Box */}
            <div className="card">
              <div className="card-title">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <AlertTriangle size={20} color="#f43f5e" />
                  <span>Care Gap Engine Safety Net</span>
                </div>
                <span className="tag-badge tag-high">{gaps.length} Open Gaps</span>
              </div>

              {gaps.length === 0 ? (
                <div style={{ background: '#0f172a', padding: '1.25rem', borderRadius: '12px', textAlign: 'center', color: '#10b981', fontSize: '0.85rem', fontWeight: 600 }}>
                  <CheckCircle2 size={24} style={{ margin: '0 auto 0.4rem auto', display: 'block' }} />
                  No open Care Gaps detected. All SLAs satisfied!
                </div>
              ) : (
                gaps.map((g) => (
                  <div key={g.id} style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '1rem', borderRadius: '12px', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#f43f5e' }}>{g.gapType}</span>
                      <span className="tag-badge tag-high">SLA BREACH</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{g.description}</p>
                    <button
                      onClick={() => runStep(7)}
                      style={{ marginTop: '0.75rem', width: '100%', background: '#f43f5e', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Resolve Care Gap
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* CHW Task Inbox */}
            <div className="card">
              <div className="card-title">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <FileText size={20} color="#8b5cf6" />
                  <span>CHW Task Inbox (CHW-001)</span>
                </div>
                <span className="tag-badge tag-med">{tasks.length} Tasks</span>
              </div>

              {tasks.length === 0 ? (
                <div style={{ background: '#0f172a', padding: '1.25rem', borderRadius: '12px', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
                  No pending tasks assigned.
                </div>
              ) : (
                tasks.map((t) => (
                  <div key={t.id} style={{ background: '#0f172a', border: '1px solid #334155', padding: '0.85rem', borderRadius: '12px', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{t.title}</span>
                      <span className={`tag-badge ${t.status === 'COMPLETED' ? 'tag-done' : 'tag-high'}`}>{t.status}</span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{t.description}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <IVRSimulatorModal isOpen={isIVROpen} onClose={() => setIsIVROpen(false)} />
    </div>
  );
}

export default App;
