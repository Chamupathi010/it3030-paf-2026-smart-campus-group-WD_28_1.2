import React, { useState } from 'react';
import { addComment } from '../api/ticketApi';

const CommentSection = ({ ticketId, comments = [], onCommentAdded }) => {
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) {
      setError('Author and message are required.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await addComment(ticketId, author.trim(), message.trim());
      setAuthor('');
      setMessage('');
      onCommentAdded();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add comment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        💬 Comments <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 400 }}>({comments.length})</span>
      </h3>

      {/* Comments List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        {comments.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', textAlign: 'center', padding: '20px' }}>
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((c, idx) => (
            <div key={idx} style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '14px 16px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 700, color: 'var(--accent)', fontSize: '14px' }}>@{c.author}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{formatDate(c.createdAt)}</span>
              </div>
              <p style={{ color: 'var(--text-primary)', fontSize: '14px', lineHeight: 1.6 }}>{c.message}</p>
            </div>
          ))
        )}
      </div>

      {/* Add Comment Form */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '14px' }}>ADD COMMENT</h4>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Your Name</label>
              <input
                className="form-control"
                placeholder="e.g. John Doe"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: '12px' }}>
            <label className="form-label">Message</label>
            <textarea
              className="form-control"
              placeholder="Write your comment..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Posting...' : '💬 Post Comment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;
