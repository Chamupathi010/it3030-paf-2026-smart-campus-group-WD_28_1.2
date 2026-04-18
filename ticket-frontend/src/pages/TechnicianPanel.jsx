import React, { useState } from 'react';
import { StatusBadge } from '../components/StatusBadge';

const TechnicianPanel = ({ ticket, onUpdate }) => {
  const [assignLoading, setAssignLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const clearMessages = () => { setError(''); setSuccess(''); };

  // Assigning is handled by Admin Dashboard now. This view only shows current assigned technician.

  // Status transitions are handled by the Admin Dashboard now. This panel only displays status.

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Current Status Card */}
      <div className="glass-card" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
          🎯 Ticket Status
        </h3>
        <div style={{ marginBottom: '16px' }}>
          <StatusBadge status={ticket.status} />
        </div>

        {/* Status Workflow Visual */}
        <div style={{ marginBottom: '16px' }}>
          {['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].map((s, idx, arr) => {
            const statuses = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
            const currentIdx = statuses.indexOf(ticket.status);
            const thisIdx = statuses.indexOf(s);
            const isDone = thisIdx <= currentIdx;
            return (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: idx < arr.length - 1 ? '4px' : '0' }}>
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                  background: isDone ? 'var(--accent)' : 'var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '10px', color: isDone ? 'white' : 'var(--text-secondary)',
                }}>
                  {isDone ? '✓' : idx + 1}
                </div>
                {idx < arr.length - 1 && (
                  <div style={{ position: 'absolute', display: 'none' }} />
                )}
                <span style={{
                  fontSize: '13px',
                  fontWeight: s === ticket.status ? 700 : 400,
                  color: s === ticket.status ? 'var(--accent)' : isDone ? 'var(--text-primary)' : 'var(--text-secondary)',
                }}>
                  {s.replace('_', ' ')}
                </span>
              </div>
            );
          })}
        </div>

        {/* Status transitions moved to Admin Dashboard (admin only) */}
        {ticket.status === 'CLOSED' && (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px', padding: '8px' }}>
            🔒 This ticket is closed
          </div>
        )}
      </div>

      {/* Assigned Technician (read-only for non-admin) */}
      <div className="glass-card" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
          🔧 Assigned Technician
        </h3>

        <div style={{ background: 'var(--accent-light)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '8px', padding: '10px 14px', marginBottom: '12px', fontSize: '13px' }}>
          {ticket.assignedTechnician ? <span>Currently: <strong>{ticket.assignedTechnician}</strong></span> : <span style={{ color: 'var(--text-secondary)' }}>Unassigned</span>}
        </div>
      </div>

      {/* Feedback Messages */}
      {error && <div className="alert alert-error" style={{ marginBottom: 0 }}>⚠️ {error}</div>}
      {success && <div className="alert alert-success" style={{ marginBottom: 0 }}>{success}</div>}
    </div>
  );
};

export default TechnicianPanel;
