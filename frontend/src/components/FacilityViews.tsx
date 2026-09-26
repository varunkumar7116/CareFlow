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
}) => {
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
      <span>Portal</span>
      <ChevronRight size={12} />
      <span>{govRef.name}</span>
      <ChevronRight size={12} />
      <span style={{ color: '#0f172a', fontWeight: 600 }}>{currentView}</span>
    </div>
  );

  // DASHBOARD VIEW
  if (activeTab === 'dashboard') {
    const totalEqCount = dashboardSummary?.totalEquipment || equipment.length || 5;
    const availEqCount = dashboardSummary?.availableEquipment || equipment.filter((e: any) => e.status === 'AVAILABLE').length || 4;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {renderBreadcrumb('Operational Dashboard')}

        <ProvenanceBanner
          sourceType="GOVERNMENT_REFERENCE & FACILITY_MANAGED"
          sourceName="National Hospital Directory (MoHFW) + CareFlow Operational Registry"
          sourceStatus="PUBLIC_DATASET / FACILITY_MANAGED"
          isLive={false}
          lastUpdated="02/06/2025"
          lastVerifiedBy={opStatus.lastVerifiedBy}
          isStale={dashboardSummary?.stale}
        />

        <div className="kpi-grid">
          <div className="kpi-card" style={{ borderTopColor: '#0284c7' }}>
            <div className="kpi-label">Facility Operating Status</div>
            <div className="kpi-value" style={{ fontSize: '1.25rem', color: '#166534' }}>
              {opStatus.operatingStatus}
            </div>
            <div className="kpi-sub">Beds Available: {opStatus.capacityAvailableBeds} / {opStatus.capacityTotalBeds}</div>
          </div>

          <div className="kpi-card" style={{ borderTopColor: '#16a34a' }}>
            <div className="kpi-label">Doctors & Specialists</div>
            <div className="kpi-value">
              {dashboardSummary?.availableDoctors ?? professionals.filter((p: any) => p.availabilityStatus === 'AVAILABLE').length}
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}> / {dashboardSummary?.totalDoctors || professionals.length || 3} Active</span>
            </div>
            <div className="kpi-sub">Facility-Managed Operational Registry</div>
          </div>

          <div className="kpi-card" style={{ borderTopColor: '#d97706' }}>
            <div className="kpi-label">Diagnostic Services</div>
            <div className="kpi-value">
              {dashboardSummary?.availableDiagnostics ?? diagnostics.filter((d: any) => d.availability === 'AVAILABLE').length}
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}> / {dashboardSummary?.totalDiagnostics || diagnostics.length || 4} Available</span>
            </div>
            <div className="kpi-sub">Pathology & Radiology Active</div>
          </div>

          <div className="kpi-card" style={{ borderTopColor: '#0891b2' }}>
            <div className="kpi-label">Equipment & Resources</div>
            <div className="kpi-value">
              {availEqCount}
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}> / {totalEqCount} Operational</span>
            </div>
            <div className="kpi-sub">Medical Equipment Inventory</div>
          </div>

          <div className="kpi-card" style={{ borderTopColor: '#9333ea' }}>
            <div className="kpi-label">Appointment Slots</div>
            <div className="kpi-value">
              {dashboardSummary?.totalSlotsAvailable ?? slots.length ?? 3}
            </div>
            <div className="kpi-sub">CareFlow Transaction Slots</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div className="gov-card">
            <div className="gov-card-header">
              <div className="gov-card-title">
                <Send size={18} color="#0284c7" />
                <span>Pending Referral Actions</span>
              </div>
              <span className="provenance-tag">CAREFLOW_TRANSACTION</span>
            </div>
            {referrals && referrals.length > 0 ? (
              <div className="table-responsive">
                <table className="gov-table">
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Specialty Required</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referrals.map((r) => (
                      <tr key={r.id}>
                        <td>Meena Devi (CF-P1001)</td>
                        <td>{r.specialtyRequired || 'Obstetrics'}</td>
                        <td><span className="badge badge-limited">{r.status}</span></td>
                        <td>
                          <button className="btn-gov" style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }} onClick={() => onRunDemoStep(4)}>
                            Accept & Book Slot
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
                <p>No pending inter-facility referrals requiring action.</p>
              </div>
            )}
          </div>

          <div className="gov-card">
            <div className="gov-card-header">
              <div className="gov-card-title">
                <AlertTriangle size={18} color="#dc2626" />
                <span>Active Safety Net Gaps & Tasks</span>
              </div>
              <span className="provenance-tag">CAREFLOW_TRANSACTION</span>
            </div>
            {gaps && gaps.length > 0 ? (
              <div className="table-responsive">
                <table className="gov-table">
                  <thead>
                    <tr>
                      <th>Gap Description</th>
                      <th>Priority</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gaps.map((g) => (
                      <tr key={g.id}>
                        <td>{g.description}</td>
                        <td><span className="badge badge-unavailable">HIGH SLA BREACH</span></td>
                        <td>
                          <button className="btn-gov" style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }} onClick={() => onRunDemoStep(7)}>
                            Resolve Gap
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
                <p>No active care gaps or SLA breaches detected.</p>
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
    const demoSteps = [
      { num: 1, title: 'Patient Registered', desc: 'Meena (CF-P1001) registered at PHC' },
      { num: 2, title: 'Screening Complete', desc: 'High BP flagged (140/90 mmHg)' },
      { num: 3, title: 'Referral Created', desc: 'Referred to District Hospital' },
      { num: 4, title: 'Appointment Booked', desc: 'Slot booked with Dr. Rajesh' },
      { num: 5, title: 'Overdue Follow-up', desc: 'Simulate 24h SLA Breach' },
      { num: 6, title: 'Care Gap & Task', desc: 'Task assigned to CHW' },
      { num: 7, title: 'Follow-up Complete', desc: 'CHW visit recorded' },
      { num: 8, title: 'Completed Care', desc: 'Journey closed safely' }
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {renderBreadcrumb('Care Journey Lifecycle')}

        <ProvenanceBanner
          sourceType="CAREFLOW_TRANSACTION & SYNTHETIC_DEMO"
          sourceName="Care Journey Lifecycle Engine (13 Stages)"
          sourceStatus="CAREFLOW_TRANSACTION / SYNTHETIC_DEMO"
        />

        <div className="gov-card">
          <div className="gov-card-header">
            <div className="gov-card-title">
              <GitCommit size={18} color="#0284c7" />
              <span>Interactive Care Journey Runner — Demo Scenario (Meena CF-P1001)</span>
            </div>
            <span className="provenance-tag" style={{ backgroundColor: '#fef3c7', color: '#92400e' }}>SYNTHETIC_DEMO</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '1rem', padding: '0.5rem 0.75rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
            {statusMessage}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem' }}>
            {demoSteps.map((s) => {
              const isActive = demoStep === s.num;
              const isDone = demoStep > s.num;
              return (
                <div
                  key={s.num}
                  onClick={() => onRunDemoStep(s.num)}
                  style={{
                    backgroundColor: isActive ? '#eff6ff' : isDone ? '#f0fdf4' : 'white',
                    border: `1px solid ${isActive ? '#0284c7' : isDone ? '#86efac' : '#cbd5e1'}`,
                    padding: '0.65rem 0.5rem',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: isActive ? '#0284c7' : isDone ? '#166534' : '#475569' }}>
                    Step {s.num}: {s.title}
                  </div>
                  <div style={{ fontSize: '0.675rem', color: '#64748b' }}>{s.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
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

