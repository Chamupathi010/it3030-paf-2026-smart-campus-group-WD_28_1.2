import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../api/ticketApi';
import ImagePreview from '../components/ImagePreview';

const CATEGORIES = ['Electrical', 'Plumbing', 'HVAC', 'Structural', 'IT/Network', 'Security', 'Cleaning', 'Other'];

const CreateTicket = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    resourceId: '',
    category: '',
    description: '',
    priority: 'MEDIUM',
    createdBy: '',
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.resourceId || !form.category || !form.description || !form.createdBy) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await createTicket(form, images);
      setSuccess('✅ Ticket created successfully!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create ticket. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--accent), var(--accent-hover))',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
          }}>🎫</div>
          <h1 style={{ fontSize: '24px', fontWeight: 800 }}>Create New Ticket</h1>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Report a maintenance issue or incident. Fill in all required fields below.
        </p>
      </div>

      {error && <div className="alert alert-error">⚠️ {error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="glass-card" style={{ padding: '28px' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Resource ID *</label>
              <input className="form-control" name="resourceId" placeholder="e.g. ROOM-101" value={form.resourceId} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select className="form-control" name="category" value={form.category} onChange={handleChange}>
                <option value="">Select Category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea className="form-control" name="description" placeholder="Describe the issue in detail..." value={form.description} onChange={handleChange} rows={4} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Priority *</label>
              <select className="form-control" name="priority" value={form.priority} onChange={handleChange}>
                <option value="LOW">🟢 Low</option>
                <option value="MEDIUM">🟡 Medium</option>
                <option value="HIGH">🔴 High</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Created By *</label>
              <input className="form-control" name="createdBy" placeholder="Your name or user ID" value={form.createdBy} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Attach Images (optional)</label>
            <ImagePreview images={images} onImagesChange={setImages} />
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? '⏳ Creating...' : '🎫 Create Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;
