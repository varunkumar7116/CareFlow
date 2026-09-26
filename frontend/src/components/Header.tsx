import React from 'react';
import { Building2, PhoneCall, LogOut, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  facilityName: string;
  userFullName: string;
  userRole: string;
  onOpenIVR: () => void;
  onOpenSignIn: () => void;
  onSignOut: () => void;
  isAuthenticated: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  facilityName,
  userFullName,
  userRole,
  onOpenIVR,
  onOpenSignIn,
  onSignOut,
  isAuthenticated,
}) => {
  return (
    <header className="gov-header">
      <div className="header-brand">
        <div className="brand-emblem">CF</div>
        <div className="brand-titles">
          <h1>CARE FLOW</h1>
          <p>Healthcare Coordination Platform — Facility Operational Portal</p>
        </div>
      </div>

      <div className="header-info">
        <div className="facility-badge-box">
          <div className="facility-badge-name">{facilityName || 'Government PHC, Karamadai'}</div>
          <div className="facility-badge-user">
            {isAuthenticated ? (
              <span>{userFullName} • <strong>{userRole}</strong></span>
            ) : (
              <span>Guest Operational Mode</span>
            )}
          </div>
        </div>

        <button
          onClick={onOpenIVR}
          className="btn-gov-secondary"
          style={{ backgroundColor: '#334155', color: 'white', border: '1px solid #475569' }}
        >
          <PhoneCall size={14} color="#38bdf8" />
          <span>IVR Phone Simulator</span>
        </button>

        {isAuthenticated ? (
          <button onClick={onSignOut} className="btn-gov-secondary" style={{ color: '#fda4af' }}>
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        ) : (
          <button onClick={onOpenSignIn} className="btn-gov">
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
};
