// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import api from '../../utils/api';
// import { useAuth } from '../../context/AuthContext';
// import FaceCamera from '../../components/common/FaceCamera';
// import './StudentPages.css';

// export default function MarkAttendance() {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [todayRecord, setTodayRecord] = useState(null);
//   const [location, setLocation] = useState(null);
//   const [locationStatus, setLocationStatus] = useState('checking');
//   const [locationMsg, setLocationMsg] = useState('Getting your location...');
//   const [showCamera, setShowCamera] = useState(false);
//   const [action, setAction] = useState('checkin'); // 'checkin' | 'checkout'
//   const [loading, setLoading] = useState(true);
//   const [done, setDone] = useState(null);

//   useEffect(() => {
//     api.get('/attendance/today').then(r => {
//       setTodayRecord(r.data.record);
//       if (r.data.record?.status === 'E') setAction('checkout');
//       if (r.data.record && r.data.record.status !== 'E') {
//         setDone({ status: r.data.record.status, message: 'Attendance already marked for today.' });
//       }
//     }).finally(() => setLoading(false));
//     getLocation();
//   }, []);

//   const getLocation = () => {
//     setLocationStatus('checking');
//     setLocationMsg('Getting your location...');
//     if (!navigator.geolocation) {
//       setLocationStatus('outside');
//       setLocationMsg('Geolocation not supported by your browser.');
//       return;
//     }
//     navigator.geolocation.getCurrentPosition(
//       pos => {
//         setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
//         setLocationStatus('inside'); // actual check happens on API call
//         setLocationMsg(`Location acquired. Distance check will happen on submission.`);
//       },
//       () => {
//         setLocationStatus('outside');
//         setLocationMsg('Location access denied. Please allow location access.');
//       },
//       { enableHighAccuracy: true, timeout: 10000 }
//     );
//   };

//   const handleFaceVerified = async (success, descriptor) => {
//     if (!success) { toast.error('Face verification failed.'); return; }
//     if (!location) { toast.error('Location not available.'); return; }
//     setLoading(true);
//     try {
//       const endpoint = action === 'checkin' ? '/attendance/checkin' : '/attendance/checkout';
//       const res = await api.post(endpoint, {
//         latitude: location.latitude,
//         longitude: location.longitude,
//         faceVerified: true
//       });
//       toast.success(res.data.message);
//       setDone({ status: action === 'checkin' ? 'E' : 'P', message: res.data.message });
//     } catch (err) {
//       const msg = err.response?.data?.message || 'Failed. Please try again.';
//       toast.error(msg);
//       if (msg.toLowerCase().includes('outside')) {
//         setLocationStatus('outside');
//         setLocationMsg(msg);
//       }
//       setShowCamera(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading && !todayRecord) {
//     return <div className="page" style={{display:'flex',justifyContent:'center',alignItems:'center',height:'60vh'}}><div className="spinner"/></div>;
//   }

//   if (done) {
//     const colors = { E: '#e65100', P: '#2e7d32', HD: '#0d47a1', A: '#c62828' };
//     return (
//       <div className="page">
//         <div className="mark-container">
//           <div className="mark-card card" style={{textAlign:'center',alignItems:'center'}}>
//             <div style={{fontSize:64}}>
//               {done.status === 'P' ? '✅' : done.status === 'E' ? '⚠️' : '📋'}
//             </div>
//             <h2 style={{color: colors[done.status] || 'var(--primary)'}}>{done.message}</h2>
//             {done.status === 'E' && (
//               <p style={{color:'var(--text-muted)',fontSize:14}}>
//                 Remember to check out after 6 hours from your check-in time for full attendance.
//               </p>
//             )}
//             <button className="btn btn-primary" style={{marginTop:16}} onClick={() => navigate('/student')}>
//               Back to Dashboard
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="page fade-in">
//       <h1 style={{marginBottom:8}}>Mark Attendance</h1>
//       <p style={{color:'var(--text-muted)',marginBottom:32}}>
//         {action === 'checkin' ? 'Check in for today' : 'Check out — end your attendance'}
//       </p>

