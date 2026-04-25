import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingAPI } from '../api/services';
import StatusBadge from '../components/StatusBadge';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { CalendarPlus, CalendarX } from 'lucide-react';

const WORKFLOW_STEPS = ['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'];

const isStepComplete = (currentStatus, step) => {
  if (currentStatus === step) return true;
  if (currentStatus === 'APPROVED' && step === 'PENDING') return true;
  if (currentStatus === 'REJECTED' && step === 'PENDING') return true;
  if (currentStatus === 'CANCELLED' && (step === 'PENDING' || step === 'APPROVED')) return true;
  return false;
};

const MyBookingsPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await bookingAPI.getMy({ page, size: 10 });
      setBookings(res.data.content || []);
      setTotalPages(res.data.totalPages || 0);
    } catch {
      toast.error('Failed to load bookings');
    }
    setLoading(false);
  };

  useEffect(() => { fetchBookings(); }, [page]);

  const handleCancel = async (id) => {
    if (!confirm('Cancel this booking?')) return;
    try {
      await bookingAPI.cancel(id);
      toast.success('Booking cancelled');
      fetchBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel');
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="page-header mb-0">My Bookings</h1>
        <button
          onClick={() => navigate('/bookings/create')}
          className="btn-primary flex items-center gap-2"
        >
          <CalendarPlus size={16} /> Create Booking
        </button>
      </div>

      {loading ? <LoadingSpinner /> : bookings.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <CalendarX size={48} className="mx-auto mb-4 opacity-30" />
          <p>No bookings found</p>
          <button
            onClick={() => navigate('/bookings/create')}
            className="btn-primary inline-flex items-center gap-2 mt-5"
          >
            <CalendarPlus size={16} /> Create Your First Booking
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {bookings.map(booking => (
              <div key={booking.id} className="glass-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-slate-100 truncate">{booking.resourceName}</h3>
                    <StatusBadge status={booking.status} type="booking" />
                  </div>
                  <p className="text-sm text-slate-400">{booking.purpose}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                    <span>📅 {format(new Date(booking.startTime), 'MMM d, yyyy')}</span>
                    <span>⏰ {format(new Date(booking.startTime), 'h:mm a')} – {format(new Date(booking.endTime), 'h:mm a')}</span>
                    <span>👥 {booking.attendeeCount} attendees</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {WORKFLOW_STEPS.map((step) => {
                      const complete = isStepComplete(booking.status, step);
                      const active = booking.status === step;
                      return (
                        <span
                          key={step}
                          className={`text-[10px] px-2 py-1 rounded-full border ${
                            active
                              ? 'bg-primary-500/25 border-primary-400/50 text-primary-200'
                              : complete
                                ? 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300'
                                : 'bg-white/5 border-white/10 text-slate-500'
                          }`}
                        >
                          {step}
                        </span>
                      );
                    })}
                  </div>
                  {booking.rejectionReason && (
                    <p className="text-xs text-red-400 mt-1">Reason: {booking.rejectionReason}</p>
                  )}
                </div>
                {['PENDING', 'APPROVED'].includes(booking.status) && (
                  <button
                    onClick={() => handleCancel(booking.id)}
                    className="btn-danger text-xs flex-shrink-0"
                  >
                    Cancel
                  </button>
                )}
              </div>
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
};

export default MyBookingsPage;
