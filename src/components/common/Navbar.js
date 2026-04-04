import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const NAV_LINKS = {
  STUDENT: [
    { to: '/student', label: 'Dashboard' },
    { to: '/student/mark', label: '📍 Mark Attendance' },
    { to: '/student/attendance', label: '📊 My Attendance' }
  ],
  FACULTY: [
    { to: '/faculty', label: 'Dashboard' },
    { to: '/faculty/students', label: '👥 Students' },
    { to: '/faculty/report', label: '📋 Reports' }
  ],
  HOD: [
    { to: '/hod', label: 'Dashboard' },
    { to: '/hod/today', label: '📅 Today' },
    { to: '/hod/students', label: '👥 Students' },
    { to: '/hod/approvals', label: '✅ Approvals' },
    { to: '/hod/report', label: '📋 Reports' }
  ],
  ADMIN: [
    { to: '/admin', label: 'Dashboard' },
    { to: '/admin/colleges', label: '🏫 Colleges' },
    { to: '/admin/users', label: '👥 Users' },
    { to: '/admin/approvals', label: '✅ Approvals' }
  ]
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };
  const links = user ? NAV_LINKS[user.role] || [] : [];

  const roleColors = { STUDENT: '#1a237e', FACULTY: '#1b5e20', HOD: '#4a148c', ADMIN: '#b71c1c' };
  const roleColor = roleColors[user?.role] || '#1a237e';

  return (
    <nav className="navbar" style={{ '--role-color': roleColor }}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">T</div>
          <div className="brand-text">
            <span className="brand-main">SBTET</span>
            <span className="brand-sub">Telangana</span>
          </div>
        </Link>

        {user && (
          <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
            {links.map(l => (
              <Link key={l.to} to={l.to} className={`nav-link ${location.pathname === l.to ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
                {l.label}
              </Link>
            ))}
          </div>
        )}

        <div className="navbar-right">
          {user ? (
            <div className="user-menu">
              <div className="user-badge">
                <div className="user-avatar">{user.name?.charAt(0)?.toUpperCase()}</div>
                <div className="user-info">
                  <span className="user-name">{user.name?.split(' ')[0]}</span>
                  <span className="user-role">{user.role?.toUpperCase()}</span>
                </div>
              </div>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="btn btn-outline" style={{ padding: '8px 20px', fontSize: 14 }}>Login</Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: 14 }}>Register</Link>
            </div>
          )}
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
}