//       <div className="mark-container">
//         <div className="mark-card card">
//           {/* Step 1: Location */}
//           <div className="mark-step">
//             <div className="mark-step-title">
//               <div className="step-num-circle">1</div>
//               GPS Location Check
//             </div>
//             <div className={`location-status ${locationStatus}`}>
//               {locationStatus === 'checking' && '📡 '}
//               {locationStatus === 'inside' && '📍 '}
//               {locationStatus === 'outside' && '🚫 '}
//               {locationMsg}
//             </div>
//             {locationStatus === 'outside' && (
//               <button className="btn btn-outline" onClick={getLocation} style={{alignSelf:'flex-start'}}>
//                 🔄 Retry Location
//               </button>
//             )}
//           </div>

//           {/* Step 2: Face */}
//           <div className="mark-step">
//             <div className="mark-step-title">
//               <div className="step-num-circle">2</div>
//               Face Biometric Verification
//             </div>
//             {!showCamera ? (
//               <button
//                 className="btn btn-primary"
//                 disabled={locationStatus !== 'inside'}
//                 onClick={() => setShowCamera(true)}
//                 style={{padding:'14px 28px', fontSize:16}}
//               >
//                 🤖 Start Face Verification
//               </button>
//             ) : (
//               <FaceCamera
//                 mode="verify"
//                 storedDescriptor={user.faceDescriptor}
//                 onVerified={handleFaceVerified}
//               />
//             )}
//             <p style={{fontSize:13,color:'var(--text-muted)'}}>
//               Look at the camera and blink twice to verify your identity. Photos and videos will not work.
//             </p>
//           </div>

//           {/* Current action info */}
//           <div style={{padding:'16px',background:'var(--bg)',borderRadius:10,fontSize:14,color:'var(--text-muted)'}}>
//             <strong style={{color:'var(--text)'}}>Action:</strong>{' '}
//             {action === 'checkin' ? '🟢 Check In (First mark for today)' : '🔴 Check Out (Must be 6+ hrs after check-in for full attendance)'}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




//new Second//

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import FaceCamera from '../../components/common/FaceCamera';
import './StudentPages.css';

