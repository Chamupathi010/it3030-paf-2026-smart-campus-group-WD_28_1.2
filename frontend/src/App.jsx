import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import useAuthStore from './store/authStore';

import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Resource Pages
import ResourceListPage from './pages/ResourceListPage';
import ResourceFormPage from './pages/ResourceFormPage';
import AdminResourcesPage from './pages/AdminResourcesPage';

function App() {
  const { isAuthenticated, isAdmin } = useAuthStore();

  const getDefaultRoute = () => {
    if (!isAuthenticated) return '/login';
    if (isAdmin()) return '/admin/resources';
    return '/resources';
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
        {/* Public fallback (optional) */}
        <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />

        {/* User Resource View */}
        <Route
          path="/resources"
          element={
            <ProtectedRoute>
              <Layout>
                <ResourceListPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Admin Resource Management */}
        <Route
          path="/admin/resources"
          element={
            <ProtectedRoute roles={['ADMIN']}>
              <Layout>
                <AdminResourcesPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Create Resource */}
        <Route
          path="/admin/resources/create"
          element={
            <ProtectedRoute roles={['ADMIN']}>
              <Layout>
                <ResourceFormPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* (Optional) Edit Resource */}
        <Route
          path="/admin/resources/:id"
          element={
            <ProtectedRoute roles={['ADMIN']}>
              <Layout>
                <ResourceFormPage />
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