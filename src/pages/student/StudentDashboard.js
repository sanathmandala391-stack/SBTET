// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import api from '../../utils/api';
// import './StudentPages.css';

// export default function StudentDashboard() {
//   const { user } = useAuth();
//   const [todayRecord, setTodayRecord] = useState(null);
//   const [summary, setSummary] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     Promise.all([
//       api.get('/attendance/today').then(r => setTodayRecord(r.data.record)),
//       api.get('/student/attendance').then(r => setSummary(r.data.stats || r.data))
//     ]).finally(() => setLoading(false));
//   }, []);

//   if (!user.isApproved) {
//     return (
//       <div className="page">
//         <div className="pending-card card">
//           <div className="pending-icon">⏳</div>
//           <h2>Account Pending Approval</h2>
//           <p>Your registration is under review by your HOD. You'll be able to mark attendance once approved.</p>
//           <div className="pending-info">
//             <span><strong>Name:</strong> {user.name}</span>
//             <span><strong>PIN:</strong> {user.pinNumber}</span>
//             <span><strong>College:</strong> {user.collegeCode}</span>
//             <span><strong>Branch:</strong> {user.branch} — {user.semester}</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const pct = parseFloat(summary?.overallPercentage || summary?.percentage || 0);
//   const pctColor = pct >= 75 ? '#2e7d32' : pct >= 60 ? '#f57f17' : '#c62828';

//   const getTodayStatusDisplay = () => {
//     if (!todayRecord) return { label: 'Not Marked', color: '#546e7a', bg: '#eceff1', icon: '⭕' };
//     const map = {
//       P: { label: 'Present ✓', color: '#2e7d32', bg: '#e8f5e9', icon: '✅' },
//       A: { label: 'Absent', color: '#c62828', bg: '#ffebee', icon: '❌' },
//       E: { label: 'Checked In — Pending Checkout', color: '#e65100', bg: '#fff3e0', icon: '⚠️' },
//       HD: { label: 'Half Day', color: '#0d47a1', bg: '#e3f2fd', icon: '🔵' },
//     };
//     return map[todayRecord.status] || { label: todayRecord.status, color: '#546e7a', bg: '#eceff1', icon: '•' };
//   };

//   const todayDisplay = getTodayStatusDisplay();

//   return (
//     <div className="page fade-in">
//       <div className="student-header">
//         <div>
//           <h1>Good {getGreeting()}, {user.name?.split(' ')[0]}! 👋</h1>
//           <p className="student-meta">{user.pinNumber} • {user.branch} • {user.semester} • {user.college?.collegeName || user.college?.name || user.collegeCode}</p>
//         </div>
//         <Link to="/student/mark" className="btn btn-accent" style={{padding:'12px 28px', fontSize:15}}>
//           📍 Mark Attendance
//         </Link>
//       </div>

//       {loading ? (
//         <div style={{display:'flex',justifyContent:'center',padding:60}}><div className="spinner"/></div>
//       ) : (
//         <>
//           {/* Today Status */}
//           <div className="today-status-card card" style={{ borderLeft: `4px solid ${todayDisplay.color}`, background: todayDisplay.bg }}>
//             <div className="today-icon">{todayDisplay.icon}</div>
//             <div>
//               <div className="today-label">Today's Attendance</div>
//               <div className="today-status" style={{ color: todayDisplay.color }}>{todayDisplay.label}</div>
//               {todayRecord?.checkIn?.time && (
//                 <div className="today-times">
//                   Check-in: {new Date(todayRecord.checkIn.time).toLocaleTimeString()}
//                   {todayRecord.checkOut?.time && ` → Check-out: ${new Date(todayRecord.checkOut.time).toLocaleTimeString()}`}
//                   {todayRecord.status === 'E' && <span style={{color:'#e65100',marginLeft:8}}>⚠️ Don't forget to check out!</span>}
//                 </div>
//               )}
//             </div>
//             {(!todayRecord || todayRecord.status === 'E') && (
//               <Link to="/student/mark" className="btn btn-primary" style={{marginLeft:'auto', whiteSpace:'nowrap'}}>
//                 {!todayRecord ? 'Check In' : 'Check Out'}
//               </Link>
//             )}
//           </div>

