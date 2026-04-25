import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resourceAPI } from '../api/services';
import toast from 'react-hot-toast';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';

const RESOURCE_TYPES = [
  'CONFERENCE_ROOM', 'LAB', 'SPORTS_FACILITY', 'AUDITORIUM',
  'CLASSROOM', 'PARKING', 'GYM', 'CAFETERIA'
];

const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

const ResourceFormPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    type: '',
    capacity: 1,
    description: '',
    status: 'ACTIVE',
    location: { building: '', floor: '', room: '', address: '' },
    availabilityWindows: [],
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleLocation = (e) => setForm({ ...form, location: { ...form.location, [e.target.name]: e.target.value } });

  const addWindow = () => {
    setForm({
      ...form,
      availabilityWindows: [...form.availabilityWindows, { dayOfWeek: 'MONDAY', startTime: '09:00', endTime: '17:00' }]
    });
  };

  const updateWindow = (idx, field, value) => {
    const windows = [...form.availabilityWindows];
    windows[idx] = { ...windows[idx], [field]: value };
    setForm({ ...form, availabilityWindows: windows });
  };

  const removeWindow = (idx) => {
    setForm({ ...form, availabilityWindows: form.availabilityWindows.filter((_, i) => i !== idx) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resourceAPI.create(form);
      toast.success('Resource created successfully!');
      navigate('/admin/resources');
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors) {
        Object.values(errors).forEach(msg => toast.error(msg));
      } else {
        toast.error(err.response?.data?.message || 'Failed to create resource');
      }
    }
    setLoading(false);
  };

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-slate-200 mb-6 text-sm">
        <ArrowLeft size={16} /> Back
      </button>
      <h1 className="page-header">Create New Resource</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass-card p-6 space-y-4">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Basic Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Resource Name *</label>
              <input name="name" className="form-input" placeholder="e.g. Conference Room A" value={form.name} onChange={handleChange} required />
            </div>
            <div>
              <label className="form-label">Type *</label>
              <select name="type" className="form-select" value={form.type} onChange={handleChange} required>
                <option value="">Select Type</option>
                {RESOURCE_TYPES.map(t => <option key={t} value={t}>{t.replace(/_/g, ' ')}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Capacity *</label>
              <input name="capacity" type="number" min="1" className="form-input" value={form.capacity} onChange={handleChange} required />
            </div>
            <div>
              <label className="form-label">Status</label>
              <select name="status" className="form-select" value={form.status} onChange={handleChange}>
                <option value="ACTIVE">Active</option>
                <option value="OUT_OF_SERVICE">Out of Service</option>
              </select>
            </div>
          </div>
          <div>
            <label className="form-label">Description</label>
            <textarea name="description" className="form-input resize-none" rows={3} placeholder="Describe the resource..." value={form.description} onChange={handleChange} />
          </div>
        </div>

        <div className="glass-card p-6 space-y-4">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Location</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Building</label>
              <input name="building" className="form-input" placeholder="Block A" value={form.location.building} onChange={handleLocation} />
            </div>
            <div>
              <label className="form-label">Floor</label>
              <input name="floor" className="form-input" placeholder="2nd Floor" value={form.location.floor} onChange={handleLocation} />
            </div>
            <div>
              <label className="form-label">Room</label>
              <input name="room" className="form-input" placeholder="Room 201" value={form.location.room} onChange={handleLocation} />
            </div>
            <div>
              <label className="form-label">Address</label>
              <input name="address" className="form-input" placeholder="Main Campus" value={form.location.address} onChange={handleLocation} />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Availability Windows</h2>
            <button type="button" onClick={addWindow} className="btn-secondary text-xs flex items-center gap-1">
              <Plus size={12} /> Add Window
            </button>
          </div>
          {form.availabilityWindows.map((w, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
              <select className="form-select text-sm flex-1" value={w.dayOfWeek} onChange={(e) => updateWindow(idx, 'dayOfWeek', e.target.value)}>
                {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <input type="time" className="form-input text-sm w-32" value={w.startTime} onChange={(e) => updateWindow(idx, 'startTime', e.target.value)} />
              <span className="text-slate-500 text-sm">to</span>
              <input type="time" className="form-input text-sm w-32" value={w.endTime} onChange={(e) => updateWindow(idx, 'endTime', e.target.value)} />
              <button type="button" onClick={() => removeWindow(idx)} className="text-red-400 hover:text-red-300 p-1">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          {form.availabilityWindows.length === 0 && (
            <p className="text-slate-500 text-sm text-center py-4">No availability windows. Click "Add Window" to define availability.</p>
          )}
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={() => navigate(-1)} className="btn-secondary flex-1">Cancel</button>
          <button type="submit" disabled={loading} className="btn-primary flex-1 flex items-center justify-center gap-2">
            {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            Create Resource
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResourceFormPage;
