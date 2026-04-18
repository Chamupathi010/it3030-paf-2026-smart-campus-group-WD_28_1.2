import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTicket, getAllTickets, getImageUrl } from '../api/ticketApi';
import { StatusBadge, PriorityBadge } from '../components/StatusBadge';
import CommentSection from '../components/CommentSection';
import TechnicianPanel from './TechnicianPanel';

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState(null);

  const fetchTicket = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getTicket(id);
      setTicket(res.data);
    } catch (err) {
      console.error('getTicket error', err);
      // Try fallback: fetch all tickets and find locally (handles backend routing issues)
      try {
        const resAll = await getAllTickets();
        const found = resAll.data.find(t => t.id === id);
        if (found) {
          setTicket(found);
          return;
        }
      } catch (inner) {
        console.error('fallback getAllTickets failed', inner);
      }

      const serverMsg = err.response?.data?.message || err.message || 'Unknown error';
      setError('Could not load ticket details: ' + serverMsg);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchTicket(); }, [fetchTicket]);

  const formatDate = (d) => d ? new Date(d).toLocaleString() : '—';

  if (loading) return <div style={{ padding: 40 }}><div className="spinner" /></div>;
  if (error) return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 32 }}>
      <div className="alert alert-error">{error}</div>
      <button className="btn btn-secondary" onClick={() => navigate('/')}>← Back to Tickets</button>
    </div>
  );
  if (!ticket) return null;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
      {/* Back */}
      <button className="btn btn-secondary" onClick={() => navigate('/')} style={{ marginBottom: '20px' }}>
        ← Back to Tickets
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', alignItems: 'start' }}>
        {/* Main Content */}
        <div>
          {/* Ticket Header */}
          <div className="glass-card" style={{ padding: '24px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <StatusBadge status={ticket.status} />
                <PriorityBadge priority={ticket.priority} />
              </div>
              <span style={{ fontFamily: 'monospace', color: 'var(--accent)', fontSize: '13px', fontWeight: 700 }}>
                #{ticket.id?.slice(-8).toUpperCase()}
              </span>
            </div>

            <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>
              [{ticket.category}] {ticket.resourceId}
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '20px' }}>{ticket.description}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              {[
                {label: 'Created By', value: ticket.createdBy, icon: '👤'},
                {label: 'Assigned To', value: ticket.assignedTechnician || 'Unassigned', icon: '🔧'},
                {label: 'Created At', value: formatDate(ticket.createdAt), icon: '📅'},
                {label: 'Updated At', value: formatDate(ticket.updatedAt), icon: '🔄'},
                  { label: 'Rejection Reason', value: ticket.rejectionReason || '—', icon: '📌' },
              ].map(item => (
                <div key={item.label} style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  padding: '12px 14px',
                }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                    {item.icon} {item.label}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: item.label === 'Assigned To' && !ticket.assignedTechnician ? 'var(--text-secondary)' : 'var(--text-primary)' }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          {ticket.imagePaths && ticket.imagePaths.length > 0 && (
            <div className="glass-card" style={{ padding: '24px', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>🖼 Attached Images</h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {ticket.imagePaths.map((path, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImage(getImageUrl(path))}
                    style={{
                      width: '120px', height: '120px', borderRadius: '12px',
                      overflow: 'hidden', cursor: 'pointer',
                      border: '1px solid var(--border)',
                      transition: 'transform 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <img src={getImageUrl(path)} alt={`img-${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <CommentSection ticketId={ticket.id} comments={ticket.comments} onCommentAdded={fetchTicket} />
          </div>
        </div>

        {/* Technician Panel */}
        <div>
          <TechnicianPanel ticket={ticket} onUpdate={fetchTicket} />
        </div>
      </div>

      {/* Image Modal */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000, cursor: 'zoom-out',
          }}
        >
          <img src={activeImage} alt="fullscreen" style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: '12px', objectFit: 'contain' }} />
        </div>
      )}
    </div>
  );
};

export default TicketDetails;
