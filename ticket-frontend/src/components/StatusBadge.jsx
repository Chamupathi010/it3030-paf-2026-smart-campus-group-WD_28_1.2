import React from 'react';

const STATUS_COLORS = {
  OPEN: { bg: 'rgba(59,130,246,0.15)', color: '#3b82f6', label: 'Open' },
  IN_PROGRESS: { bg: 'rgba(245,158,11,0.15)', color: '#f59e0b', label: 'In Progress' },
  RESOLVED: { bg: 'rgba(16,185,129,0.15)', color: '#10b981', label: 'Resolved' },
  CLOSED: { bg: 'rgba(148,163,184,0.15)', color: '#94a3b8', label: 'Closed' },
  REJECTED: { bg: 'rgba(239,68,68,0.12)', color: '#ef4444', label: 'Rejected' },
};

const PRIORITY_COLORS = {
  LOW: { bg: 'rgba(16,185,129,0.15)', color: '#10b981', label: 'Low' },
  MEDIUM: { bg: 'rgba(245,158,11,0.15)', color: '#f59e0b', label: 'Medium' },
  HIGH: { bg: 'rgba(239,68,68,0.15)', color: '#ef4444', label: 'High' },
};

export const StatusBadge = ({ status }) => {
  const config = STATUS_COLORS[status] || STATUS_COLORS.OPEN;
  return (
    <span style={{
      background: config.bg,
      color: config.color,
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 700,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      border: `1px solid ${config.color}40`,
    }}>
      {config.label}
    </span>
  );
};

export const PriorityBadge = ({ priority }) => {
  const config = PRIORITY_COLORS[priority] || PRIORITY_COLORS.LOW;
  return (
    <span style={{
      background: config.bg,
      color: config.color,
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 700,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      border: `1px solid ${config.color}40`,
    }}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