export default function MarkAttendance() {
  const { user }    = useAuth();
  const navigate    = useNavigate();

  const [todayRecord,     setTodayRecord]     = useState(null);
  const [location,        setLocation]        = useState(null);
  const [locationStatus,  setLocationStatus]  = useState('checking');
  const [locationMsg,     setLocationMsg]     = useState('Getting your location...');
  const [showCamera,      setShowCamera]      = useState(false);
  const [action,          setAction]          = useState('checkin');
  const [loading,         setLoading]         = useState(true);
  const [done,            setDone]            = useState(null);

  useEffect(() => {
    api.get('/attendance/today').then(r => {
      setTodayRecord(r.data.record);
      if (r.data.record?.status === 'E') setAction('checkout');
      if (r.data.record && r.data.record.status !== 'E') {
        setDone({ status: r.data.record.status, message: 'Attendance already marked for today.' });
      }
    }).finally(() => setLoading(false));
    getLocation();
  }, []);

  const getLocation = () => {
    setLocationStatus('checking');
    setLocationMsg('Getting your location...');
    if (!navigator.geolocation) {
      setLocationStatus('error');
      setLocationMsg('Geolocation not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        setLocationStatus('ok');
        setLocationMsg('Location acquired ✓');
      },
      () => {
        setLocationStatus('error');
        setLocationMsg('Location access denied. Please allow location and retry.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleFaceVerified = async (success) => {
    if (!success) { toast.error('Face verification failed.'); return; }
    if (!location) { toast.error('Location not available.'); return; }
    setLoading(true);
    try {
      const endpoint = action === 'checkin' ? '/attendance/checkin' : '/attendance/checkout';
      const res = await api.post(endpoint, {
        latitude:     location.latitude,
        longitude:    location.longitude,
        faceVerified: true,
      });
      toast.success(res.data.message);
      setDone({ status: action === 'checkin' ? 'E' : 'P', message: res.data.message });
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed. Please try again.';
      toast.error(msg);
      if (msg.toLowerCase().includes('outside')) {
        setLocationStatus('error');
        setLocationMsg(msg);
      }
      setShowCamera(false);
    } finally {
      setLoading(false);
    }
  };

  // ── Loading screen ──────────────────────────────────────────────────────
  if (loading && !todayRecord) {
    return (
      <div className="page" style={{ display:'flex', justifyContent:'center', alignItems:'center', height:'60vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  // ── Already done screen ─────────────────────────────────────────────────
  if (done) {
    const cfg = {
      P:  { icon:'✅', color:'#2e7d32', bg:'#e8f5e9', title:'Attendance Marked!' },
      E:  { icon:'⏰', color:'#e65100', bg:'#fff3e0', title:'Checked In!' },
      HD: { icon:'🔵', color:'#0d47a1', bg:'#e3f2fd', title:'Half Day Recorded' },
      A:  { icon:'❌', color:'#c62828', bg:'#ffebee', title:'Absent' },
    };
    const c = cfg[done.status] || cfg.P;
    return (
      <div className="page fade-in">
        <div style={{ maxWidth:480, margin:'40px auto', textAlign:'center' }}>
          <div style={{
            background: c.bg, border:`2px solid ${c.color}`,
            borderRadius:20, padding:'48px 32px',
          }}>
            <div style={{ fontSize:80, marginBottom:16, lineHeight:1 }}>{c.icon}</div>
            <h2 style={{ color:c.color, marginBottom:12, fontSize:24 }}>{c.title}</h2>
            <p style={{ color:'#555', fontSize:15, lineHeight:1.6, marginBottom:24 }}>{done.message}</p>
            {done.status === 'E' && (
              <div style={{
                background:'rgba(230,81,0,0.08)', borderRadius:10,
                padding:'12px 16px', marginBottom:20, fontSize:13, color:'#e65100',
              }}>
                ⚠️ Remember to <strong>check out after 6 hours</strong> for full attendance.
                Missed checkout = Error (E) status.
              </div>
            )}
            <button className="btn btn-primary" style={{ padding:'13px 32px', fontSize:15 }}
              onClick={() => navigate('/student')}>
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main mark attendance page ───────────────────────────────────────────
  const isCheckin  = action === 'checkin';
  const actionColor = isCheckin ? '#2e7d32' : '#e65100';
  const actionBg    = isCheckin ? '#e8f5e9' : '#fff3e0';

  return (
    <div className="page fade-in" style={{ maxWidth:600, margin:'0 auto' }}>

      {/* ── Page header ── */}
      <div style={{ marginBottom:28 }}>
        <h1 style={{ fontSize:26, fontWeight:800, color:'var(--primary)', marginBottom:6 }}>
          {isCheckin ? '🟢 Check In' : '🔴 Check Out'}
        </h1>
        <p style={{ color:'var(--text-muted)', fontSize:14 }}>
          {isCheckin
            ? 'Mark your attendance for today — GPS + face required'
            : 'End your attendance — must be 6+ hours after check-in for full day'}
        </p>
      </div>

      {/* ── Action badge ── */}
      <div style={{
        background: actionBg, border:`2px solid ${actionColor}`,
        borderRadius:10, padding:'12px 18px', marginBottom:24,
        display:'flex', alignItems:'center', gap:12,
      }}>
        <div style={{ fontSize:28 }}>{isCheckin ? '🟢' : '🔴'}</div>
        <div>
          <div style={{ fontWeight:700, color:actionColor, fontSize:15 }}>
            {isCheckin ? 'Check In — First mark for today' : 'Check Out — End your attendance'}
          </div>
          <div style={{ fontSize:12, color:'#666', marginTop:2 }}>
            {user.name} • {user.pinNumber} • {user.branch} {user.semester}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          STEP 1 — GPS Location
      ══════════════════════════════════════════════ */}
      <div style={{
        background:'#fff', borderRadius:16, padding:'22px 24px',
        border:'1px solid var(--border)', boxShadow:'var(--shadow)',
        marginBottom:16,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
          <div style={{
            width:36, height:36, borderRadius:'50%',
            background: locationStatus === 'ok' ? '#2e7d32' : locationStatus === 'error' ? '#c62828' : '#1a237e',
            color:'#fff', display:'flex', alignItems:'center', justifyContent:'center',
            fontWeight:800, fontSize:16, flexShrink:0,
          }}>1</div>
          <div style={{ fontWeight:700, fontSize:16, color:'var(--primary)' }}>GPS Location Check</div>
        </div>

        <div style={{
          display:'flex', alignItems:'center', gap:10,
          padding:'12px 16px', borderRadius:10, fontSize:14, fontWeight:600,
          background:
            locationStatus === 'ok'      ? '#e8f5e9' :
            locationStatus === 'error'   ? '#ffebee' :
            '#e3f2fd',
          color:
            locationStatus === 'ok'      ? '#2e7d32' :
            locationStatus === 'error'   ? '#c62828' :
            '#0d47a1',
        }}>
          <span style={{ fontSize:20 }}>
            {locationStatus === 'ok'      ? '📍' :
             locationStatus === 'error'   ? '🚫' : '📡'}
          </span>
          {locationMsg}
        </div>

        {locationStatus === 'error' && (
          <button className="btn btn-outline" style={{ marginTop:12, fontSize:13 }}
            onClick={getLocation}>
            🔄 Retry Location
          </button>
        )}

        {locationStatus === 'checking' && (
          <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:10, color:'#888', fontSize:13 }}>
            <div className="spinner" style={{ width:16, height:16, borderWidth:2 }} />
            Detecting GPS...
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════
          STEP 2 — Face Biometric
      ══════════════════════════════════════════════ */}
      <div style={{
        background:'#fff', borderRadius:16, padding:'22px 24px',
        border:'1px solid var(--border)', boxShadow:'var(--shadow)',
        marginBottom:24,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
          <div style={{
            width:36, height:36, borderRadius:'50%',
            background: showCamera ? '#1a237e' : '#9e9e9e',
            color:'#fff', display:'flex', alignItems:'center', justifyContent:'center',
            fontWeight:800, fontSize:16, flexShrink:0,
          }}>2</div>
          <div style={{ fontWeight:700, fontSize:16, color:'var(--primary)' }}>Face Biometric Verification</div>
        </div>

        {!showCamera ? (
          <div style={{ textAlign:'center', padding:'16px 0' }}>
            {/* Face icon placeholder */}
            <div style={{
              width:120, height:120, borderRadius:'50%',
              background:'linear-gradient(135deg,#e8eaf6,#c5cae9)',
              border:'3px dashed #9fa8da',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:52, margin:'0 auto 20px',
            }}>🤖</div>

            <p style={{ fontSize:14, color:'var(--text-muted)', marginBottom:20, lineHeight:1.6 }}>
              Your face will be scanned using your device camera.<br />
              <strong>Look at the camera and blink twice</strong> to verify.
            </p>

            <button
              className="btn btn-primary"
              disabled={locationStatus !== 'ok'}
              onClick={() => setShowCamera(true)}
              style={{ padding:'14px 36px', fontSize:16, borderRadius:12 }}
            >
              🤖 Start Face Scan
            </button>

            {locationStatus !== 'ok' && (
              <p style={{ fontSize:12, color:'#e65100', marginTop:10, fontWeight:600 }}>
                ⚠️ Complete GPS step first
              </p>
            )}
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
            <FaceCamera
              mode="verify"
              storedDescriptor={user.faceDescriptor}
              onVerified={handleFaceVerified}
            />
          </div>
        )}

        <div style={{
          marginTop:16, padding:'10px 14px',
          background:'#f5f5f5', borderRadius:8,
          fontSize:12, color:'#888',
          display:'flex', gap:8, alignItems:'center',
        }}>
          🔒 <span>Face data is processed locally. Photos and screen recordings will not work.</span>
        </div>
      </div>

      {/* ── Quick info ── */}
      <div style={{
        padding:'14px 18px', borderRadius:10,
        background:'rgba(26,35,126,0.04)', border:'1px solid rgba(26,35,126,0.1)',
        fontSize:13, color:'var(--text-muted)',
        display:'grid', gridTemplateColumns:'1fr 1fr', gap:8,
      }}>
        <div>📍 <strong style={{color:'var(--text)'}}>Geofence:</strong> Must be inside college</div>
        <div>⏱️ <strong style={{color:'var(--text)'}}>Full day:</strong> Check in + out, 6hr gap</div>
        <div>👁️ <strong style={{color:'var(--text)'}}>Blinks needed:</strong> 2 blinks to verify</div>
        <div>⚠️ <strong style={{color:'var(--text)'}}>Missed checkout:</strong> Error (E) status</div>
      </div>

    </div>
  );
}