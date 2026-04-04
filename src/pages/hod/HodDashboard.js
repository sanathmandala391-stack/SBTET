import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import './HodPages.css';

export default function HodDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [today, setToday] = useState(null);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/hod/today').then(r => setToday(r.data)),
      api.get('/hod/approvals').then(r => setPending(r.data))
    ]).finally(() => setLoading(false));
  }, []);

  if (!user.isApproved) {
    return (
      <div className="page">
        <div className="card" style={{maxWidth:480,margin:'60px auto',padding:48,textAlign:'center'}}>
          <div style={{fontSize:56}}>⏳</div>
          <h2 style={{margin:'16px 0 8px',color:'var(--primary)'}}>Awaiting Admin Approval</h2>
          <p style={{color:'var(--text-muted)'}}>Your HOD account is pending approval from the system administrator.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page fade-in">
      <div className="hod-header">
        <div>
          <h1>HOD Dashboard 🏅</h1>
          <p style={{color:'var(--text-muted)',marginTop:4}}>{user.college?.collegeName || user.college?.name} • {user.department}</p>
        </div>
        <div style={{display:'flex',gap:12}}>
          <Link to="/hod/approvals" className="btn btn-primary" style={{position:'relative'}}>
            ✅ Approvals
            {pending.length > 0 && <span className="badge-count">{pending.length}</span>}
          </Link>
        </div>
      </div>

      {loading ? <div style={{display:'flex',justifyContent:'center',padding:60}}><div className="spinner"/></div> : (
        <>
          {/* Today summary */}
          {today && (
            <div className="hod-stats grid-4" style={{marginBottom:28}}>
              <div className="hstat-card card">
                <div className="hstat-val">{today.summary?.total || 0}</div>
                <div className="hstat-label">Total Students</div>
              </div>
              <div className="hstat-card card" style={{borderTop:'3px solid #2e7d32'}}>
                <div className="hstat-val" style={{color:'#2e7d32'}}>{today.summary?.present || 0}</div>
                <div className="hstat-label">Present Today</div>
              </div>
              <div className="hstat-card card" style={{borderTop:'3px solid #c62828'}}>
                <div className="hstat-val" style={{color:'#c62828'}}>{today.summary?.absent || 0}</div>
                <div className="hstat-label">Absent Today</div>
              </div>
              <div className="hstat-card card" style={{borderTop:'3px solid #e65100'}}>
                <div className="hstat-val" style={{color:'#e65100'}}>{today.summary?.error || 0}</div>
                <div className="hstat-label">Error (Partial)</div>
              </div>
            </div>
          )}

          {/* Quick links */}
          <div className="grid-2" style={{marginBottom:28}}>
            <Link to="/hod/today" className="hod-link-card card">
              <span style={{fontSize:36}}>📅</span>
              <div><h3>Today's Attendance</h3><p>View who is present and absent right now</p></div>
              <span style={{marginLeft:'auto',fontSize:20,color:'var(--text-muted)'}}>→</span>
            </Link>
            <Link to="/hod/students" className="hod-link-card card">
              <span style={{fontSize:36}}>👥</span>
              <div><h3>All Students</h3><p>Browse and manage students with attendance stats</p></div>
              <span style={{marginLeft:'auto',fontSize:20,color:'var(--text-muted)'}}>→</span>
            </Link>
            <Link to="/hod/approvals" className="hod-link-card card">
              <span style={{fontSize:36}}>✅</span>
              <div>
                <h3>Pending Approvals {pending.length > 0 && <span className="badge-count" style={{position:'static',display:'inline-flex',marginLeft:8}}>{pending.length}</span>}</h3>
                <p>Approve student and faculty registrations</p>
              </div>
              <span style={{marginLeft:'auto',fontSize:20,color:'var(--text-muted)'}}>→</span>
            </Link>
            <Link to="/hod/report" className="hod-link-card card">
              <span style={{fontSize:36}}>📋</span>
              <div><h3>Monthly Reports</h3><p>Generate and download attendance reports</p></div>
              <span style={{marginLeft:'auto',fontSize:20,color:'var(--text-muted)'}}>→</span>
            </Link>
          </div>

          {/* Pending approvals preview */}
          {pending.length > 0 && (
            <div className="card" style={{padding:24}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
                <h3 style={{color:'var(--primary)'}}>⏳ Pending Approvals ({pending.length})</h3>
                <Link to="/hod/approvals" style={{fontSize:13,color:'var(--primary)',fontWeight:600}}>View All →</Link>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {pending.slice(0,3).map(u => (
                  <div key={u.id} className="pending-row">
                    <div className="prow-avatar">{u.name?.charAt(0)}</div>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:600,fontSize:14}}>{u.name}</div>
                      <div style={{fontSize:12,color:'var(--text-muted)'}}>{u.role?.toUpperCase()} • {u.pinNumber || u.department} • {new Date(u.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div style={{display:'flex',gap:8}}>
                      <ApproveBtn userId={u.id} onDone={() => setPending(p => p.filter(x => x.id !== u.id))} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ApproveBtn({ userId, onDone }) {
  const [loading, setLoading] = useState(false);
  const approve = async () => {
    setLoading(true);
    try { await api.put(`/hod/users/${userId}/approval`, { isApproved: true }); onDone(); }
    catch { } finally { setLoading(false); }
  };
  return (
    <button className="btn btn-success" style={{padding:'6px 14px',fontSize:13}} onClick={approve} disabled={loading}>
      {loading ? '...' : 'Approve'}
    </button>
  );
}
