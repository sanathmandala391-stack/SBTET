import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import FaceCamera from '../../components/common/FaceCamera';
import './StudentPages.css';

export default function MarkAttendance() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [todayRecord, setTodayRecord] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState('checking');
  const [locationMsg, setLocationMsg] = useState('Getting your location...');
  const [showCamera, setShowCamera] = useState(false);
  const [action, setAction] = useState('checkin'); // 'checkin' | 'checkout'
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(null);

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
      setLocationStatus('outside');
      setLocationMsg('Geolocation not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        setLocationStatus('inside'); // actual check happens on API call
        setLocationMsg(`Location acquired. Distance check will happen on submission.`);
      },
      () => {
        setLocationStatus('outside');
        setLocationMsg('Location access denied. Please allow location access.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleFaceVerified = async (success, descriptor) => {
    if (!success) { toast.error('Face verification failed.'); return; }
    if (!location) { toast.error('Location not available.'); return; }
    setLoading(true);
    try {
      const endpoint = action === 'checkin' ? '/attendance/checkin' : '/attendance/checkout';
      const res = await api.post(endpoint, {
        latitude: location.latitude,
        longitude: location.longitude,
        faceVerified: true
      });
      toast.success(res.data.message);
      setDone({ status: action === 'checkin' ? 'E' : 'P', message: res.data.message });
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed. Please try again.';
      toast.error(msg);
      if (msg.toLowerCase().includes('outside')) {
        setLocationStatus('outside');
        setLocationMsg(msg);
      }
      setShowCamera(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !todayRecord) {
    return <div className="page" style={{display:'flex',justifyContent:'center',alignItems:'center',height:'60vh'}}><div className="spinner"/></div>;
  }

  if (done) {
    const colors = { E: '#e65100', P: '#2e7d32', HD: '#0d47a1', A: '#c62828' };
    return (
      <div className="page">
        <div className="mark-container">
          <div className="mark-card card" style={{textAlign:'center',alignItems:'center'}}>
            <div style={{fontSize:64}}>
              {done.status === 'P' ? '✅' : done.status === 'E' ? '⚠️' : '📋'}
            </div>
            <h2 style={{color: colors[done.status] || 'var(--primary)'}}>{done.message}</h2>
            {done.status === 'E' && (
              <p style={{color:'var(--text-muted)',fontSize:14}}>
                Remember to check out after 6 hours from your check-in time for full attendance.
              </p>
            )}
            <button className="btn btn-primary" style={{marginTop:16}} onClick={() => navigate('/student')}>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page fade-in">
      <h1 style={{marginBottom:8}}>Mark Attendance</h1>
      <p style={{color:'var(--text-muted)',marginBottom:32}}>
        {action === 'checkin' ? 'Check in for today' : 'Check out — end your attendance'}
      </p>

      <div className="mark-container">
        <div className="mark-card card">
          {/* Step 1: Location */}
          <div className="mark-step">
            <div className="mark-step-title">
              <div className="step-num-circle">1</div>
              GPS Location Check
            </div>
            <div className={`location-status ${locationStatus}`}>
              {locationStatus === 'checking' && '📡 '}
              {locationStatus === 'inside' && '📍 '}
              {locationStatus === 'outside' && '🚫 '}
              {locationMsg}
            </div>
            {locationStatus === 'outside' && (
              <button className="btn btn-outline" onClick={getLocation} style={{alignSelf:'flex-start'}}>
                🔄 Retry Location
              </button>
            )}
          </div>

          {/* Step 2: Face */}
          <div className="mark-step">
            <div className="mark-step-title">
              <div className="step-num-circle">2</div>
              Face Biometric Verification
            </div>
            {!showCamera ? (
              <button
                className="btn btn-primary"
                disabled={locationStatus !== 'inside'}
                onClick={() => setShowCamera(true)}
                style={{padding:'14px 28px', fontSize:16}}
              >
                🤖 Start Face Verification
              </button>
            ) : (
              <FaceCamera
                mode="verify"
                storedDescriptor={user.faceDescriptor}
                onVerified={handleFaceVerified}
              />
            )}
            <p style={{fontSize:13,color:'var(--text-muted)'}}>
              Look at the camera and blink twice to verify your identity. Photos and videos will not work.
            </p>
          </div>

          {/* Current action info */}
          <div style={{padding:'16px',background:'var(--bg)',borderRadius:10,fontSize:14,color:'var(--text-muted)'}}>
            <strong style={{color:'var(--text)'}}>Action:</strong>{' '}
            {action === 'checkin' ? '🟢 Check In (First mark for today)' : '🔴 Check Out (Must be 6+ hrs after check-in for full attendance)'}
          </div>
        </div>
      </div>
    </div>
  );
}
