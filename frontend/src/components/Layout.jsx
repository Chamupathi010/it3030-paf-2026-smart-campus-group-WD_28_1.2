import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Building2, CalendarCheck, Ticket, Bell,
  Users, ChevronLeft, ChevronRight, LogOut, Settings,
  Wrench, Menu, X, ShieldCheck
} from 'lucide-react';
import useAuthStore from '../store/authStore';
import { notificationAPI } from '../api/services';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', roles: ['USER', 'ADMIN', 'TECHNICIAN'] },
  { label: 'Admin Dashboard', icon: ShieldCheck, path: '/admin/dashboard', roles: ['ADMIN'] },
  { label: 'Resources', icon: Building2, path: '/resources', roles: ['USER', 'ADMIN', 'TECHNICIAN'] },
  { label: 'My Bookings', icon: CalendarCheck, path: '/bookings/my', roles: ['USER', 'ADMIN'] },
  { label: 'My Tickets', icon: Ticket, path: '/tickets/my', roles: ['USER'] },
  { label: 'Admin Bookings', icon: CalendarCheck, path: '/admin/bookings', roles: ['ADMIN'] },
  { label: 'Admin Tickets', icon: Ticket, path: '/admin/tickets', roles: ['ADMIN', 'TECHNICIAN'] },
  { label: 'Manage Resources', icon: Settings, path: '/admin/resources', roles: ['ADMIN'] },
  { label: 'User Management', icon: Users, path: '/admin/users', roles: ['ADMIN'] },
  { label: 'Technician Panel', icon: Wrench, path: '/technician/dashboard', roles: ['TECHNICIAN'] },
];

const Sidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const { user, logout, hasRole } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const filteredNav = navItems.filter(item =>
    item.roles.some(role => user?.roles?.includes(role))
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-sky-100 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-violet-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <Building2 size={18} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-xs font-bold text-slate-100 leading-none">SmartFacility</p>
            <p className="text-xs text-slate-500">Booking System</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {filteredNav.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={isActive ? 'sidebar-link-active' : 'sidebar-link'}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t border-sky-100 p-3">
        <div className={`flex items-center gap-3 p-2 rounded-lg ${collapsed ? 'justify-center' : ''}`}>
          {user?.picture ? (
            <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
          ) : (
            <div className="w-8 h-8 bg-primary-600/15 rounded-full flex items-center justify-center flex-shrink-0 border border-primary-500/20">
              <span className="text-xs font-bold text-primary-700">{user?.name?.charAt(0)}</span>
            </div>
          )}
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-100 truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-3 py-2 mt-1 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors w-full text-sm ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut size={16} />
          {!collapsed && 'Logout'}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col bg-dark-800 border-r border-sky-100 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} fixed top-0 left-0 h-full z-30`}>
        <SidebarContent />
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-6 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-primary-500 transition-colors"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`lg:hidden fixed top-0 left-0 h-full w-72 bg-dark-800 border-r border-sky-100 z-50 transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </aside>
    </>
  );
};

const Navbar = ({ collapsed, mobileOpen, setMobileOpen }) => {
  const { user } = useAuthStore();
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await notificationAPI.getUnreadCount();
        setUnreadCount(res.data.count);
      } catch {}
    };
    fetchUnread();
    const interval = setInterval(fetchUnread, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className={`fixed top-0 right-0 z-20 h-16 bg-dark-800/85 backdrop-blur-md border-b border-sky-100 flex items-center justify-between px-4 transition-all duration-300 ${collapsed ? 'lg:left-16' : 'lg:left-64'} left-0`}>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden p-2 rounded-lg hover:bg-sky-50 text-slate-400"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div className="flex-1 lg:flex-none" />

      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/notifications')}
          className="relative p-2 rounded-lg hover:bg-sky-50 text-slate-400 hover:text-slate-100 transition-colors"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {user?.picture ? (
          <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
        ) : (
          <div className="w-8 h-8 bg-primary-600/15 rounded-full flex items-center justify-center border border-primary-500/20">
            <span className="text-xs font-bold text-primary-700">{user?.name?.charAt(0)}</span>
          </div>
        )}
      </div>
    </header>
  );
};

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-900">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <Navbar collapsed={collapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className={`transition-all duration-300 pt-16 ${collapsed ? 'lg:ml-16' : 'lg:ml-64'} min-h-screen`}>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
