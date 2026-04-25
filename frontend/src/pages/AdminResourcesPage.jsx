import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { resourceAPI } from '../api/services';
import StatusBadge from '../components/StatusBadge';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { Plus, Edit2, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

const AdminResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const fetchResources = async () => {
    setLoading(true);
    try {
      const res = await resourceAPI.getAll({ page, size: 15, sortBy: 'createdAt', sortDir: 'desc' });
      setResources(res.data.content || []);
      setTotalPages(res.data.totalPages || 0);
    } catch { toast.error('Failed to load resources'); }
    setLoading(false);
  };

  useEffect(() => { fetchResources(); }, [page]);

  const handleToggleStatus = async (resource) => {
    const newStatus = resource.status === 'ACTIVE' ? 'OUT_OF_SERVICE' : 'ACTIVE';
    try {
      await resourceAPI.updateStatus(resource.id, newStatus);
      toast.success(`Resource ${newStatus === 'ACTIVE' ? 'activated' : 'deactivated'}`);
      fetchResources();
    } catch { toast.error('Failed to update status'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this resource? This cannot be undone.')) return;
    try {
      await resourceAPI.delete(id);
      toast.success('Resource deleted');
      fetchResources();
    } catch { toast.error('Failed to delete resource'); }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-header mb-0">Manage Resources</h1>
        <button onClick={() => navigate('/admin/resources/create')} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Add Resource
        </button>
      </div>

      {loading ? <LoadingSpinner /> : (
        <>
          <div className="glass-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="table-header text-left p-4">Name</th>
                  <th className="table-header text-left p-4">Type</th>
                  <th className="table-header text-left p-4">Capacity</th>
                  <th className="table-header text-left p-4">Location</th>
                  <th className="table-header text-left p-4">Status</th>
                  <th className="table-header text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {resources.map(r => (
                  <tr key={r.id} className="hover:bg-white/3 transition-colors">
                    <td className="p-4">
                      <p className="text-sm font-medium text-slate-200">{r.name}</p>
                      <p className="text-xs text-slate-500">{r.description?.slice(0, 40)}{r.description?.length > 40 ? '...' : ''}</p>
                    </td>
                    <td className="p-4">
                      <span className="text-xs text-slate-400">{r.type?.replace(/_/g, ' ')}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-slate-300">{r.capacity}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-xs text-slate-400">
                        {r.location?.building ? `${r.location.building}${r.location.floor ? ', ' + r.location.floor : ''}` : '—'}
                      </span>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={r.status} type="resource" />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleStatus(r)}
                          className={`p-1.5 rounded-lg transition-colors ${r.status === 'ACTIVE' ? 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400' : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400'}`}
                          title={r.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                        >
                          {r.status === 'ACTIVE' ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                        </button>
                        <button
                          onClick={() => navigate(`/admin/resources/edit/${r.id}`)}
                          className="p-1.5 rounded-lg bg-primary-500/20 hover:bg-primary-500/30 text-primary-400 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(r.id)}
                          className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
};

export default AdminResourcesPage;
