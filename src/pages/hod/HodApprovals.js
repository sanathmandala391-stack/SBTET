import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import './HodPages.css';

export default function HodApprovals() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/hod/approvals').then(r => setPending(r.data)).finally(() => setLoading(false));
  }, []);

  const handleAction = async (userId, isApproved) => {
    try {
      await api.put(`/hod/users/${userId}/approval`, { isApproved });
      toast.success(isApproved ? 'User approved!' : 'User rejected.');
      setPending(p => p.filter(u => u.id !== userId));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed.');
    }
  };

  return (
    <div className="page fade-in">
      <h1 style={{marginBottom:8}}>Pending Approvals ✅</h1>
      <p style={{color:'var(--text-muted)',marginBottom:28}}>Approve or reject student and faculty registrations for your college.</p>
      {loading ? <div style={{display:'flex',justifyContent:'center',padding:60}}><div className="spinner"/></div> : (
        pending.length === 0 ? (
          <div className="card" style={{padding:60,textAlign:'center'}}>
            <div style={{fontSize:48,marginBottom:16}}>🎉</div>
            <h3 style={{color:'var(--primary)'}}>All caught up!</h3>
            <p style={{color:'var(--text-muted)',marginTop:8}}>No pending approvals at this time.</p>
          </div>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {pending.map(u => (
              <div key={u.id} className="card" style={{padding:20,display:'flex',gap:16,alignItems:'center',flexWrap:'wrap'}}>
                <div className="s-avatar" style={{width:48,height:48,fontSize:20}}>{u.name?.charAt(0)}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:16}}>{u.name}</div>
                  <div style={{fontSize:13,color:'var(--text-muted)',marginTop:2}}>
                    {u.role?.toUpperCase()} • {u.email}
                    {u.pinNumber && ` • PIN: ${u.pinNumber}`}
                    {u.branch && ` • ${u.branch} ${u.semester}`}
                    {u.department && ` • ${u.department}`}
                  </div>
                  <div style={{fontSize:12,color:'var(--text-muted)',marginTop:2}}>
                    Registered: {new Date(u.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}
                  </div>
                </div>
                {u.faceImageUrl && (
                  <img src={u.faceImageUrl} alt="face" style={{width:56,height:56,borderRadius:8,objectFit:'cover',border:'2px solid var(--border)'}} />
                )}
                <div style={{display:'flex',gap:10}}>
                  <button className="btn btn-danger" style={{padding:'8px 20px'}} onClick={() => handleAction(u.id, false)}>Reject</button>
                  <button className="btn btn-success" style={{padding:'8px 20px'}} onClick={() => handleAction(u.id, true)}>Approve ✓</button>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
