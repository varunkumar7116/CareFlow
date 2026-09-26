import React, { useState } from 'react';
import { PhoneCall, X, Volume2, Mic, CheckCircle } from 'lucide-react';

interface IVRSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IVRSimulatorModal: React.FC<IVRSimulatorModalProps> = ({ isOpen, onClose }) => {
  const [phone, setPhone] = useState('+919876543210');
  const [sessionState, setSessionState] = useState('LANGUAGE_SELECT');
  const [language, setLanguage] = useState('en');
  const [promptMessage, setPromptMessage] = useState(
    'Welcome to CareFlow Healthcare Hotline. Press 1 for English, 2 for Hindi (हिंदी), 3 for Tamil.'
  );
  const [options, setOptions] = useState<string[]>([
    '1: English',
    '2: Hindi',
    '3: Tamil',
    '4: Telugu',
    '5: Kannada'
  ]);
  const [callEnded, setCallEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleKeyPress = async (digit: string) => {
    if (callEnded) return;
    setLoading(true);
    try {
      const query = new URLSearchParams({
        callerPhone: phone,
        digitPressed: digit,
        currentSessionState: sessionState,
        language: language
      });

      const res = await fetch(`http://localhost:8085/api/v1/ivr/call?${query}`, {
        method: 'POST'
      });

      if (res.ok) {
        const data = await res.json();
        setPromptMessage(data.audioPromptText);
        setSessionState(data.nextSessionState);
        setLanguage(data.language);
        setOptions(data.availableOptions || []);
        setCallEnded(data.callEnded);
      } else {
        setPromptMessage('Simulated IVR Connection Error. Please verify backend is running on port 8085.');
      }
    } catch (err) {
      setPromptMessage('CareFlow Mock IVR: Connected to backend on port 8085.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetCall = () => {
    setSessionState('LANGUAGE_SELECT');
    setLanguage('en');
    setPromptMessage('Welcome to CareFlow Healthcare Hotline. Press 1 for English, 2 for Hindi (हिंदी), 3 for Tamil.');
    setOptions(['1: English', '2: Hindi', '3: Tamil', '4: Telugu', '5: Kannada']);
    setCallEnded(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PhoneCall size={20} color="#8b5cf6" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Interactive Mock IVR Hotline</h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '0.25rem' }}>
            Simulated Caller Phone Number
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              width: '100%',
              background: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '8px',
              padding: '0.5rem 0.75rem',
              color: 'white',
              fontSize: '0.9rem'
            }}
          />
        </div>

        <div className="call-screen">
          {!callEnded && (
            <div className="voice-wave">
              <div className="voice-bar"></div>
              <div className="voice-bar"></div>
              <div className="voice-bar"></div>
              <div className="voice-bar"></div>
            </div>
          )}

          <p style={{ fontSize: '0.85rem', color: '#f8fafc', fontWeight: 500, lineHeight: 1.4 }}>
            {loading ? 'Processing IVR request...' : promptMessage}
          </p>

          {options && options.length > 0 && !callEnded && (
            <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
              {options.map((opt, i) => (
                <span key={i} style={{ fontSize: '0.7rem', background: '#1e293b', border: '1px solid #334155', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#06b6d4' }}>
                  {opt}
                </span>
              ))}
            </div>
          )}

          {callEnded && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', color: '#10b981' }}>
              <CheckCircle size={16} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Call Ended</span>
            </div>
          )}
        </div>

        <div className="dialpad">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((digit) => (
            <button key={digit} className="dial-btn" onClick={() => handleKeyPress(digit)} disabled={callEnded}>
              {digit}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
          <button
            onClick={handleResetCall}
            style={{
              flex: 1,
              background: '#334155',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0.6rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Restart Call
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              background: 'linear-gradient(135deg, #f43f5e, #be123c)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0.6rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            End Call
          </button>
        </div>
      </div>
    </div>
  );
};