//           {/* Stats */}
//           <div className="grid-4" style={{marginTop:24}}>
//             <div className="stat-card card">
//               <div className="stat-card-val" style={{color: pctColor}}>{summary?.overallPercentage || summary?.percentage || '0.00'}%</div>
//               <div className="stat-card-label">Overall Attendance</div>
//               <div className="pct-bar"><div className="pct-fill" style={{width: `${Math.min(pct,100)}%`, background: pctColor}} /></div>
//               <div style={{fontSize:12,color: pctColor, marginTop:4}}>{pct >= 75 ? '✓ Eligible for exam' : '⚠️ Below 75% threshold'}</div>
//             </div>
//             <div className="stat-card card">
//               <div className="stat-card-val">{summary?.totalWorkingDays || summary?.workingDays || 0}</div>
//               <div className="stat-card-label">Working Days</div>
//             </div>
//             <div className="stat-card card">
//               <div className="stat-card-val" style={{color:'#2e7d32'}}>{summary?.totalPresent || summary?.presentDays || 0}</div>
//               <div className="stat-card-label">Days Present</div>
//             </div>
//             <div className="stat-card card">
//               <div className="stat-card-val" style={{color:'#0d47a1'}}>{summary?.totalHalf || summary?.halfDays || 0}</div>
//               <div className="stat-card-label">Half Days</div>
//             </div>
//           </div>

//           {/* Quick actions */}
//           <div className="quick-actions">
//             <Link to="/student/mark" className="quick-action-card card">
//               <span className="qa-icon">📍</span>
//               <span className="qa-label">Mark Attendance</span>
//               <span className="qa-arrow">→</span>
//             </Link>
//             <Link to="/student/attendance" className="quick-action-card card">
//               <span className="qa-icon">📊</span>
//               <span className="qa-label">View Full Attendance</span>
//               <span className="qa-arrow">→</span>
//             </Link>
//           </div>

//           {/* Info box */}
//           <div className="info-box card">
//             <h3>📋 How Your Attendance Works</h3>
//             <div className="info-grid">
//               <div className="info-item"><span className="status-P info-badge">P</span><span>Present — Checked in + out with 6hr gap</span></div>
//               <div className="info-item"><span className="status-HD info-badge">HD</span><span>Half Day — Checked in + out, less than 6hrs</span></div>
//               <div className="info-item"><span className="status-E info-badge">E</span><span>Error — Checked in but did not check out</span></div>
//               <div className="info-item"><span className="status-A info-badge">A</span><span>Absent — Did not mark attendance</span></div>
//               <div className="info-item"><span className="status-W info-badge">W</span><span>Weekend — Sunday or 2nd Saturday</span></div>
//               <div className="info-item"><span className="status-H info-badge">H</span><span>Holiday — Government holiday</span></div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// function getGreeting() {
//   const h = new Date().getHours();
//   if (h < 12) return 'Morning';
//   if (h < 17) return 'Afternoon';
//   return 'Evening';
// }




import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import './StudentPages.css';

