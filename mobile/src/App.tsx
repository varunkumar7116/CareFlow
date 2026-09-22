import React, { useState } from 'react';
import {
  Wifi,
  WifiOff,
  UserCheck,
  ClipboardList,
  AlertTriangle,
  CheckCircle,
  Clock,
  Send,
  PlusCircle,
  Home,
  User
} from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'screening' | 'patients'>('tasks');
  const [isOnline, setIsOnline] = useState(true);
  const [outboxCount, setOutboxCount] = useState(0);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [screeningSubmitted, setScreeningSubmitted] = useState(false);

  // Form state
  const [systolic, setSystolic] = useState('140');
  const [diastolic, setDiastolic] = useState('90');
  const [riskLevel, setRiskLevel] = useState('HIGH');

  const handleCompleteTask = () => {
    setTaskCompleted(true);
    if (!isOnline) {
      setOutboxCount((prev) => prev + 1);
    }
  };

  const handleScreeningSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setScreeningSubmitted(true);
    if (!isOnline) {
      setOutboxCount((prev) => prev + 1);
    }
    setTimeout(() => setScreeningSubmitted(false), 3000);
  };

  return (
    <div className="mobile-container">
      {/* Mobile Top Header */}
      <div className="mobile-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem' }}>
            CF
          </div>
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>CareFlow CHW</h3>
            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Worker: CHW-001 (Village PHC)</span>
          </div>
        </div>

        <button
          onClick={() => setIsOnline(!isOnline)}
          style={{
            background: isOnline ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)',
            border: `1px solid ${isOnline ? '#10b981' : '#f43f5e'}`,
            color: isOnline ? '#10b981' : '#f43f5e',
            borderRadius: '20px',
            padding: '0.3rem 0.6rem',
            fontSize: '0.7rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            cursor: 'pointer'
          }}
        >
          {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
          {isOnline ? 'Online' : 'Offline'}
        </button>
      </div>

      {/* Sync Banner */}
      <div className="sync-banner" style={{ background: isOnline ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)', color: isOnline ? '#10b981' : '#f59e0b' }}>
        <span>SQLite Outbox Queue: {outboxCount} Pending</span>
        <span>{isOnline ? 'Synced to Server' : 'Local Outbox Saved'}</span>
      </div>

      {/* Body Content */}
      <div className="mobile-body">
        {activeTab === 'tasks' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Assigned Care Gap Tasks</h4>
              <span style={{ fontSize: '0.75rem', color: '#06b6d4', fontWeight: 600 }}>1 Active</span>
            </div>

            {!taskCompleted ? (
              <div className="card-mobile" style={{ borderColor: 'rgba(244, 63, 94, 0.4)', background: 'rgba(244, 63, 94, 0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f43f5e' }}>HIGH PRIORITY</span>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Due Today</span>
                </div>
                <h5 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                  Resolve Overdue Follow-Up
                </h5>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.8rem' }}>
                  Patient: <strong>Meena Devi (CF-P1001)</strong><br />
                  Task: Conduct maternal home visit check-in and record vitals.
                </p>

                <button
                  onClick={handleCompleteTask}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    border: 'none',
                    padding: '0.6rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <CheckCircle size={16} /> Mark Visit Completed
                </button>
              </div>
            ) : (
              <div className="card-mobile" style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: '#10b981', textAlign: 'center', padding: '1.5rem' }}>
                <CheckCircle size={32} color="#10b981" style={{ margin: '0 auto 0.5rem auto' }} />
                <h5 style={{ fontWeight: 700, color: '#10b981' }}>Task Completed!</h5>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                  {isOnline ? 'Synced instantly with CareFlow Server.' : 'Queued in client SQLite Outbox.'}
                </p>
              </div>
            )}
          </>
        )}

        {activeTab === 'screening' && (
          <>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Field Maternal Health Screening</h4>

            {screeningSubmitted && (
              <div style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#10b981', padding: '0.6rem', borderRadius: '10px', fontSize: '0.8rem', textAlign: 'center', fontWeight: 600 }}>
                ✓ Screening Record Saved!
              </div>
            )}

            <form onSubmit={handleScreeningSubmit} className="card-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Patient UHID</label>
                <input
                  type="text"
                  value="CF-P1001 (Meena Devi)"
                  disabled
                  style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '0.5rem', color: '#f8fafc', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Systolic BP</label>
                  <input
                    type="number"
                    value={systolic}
                    onChange={(e) => setSystolic(e.target.value)}
                    style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '0.5rem', color: '#f8fafc' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Diastolic BP</label>
                  <input
                    type="number"
                    value={diastolic}
                    onChange={(e) => setDiastolic(e.target.value)}
                    style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '0.5rem', color: '#f8fafc' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Care Gap Risk Assessment</label>
                <select
                  value={riskLevel}
                  onChange={(e) => setRiskLevel(e.target.value)}
                  style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '0.5rem', color: '#f8fafc' }}
                >
                  <option value="LOW">Low Risk (Routine)</option>
                  <option value="MEDIUM">Moderate Risk</option>
                  <option value="HIGH">High Risk (Referral Required)</option>
                </select>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                  color: 'white',
                  border: 'none',
                  padding: '0.65rem',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  marginTop: '0.4rem'
                }}
              >
                Submit Screening Record
              </button>
            </form>
          </>
        )}

        {activeTab === 'patients' && (
          <>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Village PHC Patient Directory</h4>
            <div className="card-mobile" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Meena Devi</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>CF-P1001 • Age 28</div>
                <div style={{ fontSize: '0.7rem', color: '#06b6d4', marginTop: '0.2rem' }}>Stage: SCREENING / REFERRAL</div>
              </div>
              <span style={{ fontSize: '0.7rem', background: 'rgba(244, 63, 94, 0.2)', color: '#f43f5e', padding: '0.25rem 0.5rem', borderRadius: '6px', fontWeight: 700 }}>
                High Risk
              </span>
            </div>
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="mobile-nav">
        <div className={`nav-item ${activeTab === 'tasks' ? 'active' : ''}`} onClick={() => setActiveTab('tasks')}>
          <ClipboardList size={20} />
          <span>My Tasks</span>
        </div>
        <div className={`nav-item ${activeTab === 'screening' ? 'active' : ''}`} onClick={() => setActiveTab('screening')}>
          <PlusCircle size={20} />
          <span>Screening</span>
        </div>
        <div className={`nav-item ${activeTab === 'patients' ? 'active' : ''}`} onClick={() => setActiveTab('patients')}>
          <User size={20} />
          <span>Patients</span>
        </div>
      </div>
    </div>
  );
}

export default App;
