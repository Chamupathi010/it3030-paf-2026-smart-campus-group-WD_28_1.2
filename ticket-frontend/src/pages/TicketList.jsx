import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAllTickets } from '../api/ticketApi';
import { StatusBadge, PriorityBadge } from '../components/StatusBadge';

const TicketList = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getAllTickets();
      setTickets(res.data);
      setFiltered(res.data);
    } catch (err) {
      setError('Failed to load tickets. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = useCallback(() => {
    let result = [...tickets];
    if (statusFilter !== 'ALL') result = result.filter(t => t.status === statusFilter);
    if (priorityFilter !== 'ALL') result = result.filter(t => t.priority === priorityFilter);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(t =>
        t.resourceId?.toLowerCase().includes(q) ||
        t.category?.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q) ||
        t.createdBy?.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [tickets, statusFilter, priorityFilter, search]);

  useEffect(() => { applyFilters(); }, [applyFilters]);

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '4px' }}>🎫 All Tickets</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            {filtered.length} of {tickets.length} tickets
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/create')}>+ New Ticket</button>
      </div>

      {/* Filters */}
      <div className="glass-card" style={{ padding: '16px 20px', marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          className="form-control"
          style={{ flex: '1', minWidth: '200px', marginBottom: 0 }}
          placeholder="🔍 Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="form-control" style={{ width: 'auto', minWidth: '140px', marginBottom: 0 }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="ALL">All Statuses</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="RESOLVED">Resolved</option>
          <option value="CLOSED">Closed</option>
        </select>
        <select className="form-control" style={{ width: 'auto', minWidth: '140px', marginBottom: 0 }} value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="ALL">All Priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
        <button className="btn btn-secondary" style={{ whiteSpace: 'nowrap' }} onClick={fetchTickets}>↻ Refresh</button>
      </div>

      {error && <div className="alert alert-error">⚠️ {error}</div>}

      {loading ? (
        <div className="spinner" />
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
          <p style={{ fontSize: '16px' }}>No tickets found.</p>
          <button className="btn btn-primary" style={{ marginTop: '16px' }} onClick={() => navigate('/create')}>Create First Ticket</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map((ticket) => (
            <Link
              key={ticket.id}
              to={`/tickets/${ticket.id}`}
              className="glass-card"
              style={{
                padding: '20px 24px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '16px',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700, color: 'var(--accent)', fontSize: '13px', fontFamily: 'monospace' }}>
                    #{ticket.id?.slice(-6).toUpperCase()}
                  </span>
                  <StatusBadge status={ticket.status} />
                  <PriorityBadge priority={ticket.priority} />
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>
                  [{ticket.category}] {ticket.resourceId}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '600px' }}>
                  {ticket.description}
                </p>
                <div style={{ marginTop: '8px', display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <span>👤 {ticket.createdBy}</span>
                  {ticket.assignedTechnician && <span>🔧 {ticket.assignedTechnician}</span>}
                  <span>📅 {formatDate(ticket.createdAt)}</span>
                  <span>💬 {ticket.comments?.length || 0}</span>
                  {ticket.imagePaths?.length > 0 && <span>🖼 {ticket.imagePaths.length}</span>}
                </div>
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>›</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketList;
