import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Plus, Search, Filter, MapPin, Users, Zap } from 'lucide-react';
import { resourceAPI } from '../api/services';
import useAuthStore from '../store/authStore';
import LoadingSpinner from '../components/LoadingSpinner';
import StatusBadge from '../components/StatusBadge';
import Pagination from '../components/Pagination';
import toast from 'react-hot-toast';

const RESOURCE_TYPES = [
  'CONFERENCE_ROOM', 'LAB', 'SPORTS_FACILITY', 'AUDITORIUM',
  'CLASSROOM', 'PARKING', 'GYM', 'CAFETERIA'
];

const ResourceCard = ({ resource, onBook }) => {
  const navigate = useNavigate();
  const { isAdmin } = useAuthStore();

  const typeIcons = {
    CONFERENCE_ROOM: '🏢', LAB: '🔬', SPORTS_FACILITY: '⚽',
    AUDITORIUM: '🎭', CLASSROOM: '📚', PARKING: '🅿️', GYM: '💪', CAFETERIA: '🍽️'
  };

  return (
    <div className="glass-card-hover p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{typeIcons[resource.type] || '🏛️'}</span>
            <h3 className="font-semibold text-slate-100">{resource.name}</h3>
          </div>
          <p className="text-xs text-slate-400">{resource.type?.replace(/_/g, ' ')}</p>
        </div>
        <StatusBadge status={resource.status} type="resource" />
      </div>

      {resource.description && (
        <p className="text-sm text-slate-400 line-clamp-2">{resource.description}</p>
      )}

      <div className="flex items-center gap-4 text-sm text-slate-400">
        <span className="flex items-center gap-1.5">
          <Users size={14} className="text-primary-400" />
          {resource.capacity} capacity
        </span>
        {resource.location?.building && (
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-primary-400" />
            {resource.location.building}
          </span>
        )}
      </div>

      <div className="flex gap-2 mt-auto pt-2 border-t border-white/5">
        <button
          onClick={() => navigate(`/resources/${resource.id}`)}
          className="btn-secondary text-xs flex-1"
        >
          View Details
        </button>
        {resource.status === 'ACTIVE' && (
          <button
            onClick={() => onBook(resource)}
            className="btn-primary text-xs flex-1"
          >
            Book Now
          </button>
        )}
      </div>
    </div>
  );
};

const ResourceListPage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({ type: '', minCapacity: '', building: '', search: '' });
  const { isAdmin } = useAuthStore();
  const navigate = useNavigate();

  const fetchResources = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        size: 12,
        sortBy: 'createdAt',
        sortDir: 'desc',
      };
      if (filters.type) params.type = filters.type;
      if (filters.minCapacity) params.minCapacity = parseInt(filters.minCapacity);
      if (filters.building) params.building = filters.building;

      const res = await resourceAPI.getAll(params);
      setResources(res.data.content || []);
      setTotalPages(res.data.totalPages || 0);
    } catch {
      toast.error('Failed to load resources');
    }
    setLoading(false);
  };

  useEffect(() => { fetchResources(); }, [page, filters.type, filters.minCapacity, filters.building]);

  const handleBook = (resource) => {
    navigate('/bookings/create', { state: { resource } });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="page-header mb-0">Resources</h1>
          <p className="text-slate-400 text-sm mt-1">Find and book facility resources</p>
        </div>
        {isAdmin() && (
          <button onClick={() => navigate('/admin/resources/create')} className="btn-primary flex items-center gap-2">
            <Plus size={16} />
            Add Resource
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="glass-card p-4 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="form-label text-xs">Resource Type</label>
          <select
            className="form-select"
            value={filters.type}
            onChange={(e) => { setFilters({ ...filters, type: e.target.value }); setPage(0); }}
          >
            <option value="">All Types</option>
            {RESOURCE_TYPES.map(t => <option key={t} value={t}>{t.replace(/_/g, ' ')}</option>)}
          </select>
        </div>
        <div>
          <label className="form-label text-xs">Min. Capacity</label>
          <input
            type="number"
            className="form-input"
            placeholder="e.g. 10"
            value={filters.minCapacity}
            onChange={(e) => { setFilters({ ...filters, minCapacity: e.target.value }); setPage(0); }}
          />
        </div>
        <div>
          <label className="form-label text-xs">Building</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Block A"
            value={filters.building}
            onChange={(e) => { setFilters({ ...filters, building: e.target.value }); setPage(0); }}
          />
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : resources.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <Building2 size={48} className="mx-auto mb-4 opacity-30" />
          <p>No resources found</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {resources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} onBook={handleBook} />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
};

export default ResourceListPage;
