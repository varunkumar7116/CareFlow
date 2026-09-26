import React from 'react';
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
  ShieldAlert,
  Settings
} from 'lucide-react';

export type NavTab =
  | 'dashboard'
  | 'facility'
  | 'services'
  | 'doctors'
  | 'diagnostics'
  | 'equipment'
  | 'appointments'
  | 'referrals'
  | 'caregaps'
  | 'journey'
  | 'audit'
  | 'admin';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  userRole?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab, userRole }) => {
  const items: { tab: NavTab; label: string; icon: React.ReactNode; roles?: string[] }[] = [
    { tab: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { tab: 'facility', label: 'Facility Profile', icon: <Building size={16} /> },
    { tab: 'services', label: 'Services', icon: <Stethoscope size={16} /> },
    { tab: 'doctors', label: 'Doctors / Staff', icon: <Users size={16} /> },
    { tab: 'diagnostics', label: 'Diagnostics', icon: <Activity size={16} /> },
    { tab: 'equipment', label: 'Equipment', icon: <Wrench size={16} /> },
    { tab: 'appointments', label: 'Appointments', icon: <Calendar size={16} /> },
    { tab: 'referrals', label: 'Referrals', icon: <Send size={16} /> },
    { tab: 'caregaps', label: 'Care Tasks & Gaps', icon: <AlertTriangle size={16} /> },
    { tab: 'journey', label: 'Care Journey', icon: <GitCommit size={16} /> },
    { tab: 'audit', label: 'Audit Log', icon: <FileText size={16} /> },
    { tab: 'admin', label: 'Administration', icon: <Settings size={16} />, roles: ['FACILITY_ADMIN', 'DISTRICT_SUPERVISOR', 'SYSTEM_ADMIN', 'ADMIN'] },
  ];

  return (
    <aside className="gov-sidebar">
      <div className="sidebar-nav">
        {items.map((item) => {
          if (item.roles && userRole && !item.roles.includes(userRole)) {
            return null;
          }
          const isActive = activeTab === item.tab;
          return (
            <div
              key={item.tab}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectTab(item.tab)}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
