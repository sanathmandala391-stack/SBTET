import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import './AdminPages.css';

export default function AdminApprovals() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/approvals').then(r => setPending(r.data)).finally(() => setLoading(false));
  }, []);

  const handleAction = async (userId, isApproved) => {
    try {
      await api.put(`/admin/users/${userId}/approval`, { isApproved });
      toast.success(isApproved ? 'User approved!' : 'User rejected.');
      setPending(p => p.filter(u => u.id !== userId));
    } catch { toast.error('Action failed.'); }
  };

  const roleColors = { student: '#1a237e', faculty: '#1b5e20', hod: '#4a148c' };

  return (
    <div className="page fade-in">
      <h1 style={{ marginBottom: 8 }}>Pending Approvals ✅</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 28 }}>
        {pending.length > 0 ? `${pending.length} users awaiting approval across all colleges.` : 'All users are approved.'}
      </p>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><div className="spinner" /></div>
      ) : pending.length === 0 ? (
        <div className="card" style={{ padding: 60, textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
          <h3 style={{ color: 'var(--primary)' }}>No Pending Approvals</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>All registered users have been reviewed.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {pending.map(u => (
            <div key={u.id} className="card" style={{ padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
                background: `linear-gradient(135deg, ${roleColors[u.role] || '#555'}, #888)`,
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 22
              }}>{u.name?.charAt(0)}</div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700, fontSize: 16 }}>{u.name}</span>
                  <span style={{
                    padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                    background: `${roleColors[u.role]}18`, color: roleColors[u.role]
                  }}>{u.role?.toUpperCase()}</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
                  📧 {u.email}
                  {u.pinNumber && ` • PIN: ${u.pinNumber}`}
                  {u.branch && ` • ${u.branch} ${u.semester}`}
                  {u.department && ` • Dept: ${u.department}`}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
                  🏫 {u.college?.name || 'Unknown College'} ({u.collegeCode})
                  &nbsp;•&nbsp; 📅 {new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>

              {u.faceImageUrl && (
                <img src={u.faceImageUrl} alt="face"
                  style={{ width: 60, height: 60, borderRadius: 10, objectFit: 'cover', border: '2px solid var(--border)', flexShrink: 0 }} />
              )}

              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn btn-danger" style={{ padding: '9px 22px' }} onClick={() => handleAction(u.id, false)}>✗ Reject</button>
                <button className="btn btn-success" style={{ padding: '9px 22px' }} onClick={() => handleAction(u.id, true)}>✓ Approve</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
