import React from 'react';
import { Building2, PhoneCall, LogOut, Languages } from 'lucide-react';
import { LanguageItem } from '../data/languages';
import { getTranslation } from '../data/translations';

interface HeaderProps {
  facilityName: string;
  userFullName: string;
  userRole: string;
  onOpenIVR: () => void;
  onOpenMobileApp?: () => void;
  onOpenSignIn: () => void;
  onSignOut: () => void;
  isAuthenticated: boolean;
  currentLanguage?: LanguageItem;
  onChangeLanguage?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  facilityName,
  userFullName,
  userRole,
  onOpenIVR,
  onOpenMobileApp,
  onOpenSignIn,
  onSignOut,
  isAuthenticated,
  currentLanguage,
  onChangeLanguage,
}) => {
  const t = getTranslation(currentLanguage?.code || 'mr');

  return (
    <header className="gov-header">
      <div className="header-brand">
        <div className="brand-emblem">CF</div>
        <div className="brand-titles">
          <h1>{t.portalTitle}</h1>
          <p>{t.portalSubtitle}</p>
        </div>
      </div>

      <div className="header-info">
        <div className="facility-badge-box">
          <div className="facility-badge-name">{facilityName || 'Government PHC, Karamadai'}</div>
          <div className="facility-badge-user">
            {isAuthenticated ? (
              <span>{userFullName} • <strong>{userRole}</strong></span>
            ) : (
              <span>{t.guestMode}</span>
            )}
          </div>
        </div>

        {currentLanguage && onChangeLanguage && (
          <button
            onClick={onChangeLanguage}
            className="btn-gov-secondary"
            style={{ backgroundColor: '#1e293b', color: '#e2e8f0', border: '1px solid #475569' }}
            title={t.changeLanguage}
          >
            <Languages size={14} color="#38bdf8" />
            <span>{currentLanguage.nameNative} ({currentLanguage.nameEnglish})</span>
          </button>
        )}

        {onOpenMobileApp && (
          <button
            onClick={onOpenMobileApp}
            className="btn-gov-secondary"
            style={{ backgroundColor: '#0284c7', color: 'white', border: '1px solid #38bdf8' }}
          >
            <span>📱 ASHA Mobile App</span>
          </button>
        )}

        <button
          onClick={onOpenIVR}
          className="btn-gov-secondary"
          style={{ backgroundColor: '#334155', color: 'white', border: '1px solid #475569' }}
        >
          <PhoneCall size={14} color="#38bdf8" />
          <span>{t.ivrSimulator}</span>
        </button>

        {isAuthenticated ? (
          <button onClick={onSignOut} className="btn-gov-secondary" style={{ color: '#fda4af' }}>
            <LogOut size={14} />
            <span>{t.signOut}</span>
          </button>
        ) : (
          <button onClick={onOpenSignIn} className="btn-gov">
            <span>{t.signIn}</span>
          </button>
        )}
      </div>
    </header>
  );
};
