import React from 'react';
import { Database, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ProvenanceProps {
  sourceType: string;
  sourceName?: string;
  sourceStatus?: string;
  isLive?: boolean;
  lastUpdated?: string;
  lastVerifiedBy?: string;
  isStale?: boolean;
}

export const ProvenanceBanner: React.FC<ProvenanceProps> = ({
  sourceType,
  sourceName = 'National Hospital Directory',
  sourceStatus = 'PUBLIC_DATASET',
  isLive = false,
  lastUpdated = '02/06/2025',
  lastVerifiedBy,
  isStale = false,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div className="provenance-banner">
        <div className="provenance-left">
          <Database size={16} />
          <span>
            <strong>Information Source:</strong> {sourceName}
          </span>
          <span className="provenance-tag">{sourceType}</span>
          <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>
            (Status: {sourceStatus} | Live API: {isLive ? 'Yes' : 'No'} | Last Source Update: {lastUpdated})
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 600 }}>
          <ShieldCheck size={14} color="#166534" />
          <span>Government Compatibility Layer Verified</span>
        </div>
      </div>

      {isStale && (
        <div className="stale-warning">
          <AlertTriangle size={16} />
          <span>Information may be outdated — last operational verification was over 24 hours ago. Please verify current availability.</span>
        </div>
      )}

      {lastVerifiedBy && (
        <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.3rem', paddingLeft: '0.2rem' }}>
          <CheckCircle2 size={12} color="#0284c7" />
          <span>Facility Operational State last verified by <strong>{lastVerifiedBy}</strong> on {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
        </div>
      )}
    </div>
  );
};
