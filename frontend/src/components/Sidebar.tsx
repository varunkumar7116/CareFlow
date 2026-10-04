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
  Settings
} from 'lucide-react';
import { LanguageItem } from '../data/languages';
import { getTranslation } from '../data/translations';

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
  currentLanguage?: LanguageItem;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab, userRole, currentLanguage }) => {
  const t = getTranslation(currentLanguage?.code || 'mr');

  const items: { tab: NavTab; label: string; icon: React.ReactNode; roles?: string[] }[] = [
    { tab: 'dashboard', label: t.tabDashboard, icon: <LayoutDashboard size={16} /> },
    { tab: 'facility', label: t.tabFacility, icon: <Building size={16} /> },
    { tab: 'services', label: t.tabServices, icon: <Stethoscope size={16} /> },
    { tab: 'doctors', label: t.tabDoctors, icon: <Users size={16} /> },
    { tab: 'diagnostics', label: t.tabDiagnostics, icon: <Activity size={16} /> },
    { tab: 'equipment', label: t.tabEquipment, icon: <Wrench size={16} /> },
    { tab: 'appointments', label: t.tabAppointments, icon: <Calendar size={16} /> },
    { tab: 'referrals', label: t.tabReferrals, icon: <Send size={16} /> },
    { tab: 'caregaps', label: t.tabCareGaps, icon: <AlertTriangle size={16} /> },
    { tab: 'journey', label: t.tabCareJourney, icon: <GitCommit size={16} /> },
    { tab: 'audit', label: t.tabAuditLog, icon: <FileText size={16} /> },
    { tab: 'admin', label: t.tabAdmin, icon: <Settings size={16} />, roles: ['FACILITY_ADMIN', 'DISTRICT_SUPERVISOR', 'SYSTEM_ADMIN', 'ADMIN'] },
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
