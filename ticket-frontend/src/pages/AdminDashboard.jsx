import React, { useEffect, useState } from 'react';
import { getAllTickets, updateStatus } from '../api/ticketApi';
import { StatusBadge, PriorityBadge } from '../components/StatusBadge';

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rejecting, setRejecting] = useState({});
  const [assigning, setAssigning] = useState({});

  const fetch = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getAllTickets();
      setTickets(res.data);
    } catch (err) {
      setError('Failed to load tickets.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  const handleTransition = async (ticketId, nextStatus) => {
    try {
      await updateStatus(ticketId, nextStatus);
      fetch();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  const handleAssign = async (ticketId) => {
    const tech = assigning[ticketId] || '';
    if (!tech.trim()) { alert('Please enter technician name/ID.'); return; }
    try {
      await fetch(); // keep UI clean while we call API
      await (await import('../api/ticketApi')).assignTechnician(ticketId, tech.trim());
      setAssigning(prev => ({ ...prev, [ticketId]: '' }));
      fetch();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to assign technician');
    }
  };

  const handleReject = async (ticketId) => {
    const reason = rejecting[ticketId] || '';
    if (!reason.trim()) { alert('Please provide a rejection reason.'); return; }
    try {
      await updateStatus(ticketId, 'REJECTED', reason.trim());
      setRejecting(prev => ({ ...prev, [ticketId]: '' }));
      fetch();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to reject ticket');
    }
  };

  if (loading) return <div style={{ padding: 40 }}><div className="spinner" /></div>;

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 24 }}>
      <h1 style={{ color: 'var(--text-primary)', marginBottom: 12 }}>Admin Dashboard</h1>
      {error && <div className="alert alert-error">{error}</div>}

      <div style={{ display: 'grid', gap: 12 }}>
        {tickets.map(t => (
          <div key={t.id} className="glass-card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <StatusBadge status={t.status} />
                <PriorityBadge priority={t.priority} />
                <strong style={{ color: 'var(--text-primary)' }}>{t.category} — {t.resourceId}</strong>
              </div>
              <div style={{ color: 'var(--text-secondary)' }}>#{t.id?.slice(-8).toUpperCase()}</div>
            </div>

            <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>{t.description}</p>

            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              {/* Normal flow buttons */}
              {t.status === 'OPEN' && (
                <button className="btn btn-warning" onClick={() => handleTransition(t.id, 'IN_PROGRESS')}>▶️ Start Progress</button>
              )}
              {t.status === 'IN_PROGRESS' && (
                <button className="btn btn-success" onClick={() => handleTransition(t.id, 'RESOLVED')}>✅ Mark Resolved</button>
              )}
              {t.status === 'RESOLVED' && (
                <button className="btn btn-secondary" onClick={() => handleTransition(t.id, 'CLOSED')}>🔒 Close Ticket</button>
              )}

              {/* Reject control */}
              {t.status !== 'CLOSED' && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input
                    className="form-control"
                    placeholder="Rejection reason"
                    value={rejecting[t.id] || ''}
                    onChange={(e) => setRejecting(prev => ({ ...prev, [t.id]: e.target.value }))}
                    style={{ width: 260 }}
                  />
                  <button className="btn btn-danger" onClick={() => handleReject(t.id)}>❌ Reject</button>

                  <div style={{ width: 12 }} />

                  <input
                    className="form-control"
                    placeholder="Assign technician"
                    value={assigning[t.id] || ''}
                    onChange={(e) => setAssigning(prev => ({ ...prev, [t.id]: e.target.value }))}
                    style={{ width: 200 }}
                  />
                  <button className="btn btn-primary" onClick={() => handleAssign(t.id)}>🔧 Assign</button>
                </div>
              )}
            </div>

            {t.status === 'REJECTED' && (
              <div style={{ background: 'rgba(239,68,68,0.06)', padding: 10, borderRadius: 8, color: 'var(--text-secondary)' }}>
                <strong>Rejection reason:</strong> {t.rejectionReason || '—'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
