import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import './AdminPages.css';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('');
  const [search, setSearch] = useState('');

  const fetchUsers = () => {
    setLoading(true);
    const p = new URLSearchParams();
    if (role) p.set('role', role);
    api.get(`/admin/users?${p}`).then(r => setUsers(r.data)).finally(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, [role]);

  const handleApprove = async (userId, isApproved) => {
    try {
      await api.put(`/admin/users/${userId}/approval`, { isApproved });
      toast.success(isApproved ? 'User approved!' : 'User rejected.');
      setUsers(u => u.map(x => x.id === userId ? { ...x, isApproved } : x));
    } catch { toast.error('Action failed.'); }
  };

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.pinNumber?.includes(search) ||
    u.college?.collegeCode?.includes(search) || u.collegeCode?.includes(search)
  );

  const roleColors = { student: '#1a237e', faculty: '#1b5e20', hod: '#4a148c' };

  return (
    <div className="page fade-in">
      <h1 style={{ marginBottom: 8 }}>Manage Users 👥</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 28 }}>All registered users across Telangana polytechnic colleges.</p>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
        <input
          style={{ padding: '10px 16px', border: '2px solid var(--border)', borderRadius: 10, fontSize: 14, flex: 1, maxWidth: 320, outline: 'none' }}
          placeholder="Search name, email, PIN, college..." value={search} onChange={e => setSearch(e.target.value)}
        />
        {['', 'student', 'faculty', 'hod'].map(r => (
          <button key={r} onClick={() => setRole(r)}
            style={{ padding: '10px 20px', borderRadius: 10, fontWeight: 600, fontSize: 13, border: '2px solid', cursor: 'pointer', transition: '.2s',
              borderColor: role === r ? 'var(--primary)' : 'var(--border)',
              background: role === r ? 'var(--primary)' : '#fff',
              color: role === r ? '#fff' : 'var(--text-muted)' }}>
            {r === '' ? 'All' : r.toUpperCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><div className="spinner" /></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map(u => (
            <div key={u.id} className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                background: `linear-gradient(135deg, ${roleColors[u.role] || '#555'}, #777)`,
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 18
              }}>{u.name?.charAt(0)}</div>

              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{u.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>
                  {u.email} • {u.college?.collegeName || u.college?.name || u.collegeCode}
                  {u.pinNumber && ` • PIN: ${u.pinNumber}`}
                  {u.branch && ` • ${u.branch} ${u.semester}`}
                  {u.department && ` • ${u.department}`}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span style={{
                  padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                  background: `${roleColors[u.role]}18`, color: roleColors[u.role] || '#555'
                }}>{u.role?.toUpperCase()}</span>

                <span style={{
                  padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                  background: u.isApproved ? '#e8f5e9' : '#fff3e0',
                  color: u.isApproved ? '#2e7d32' : '#e65100'
                }}>{u.isApproved ? 'Approved' : 'Pending'}</span>

                {!u.isApproved ? (
                  <button className="btn btn-success" style={{ padding: '6px 16px', fontSize: 13 }} onClick={() => handleApprove(u.id, true)}>Approve</button>
                ) : (
                  <button className="btn btn-danger" style={{ padding: '6px 16px', fontSize: 13 }} onClick={() => handleApprove(u.id, false)}>Revoke</button>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)', fontSize: 15 }}>No users found</div>
          )}
        </div>
      )}
    </div>
  );
}
