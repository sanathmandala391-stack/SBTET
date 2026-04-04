import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import './AdminPages.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/dashboard').then(r => setStats(r.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="page fade-in">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:32,flexWrap:'wrap',gap:16}}>
        <div>
          <h1>Admin Dashboard ⚙️</h1>
          <p style={{color:'var(--text-muted)',marginTop:4}}>SBTET Telangana — System Overview</p>
        </div>
        <Link to="/admin/colleges/register" className="btn btn-accent" style={{padding:'12px 24px'}}>+ Register College</Link>
      </div>

      {loading ? <div style={{display:'flex',justifyContent:'center',padding:60}}><div className="spinner"/></div> : stats && (
        <>
          <div className="grid-4" style={{marginBottom:28}}>
            {[
              { val:stats.totalColleges, label:'Registered Colleges', icon:'🏫', color:'var(--primary)' },
              { val:stats.totalStudents, label:'Total Students', icon:'🎓', color:'#1b5e20' },
              { val:stats.totalFaculty, label:'Faculty Members', icon:'👨‍🏫', color:'#4a148c' },
              { val:stats.pendingApprovals, label:'Pending Approvals', icon:'⏳', color:'#e65100' },
            ].map((s,i) => (
              <div key={i} className="admin-stat-card card">
                <div className="admin-stat-icon">{s.icon}</div>
                <div className="admin-stat-val" style={{color:s.color}}>{s.val}</div>
                <div className="admin-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Today's snapshot */}
          <div className="grid-2" style={{marginBottom:28}}>
            <div className="card" style={{padding:24}}>
              <h3 style={{color:'var(--primary)',marginBottom:16}}>📅 Today's Snapshot</h3>
              <div style={{display:'flex',gap:24}}>
                <div style={{textAlign:'center'}}>
                  <div style={{fontFamily:'var(--font)',fontSize:40,fontWeight:800,color:'#2e7d32'}}>{stats.todayPresent}</div>
                  <div style={{fontSize:13,color:'var(--text-muted)'}}>Present</div>
                </div>
                <div style={{textAlign:'center'}}>
                  <div style={{fontFamily:'var(--font)',fontSize:40,fontWeight:800,color:'#c62828'}}>{stats.todayAbsent}</div>
                  <div style={{fontSize:13,color:'var(--text-muted)'}}>Absent</div>
                </div>
              </div>
            </div>
            <div className="card" style={{padding:24}}>
              <h3 style={{color:'var(--primary)',marginBottom:16}}>🚀 Quick Actions</h3>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                <Link to="/admin/colleges/register" className="btn btn-primary" style={{justifyContent:'flex-start'}}>🏫 Register New College</Link>
                <Link to="/admin/approvals" className="btn btn-outline" style={{justifyContent:'flex-start',position:'relative'}}>
                  ✅ Review Approvals
                  {stats.pendingApprovals > 0 && <span style={{marginLeft:'auto',background:'var(--danger)',color:'#fff',borderRadius:12,padding:'2px 8px',fontSize:12,fontWeight:700}}>{stats.pendingApprovals}</span>}
                </Link>
                <Link to="/admin/users" className="btn btn-outline" style={{justifyContent:'flex-start'}}>👥 Manage Users</Link>
              </div>
            </div>
          </div>

          {/* Recent colleges */}
          <div className="card">
            <div style={{padding:'20px 24px',borderBottom:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <h3 style={{color:'var(--primary)'}}>Recently Registered Colleges</h3>
              <Link to="/admin/colleges" style={{fontSize:13,color:'var(--primary)',fontWeight:600}}>View All →</Link>
            </div>
            <div style={{padding:16,display:'flex',flexDirection:'column',gap:8}}>
              {(stats.recentColleges || []).map(c => (
                <div key={c.id} style={{display:'flex',alignItems:'center',gap:14,padding:'12px 12px',background:'var(--bg)',borderRadius:10}}>
                  <div style={{width:40,height:40,borderRadius:10,background:'var(--primary)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:14,flexShrink:0}}>{c.collegeCode}</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:600,fontSize:14}}>{c.collegeName || c.name}</div>
                    <div style={{fontSize:12,color:'var(--text-muted)',marginTop:2}}>{c.district} • Added {new Date(c.createdAt).toLocaleDateString('en-IN')}</div>
                  </div>
                  <div style={{padding:'4px 12px',background:'#e8f5e9',color:'#2e7d32',borderRadius:20,fontSize:12,fontWeight:600}}>Active</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
