import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './AuthPages.css';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      toast.success(`Welcome back, ${user.name.split(' ')[0]}!`);
      const routes = { STUDENT: '/student', FACULTY: '/faculty', HOD: '/hod', ADMIN: '/admin' };
      navigate(routes[user.role] || '/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-content">
          <div className="auth-logo">T</div>
          <h1>SBTET Telangana</h1>
          <p>Diploma Attendance Management System</p>
          <div className="auth-features">
            <div className="auth-feat">🤖 Face Biometric Verification</div>
            <div className="auth-feat">📍 GPS College Geofencing</div>
            <div className="auth-feat">📊 Real-time Attendance Tracking</div>
          </div>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-box fade-in">
          <h2>Welcome Back</h2>
          <p className="auth-sub">Login to your SBTET account</p>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-input" type="email" placeholder="you@example.com" required
                value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="Enter your password" required
                value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
            </div>
            <button type="submit" className="btn btn-primary" style={{width:'100%', padding:'14px'}} disabled={loading}>
              {loading ? <span className="spinner" style={{width:20,height:20,borderWidth:2}} /> : 'Login →'}
            </button>
          </form>
          <p className="auth-switch">Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </div>
    </div>
  );
}