export default function StudentDashboard() {
  const { user }             = useAuth();
  const [todayRecord, setTodayRecord] = useState(null);
  const [summary, setSummary]         = useState(null);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/attendance/today').then(r => setTodayRecord(r.data.record)),
      api.get('/student/attendance').then(r => setSummary(r.data.stats))
    ]).finally(() => setLoading(false));
  }, []);

  // ── Pending approval screen ───────────────────────────────────────────────
  if (!user.isApproved) {
    return (
      <div className="page">
        <div className="pending-card card">
          <div className="pending-icon">⏳</div>
          <h2>Account Pending Approval</h2>
          <p>Your registration is under review by your HOD. You'll be able to mark attendance once approved.</p>
          <div className="pending-info">
            <span><strong>Name:</strong> {user.name}</span>
            <span><strong>PIN:</strong> {user.pinNumber}</span>
            <span><strong>College:</strong> {user.collegeCode}</span>
            <span><strong>Branch:</strong> {user.branch} — {user.semester}</span>
          </div>
        </div>
      </div>
    );
  }

  // ── Stats from backend ────────────────────────────────────────────────────
  // Backend now returns:
  //   workingDays, presentDays, halfDays, effectivePresent,
  //   absentDays, percentage, detentionStatus
  const workingDays      = summary?.workingDays      || 0;
  const presentDays      = summary?.presentDays      || 0;
  const halfDays         = summary?.halfDays         || 0;
  const effectivePresent = summary?.effectivePresent || 0;
  const pct              = parseFloat(summary?.percentage || 0);
  const detentionStatus  = summary?.detentionStatus  || (pct >= 75 ? 'ELIGIBLE' : pct >= 65 ? 'CONDONATION' : 'DETAINED');

  const pctColor =
    pct >= 75 ? '#2e7d32' :
    pct >= 65 ? '#e65100' : '#c62828';

  const perDayPct = workingDays > 0 ? (100 / workingDays).toFixed(2) : '—';

  // ── Today card ────────────────────────────────────────────────────────────
  const todayMap = {
    P:  { label:'Present ✓',                  color:'#2e7d32', bg:'#e8f5e9', icon:'✅' },
    A:  { label:'Absent',                      color:'#c62828', bg:'#ffebee', icon:'❌' },
    E:  { label:'Checked In — Pending Checkout', color:'#e65100', bg:'#fff3e0', icon:'⚠️' },
    HD: { label:'Half Day',                    color:'#0d47a1', bg:'#e3f2fd', icon:'🔵' },
  };
  const todayDisplay = todayRecord
    ? (todayMap[todayRecord.status] || { label: todayRecord.status, color:'#546e7a', bg:'#eceff1', icon:'•' })
    : { label:'Not Marked Yet', color:'#546e7a', bg:'#eceff1', icon:'⭕' };

  return (
    <div className="page fade-in">
      {/* Header */}
      <div className="student-header">
        <div>
          <h1>Good {getGreeting()}, {user.name?.split(' ')[0]}! 👋</h1>
          <p className="student-meta">
            {user.pinNumber} • {user.branch} • {user.semester} • {user.college?.name || user.collegeCode}
          </p>
        </div>
        <Link to="/student/mark" className="btn btn-accent" style={{ padding:'12px 28px', fontSize:15 }}>
          📍 Mark Attendance
        </Link>
      </div>

      {loading ? (
        <div style={{ display:'flex', justifyContent:'center', padding:60 }}><div className="spinner" /></div>
      ) : (
        <>
          {/* Today Status */}
          <div className="today-status-card card"
            style={{ borderLeft:`4px solid ${todayDisplay.color}`, background: todayDisplay.bg }}>
            <div className="today-icon">{todayDisplay.icon}</div>
            <div style={{ flex:1 }}>
              <div className="today-label">Today's Attendance</div>
              <div className="today-status" style={{ color: todayDisplay.color }}>{todayDisplay.label}</div>
              {todayRecord?.checkIn?.time && (
                <div className="today-times">
                  Check-in: {new Date(todayRecord.checkIn.time).toLocaleTimeString()}
                  {todayRecord.checkOut?.time &&
                    ` → Check-out: ${new Date(todayRecord.checkOut.time).toLocaleTimeString()}`}
                  {todayRecord.status === 'E' &&
                    <span style={{ color:'#e65100', marginLeft:8 }}>⚠️ Don't forget to check out!</span>}
                </div>
              )}
            </div>
            {(!todayRecord || todayRecord.status === 'E') && (
              <Link to="/student/mark" className="btn btn-primary" style={{ marginLeft:'auto', whiteSpace:'nowrap' }}>
                {!todayRecord ? 'Check In' : 'Check Out'}
              </Link>
            )}
          </div>

          {/* ── Attendance % card (big, prominent) ── */}
          <div className="card" style={{ padding:24, marginTop:24, borderTop:`4px solid ${pctColor}` }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
              <div>
                <div style={{ fontSize:13, color:'var(--text-muted)', fontWeight:600, textTransform:'uppercase', letterSpacing:.5 }}>
                  Semester Attendance
                </div>
                <div style={{ fontSize:48, fontWeight:900, color:pctColor, lineHeight:1.1, fontFamily:'var(--font)' }}>
                  {pct.toFixed(2)}%
                </div>
                <div style={{ fontSize:13, color:pctColor, fontWeight:700, marginTop:4 }}>
                  {detentionStatus === 'ELIGIBLE'    && '✅ Eligible for Examination'}
                  {detentionStatus === 'CONDONATION' && '⚠️ Condonation applicable — pay fee'}
                  {detentionStatus === 'DETAINED'    && '❌ Detained — below 65%'}
                </div>
              </div>
              <div style={{ textAlign:'center' }}>
                {/* Circular progress */}
                <svg width={110} height={110} viewBox="0 0 110 110">
                  <circle cx={55} cy={55} r={46} fill="none" stroke="#e0e0e0" strokeWidth={10} />
                  <circle cx={55} cy={55} r={46} fill="none" stroke={pctColor} strokeWidth={10}
                    strokeDasharray={`${(2 * Math.PI * 46 * Math.min(pct, 100) / 100).toFixed(1)} 999`}
                    strokeLinecap="round"
                    transform="rotate(-90 55 55)" />
                  <text x={55} y={60} textAnchor="middle" fontSize={18} fontWeight={800} fill={pctColor}>
                    {pct.toFixed(0)}%
                  </text>
                </svg>
                <div style={{ fontSize:11, color:'var(--text-muted)' }}>75% required</div>
              </div>
            </div>

            {/* Per-day impact */}
            <div style={{
              marginTop:16, padding:'10px 14px',
              background:'#f0f4ff', borderRadius:8, fontSize:13, color:'#1a237e'
            }}>
              💡 Each present day adds <strong>{perDayPct}%</strong> &nbsp;({workingDays} working days this semester)
              {pct < 75 && workingDays > 0 && (
                <span>
                  &nbsp;— need <strong>{Math.ceil((0.75 * workingDays - effectivePresent) / 0.25)}</strong> more present day(s) to reach 75%
                </span>
              )}
            </div>
          </div>

          {/* ── Stats row ── */}
          <div className="grid-4" style={{ marginTop:16 }}>
            <div className="stat-card card">
              <div className="stat-card-val">{workingDays}</div>
              <div className="stat-card-label">Working Days</div>
            </div>
            <div className="stat-card card">
              <div className="stat-card-val" style={{ color:'#2e7d32' }}>{presentDays}</div>
              <div className="stat-card-label">Days Present (P)</div>
            </div>
            <div className="stat-card card">
              <div className="stat-card-val" style={{ color:'#e65100' }}>{halfDays}</div>
              <div className="stat-card-label">Half Days (HP)</div>
            </div>
            <div className="stat-card card">
              <div className="stat-card-val" style={{ color:'#c62828' }}>{summary?.absentDays || 0}</div>
              <div className="stat-card-label">Absent Days</div>
            </div>
          </div>

          {/* ── Quick actions ── */}
          <div className="quick-actions">
            <Link to="/student/mark" className="quick-action-card card">
              <span className="qa-icon">📍</span>
              <span className="qa-label">Mark Attendance</span>
              <span className="qa-arrow">→</span>
            </Link>
            <Link to="/student/attendance" className="quick-action-card card">
              <span className="qa-icon">📊</span>
              <span className="qa-label">View Full SBTET Summary</span>
              <span className="qa-arrow">→</span>
            </Link>
          </div>

          {/* ── Rules Info ── */}
          <div className="info-box card">
            <h3>📋 SBTET Attendance Rules</h3>
            <div className="info-grid">
              <div className="info-item"><span className="status-P info-badge">P</span>
                <span>Present — Checked in + out with 6hr gap</span></div>
              <div className="info-item"><span className="status-HD info-badge">HP</span>
                <span>Half Day — Less than 6hrs but still counted present</span></div>
              <div className="info-item"><span className="status-E info-badge">E</span>
                <span>Error — Checked in but never checked out</span></div>
              <div className="info-item"><span className="status-A info-badge">A</span>
                <span>Absent — No attendance marked</span></div>
              <div className="info-item">
                <span style={{ background:'#e8f5e9', color:'#2e7d32', display:'inline-flex', alignItems:'center', justifyContent:'center', width:28, height:24, borderRadius:5, fontSize:10, fontWeight:800 }}>75%</span>
                <span>≥ 75% — Eligible for examination</span>
              </div>
              <div className="info-item">
                <span style={{ background:'#fff3e0', color:'#e65100', display:'inline-flex', alignItems:'center', justifyContent:'center', width:28, height:24, borderRadius:5, fontSize:10, fontWeight:800 }}>65%</span>
                <span>65–74% — Condonation fee applicable</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Morning' : h < 17 ? 'Afternoon' : 'Evening';
}
