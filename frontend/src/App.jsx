import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useAuthStore from './store/authStore';

import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Booking Pages
import BookingCreatePage from './pages/BookingCreatePage';
import MyBookingsPage from './pages/MyBookingsPage';
import AdminBookingsPage from './pages/AdminBookingsPage';
// (Optional if you have)
import BookingDetailPage from './pages/BookingDetailPage';

function App() {
  const { isAuthenticated, isAdmin } = useAuthStore();

  const getDefaultRoute = () => {
    if (!isAuthenticated) return '/login';
    if (isAdmin()) return '/admin/bookings';
    return '/bookings/my';
  };

  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1a2e',
            color: '#e2e8f0',
            border: '1px solid rgba(255,255,255,0.1)',
          },
          success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />

      <Routes>
        {/* Default Redirect */}
        <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />

        {/* Create Booking */}
        <Route
          path="/bookings/create"
          element={
            <ProtectedRoute>
              <Layout>
                <BookingCreatePage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* My Bookings */}
        <Route
          path="/bookings/my"
          element={
            <ProtectedRoute>
              <Layout>
                <MyBookingsPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Booking Details (Optional) */}
        <Route
          path="/bookings/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <BookingDetailPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Admin Booking Management */}
        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute roles={['ADMIN']}>
              <Layout>
                <AdminBookingsPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
      </Routes>
    </Router>
  );
}

export default App;