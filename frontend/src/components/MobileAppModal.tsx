import React, { useState } from 'react';
import { Smartphone, X, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { getTranslation } from '../data/translations';
import { LanguageItem } from '../data/languages';

interface MobileAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage?: LanguageItem;
  demoStep: number;
  onRunDemoStep: (stepNum: number) => void;
}

export const MobileAppModal: React.FC<MobileAppModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  demoStep,
  onRunDemoStep,
}) => {
  if (!isOpen) return null;

  const t = getTranslation(currentLanguage?.code || 'mr');
  const [mobileScreen, setMobileScreen] = useState<'DASHBOARD' | 'JOURNEY' | 'SCREENING' | 'TASK'>('DASHBOARD');
  const [isOnline, setIsOnline] = useState(true);
  const [systolic, setSystolic] = useState('160');
  const [diastolic, setDiastolic] = useState('100');
  const [savedStatus, setSavedStatus] = useState('');

  const handleSaveScreening = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedStatus('✓ Saved on Device (Local Outbox SQLite)');
    onRunDemoStep(2);
    setTimeout(() => {
      setSavedStatus('');
      setMobileScreen('JOURNEY');
    }, 1000);
  };

  return (
    <div className="modal-backdrop">
      <div
        className="modal-content"
        style={{
          maxWidth: '440px',
          width: '92%',
          backgroundColor: '#0f172a',
          color: 'white',
          borderRadius: '24px',
          padding: '0',
          border: '2px solid #334155',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          overflow: 'hidden'
        }}
      >
        {/* Mobile Device Frame Header */}
        <div
          style={{
            backgroundColor: '#1e293b',
            padding: '0.85rem 1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #334155'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Smartphone size={18} color="#38bdf8" />
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white' }}>CareFlow ASHA Mobile</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => setIsOnline(!isOnline)}
              style={{
                backgroundColor: isOnline ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                color: isOnline ? '#4ade80' : '#fca5a5',
                border: `1px solid ${isOnline ? '#22c55e' : '#ef4444'}`,
                borderRadius: '12px',
                fontSize: '0.7rem',
                padding: '0.2rem 0.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              {isOnline ? <Wifi size={12} /> : <WifiOff size={12} />}
              <span>{isOnline ? 'Online' : 'Offline'}</span>
            </button>
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Sync Status Banner */}
        <div
          style={{
            backgroundColor: isOnline ? 'rgba(34, 197, 94, 0.1)' : 'rgba(245, 158, 11, 0.15)',
            color: isOnline ? '#4ade80' : '#fcd34d',
            fontSize: '0.725rem',
            padding: '0.35rem 1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span>{isOnline ? '✓ Synced with Spring Boot REST API' : '⚠ Offline — Local SQLite Storage Active'}</span>
          <span>Worker: CHW Meera Bai</span>
        </div>

        {/* Screen Body */}
        <div style={{ padding: '1rem', minHeight: '380px' }}>
          {mobileScreen === 'DASHBOARD' && (
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                सस्नेह नमस्कार, मीरा बाई (ASHA)
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '1rem' }}>
                महाराष्ट्र शासकीय आरोग्य समन्वय मोबाइल ॲप
              </div>

              {/* Action Badges */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ backgroundColor: '#1e293b', border: '1px solid #ef4444', borderRadius: '8px', padding: '0.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ef4444' }}>{demoStep === 6 || demoStep === 7 ? 1 : 0}</div>
                  <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>Care Gaps</div>
                </div>
                <div style={{ backgroundColor: '#1e293b', border: '1px solid #f59e0b', borderRadius: '8px', padding: '0.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f59e0b' }}>{demoStep === 12 ? 0 : 1}</div>
                  <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>Follow-ups</div>
                </div>
                <div style={{ backgroundColor: '#1e293b', border: '1px solid #0284c7', borderRadius: '8px', padding: '0.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8' }}>1</div>
                  <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>Active Task</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
                <button className="btn-gov" style={{ fontSize: '0.75rem', justifyContent: 'center' }} onClick={() => setMobileScreen('SCREENING')}>
                  🩸 Field Screening
                </button>
                <button className="btn-gov" style={{ fontSize: '0.75rem', justifyContent: 'center', backgroundColor: '#334155' }} onClick={() => setMobileScreen('TASK')}>
                  ⚠ Care Gap Tasks
                </button>
              </div>

              {/* Active Patient Card */}
              <div style={{ backgroundColor: '#1e293b', borderRadius: '8px', padding: '0.85rem', border: `1px solid ${demoStep === 6 || demoStep === 7 ? '#ef4444' : '#334155'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Meena Devi (CF-P1001)</div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Karamadai Village • 28F</div>
                  </div>
                  <span className={`badge ${demoStep === 6 || demoStep === 7 ? 'badge-unavailable' : 'badge-limited'}`}>
                    {demoStep === 6 || demoStep === 7 ? 'SLA BREACH' : 'ACTIVE'}
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.65rem' }}>
                  <strong>Journey ID:</strong> CFJ-1001 | <strong>Stage:</strong> {demoStep === 12 ? 'COMPLETED' : 'TRIAGE / REFERRAL'}
                </div>
                <button className="btn-gov" style={{ width: '100%', fontSize: '0.75rem', justifyContent: 'center' }} onClick={() => setMobileScreen('JOURNEY')}>
                  काळजी प्रवास पहा (View Journey) →
                </button>
              </div>
            </div>
          )}

          {mobileScreen === 'SCREENING' && (
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem', color: '#38bdf8' }}>
                🩸 Field Screening Form — Meena Devi
              </div>
              {savedStatus && (
                <div style={{ fontSize: '0.75rem', backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#86efac', padding: '0.4rem 0.6rem', borderRadius: '4px', marginBottom: '0.75rem' }}>
                  {savedStatus}
                </div>
              )}
              <form onSubmit={handleSaveScreening}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Systolic (BP)</label>
                    <input type="number" className="form-control" value={systolic} onChange={(e) => setSystolic(e.target.value)} style={{ backgroundColor: '#1e293b', color: 'white', textAlign: 'center' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Diastolic (BP)</label>
                    <input type="number" className="form-control" value={diastolic} onChange={(e) => setDiastolic(e.target.value)} style={{ backgroundColor: '#1e293b', color: 'white', textAlign: 'center' }} />
                  </div>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#fca5a5', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '4px', marginBottom: '0.75rem' }}>
                  ⚠ High Risk Flagged: BP 160/100 mmHg exceeds threshold.
                </div>
                <button type="submit" className="btn-gov" style={{ width: '100%', fontSize: '0.75rem', justifyContent: 'center' }}>
                  जतन करा व पुढे जा (Save & Progress)
                </button>
              </form>
            </div>
          )}

          {mobileScreen === 'JOURNEY' && (
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#38bdf8' }}>
                🏥 Care Journey CFJ-1001 — Meena Devi
              </div>
              <div style={{ fontSize: '0.725rem', color: '#cbd5e1', marginBottom: '0.75rem' }}>
                13-Stage Journey Engine (ASHA Field View)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem', marginBottom: '0.75rem' }}>
                <button className="btn-gov" style={{ fontSize: '0.675rem', padding: '0.3rem' }} onClick={() => onRunDemoStep(2)}>Screening</button>
                <button className="btn-gov" style={{ fontSize: '0.675rem', padding: '0.3rem' }} onClick={() => onRunDemoStep(4)}>Referral A</button>
                <button className="btn-gov" style={{ fontSize: '0.675rem', padding: '0.3rem', backgroundColor: '#991b1b' }} onClick={() => onRunDemoStep(6)}>🚨 SLA Breach</button>
                <button className="btn-gov" style={{ fontSize: '0.675rem', padding: '0.3rem', backgroundColor: '#b45309' }} onClick={() => onRunDemoStep(8)}>↗ Reroute B</button>
                <button className="btn-gov" style={{ fontSize: '0.675rem', padding: '0.3rem', backgroundColor: '#166534', gridColumn: 'span 2' }} onClick={() => onRunDemoStep(12)}>✅ Close Care</button>
              </div>
            </div>
          )}

          {mobileScreen === 'TASK' && (
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: '#fca5a5' }}>
                ⚠ CARE GAP TASK — TSK-CFJ-1001
              </div>
              <div style={{ backgroundColor: '#1e293b', border: '1px solid #ef4444', borderRadius: '6px', padding: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#fee2e2', marginBottom: '0.4rem' }}>
                  "Follow up on delayed specialist appointment for Meena Devi at District Hospital A."
                </div>
                <button className="btn-gov" style={{ fontSize: '0.725rem', backgroundColor: '#b45309', width: '100%', justifyContent: 'center' }} onClick={() => { onRunDemoStep(8); setMobileScreen('JOURNEY'); }}>
                  ↗ Escalate & Reroute to District Hospital B
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Device Bottom Bar Navigation */}
        <div
          style={{
            backgroundColor: '#1e293b',
            borderTop: '1px solid #334155',
            padding: '0.5rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: '0.25rem'
          }}
        >
          <button
            onClick={() => setMobileScreen('DASHBOARD')}
            style={{ backgroundColor: mobileScreen === 'DASHBOARD' ? '#0284c7' : 'transparent', color: 'white', border: 'none', borderRadius: '4px', padding: '0.4rem', fontSize: '0.675rem', cursor: 'pointer' }}
          >
            Dashboard
          </button>
          <button
            onClick={() => setMobileScreen('JOURNEY')}
            style={{ backgroundColor: mobileScreen === 'JOURNEY' ? '#0284c7' : 'transparent', color: 'white', border: 'none', borderRadius: '4px', padding: '0.4rem', fontSize: '0.675rem', cursor: 'pointer' }}
          >
            Journey
          </button>
          <button
            onClick={() => setMobileScreen('SCREENING')}
            style={{ backgroundColor: mobileScreen === 'SCREENING' ? '#0284c7' : 'transparent', color: 'white', border: 'none', borderRadius: '4px', padding: '0.4rem', fontSize: '0.675rem', cursor: 'pointer' }}
          >
            Screening
          </button>
          <button
            onClick={() => setMobileScreen('TASK')}
            style={{ backgroundColor: mobileScreen === 'TASK' ? '#0284c7' : 'transparent', color: 'white', border: 'none', borderRadius: '4px', padding: '0.4rem', fontSize: '0.675rem', cursor: 'pointer' }}
          >
            Tasks
          </button>
        </div>
      </div>
    </div>
  );
};
