import { useState, useEffect } from 'react';
import { notificationAPI } from '../api/services';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { Bell, Check, Trash2 } from 'lucide-react';

const NOTIFICATION_ICONS = {
  BOOKING_APPROVED: '✅',
  BOOKING_REJECTED: '❌',
  BOOKING_CANCELLED: '🚫',
  TICKET_ASSIGNED: '🔧',
  TICKET_STATUS_UPDATED: '📋',
  TICKET_REJECTED: '❌',
  NEW_COMMENT: '💬',
  GENERAL: '📢',
};

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await notificationAPI.getMy({ page, size: 20 });
      setNotifications(res.data.content || []);
      setTotalPages(res.data.totalPages || 0);
    } catch { toast.error('Failed to load notifications'); }
    setLoading(false);
  };

  useEffect(() => { fetchNotifications(); }, [page]);

  const handleMarkRead = async (id) => {
    try {
      await notificationAPI.markRead(id);
      fetchNotifications();
    } catch {}
  };

  const handleDelete = async (id) => {
    try {
      await notificationAPI.delete(id);
      fetchNotifications();
    } catch {}
  };

  const handleMarkAllRead = async () => {
    const unread = notifications.filter(n => !n.read);
    await Promise.all(unread.map(n => notificationAPI.markRead(n.id)));
    fetchNotifications();
    toast.success('All marked as read');
  };

  return (
    <div className="animate-fade-in max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-header mb-0 flex items-center gap-2">
          <Bell size={22} className="text-primary-400" /> Notifications
        </h1>
        {notifications.some(n => !n.read) && (
          <button onClick={handleMarkAllRead} className="btn-secondary text-xs flex items-center gap-1.5">
            <Check size={12} /> Mark all read
          </button>
        )}
      </div>

      {loading ? <LoadingSpinner /> : notifications.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <Bell size={48} className="mx-auto mb-4 opacity-30" />
          <p>No notifications</p>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {notifications.map(n => (
              <div
                key={n.id}
                className={`glass-card p-4 flex items-start gap-4 transition-all duration-200 ${!n.read ? 'border-primary-500/30 bg-primary-500/5' : ''}`}
              >
                <span className="text-xl flex-shrink-0 mt-0.5">{NOTIFICATION_ICONS[n.type] || '📢'}</span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${n.read ? 'text-slate-400' : 'text-slate-100'}`}>{n.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{n.message}</p>
                  <p className="text-xs text-slate-600 mt-1">{format(new Date(n.createdAt), 'MMM d, yyyy h:mm a')}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!n.read && (
                    <button onClick={() => handleMarkRead(n.id)} className="p-1.5 rounded-lg hover:bg-white/5 text-slate-500 hover:text-slate-300 transition-colors" title="Mark as read">
                      <Check size={14} />
                    </button>
                  )}
                  <button onClick={() => handleDelete(n.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-colors" title="Delete">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
};

export default NotificationsPage;
