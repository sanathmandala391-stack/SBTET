import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import './AdminPages.css';

export default function AdminColleges() {
  const [colleges, setColleges] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/colleges').then(r => setColleges(r.data)).finally(() => setLoading(false));
  }, []);

  const filtered = colleges.filter(c =>
    c.collegeName?.toLowerCase().includes(search.toLowerCase()) ||
    c.collegeCode?.toLowerCase().includes(search.toLowerCase()) ||
    c.district?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page fade-in">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:28,flexWrap:'wrap',gap:16}}>
        <div>
          <h1>Registered Colleges 🏫</h1>
          <p style={{color:'var(--text-muted)',marginTop:4}}>{colleges.length} colleges registered across Telangana</p>
        </div>
        <Link to="/admin/colleges/register" className="btn btn-accent">+ Register College</Link>
      </div>

      <div style={{marginBottom:20}}>
        <input style={{padding:'12px 20px',border:'2px solid var(--border)',borderRadius:10,fontSize:15,width:'100%',maxWidth:400,outline:'none'}}
          placeholder="Search by name, code or district..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {loading ? <div style={{display:'flex',justifyContent:'center',padding:60}}><div className="spinner"/></div> : (
        <div className="grid-2">
          {filtered.map(c => (
            <div key={c.id} className="college-card card">
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div className="college-code-badge">{c.collegeCode}</div>
                <div style={{flex:1}}>
                  <div className="college-name">{c.collegeName || c.name}</div>
                  <div className="college-meta">📍 {c.district} • {c.address?.substring(0,40)}</div>
                </div>
                <div style={{padding:'4px 12px',background:'#e8f5e9',color:'#2e7d32',borderRadius:20,fontSize:12,fontWeight:700}}>Active</div>
              </div>
              {c.location?.latitude && (
                <div style={{fontSize:12,color:'var(--text-muted)'}}>
                  📡 Location set: {c.location.latitude.toFixed(4)}, {c.location.longitude.toFixed(4)} • Radius: {c.location.radius}m
                </div>
              )}
              <div className="college-stats">
                <span className="college-stat">🎓 <strong>{c.studentCount || 0}</strong> Students</span>
                <span className="college-stat">👨‍🏫 <strong>{c.facultyCount || 0}</strong> Faculty</span>
                <span className="college-stat">🏅 <strong>{c.hodCount || 0}</strong> HODs</span>
                <span className="college-stat">📅 Added {new Date(c.createdAt).toLocaleDateString('en-IN')}</span>
              </div>
              {c.branches?.length > 0 && (
                <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                  {c.branches.map(b => (
                    <span key={b.code} style={{padding:'3px 10px',background:'rgba(26,35,126,0.08)',color:'var(--primary)',borderRadius:20,fontSize:12,fontWeight:600}}>{b.code}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && <div style={{gridColumn:'1/-1',textAlign:'center',padding:60,color:'var(--text-muted)'}}>No colleges found</div>}
        </div>
      )}
    </div>
  );
}
