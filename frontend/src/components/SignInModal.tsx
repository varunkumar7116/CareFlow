import React, { useState } from 'react';
import { Lock, User, Building2, ShieldAlert } from 'lucide-react';

interface SignInModalProps {
  isOpen: boolean;
  onLogin: (username: string, pass: string) => Promise<boolean>;
  onClose?: () => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onLogin }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const ok = await onLogin(username, password);
    setLoading(false);
    if (!ok) {
      setErrorMsg('Invalid facility user ID or password. Please try again.');
    }
  };

  const setPreset = (u: string, p: string = 'password') => {
    setUsername(u);
    setPassword(p);
  };

  return (
    <div className="gov-modal-overlay">
      <div className="gov-modal-box">
        <div className="gov-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Building2 size={20} />
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>CARE FLOW</h3>
              <p style={{ fontSize: '0.725rem', opacity: 0.8 }}>Healthcare Coordination Platform — Facility Portal Sign In</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="gov-modal-body">
          {errorMsg && (
            <div style={{ backgroundColor: '#ffe4e6', border: '1px solid #fecdd3', color: '#9f1239', padding: '0.6rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldAlert size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="form-group">
            <label>Facility / User ID</label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: '#64748b' }} />
              <input
                type="text"
                className="form-control"
                style={{ paddingLeft: '2.2rem', width: '100%' }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: '#64748b' }} />
              <input
                type="password"
                className="form-control"
                style={{ paddingLeft: '2.2rem', width: '100%' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ margin: '1.25rem 0', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
              Demo Portal User Presets:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <button
                type="button"
                className="btn-gov-secondary"
                style={{ fontSize: '0.725rem', justifyContent: 'flex-start' }}
                onClick={() => setPreset('admin')}
              >
                Facility Admin (Karamadai)
              </button>
              <button
                type="button"
                className="btn-gov-secondary"
                style={{ fontSize: '0.725rem', justifyContent: 'flex-start' }}
                onClick={() => setPreset('doctor1')}
              >
                Doctor (Dr. Rajesh)
              </button>
              <button
                type="button"
                className="btn-gov-secondary"
                style={{ fontSize: '0.725rem', justifyContent: 'flex-start' }}
                onClick={() => setPreset('chw1')}
              >
                CHW (Meera Bai)
              </button>
              <button
                type="button"
                className="btn-gov-secondary"
                style={{ fontSize: '0.725rem', justifyContent: 'flex-start' }}
                onClick={() => setPreset('supervisor1')}
              >
                District Supervisor
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
            <button type="submit" className="btn-gov" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In to Operational Portal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
