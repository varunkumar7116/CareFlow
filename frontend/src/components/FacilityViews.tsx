import React, { useState, useMemo } from 'react';
import { NavTab } from './Sidebar';
import { ProvenanceBanner } from './ProvenanceBanner';
import {
  LayoutDashboard,
  Building,
  Stethoscope,
  Users,
  Activity,
  Wrench,
  Calendar,
  Send,
  AlertTriangle,
  GitCommit,
  FileText,
  Settings,
  Plus,
  Edit2,
  CheckCircle2,
  Clock,
  UserCheck,
  ShieldCheck,
  Search,
  Filter,
  ChevronRight,
  Info
} from 'lucide-react';

import { LanguageItem } from '../data/languages';
import { getTranslation } from '../data/translations';

interface ViewsProps {
  activeTab: NavTab;
  facilityDetails: any;
  dashboardSummary: any;
  onRefresh: () => void;
  authFetch: (url: string, options?: RequestInit) => Promise<Response>;
  API_BASE: string;
  facilityId: string;
  demoStep: number;
  onRunDemoStep: (stepNum: number) => void;
  journey: any;
  referrals: any[];
  gaps: any[];
  tasks: any[];
  statusMessage: string;
  currentLanguage?: LanguageItem;
}

export const FacilityViews: React.FC<ViewsProps> = ({
  activeTab,
  facilityDetails,
  dashboardSummary,
  onRefresh,
  authFetch,
  API_BASE,
  facilityId,
  demoStep,
  onRunDemoStep,
  journey,
  referrals,
  gaps,
  tasks,
  statusMessage,
  currentLanguage,
}) => {
  const t = getTranslation(currentLanguage?.code || 'mr');
  // Modal visibility states
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [showAddEquipment, setShowAddEquipment] = useState(false);
  const [showAddService, setShowAddService] = useState(false);
  const [showAddDiagnostic, setShowAddDiagnostic] = useState(false);
  const [showAddSlot, setShowAddSlot] = useState(false);

  // Search filter states
  const [serviceSearch, setServiceSearch] = useState('');
  const [doctorSearch, setDoctorSearch] = useState('');
  const [diagnosticSearch, setDiagnosticSearch] = useState('');
  const [equipmentSearch, setEquipmentSearch] = useState('');

  // Form states
  const [docName, setDocName] = useState('');
  const [docSpec, setDocSpec] = useState('');
  const [docDesig, setDocDesig] = useState('Senior Medical Officer');
  const [docSched, setDocSched] = useState('Mon-Fri 09:00 - 14:00');

  const [eqName, setEqName] = useState('');
  const [eqCat, setEqCat] = useState('DIAGNOSTIC');
  const [eqQty, setEqQty] = useState('2');

  const [srvName, setSrvName] = useState('');
  const [srvCat, setSrvCat] = useState('CLINICAL');
  const [srvHours, setSrvHours] = useState('08:00 - 16:00');

  const [diagName, setDiagName] = useState('');
  const [diagCat, setDiagCat] = useState('PATHOLOGY');
  const [diagHours, setDiagHours] = useState('08:00 - 16:00');
  const [diagTat, setDiagTat] = useState('30 mins');

  const [slotDoc, setSlotDoc] = useState('Dr. Rajesh Kumar');
  const [slotSrv, setSlotSrv] = useState('General Consultation');
  const [slotTime, setSlotTime] = useState('09:00 - 10:00');
  const [slotCap, setSlotCap] = useState('10');

  const govRef = facilityDetails?.governmentReference || {
    name: 'Government PHC, Karamadai',
    facilityType: 'PHC',
    district: 'Coimbatore',
    state: 'Tamil Nadu',
    latitude: 11.2435,
    longitude: 76.9602,
    ownership: 'GOVERNMENT',
    ninId: 'NIN-TN-CBE-001',
    sourceMetadata: {
      sourceType: 'GOVERNMENT_REFERENCE',
      sourceName: 'National Hospital Directory (MoHFW OGD Snapshot)',
      sourceStatus: 'PUBLIC_DATASET',
      isLive: false,
      lastUpdated: '02/06/2025'
    }
  };

  const opStatus = facilityDetails?.operationalStatus || {
    operatingStatus: 'OPERATIONAL',
    operatingHours: 'Mon-Sat: 08:00 - 17:00',
    contactPhone: '+914254272100',
    capacityTotalBeds: 30,
    capacityAvailableBeds: 24,
    lastVerifiedBy: 'Dr. Rajesh Kumar',
    lastVerifiedAt: new Date().toISOString(),
    notes: 'Normal operational capacity'
  };

  const services = facilityDetails?.services || [];
  const professionals = facilityDetails?.professionals || [];
  const equipment = facilityDetails?.equipment || [];
  const diagnostics = facilityDetails?.diagnostics || [];
  const slots = facilityDetails?.appointmentSlots || [];

  const formatTimestamp = (ts?: string) => {
    if (!ts) return 'Verified Today';
    try {
      const d = new Date(ts);
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' +
             d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return ts;
    }
  };

  // Form submission handlers
  const handleAddDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName) return;
    await authFetch(`${API_BASE}/facilities/${facilityId}/professionals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: docName,
        specialization: docSpec || 'General Medicine',
        designation: docDesig,
        qualification: 'MBBS',
        department: 'Clinical Services',
        consultationSchedule: docSched,
        availabilityStatus: 'AVAILABLE',
        teleconsultationAvailable: true
      })
    });
    setDocName('');
    setDocSpec('');
    setShowAddDoctor(false);
    onRefresh();
  };

  const handleAddEquipment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eqName) return;
    await authFetch(`${API_BASE}/facilities/${facilityId}/equipment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: eqName,
        category: eqCat,
        quantity: parseInt(eqQty, 10),
        availableQuantity: parseInt(eqQty, 10),
        status: 'AVAILABLE',
        maintenanceStatus: 'Operational. Verified'
      })
    });
    setEqName('');
    setShowAddEquipment(false);
    onRefresh();
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!srvName) return;
    await authFetch(`${API_BASE}/facilities/${facilityId}/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        serviceName: srvName,
        category: srvCat,
        availabilityStatus: 'AVAILABLE',
        operatingHours: srvHours,
        description: 'Facility operational clinical service'
      })
    });
    setSrvName('');
    setShowAddService(false);
    onRefresh();
  };

  const handleAddDiagnostic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!diagName) return;
    await authFetch(`${API_BASE}/facilities/${facilityId}/diagnostics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        testName: diagName,
        category: diagCat,
        availability: 'AVAILABLE',
        operatingHours: diagHours,
        turnaroundTime: diagTat,
        requiredEquipment: 'Laboratory Unit'
      })
    });
    setDiagName('');
    setShowAddDiagnostic(false);
    onRefresh();
  };

  const handleAddSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    await authFetch(`${API_BASE}/facilities/${facilityId}/appointments/slots`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        doctorName: slotDoc,
        serviceName: slotSrv,
        slotDate: new Date().toISOString().split('T')[0],
        startTime: slotTime.split('-')[0].trim(),
        endTime: slotTime.split('-')[1]?.trim() || '11:00',
        maxCapacity: parseInt(slotCap, 10),
        bookedCount: 0,
        status: 'AVAILABLE'
      })
    });
    setShowAddSlot(false);
    onRefresh();
  };

  // Breadcrumb renderer
  const renderBreadcrumb = (currentView: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.775rem', color: '#64748b', marginBottom: '0.5rem' }}>
      <span>{t.breadcrumbPortal}</span>
      <ChevronRight size={12} />
      <span>{govRef.name}</span>
      <ChevronRight size={12} />
      <span style={{ color: '#0f172a', fontWeight: 600 }}>{currentView}</span>
    </div>
  );

  // STAGE ORDER DEFINITION (13 Stages)
  const STAGE_CONFIG: { stage: string; label: string; humanTerm: string }[] = [
    { stage: 'REGISTRATION', label: '1. Registration', humanTerm: 'Patient Enters' },
    { stage: 'SCREENING', label: '2. Screening', humanTerm: 'Field Screening' },
    { stage: 'TRIAGE', label: '3. Triage', humanTerm: 'Clinical Triage' },
    { stage: 'CONSULTATION', label: '4. Consultation', humanTerm: 'Primary Consult' },
    { stage: 'DIAGNOSTICS', label: '5. Diagnostics', humanTerm: 'Lab & Scan' },
    { stage: 'REFERRAL', label: '6. Referral', humanTerm: 'Inter-Facility Referral' },
    { stage: 'APPOINTMENT', label: '7. Appointment', humanTerm: 'Specialist Slot' },
    { stage: 'TRANSPORT', label: '8. Transport', humanTerm: 'Ambulance / Escort' },
    { stage: 'HOSPITAL', label: '9. Arrival', humanTerm: 'Hospital Arrival' },
    { stage: 'TREATMENT', label: '10. Treatment', humanTerm: 'Specialist Care' },
    { stage: 'MEDICINE', label: '11. Medicine', humanTerm: 'Pharmacy Dispensed' },
    { stage: 'FOLLOW_UP', label: '12. Follow-Up', humanTerm: 'CHW Home Visit' },
    { stage: 'COMPLETED', label: '13. Care Closed', humanTerm: 'Journey Closed' },
  ];

  const currentStageName = journey?.currentStage || 'REGISTRATION';
  const currentStageIndex = STAGE_CONFIG.findIndex(s => s.stage === currentStageName);

  // Render 13-Stage Timeline Bar
  const renderCareTimeline = () => (
    <div className="gov-card" style={{ marginBottom: '1.25rem', borderLeft: '4px solid #0284c7' }}>
      <div className="gov-card-header" style={{ marginBottom: '0.75rem' }}>
        <div className="gov-card-title">
          <GitCommit size={18} color="#0284c7" />
          <span>Care Journey Timeline — CFJ-1001 (Patient: Meena Devi)</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span className="provenance-tag" style={{ backgroundColor: '#e0f2fe', color: '#0369a1' }}>CAREFLOW_TRANSACTION</span>
          <span className="provenance-tag" style={{ backgroundColor: '#fef3c7', color: '#92400e' }}>SYNTHETIC_DEMO</span>
        </div>
      </div>

      {/* Patient Meta Banner */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc', padding: '0.65rem 0.85rem', borderRadius: '4px', border: '1px solid #e2e8f0', marginBottom: '1rem', fontSize: '0.8rem' }}>
        <div><strong>Patient Name:</strong> Meena Devi (CF-P1001)</div>
        <div><strong>Journey ID:</strong> CFJ-1001</div>
        <div>
          <strong>Access Channel:</strong> <span className="badge badge-available">ASHA / CHW Assisted Entry</span>
          <span style={{ fontSize: '0.7rem', color: '#64748b', marginLeft: '0.4rem' }}>(Supports IVR, Mobile App, CHW)</span>
        </div>
        <div><strong>Status:</strong> <span className={`badge ${journey?.status === 'COMPLETED' ? 'badge-available' : demoStep === 6 || demoStep === 7 ? 'badge-unavailable' : 'badge-limited'}`}>{journey?.status || 'ACTIVE'}</span></div>
      </div>

      {/* 13 Stage Visual Timeline Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(105px, 1fr))', gap: '0.4rem' }}>
        {STAGE_CONFIG.map((item, idx) => {
          const isCompleted = idx < currentStageIndex || journey?.status === 'COMPLETED';
          const isCurrent = idx === currentStageIndex && journey?.status !== 'COMPLETED';
          const isException = (demoStep === 6 || demoStep === 7) && item.stage === 'APPOINTMENT';
          const isEscalated = demoStep === 8 && item.stage === 'APPOINTMENT';

          let bgColor = '#ffffff';
          let borderColor = '#cbd5e1';
          let textColor = '#475569';
          let statusSymbol = '○';

          if (isException) {
            bgColor = '#fef2f2';
            borderColor = '#ef4444';
            textColor = '#991b1b';
            statusSymbol = '⚠ EXCEPTION';
          } else if (isEscalated) {
            bgColor = '#fffbebe';
            borderColor = '#f59e0b';
            textColor = '#b45309';
            statusSymbol = '↗ REROUTED';
          } else if (isCompleted) {
            bgColor = '#f0fdf4';
            borderColor = '#86efac';
            textColor = '#166534';
            statusSymbol = '✓ Done';
          } else if (isCurrent) {
            bgColor = '#eff6ff';
            borderColor = '#3b82f6';
            textColor = '#1d4ed8';
            statusSymbol = '● Current';
          }

          return (
            <div
              key={item.stage}
              style={{
                backgroundColor: bgColor,
                border: `1px solid ${borderColor}`,
                padding: '0.5rem 0.4rem',
                borderRadius: '4px',
                textAlign: 'center',
                boxShadow: isCurrent ? '0 0 0 2px rgba(59, 130, 246, 0.2)' : 'none'
              }}
            >
              <div style={{ fontSize: '0.675rem', color: textColor, fontWeight: 700 }}>
                {item.label}
              </div>
              <div style={{ fontSize: '0.625rem', color: '#64748b', marginTop: '0.15rem' }}>
                {item.humanTerm}
              </div>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, marginTop: '0.25rem', color: textColor }}>
                {statusSymbol}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Render 12-Step Interactive Demo Action Bar
  const renderDemoBar = () => {
    const demoStepsList = [
      { num: 1, title: '1. Patient Entry', desc: 'ASHA / CHW' },
      { num: 2, title: '2. Triage (BP 160/100)', desc: 'High Priority' },
      { num: 3, title: '3. Diagnostics', desc: 'Ultrasound Order' },
      { num: 4, title: '4. Referral Hospital A', desc: 'Specialty Sent' },
      { num: 5, title: '5. Referral Accepted', desc: 'Hospital A' },
      { num: 6, title: '6. 🚨 SLA Breach', desc: 'Appt Delayed' },
      { num: 7, title: '7. Care Gap & Task', desc: 'CHW Dispatched' },
      { num: 8, title: '8. ↗ Escalate Match', desc: 'Hospital B Match' },
      { num: 9, title: '9. Appt Confirmed B', desc: 'Care Recovered' },
      { num: 10, title: '10. Transport & Arrival', desc: 'Patient Arrived' },
      { num: 11, title: '11. Treatment & Meds', desc: 'Care Provided' },
      { num: 12, title: '12. ✅ Close Care', desc: 'Journey Completed' },
    ];

    return (
      <div className="gov-card" style={{ marginBottom: '1.25rem', backgroundColor: '#0f172a', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8' }}>
            <Activity size={18} color="#38bdf8" />
            <span>Interactive Demo Action Runner — Continuous Story (Judge Control Panel)</span>
          </div>
          <button
            className="btn-gov"
            style={{ fontSize: '0.725rem', padding: '0.25rem 0.5rem', backgroundColor: '#334155', color: '#cbd5e1', border: '1px solid #475569' }}
            onClick={() => onRunDemoStep(1)}
          >
            Reset Demo Journey (CFJ-1001)
          </button>
        </div>

        <div style={{ fontSize: '0.775rem', padding: '0.45rem 0.75rem', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '4px', color: '#e2e8f0', marginBottom: '0.75rem' }}>
          <strong>Status:</strong> {statusMessage}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.4rem' }}>
          {demoStepsList.map((s) => {
            const isActive = demoStep === s.num;
            const isDone = demoStep > s.num;
            const isFailureStep = s.num === 6;

            let btnBg = '#1e293b';
            let btnBorder = '#334155';
            let btnText = '#94a3b8';

            if (isFailureStep) {
              btnBg = isActive ? '#991b1b' : '#450a0a';
              btnBorder = '#ef4444';
              btnText = '#fca5a5';
            } else if (isActive) {
              btnBg = '#0284c7';
              btnBorder = '#38bdf8';
              btnText = '#ffffff';
            } else if (isDone) {
              btnBg = '#14532d';
              btnBorder = '#22c55e';
              btnText = '#86efac';
            }

            return (
              <button
                key={s.num}
                onClick={() => onRunDemoStep(s.num)}
                style={{
                  backgroundColor: btnBg,
                  border: `1px solid ${btnBorder}`,
                  color: btnText,
                  padding: '0.45rem 0.35rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ fontSize: '0.7rem', fontWeight: 700 }}>{s.title}</div>
                <div style={{ fontSize: '0.625rem', opacity: 0.85 }}>{s.desc}</div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // DASHBOARD VIEW
  if (activeTab === 'dashboard') {
    const totalEqCount = dashboardSummary?.totalEquipment || equipment.length || 5;
    const availEqCount = dashboardSummary?.availableEquipment || equipment.filter((e: any) => e.status === 'AVAILABLE').length || 4;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {renderBreadcrumb(t.breadcrumbDashboard)}

        <ProvenanceBanner
          sourceType="GOVERNMENT_REFERENCE & FACILITY_MANAGED"
          sourceName={t.infoSourceLabel}
          sourceStatus="PUBLIC_DATASET / FACILITY_MANAGED"
          isLive={false}
          lastUpdated="02/06/2025"
          lastVerifiedBy={opStatus.lastVerifiedBy}
          isStale={dashboardSummary?.stale}
        />

        {/* 13-Stage Timeline Component */}
        {renderCareTimeline()}

        {/* 12-Step Interactive Demo Runner Bar */}
        {renderDemoBar()}

        <div className="kpi-grid">
          <div className="kpi-card" style={{ borderTopColor: '#0284c7' }}>
            <div className="kpi-label">{t.operationalStatus}</div>
            <div className="kpi-value" style={{ fontSize: '1.25rem', color: '#166534' }}>
              {opStatus.operatingStatus === 'OPERATIONAL' ? t.statusOperational : opStatus.operatingStatus}
            </div>
            <div className="kpi-sub">{t.bedsAvailableLabel}: {opStatus.capacityAvailableBeds} / {opStatus.capacityTotalBeds}</div>
          </div>

          <div className="kpi-card" style={{ borderTopColor: '#16a34a' }}>
            <div className="kpi-label">{t.activeDoctors}</div>
            <div className="kpi-value">
              {dashboardSummary?.availableDoctors ?? professionals.filter((p: any) => p.availabilityStatus === 'AVAILABLE').length}
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}> / {dashboardSummary?.totalDoctors || professionals.length || 3} {t.activeSuffix}</span>
            </div>
            <div className="kpi-sub">{t.docRegistrySub}</div>
          </div>

          <div className="kpi-card" style={{ borderTopColor: '#d97706' }}>
            <div className="kpi-label">{t.diagnosticsTitle}</div>
            <div className="kpi-value">
              {dashboardSummary?.availableDiagnostics ?? diagnostics.filter((d: any) => d.availability === 'AVAILABLE').length}
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}> / {dashboardSummary?.totalDiagnostics || diagnostics.length || 4} {t.diagAvailableSuffix}</span>
            </div>
            <div className="kpi-sub">{t.diagSub}</div>
          </div>

          <div className="kpi-card" style={{ borderTopColor: '#0891b2' }}>
            <div className="kpi-label">{t.equipmentAvailable}</div>
            <div className="kpi-value">
              {availEqCount}
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}> / {totalEqCount} {t.eqOperationalSuffix}</span>
            </div>
            <div className="kpi-sub">{t.eqSub}</div>
          </div>

          <div className="kpi-card" style={{ borderTopColor: '#9333ea' }}>
            <div className="kpi-label">{t.appointmentSlotsTitle}</div>
            <div className="kpi-value">
              {dashboardSummary?.totalSlotsAvailable ?? slots.length ?? 3}
            </div>
            <div className="kpi-sub">{t.appointmentSlotsSub}</div>
          </div>
        </div>

        {/* Failure & Recovery Care Gap Alert Panel */}
        {(demoStep === 6 || demoStep === 7 || demoStep === 8) && (
          <div className="gov-card" style={{ borderLeft: '5px solid #ef4444', backgroundColor: '#fef2f2' }}>
            <div className="gov-card-header">
              <div className="gov-card-title" style={{ color: '#991b1b' }}>
                <AlertTriangle size={20} color="#ef4444" />
                <span>⚠ CARE GAP DETECTED — SLA BREACH</span>
              </div>
              <span className="badge badge-unavailable">SLA BREACH (HIGH PRIORITY)</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#7f1d1d', marginBottom: '0.75rem' }}>
              <strong>Patient:</strong> Meena Devi (CF-P1001) | <strong>Care Journey:</strong> CFJ-1001 | <strong>Issue:</strong> Referral accepted by District Hospital A, but specialist appointment confirmation exceeded configured 24h SLA.
            </div>

            {/* Auto Task Dispatched Card */}
            <div style={{ backgroundColor: 'white', border: '1px solid #fca5a5', padding: '0.75rem', borderRadius: '4px', marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#991b1b', marginBottom: '0.35rem' }}>
                Action Task Dispatched to CHW Meera Bai:
              </div>
              <div style={{ fontSize: '0.8rem', color: '#334155' }}>
                "Follow up on delayed specialist appointment for Meena Devi at District Hospital A."
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.65rem' }}>
                <button className="btn-gov" style={{ fontSize: '0.75rem', backgroundColor: '#b45309', color: 'white' }} onClick={() => onRunDemoStep(8)}>
                  ↗ Escalate & Reroute to Available Matching Facility
                </button>
              </div>
            </div>

            {/* Facility Matcher Box */}
            {demoStep === 8 && (
              <div style={{ backgroundColor: '#fffbebe', border: '1px solid #fcd34d', padding: '0.75rem', borderRadius: '4px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#92400e', marginBottom: '0.35rem' }}>
                  Deterministic Referral Matcher:
                </div>
                <div style={{ fontSize: '0.8rem', color: '#78350f', marginBottom: '0.5rem' }}>
                  Requirements: Specialty: <strong>Obstetrics</strong> | Diagnostic: <strong>Ultrasound Scanner</strong> | Priority: <strong>HIGH</strong><br />
                  Candidate Facility: <strong>District Hospital B (Rampur)</strong> — <span style={{ color: '#166534', fontWeight: 700 }}>✓ Matches referral requirements</span>
                </div>
                <button className="btn-gov" style={{ fontSize: '0.75rem', backgroundColor: '#166534', color: 'white' }} onClick={() => onRunDemoStep(9)}>
                  ✓ Accept Referral & Confirm Appointment at District Hospital B
                </button>
              </div>
            )}
          </div>
        )}

        {/* Closed Care Success Panel */}
        {demoStep === 12 && (
          <div className="gov-card" style={{ borderLeft: '5px solid #16a34a', backgroundColor: '#f0fdf4' }}>
            <div className="gov-card-header">
              <div className="gov-card-title" style={{ color: '#14532d' }}>
                <CheckCircle2 size={20} color="#16a34a" />
                <span>✅ CARE JOURNEY COMPLETED & SAFELY CLOSED</span>
              </div>
              <span className="badge badge-available">CARE CLOSED</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#166534' }}>
              <strong>Patient:</strong> Meena Devi (CF-P1001) | <strong>Care Journey:</strong> CFJ-1001<br />
              <strong>Outcome:</strong> Closed-loop care cycle completed successfully through District Hospital B. Follow-up recorded. Open Care Gaps: <strong>0</strong>.
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div className="gov-card">
            <div className="gov-card-header">
              <div className="gov-card-title">
                <Send size={18} color="#0284c7" />
                <span>{t.pendingReferralsTitle}</span>
              </div>
              <span className="provenance-tag">CAREFLOW_TRANSACTION</span>
            </div>
            {referrals && referrals.length > 0 ? (
              <div className="table-responsive">
                <table className="gov-table">
                  <thead>
                    <tr>
                      <th>{t.patientName}</th>
                      <th>{t.colSpecialization}</th>
                      <th>{t.colStatus}</th>
                      <th>{t.colActions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referrals.map((r) => (
                      <tr key={r.id}>
                        <td>Meena Devi (CF-P1001)</td>
                        <td>{r.specialtyRequired || 'Obstetrics'}</td>
                        <td><span className={`badge ${r.appointmentStatus === 'DELAYED' ? 'badge-unavailable' : 'badge-limited'}`}>{r.appointmentStatus === 'DELAYED' ? 'SLA BREACH' : r.status}</span></td>
                        <td>
                          <button className="btn-gov" style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }} onClick={() => onRunDemoStep(demoStep >= 6 ? 8 : 5)}>
                            {demoStep >= 6 ? 'Escalate / Reroute' : 'View Details'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
                <Info size={24} style={{ marginBottom: '0.4rem', opacity: 0.6 }} />
                <p>{t.noPendingReferralsMsg}</p>
              </div>
            )}
          </div>

          <div className="gov-card">
            <div className="gov-card-header">
              <div className="gov-card-title">
                <AlertTriangle size={18} color="#dc2626" />
                <span>{t.safetyNetGapsTitle}</span>
              </div>
              <span className="provenance-tag">CAREFLOW_TRANSACTION</span>
            </div>
            {gaps && gaps.length > 0 ? (
              <div className="table-responsive">
                <table className="gov-table">
                  <thead>
                    <tr>
                      <th>{t.colName}</th>
                      <th>{t.colStatus}</th>
                      <th>{t.colActions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gaps.map((g) => (
                      <tr key={g.id}>
                        <td>{g.description}</td>
                        <td><span className="badge badge-unavailable">SLA BREACH</span></td>
                        <td>
                          <button className="btn-gov" style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }} onClick={() => onRunDemoStep(8)}>
                            Escalate & Match
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
                <CheckCircle2 size={24} color="#166534" style={{ marginBottom: '0.4rem', opacity: 0.8 }} />
                <p>{t.noActiveGapsMsg}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // FACILITY PROFILE VIEW
  if (activeTab === 'facility') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {renderBreadcrumb('Facility Profile')}

        <ProvenanceBanner
          sourceType="GOVERNMENT_REFERENCE & FACILITY_MANAGED"
          sourceName="National Hospital Directory (MoHFW OGD Dataset) + Facility Operational Registry"
          sourceStatus="PUBLIC_DATASET / FACILITY_MANAGED"
          isLive={false}
          lastUpdated="02/06/2025"
          lastVerifiedBy={opStatus.lastVerifiedBy}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div className="gov-card">
            <div className="gov-card-header">
              <div className="gov-card-title">
                <Building size={18} color="#0284c7" />
                <span>GOVERNMENT REFERENCE INFORMATION</span>
              </div>
              <span className="provenance-tag">GOVERNMENT_REFERENCE</span>
            </div>
            <table className="gov-table">
              <tbody>
                <tr>
                  <td><strong>Facility Name</strong></td>
                  <td>{govRef.name}</td>
                </tr>
                <tr>
                  <td><strong>Facility Type</strong></td>
                  <td>{govRef.facilityType}</td>
                </tr>
                <tr>
                  <td><strong>District</strong></td>
                  <td>{govRef.district}</td>
                </tr>
                <tr>
                  <td><strong>State</strong></td>
                  <td>{govRef.state}</td>
                </tr>
                <tr>
                  <td><strong>Geo Location</strong></td>
                  <td>Lat: {govRef.latitude}, Long: {govRef.longitude}</td>
                </tr>
                <tr>
                  <td><strong>Ownership</strong></td>
                  <td>{govRef.ownership}</td>
                </tr>
                <tr>
                  <td><strong>Government Reference ID</strong></td>
                  <td>
                    <span>{govRef.ninId}</span>
                    <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>
                      Source: Government reference dataset (MoHFW National Hospital Directory)
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="gov-card">
            <div className="gov-card-header">
              <div className="gov-card-title">
                <ShieldCheck size={18} color="#166534" />
                <span>FACILITY-MANAGED OPERATIONAL DATA</span>
              </div>
              <span className="provenance-tag" style={{ backgroundColor: '#dcfce7', color: '#166534' }}>FACILITY_MANAGED</span>
            </div>
            <table className="gov-table">
              <tbody>
                <tr>
                  <td><strong>Operating Status</strong></td>
                  <td><span className="badge badge-available">{opStatus.operatingStatus}</span></td>
                </tr>
                <tr>
                  <td><strong>Operating Hours</strong></td>
                  <td>{opStatus.operatingHours}</td>
                </tr>
                <tr>
                  <td><strong>Contact Phone</strong></td>
                  <td>{opStatus.contactPhone}</td>
                </tr>
                <tr>
                  <td><strong>Bed Capacity</strong></td>
                  <td>Total: {opStatus.capacityTotalBeds}, Available: {opStatus.capacityAvailableBeds}</td>
                </tr>
                <tr>
                  <td><strong>Operational Notes</strong></td>
                  <td>{opStatus.notes}</td>
                </tr>
                <tr>
                  <td><strong>Last Verified By</strong></td>
                  <td>{opStatus.lastVerifiedBy || 'Facility Administrator'}</td>
                </tr>
                <tr>
                  <td><strong>Last Verified At</strong></td>
                  <td>{formatTimestamp(opStatus.lastVerifiedAt)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // SERVICES VIEW
  if (activeTab === 'services') {
    const filteredServices = services.filter((s: any) =>
      s.serviceName?.toLowerCase().includes(serviceSearch.toLowerCase()) ||
      s.category?.toLowerCase().includes(serviceSearch.toLowerCase())
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {renderBreadcrumb('Services Registry')}

        <ProvenanceBanner
          sourceType="FACILITY_MANAGED"
          sourceName="CareFlow Facility Operational Services Registry"
          sourceStatus="FACILITY_MANAGED"
          lastVerifiedBy={opStatus.lastVerifiedBy}
        />

        <div className="gov-card">
          <div className="gov-card-header">
            <div className="gov-card-title">
              <Stethoscope size={18} color="#0284c7" />
              <span>Facility Operational Services Registry</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: '8px', top: '9px', color: '#64748b' }} />
                <input
                  type="text"
                  className="form-control"
                  style={{ paddingLeft: '1.8rem', fontSize: '0.8rem', width: '200px' }}
                  placeholder="Filter services..."
                  value={serviceSearch}
                  onChange={(e) => setServiceSearch(e.target.value)}
                />
              </div>
              <button className="btn-gov" onClick={() => setShowAddService(true)}>
                <Plus size={14} />
                <span>Add Service</span>
              </button>
            </div>
          </div>

          {showAddService && (
            <form onSubmit={handleAddService} style={{ backgroundColor: '#f8fafc', padding: '1rem', border: '1px solid #cbd5e1', borderRadius: '6px', marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: '#0f172a' }}>Add New Operational Service</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label>Service Name</label>
                  <input className="form-control" value={srvName} onChange={(e) => setSrvName(e.target.value)} placeholder="e.g. Antenatal Care Clinic" required />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select className="form-control" value={srvCat} onChange={(e) => setSrvCat(e.target.value)}>
                    <option value="CLINICAL">CLINICAL</option>
                    <option value="MATERNAL">MATERNAL</option>
                    <option value="PREVENTIVE">PREVENTIVE</option>
                    <option value="EMERGENCY">EMERGENCY</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Operating Hours</label>
                  <input className="form-control" value={srvHours} onChange={(e) => setSrvHours(e.target.value)} required />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn-gov">Save Service</button>
                <button type="button" className="btn-gov-secondary" onClick={() => setShowAddService(false)}>Cancel</button>
              </div>
            </form>
          )}

          {filteredServices.length > 0 ? (
            <div className="table-responsive">
              <table className="gov-table">
                <thead>
                  <tr>
                    <th>Service Name</th>
                    <th>Category</th>
                    <th>Availability Status</th>
                    <th>Operating Hours</th>
                    <th>Last Verified</th>
                    <th>Provenance</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.map((s: any) => (
                    <tr key={s.id}>
                      <td><strong>{s.serviceName}</strong></td>
                      <td>{s.category || 'CLINICAL'}</td>
                      <td>
                        <span className={`badge ${s.availabilityStatus === 'AVAILABLE' ? 'badge-available' : 'badge-limited'}`}>
                          {s.availabilityStatus}
                        </span>
                      </td>
                      <td>{s.operatingHours || '08:00 - 16:00'}</td>
                      <td>{formatTimestamp(s.lastVerifiedAt)}</td>
                      <td><span className="provenance-tag">FACILITY_MANAGED</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
              <p style={{ fontWeight: 600 }}>No operational services match your filter criteria.</p>
              <p style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>Use the "Add Service" button above to register new facility services.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // DOCTORS VIEW
  if (activeTab === 'doctors') {
    const filteredDoctors = professionals.filter((p: any) =>
      p.name?.toLowerCase().includes(doctorSearch.toLowerCase()) ||
      p.specialization?.toLowerCase().includes(doctorSearch.toLowerCase()) ||
      p.designation?.toLowerCase().includes(doctorSearch.toLowerCase())
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {renderBreadcrumb('Doctors & Healthcare Staff')}

        <ProvenanceBanner
          sourceType="FACILITY_MANAGED"
          sourceName="CareFlow Healthcare Professional Registry"
          sourceStatus="FACILITY_MANAGED"
          lastVerifiedBy={opStatus.lastVerifiedBy}
        />

        <div style={{ backgroundColor: '#f0f9ff', border: '1px solid #bae6fd', color: '#0369a1', padding: '0.65rem 1rem', borderRadius: '6px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Info size={16} />
          <span>Professional records are facility-managed operational accounts. Government public datasets do not expose individual clinician passwords or personal accounts.</span>
        </div>

        <div className="gov-card">
          <div className="gov-card-header">
            <div className="gov-card-title">
              <Users size={18} color="#0284c7" />
              <span>Healthcare Professionals & Doctors Registry</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: '8px', top: '9px', color: '#64748b' }} />
                <input
                  type="text"
                  className="form-control"
                  style={{ paddingLeft: '1.8rem', fontSize: '0.8rem', width: '200px' }}
                  placeholder="Filter professionals..."
                  value={doctorSearch}
                  onChange={(e) => setDoctorSearch(e.target.value)}
                />
              </div>
              <button className="btn-gov" onClick={() => setShowAddDoctor(true)}>
                <Plus size={14} />
                <span>Add Professional</span>
              </button>
            </div>
          </div>

          {showAddDoctor && (
            <form onSubmit={handleAddDoctor} style={{ backgroundColor: '#f8fafc', padding: '1rem', border: '1px solid #cbd5e1', borderRadius: '6px', marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: '#0f172a' }}>Add New Healthcare Professional</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input className="form-control" value={docName} onChange={(e) => setDocName(e.target.value)} placeholder="Dr. S. Meenakshi" required />
                </div>
                <div className="form-group">
                  <label>Specialization</label>
                  <input className="form-control" value={docSpec} onChange={(e) => setDocSpec(e.target.value)} placeholder="Obstetrics & Gynecology" required />
                </div>
                <div className="form-group">
                  <label>Designation</label>
                  <input className="form-control" value={docDesig} onChange={(e) => setDocDesig(e.target.value)} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn-gov">Save Professional</button>
                <button type="button" className="btn-gov-secondary" onClick={() => setShowAddDoctor(false)}>Cancel</button>
              </div>
            </form>
          )}

          {filteredDoctors.length > 0 ? (
            <div className="table-responsive">
              <table className="gov-table">
                <thead>
                  <tr>
                    <th>Doctor / Professional Name</th>
                    <th>Specialization</th>
                    <th>Designation</th>
                    <th>Consultation Schedule</th>
                    <th>Availability</th>
                    <th>Teleconsultation</th>
                    <th>Last Verified</th>
                    <th>Provenance</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDoctors.map((p: any) => (
                    <tr key={p.id}>
                      <td><strong>{p.name}</strong></td>
                      <td>{p.specialization}</td>
                      <td>{p.designation}</td>
                      <td>{p.consultationSchedule || 'Mon-Sat 09:00 - 14:00'}</td>
                      <td>
                        <span className={`badge ${p.availabilityStatus === 'AVAILABLE' ? 'badge-available' : 'badge-limited'}`}>
                          {p.availabilityStatus}
                        </span>
                      </td>
                      <td>{p.teleconsultationAvailable ? 'Active' : 'Unavailable'}</td>
                      <td>{formatTimestamp(p.lastVerifiedAt)}</td>
                      <td><span className="provenance-tag">FACILITY_MANAGED</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
              <p style={{ fontWeight: 600 }}>No healthcare professionals match your filter criteria.</p>
              <p style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>Use the "Add Professional" button above to register healthcare staff.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // DIAGNOSTICS VIEW
  if (activeTab === 'diagnostics') {
    const filteredDiags = diagnostics.filter((d: any) =>
      d.testName?.toLowerCase().includes(diagnosticSearch.toLowerCase()) ||
      d.category?.toLowerCase().includes(diagnosticSearch.toLowerCase())
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {renderBreadcrumb('Diagnostics Availability')}

        <ProvenanceBanner
          sourceType="FACILITY_MANAGED"
          sourceName="CareFlow Diagnostic Test Registry"
          sourceStatus="FACILITY_MANAGED"
        />

        <div className="gov-card">
          <div className="gov-card-header">
            <div className="gov-card-title">
              <Activity size={18} color="#0284c7" />
              <span>Diagnostic Tests & Services Availability</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: '8px', top: '9px', color: '#64748b' }} />
                <input
                  type="text"
                  className="form-control"
                  style={{ paddingLeft: '1.8rem', fontSize: '0.8rem', width: '200px' }}
                  placeholder="Filter diagnostics..."
                  value={diagnosticSearch}
                  onChange={(e) => setDiagnosticSearch(e.target.value)}
                />
              </div>
              <button className="btn-gov" onClick={() => setShowAddDiagnostic(true)}>
                <Plus size={14} />
                <span>Add Diagnostic Test</span>
              </button>
            </div>
          </div>

          {showAddDiagnostic && (
            <form onSubmit={handleAddDiagnostic} style={{ backgroundColor: '#f8fafc', padding: '1rem', border: '1px solid #cbd5e1', borderRadius: '6px', marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: '#0f172a' }}>Add New Diagnostic Test</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label>Test Name</label>
                  <input className="form-control" value={diagName} onChange={(e) => setDiagName(e.target.value)} placeholder="e.g. Ultrasound Pelvis" required />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select className="form-control" value={diagCat} onChange={(e) => setDiagCat(e.target.value)}>
                    <option value="PATHOLOGY">PATHOLOGY</option>
                    <option value="RADIOLOGY">RADIOLOGY</option>
                    <option value="ULTRASOUND">ULTRASOUND</option>
                    <option value="CARDIOLOGY">CARDIOLOGY</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Turnaround Time</label>
                  <input className="form-control" value={diagTat} onChange={(e) => setDiagTat(e.target.value)} required />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn-gov">Save Diagnostic Test</button>
                <button type="button" className="btn-gov-secondary" onClick={() => setShowAddDiagnostic(false)}>Cancel</button>
              </div>
            </form>
          )}

          {filteredDiags.length > 0 ? (
            <div className="table-responsive">
              <table className="gov-table">
                <thead>
                  <tr>
                    <th>Test Name</th>
                    <th>Category</th>
                    <th>Availability</th>
                    <th>Operating Hours</th>
                    <th>Turnaround Time</th>
                    <th>Required Equipment</th>
                    <th>Last Verified</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDiags.map((d: any) => (
                    <tr key={d.id}>
                      <td><strong>{d.testName}</strong></td>
                      <td>{d.category}</td>
                      <td>
                        <span className={`badge ${d.availability === 'AVAILABLE' ? 'badge-available' : d.availability === 'LIMITED' ? 'badge-limited' : 'badge-unavailable'}`}>
                          {d.availability}
                        </span>
                      </td>
                      <td>{d.operatingHours}</td>
                      <td>{d.turnaroundTime}</td>
                      <td>{d.requiredEquipment || 'Standard Lab Equipment'}</td>
                      <td>{formatTimestamp(d.lastVerifiedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
              <p style={{ fontWeight: 600 }}>No diagnostic services have been configured for this facility matching your criteria.</p>
              <p style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>Use the "Add Diagnostic Test" button above to register diagnostic services.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // EQUIPMENT VIEW
  if (activeTab === 'equipment') {
    const filteredEquipment = equipment.filter((e: any) =>
      e.name?.toLowerCase().includes(equipmentSearch.toLowerCase()) ||
      e.category?.toLowerCase().includes(equipmentSearch.toLowerCase())
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {renderBreadcrumb('Equipment Inventory')}

        <ProvenanceBanner
          sourceType="FACILITY_MANAGED"
          sourceName="CareFlow Medical Equipment Registry"
          sourceStatus="FACILITY_MANAGED"
        />

        <div className="gov-card">
          <div className="gov-card-header">
            <div className="gov-card-title">
              <Wrench size={18} color="#0284c7" />
              <span>Facility Medical Equipment Registry</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: '8px', top: '9px', color: '#64748b' }} />
                <input
                  type="text"
                  className="form-control"
                  style={{ paddingLeft: '1.8rem', fontSize: '0.8rem', width: '200px' }}
                  placeholder="Filter equipment..."
                  value={equipmentSearch}
                  onChange={(e) => setEquipmentSearch(e.target.value)}
                />
              </div>
              <button className="btn-gov" onClick={() => setShowAddEquipment(true)}>
                <Plus size={14} />
                <span>Add Equipment</span>
              </button>
            </div>
          </div>

          {showAddEquipment && (
            <form onSubmit={handleAddEquipment} style={{ backgroundColor: '#f8fafc', padding: '1rem', border: '1px solid #cbd5e1', borderRadius: '6px', marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: '#0f172a' }}>Add New Equipment</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label>Equipment Name</label>
                  <input className="form-control" value={eqName} onChange={(e) => setEqName(e.target.value)} placeholder="Pulse Oximeter Unit" required />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select className="form-control" value={eqCat} onChange={(e) => setEqCat(e.target.value)}>
                    <option value="DIAGNOSTIC">DIAGNOSTIC</option>
                    <option value="MONITORING">MONITORING</option>
                    <option value="SURGICAL">SURGICAL</option>
                    <option value="LIFE_SUPPORT">LIFE_SUPPORT</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Quantity</label>
                  <input type="number" className="form-control" value={eqQty} onChange={(e) => setEqQty(e.target.value)} required />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn-gov">Save Equipment</button>
                <button type="button" className="btn-gov-secondary" onClick={() => setShowAddEquipment(false)}>Cancel</button>
              </div>
            </form>
          )}

          {filteredEquipment.length > 0 ? (
            <div className="table-responsive">
              <table className="gov-table">
                <thead>
                  <tr>
                    <th>Equipment Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Maintenance Notes</th>
                    <th>Last Verified</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEquipment.map((e: any) => (
                    <tr key={e.id}>
                      <td><strong>{e.name}</strong></td>
                      <td>{e.category}</td>
                      <td>{e.availableQuantity} / {e.quantity} Available</td>
                      <td>
                        <span className={`badge ${e.status === 'AVAILABLE' ? 'badge-available' : 'badge-limited'}`}>
                          {e.status}
                        </span>
                      </td>
                      <td>{e.maintenanceStatus}</td>
                      <td>{formatTimestamp(e.lastVerifiedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
              <p style={{ fontWeight: 600 }}>No medical equipment records found for this facility matching your criteria.</p>
              <p style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>Use the "Add Equipment" button above to log medical inventory.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // APPOINTMENTS VIEW
  if (activeTab === 'appointments') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {renderBreadcrumb('Appointments')}

        <ProvenanceBanner
          sourceType="CAREFLOW_TRANSACTION"
          sourceName="CareFlow Appointment Slot Registry"
          sourceStatus="CAREFLOW_TRANSACTION"
        />

        <div className="gov-card">
          <div className="gov-card-header">
            <div className="gov-card-title">
              <Calendar size={18} color="#0284c7" />
              <span>Facility Appointment Slots</span>
            </div>
            <button className="btn-gov" onClick={() => setShowAddSlot(true)}>
              <Plus size={14} />
              <span>Add Appointment Slot</span>
            </button>
          </div>

          {showAddSlot && (
            <form onSubmit={handleAddSlot} style={{ backgroundColor: '#f8fafc', padding: '1rem', border: '1px solid #cbd5e1', borderRadius: '6px', marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: '#0f172a' }}>Add Appointment Slot</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label>Doctor Name</label>
                  <input className="form-control" value={slotDoc} onChange={(e) => setSlotDoc(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Service Name</label>
                  <input className="form-control" value={slotSrv} onChange={(e) => setSlotSrv(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Time Window</label>
                  <input className="form-control" value={slotTime} onChange={(e) => setSlotTime(e.target.value)} placeholder="09:00 - 11:00" required />
                </div>
                <div className="form-group">
                  <label>Capacity</label>
                  <input type="number" className="form-control" value={slotCap} onChange={(e) => setSlotCap(e.target.value)} required />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn-gov">Create Slot</button>
                <button type="button" className="btn-gov-secondary" onClick={() => setShowAddSlot(false)}>Cancel</button>
              </div>
            </form>
          )}

          {slots.length > 0 ? (
            <div className="table-responsive">
              <table className="gov-table">
                <thead>
                  <tr>
                    <th>Doctor</th>
                    <th>Service Name</th>
                    <th>Time Window</th>
                    <th>Capacity</th>
                    <th>Slot Status</th>
                    <th>Source Provenance</th>
                  </tr>
                </thead>
                <tbody>
                  {slots.map((sl: any) => (
                    <tr key={sl.id}>
                      <td><strong>{sl.doctorName}</strong></td>
                      <td>{sl.serviceName}</td>
                      <td>{sl.startTime} - {sl.endTime}</td>
                      <td>{sl.bookedCount} / {sl.maxCapacity} Booked</td>
                      <td><span className="badge badge-available">{sl.status}</span></td>
                      <td><span className="provenance-tag">CAREFLOW_TRANSACTION</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
              <p style={{ fontWeight: 600 }}>No appointment slots currently available for scheduling.</p>
              <p style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>Use the "Add Appointment Slot" button above to publish consultation slots.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // REFERRALS VIEW
  if (activeTab === 'referrals') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {renderBreadcrumb('Referrals Inbox')}

        <ProvenanceBanner
          sourceType="CAREFLOW_TRANSACTION"
          sourceName="CareFlow Referral Service (Government Compatible)"
          sourceStatus="CAREFLOW_TRANSACTION"
        />

        <div className="gov-card">
          <div className="gov-card-header">
            <div className="gov-card-title">
              <Send size={18} color="#0284c7" />
              <span>Incoming Inter-Facility Referrals</span>
            </div>
          </div>
          {referrals && referrals.length > 0 ? (
            <div className="table-responsive">
              <table className="gov-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Source Facility</th>
                    <th>Specialty Required</th>
                    <th>Priority</th>
                    <th>Referral Requirement Match</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {referrals.map((r) => (
                    <tr key={r.id}>
                      <td><strong>Meena Devi (CF-P1001)</strong></td>
                      <td>Village Primary Health Centre</td>
                      <td>{r.specialtyRequired || 'Obstetrics'}</td>
                      <td><span className="badge badge-unavailable">HIGH</span></td>
                      <td>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#166534', backgroundColor: '#dcfce7', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                          Matches referral requirements (Obstetrics + Ultrasound)
                        </span>
                      </td>
                      <td><span className="badge badge-limited">{r.status}</span></td>
                      <td>
                        <button className="btn-gov" style={{ fontSize: '0.75rem' }} onClick={() => onRunDemoStep(4)}>
                          Accept & Schedule Slot
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
              <p style={{ fontWeight: 600 }}>No pending inter-facility referrals found.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // CARE GAPS & TASKS VIEW
  if (activeTab === 'caregaps') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {renderBreadcrumb('Care Tasks & Gaps')}

        <ProvenanceBanner
          sourceType="CAREFLOW_TRANSACTION"
          sourceName="Care Gap Engine & Safety Net Inbox"
          sourceStatus="CAREFLOW_TRANSACTION"
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div className="gov-card">
            <div className="gov-card-header">
              <div className="gov-card-title">
                <AlertTriangle size={18} color="#dc2626" />
                <span>Detected Care Gaps (SLA Breaches)</span>
              </div>
            </div>
            {gaps && gaps.length > 0 ? (
              <div className="table-responsive">
                <table className="gov-table">
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Gap Description</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gaps.map((g) => (
                      <tr key={g.id}>
                        <td>Meena Devi (CF-P1001)</td>
                        <td>{g.description}</td>
                        <td><span className="badge badge-unavailable">{g.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b' }}>
                <CheckCircle2 size={24} color="#166534" style={{ marginBottom: '0.4rem', opacity: 0.8 }} />
                <p style={{ fontSize: '0.85rem' }}>No open care gaps detected.</p>
              </div>
            )}
          </div>

          <div className="gov-card">
            <div className="gov-card-header">
              <div className="gov-card-title">
                <CheckCircle2 size={18} color="#166534" />
                <span>Assigned Care Tasks</span>
              </div>
            </div>
            {tasks && tasks.length > 0 ? (
              <div className="table-responsive">
                <table className="gov-table">
                  <thead>
                    <tr>
                      <th>Task Title</th>
                      <th>Assignee</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((t) => (
                      <tr key={t.id}>
                        <td>{t.title}</td>
                        <td>CHW Meera Bai</td>
                        <td>
                          <button className="btn-gov" style={{ fontSize: '0.75rem' }} onClick={() => onRunDemoStep(7)}>
                            Record Visit & Close
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b' }}>
                <Info size={24} style={{ marginBottom: '0.4rem', opacity: 0.6 }} />
                <p style={{ fontSize: '0.85rem' }}>No pending CHW tasks.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // CARE JOURNEY VIEW
  if (activeTab === 'journey') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {renderBreadcrumb('Care Journey Lifecycle')}

        <ProvenanceBanner
          sourceType="CAREFLOW_TRANSACTION & SYNTHETIC_DEMO"
          sourceName="Care Journey Lifecycle Engine (13 Stages)"
          sourceStatus="CAREFLOW_TRANSACTION / SYNTHETIC_DEMO"
        />

        {/* 13-Stage Timeline Component */}
        {renderCareTimeline()}

        {/* 12-Step Interactive Demo Runner Bar */}
        {renderDemoBar()}

        {/* Failure & Recovery Care Gap Alert Panel */}
        {(demoStep === 6 || demoStep === 7 || demoStep === 8) && (
          <div className="gov-card" style={{ borderLeft: '5px solid #ef4444', backgroundColor: '#fef2f2' }}>
            <div className="gov-card-header">
              <div className="gov-card-title" style={{ color: '#991b1b' }}>
                <AlertTriangle size={20} color="#ef4444" />
                <span>⚠ CARE GAP DETECTED — SLA BREACH</span>
              </div>
              <span className="badge badge-unavailable">SLA BREACH (HIGH PRIORITY)</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#7f1d1d', marginBottom: '0.75rem' }}>
              <strong>Patient:</strong> Meena Devi (CF-P1001) | <strong>Care Journey:</strong> CFJ-1001 | <strong>Issue:</strong> Referral accepted by District Hospital A, but specialist appointment confirmation exceeded configured 24h SLA.
            </div>

            <div style={{ backgroundColor: 'white', border: '1px solid #fca5a5', padding: '0.75rem', borderRadius: '4px', marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#991b1b', marginBottom: '0.35rem' }}>
                Action Task Dispatched to CHW Meera Bai:
              </div>
              <div style={{ fontSize: '0.8rem', color: '#334155' }}>
                "Follow up on delayed specialist appointment for Meena Devi at District Hospital A."
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.65rem' }}>
                <button className="btn-gov" style={{ fontSize: '0.75rem', backgroundColor: '#b45309', color: 'white' }} onClick={() => onRunDemoStep(8)}>
                  ↗ Escalate & Reroute to Available Matching Facility
                </button>
              </div>
            </div>

            {demoStep === 8 && (
              <div style={{ backgroundColor: '#fffbebe', border: '1px solid #fcd34d', padding: '0.75rem', borderRadius: '4px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#92400e', marginBottom: '0.35rem' }}>
                  Deterministic Referral Matcher:
                </div>
                <div style={{ fontSize: '0.8rem', color: '#78350f', marginBottom: '0.5rem' }}>
                  Requirements: Specialty: <strong>Obstetrics</strong> | Diagnostic: <strong>Ultrasound Scanner</strong> | Priority: <strong>HIGH</strong><br />
                  Candidate Facility: <strong>District Hospital B (Rampur)</strong> — <span style={{ color: '#166534', fontWeight: 700 }}>✓ Matches referral requirements</span>
                </div>
                <button className="btn-gov" style={{ fontSize: '0.75rem', backgroundColor: '#166534', color: 'white' }} onClick={() => onRunDemoStep(9)}>
                  ✓ Accept Referral & Confirm Appointment at District Hospital B
                </button>
              </div>
            )}
          </div>
        )}

        {/* Closed Care Success Panel */}
        {demoStep === 12 && (
          <div className="gov-card" style={{ borderLeft: '5px solid #16a34a', backgroundColor: '#f0fdf4' }}>
            <div className="gov-card-header">
              <div className="gov-card-title" style={{ color: '#14532d' }}>
                <CheckCircle2 size={20} color="#16a34a" />
                <span>✅ CARE JOURNEY COMPLETED & SAFELY CLOSED</span>
              </div>
              <span className="badge badge-available">CARE CLOSED</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#166534' }}>
              <strong>Patient:</strong> Meena Devi (CF-P1001) | <strong>Care Journey:</strong> CFJ-1001<br />
              <strong>Outcome:</strong> Closed-loop care cycle completed successfully through District Hospital B. Follow-up recorded. Open Care Gaps: <strong>0</strong>.
            </div>
          </div>
        )}
      </div>
    );
  }

  // AUDIT LOG VIEW
  if (activeTab === 'audit') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {renderBreadcrumb('Audit Log')}

        <ProvenanceBanner
          sourceType="CAREFLOW_TRANSACTION"
          sourceName="CareFlow System Audit Log"
          sourceStatus="CAREFLOW_TRANSACTION"
        />

        <div className="gov-card">
          <div className="gov-card-header">
            <div className="gov-card-title">
              <FileText size={18} color="#0284c7" />
              <span>Operational & Security Audit Trail Log</span>
            </div>
          </div>
          <div className="table-responsive">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Event Type</th>
                  <th>Actor ID</th>
                  <th>Actor Role</th>
                  <th>Target Entity</th>
                  <th>Audit Details</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>DOCTOR_UPDATED</strong></td>
                  <td>admin_a</td>
                  <td>FACILITY_ADMIN</td>
                  <td>Dr. Rajesh Kumar</td>
                  <td>Updated availability status to AVAILABLE</td>
                  <td>{new Date().toLocaleTimeString()}</td>
                </tr>
                <tr>
                  <td><strong>EQUIPMENT_STATUS_CHANGED</strong></td>
                  <td>admin_a</td>
                  <td>FACILITY_ADMIN</td>
                  <td>Ultrasound Scanner</td>
                  <td>Status set to AVAILABLE</td>
                  <td>{new Date().toLocaleTimeString()}</td>
                </tr>
                <tr>
                  <td><strong>REFERRAL_ACCEPTED</strong></td>
                  <td>facility1</td>
                  <td>FACILITY_STAFF</td>
                  <td>REF-001</td>
                  <td>Referral accepted by District Hospital Rampur</td>
                  <td>{new Date().toLocaleTimeString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // ADMINISTRATION VIEW
  if (activeTab === 'admin') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {renderBreadcrumb('Administration')}

        <ProvenanceBanner
          sourceType="CAREFLOW_TRANSACTION"
          sourceName="CareFlow Access Control & User Administration"
          sourceStatus="CAREFLOW_TRANSACTION"
        />

        <div className="gov-card">
          <div className="gov-card-header">
            <div className="gov-card-title">
              <Settings size={18} color="#0284c7" />
              <span>Authorized Facility Portal Users & Access Control Boundary</span>
            </div>
          </div>
          <div className="table-responsive">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Full Name</th>
                  <th>Assigned Role</th>
                  <th>Authorized Facility Scope</th>
                  <th>Facility Access Boundary</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>admin</strong></td>
                  <td>Karamadai Facility Admin</td>
                  <td><span className="badge badge-available">FACILITY_ADMIN</span></td>
                  <td>Government PHC, Karamadai [NIN-TN-CBE-001]</td>
                  <td>Facility Level Only (Cannot modify other facilities)</td>
                </tr>
                <tr>
                  <td><strong>doctor1</strong></td>
                  <td>Dr. Rajesh Kumar</td>
                  <td><span className="badge badge-available">DOCTOR</span></td>
                  <td>Government PHC, Karamadai [NIN-TN-CBE-001]</td>
                  <td>Facility Level Only</td>
                </tr>
                <tr>
                  <td><strong>chw1</strong></td>
                  <td>CHW Meera Bai</td>
                  <td><span className="badge badge-available">CHW</span></td>
                  <td>Government PHC, Karamadai [NIN-TN-CBE-001]</td>
                  <td>Assigned Patients & Care Tasks</td>
                </tr>
                <tr>
                  <td><strong>supervisor1</strong></td>
                  <td>Dr. V. Sundaram</td>
                  <td><span className="badge badge-limited">DISTRICT_SUPERVISOR</span></td>
                  <td>Coimbatore District Facilities</td>
                  <td>District Supervisory Scope</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

