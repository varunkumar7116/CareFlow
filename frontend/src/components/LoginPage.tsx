import React, { useState } from 'react';
import { User, Lock, Building2, ShieldAlert, ArrowLeft, KeyRound, Languages } from 'lucide-react';
import { LanguageItem } from '../data/languages';
import { getTranslation } from '../data/translations';

interface LoginPageProps {
  selectedLanguage: LanguageItem;
  onChangeLanguage: () => void;
  onLogin: (user: string, pass: string) => Promise<boolean>;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  selectedLanguage,
  onChangeLanguage,
  onLogin,
}) => {
  const [username, setUsername] = useState('MH-PHC-ADMIN');
  const [password, setPassword] = useState('CareFlow@123');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const t = getTranslation(selectedLanguage.code);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const success = await onLogin(username, password);
      setLoading(false);
      if (!success) {
        setErrorMsg(t.invalidCredsError);
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg(t.connError);
    }
  };

  const setDemoPreset = (u: string, p: string = 'CareFlow@123') => {
    setUsername(u);
    setPassword(p);
    setErrorMsg('');
  };

  return (
    <div className="gov-entry-container">
      {/* Header Banner */}
      <header className="gov-entry-header">
        <div className="entry-header-content">
          <div className="brand-emblem">CF</div>
          <div>
            <h1 className="entry-brand-title">{t.portalTitle}</h1>
            <p className="entry-brand-subtitle">{t.portalSubtitle}</p>
          </div>
        </div>
        <div className="entry-header-tag">{t.govTag}</div>
      </header>

      {/* Login Card Wrapper */}
      <div className="gov-entry-card-wrapper">
        <div className="gov-card entry-card">
          {/* Card Top: Change Language Bar */}
          <div className="login-top-bar">
            <button type="button" onClick={onChangeLanguage} className="btn-change-lang">
              <ArrowLeft size={14} />
              <span>{t.changeLanguage}</span>
            </button>
            <button type="button" onClick={onChangeLanguage} className="btn-gov-secondary" style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}>
              <Languages size={14} color="#0284c7" />
              <span>{selectedLanguage.nameNative} ({selectedLanguage.nameEnglish})</span>
            </button>
          </div>

          <div className="entry-card-header" style={{ marginTop: '0.5rem' }}>
            <div className="entry-icon-box">
              <Building2 size={24} color="#0284c7" />
            </div>
            <div>
              <h2 className="entry-card-title">{t.loginHeaderTitle}</h2>
              <p className="entry-card-desc">{t.loginHeaderDesc}</p>
            </div>
          </div>

          {errorMsg && (
            <div className="login-error-banner">
              <ShieldAlert size={18} />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="userIdInput">{t.facilityUserIdLabel}</label>
              <div className="input-with-icon">
                <User size={16} className="input-icon" />
                <input
                  id="userIdInput"
                  type="text"
                  className="form-control padded-input"
                  placeholder="e.g. MH-PHC-ADMIN"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="passwordInput">{t.passwordLabel}</label>
              <div className="input-with-icon">
                <Lock size={16} className="input-icon" />
                <input
                  id="passwordInput"
                  type="password"
                  className="form-control padded-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button
                type="submit"
                className="btn-gov btn-login-submit"
                disabled={loading}
                style={{ flex: 1 }}
              >
                {loading ? t.authenticatingText : t.signInBtn}
              </button>

              <button
                type="button"
                className="btn-gov-secondary"
                onClick={onChangeLanguage}
                title={t.changeLanguage}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}
              >
                <Languages size={16} color="#0284c7" />
                <span>{t.changeLanguage}</span>
              </button>
            </div>
          </form>

          {/* Demo Access Presets */}
          <div className="demo-access-container">
            <div className="demo-access-header">
              <div className="demo-header-title">
                <KeyRound size={16} color="#0284c7" />
                <span>{t.demoAccessTitle}</span>
              </div>
              <span className="demo-disclaimer-badge">{t.demoDisclaimer}</span>
            </div>

            <div className="demo-presets-grid">
              <button
                type="button"
                className={`demo-preset-btn ${username === 'MH-PHC-ADMIN' ? 'active' : ''}`}
                onClick={() => setDemoPreset('MH-PHC-ADMIN', 'CareFlow@123')}
              >
                <div className="preset-role">{t.roleAdmin}</div>
                <div className="preset-meta">
                  <span>ID: <strong>MH-PHC-ADMIN</strong></span>
                  <span>Pass: <strong>CareFlow@123</strong></span>
                </div>
              </button>

              <button
                type="button"
                className={`demo-preset-btn ${username === 'MH-DOCTOR-001' ? 'active' : ''}`}
                onClick={() => setDemoPreset('MH-DOCTOR-001', 'CareFlow@123')}
              >
                <div className="preset-role">{t.roleDoctor}</div>
                <div className="preset-meta">
                  <span>ID: <strong>MH-DOCTOR-001</strong></span>
                  <span>Pass: <strong>CareFlow@123</strong></span>
                </div>
              </button>

              <button
                type="button"
                className={`demo-preset-btn ${username === 'MH-STAFF-001' ? 'active' : ''}`}
                onClick={() => setDemoPreset('MH-STAFF-001', 'CareFlow@123')}
              >
                <div className="preset-role">{t.roleStaff}</div>
                <div className="preset-meta">
                  <span>ID: <strong>MH-STAFF-001</strong></span>
                  <span>Pass: <strong>CareFlow@123</strong></span>
                </div>
              </button>

              <button
                type="button"
                className={`demo-preset-btn ${username === 'MH-DISTRICT-001' ? 'active' : ''}`}
                onClick={() => setDemoPreset('MH-DISTRICT-001', 'CareFlow@123')}
              >
                <div className="preset-role">{t.roleSupervisor}</div>
                <div className="preset-meta">
                  <span>ID: <strong>MH-DISTRICT-001</strong></span>
                  <span>Pass: <strong>CareFlow@123</strong></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
