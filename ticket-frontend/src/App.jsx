import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TicketList from './pages/TicketList';
import CreateTicket from './pages/CreateTicket';
import TicketDetails from './pages/TicketDetails';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <Navbar />
        <main style={{ paddingBottom: '64px' }}>
          <Routes>
            <Route path="/" element={<TicketList />} />
            <Route path="/create" element={<CreateTicket />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/tickets/:id" element={<TicketDetails />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
