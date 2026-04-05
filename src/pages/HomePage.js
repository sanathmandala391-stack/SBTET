// import React from 'react';
// import { Link } from 'react-router-dom';
// import './HomePage.css';

// const FEATURES = [
//   { icon: '🤖', title: 'Face Biometric', desc: 'Advanced face recognition with blink detection to prevent photo spoofing. Your identity is verified in seconds.' },
//   { icon: '📍', title: 'GPS Geofencing', desc: 'Attendance can only be marked within your college premises. No fake attendance from outside.' },
//   { icon: '📊', title: 'Live Attendance', desc: 'Real-time attendance tracking with detailed monthly calendar view, just like SBTET official portal.' },
//   { icon: '🕐', title: 'Smart Marking', desc: 'Check in & check out system. Full day needs 6hr gap. Half day for early checkout. Error for missed checkout.' },
//   { icon: '🏫', title: '100+ Colleges', desc: 'Supports all 95–134 Telangana polytechnic colleges with unique college codes for easy management.' },
//   { icon: '👩‍💼', title: 'Multi-Role System', desc: 'Students, Faculty, HODs and Admin each have tailored dashboards with role-based access control.' }
// ];

// const ROLES = [
//   { icon: '🎓', label: 'Student', desc: 'Mark attendance, view your attendance calendar and percentage', color: '#1a237e', bg: 'linear-gradient(135deg,#1a237e,#283593)' },
//   { icon: '👨‍🏫', label: 'Faculty', desc: 'View and report student attendance, track class progress', color: '#1b5e20', bg: 'linear-gradient(135deg,#1b5e20,#2e7d32)' },
//   { icon: '🏅', label: 'HOD', desc: 'Approve registrations, override attendance, full department control', color: '#4a148c', bg: 'linear-gradient(135deg,#4a148c,#6a1b9a)' },
//   { icon: '⚙️', label: 'Admin', desc: 'Register colleges, manage all users across Telangana', color: '#b71c1c', bg: 'linear-gradient(135deg,#b71c1c,#c62828)' }
// ];

// const STATS = [
//   { val: '130+', label: 'Polytechnic Colleges' },
//   { val: '50K+', label: 'Diploma Students' },
//   { val: '99.9%', label: 'Uptime' },
//   { val: '< 5s', label: 'Face Verify Speed' }
// ];

// export default function HomePage() {
//   return (
//     <div className="home">
//       {/* Hero */}
//       <section className="hero">
//         <div className="hero-bg">
//           <div className="hero-blob blob1" />
//           <div className="hero-blob blob2" />
//           <div className="hero-blob blob3" />
//         </div>
//         <div className="hero-content fade-in">
//           <div className="hero-badge">🎓 State Board of Technical Education & Training</div>
//           <h1 className="hero-title">
//             Telangana Diploma<br />
//             <span className="hero-accent">Attendance System</span>
//           </h1>
//           <p className="hero-sub">
//             A modern, secure attendance management platform for all polytechnic colleges across Telangana.
//             Powered by face biometrics and GPS geofencing.
//           </p>
//           <div className="hero-actions">
//             <Link to="/register" className="btn btn-accent" style={{ padding: '14px 32px', fontSize: 16 }}>
//               Get Started →
//             </Link>
//             <Link to="/login" className="btn btn-outline" style={{ padding: '14px 32px', fontSize: 16, borderColor: '#fff', color: '#fff' }}>
//               Login
//             </Link>
//           </div>
//         </div>
//         <div className="hero-visual fade-in">
//           <div className="hero-card">
//             <div className="hc-header">
//               <div className="hc-dot red"/><div className="hc-dot yellow"/><div className="hc-dot green"/>
//               <span>Attendance Dashboard</span>
//             </div>
//             <div className="hc-body">
//               <div className="hc-row">
//                 <span>Mandala Sanath Kumar</span>
//                 <span className="hc-badge p">Present</span>
//               </div>
//               <div className="hc-row">
//                 <span>Working Days</span>
//                 <strong>90</strong>
//               </div>
//               <div className="hc-row">
//                 <span>Days Present</span>
//                 <strong style={{color:'#2e7d32'}}>78</strong>
//               </div>
//               <div className="hc-row">
//                 <span>Attendance %</span>
//                 <strong style={{color:'#2e7d32'}}>86.67%</strong>
//               </div>
//               <div className="hc-calendar">
//                 {['P','P','W','H','P','P','A','P','P','P','W','W','P','P'].map((s,i) => (
//                   <div key={i} className={`hc-day status-${s}`}>{s}</div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats */}
//       <section className="stats-section">
//         {STATS.map((s, i) => (
//           <div key={i} className="stat-item fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
//             <div className="stat-val">{s.val}</div>
//             <div className="stat-label">{s.label}</div>
//           </div>
//         ))}
//       </section>

//       {/* About Diploma */}
//       <section className="about-section">
//         <div className="section-tag">About</div>
//         <h2 className="section-title">Diploma & Polytechnic Education<br />in Telangana</h2>
//         <div className="about-grid">
//           <div className="about-text">
//             <p>The <strong>State Board of Technical Education and Training (SBTET), Telangana</strong> governs technical education across the state, overseeing more than <strong>130 polytechnic colleges</strong> offering diploma programs.</p>
//             <p>Diploma programs span 3 years (6 semesters) across branches including Computer Science (CS), Mechanical (ME), Civil (CE), Electrical (EE), Electronics (EC), and many more. Each college has a unique college code assigned by SBTET.</p>
//             <p>Students must maintain a minimum <strong>75% attendance</strong> to be eligible for examinations. Our system automates this tracking with biometric precision and full transparency.</p>
//           </div>
//           <div className="branches-box card">
//             <div style={{ padding: 24 }}>
//               <h4 style={{ marginBottom: 16, fontFamily: 'var(--font)' }}>Popular Branches</h4>
//               {['Computer Science (CS)','Mechanical Engineering (ME)','Civil Engineering (CE)','Electrical Engineering (EE)','Electronics & Comm (EC)','Chemical Technology (CH)','Information Technology (IT)'].map(b => (
//                 <div key={b} className="branch-item">✓ {b}</div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features */}
//       <section className="features-section">
//         <div className="section-tag">Features</div>
//         <h2 className="section-title">Everything You Need</h2>
//         <div className="features-grid">
//           {FEATURES.map((f, i) => (
//             <div key={i} className="feature-card card fade-in" style={{ animationDelay: `${i * 0.08}s` }}>
//               <div className="feature-icon">{f.icon}</div>
//               <h3>{f.title}</h3>
//               <p>{f.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="how-section">
//         <div className="section-tag">How It Works</div>
//         <h2 className="section-title">Attendance in 3 Simple Steps</h2>
//         <div className="steps">
//           <div className="step card">
//             <div className="step-num">1</div>
//             <h3>Open App at College</h3>
//             <p>Come to your college. The GPS check confirms you are within the 200m college boundary.</p>
//           </div>
//           <div className="step-arrow">→</div>
//           <div className="step card">
//             <div className="step-num">2</div>
//             <h3>Face + Blink Verify</h3>
//             <p>Look at the camera and blink twice. The system matches your face to prevent fake attendance.</p>
//           </div>
//           <div className="step-arrow">→</div>
//           <div className="step card">
//             <div className="step-num">3</div>
//             <h3>Check Out After 6 Hours</h3>
//             <p>Mark check-out after 6 hours for full attendance. Less than 6 hours counts as Half Day.</p>
//           </div>
//         </div>
//       </section>

//       {/* Roles */}
//       <section className="roles-section">
//         <div className="section-tag">User Roles</div>
//         <h2 className="section-title">One Platform, Every Role</h2>
//         <div className="roles-grid">
//           {ROLES.map((r, i) => (
//             <div key={i} className="role-card" style={{ background: r.bg }}>
//               <div className="role-icon">{r.icon}</div>
//               <h3>{r.label}</h3>
//               <p>{r.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="cta-section">
//         <h2>Ready to Modernize Your College Attendance?</h2>
//         <p>Join all polytechnic colleges across Telangana on one secure platform.</p>
//         <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
//           <Link to="/register" className="btn btn-accent" style={{ padding: '14px 36px', fontSize: 16 }}>Register Now →</Link>
//           <Link to="/login" className="btn" style={{ padding: '14px 36px', fontSize: 16, background: 'rgba(255,255,255,0.15)', color: '#fff', backdropFilter: 'blur(10px)' }}>Login</Link>
//         </div>
//       </section>

//       <footer className="footer">
//         <p>© 2024 SBTET Telangana Attendance System | State Board of Technical Education and Training, Telangana</p>
//       </footer>
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

// ── Notifications (mirroring SBTET portal style) ─────────────────────────────
const NOTIFICATIONS = [
  { date: '20-03-2026', text: 'Diploma Regular Examinations April 2026 for C-21 V & VI Semesters, C-24 II & IV Semesters and ER-2020 - Notification and Center List' },
  { date: '13-03-2026', text: 'LPCET-2026 Instructions Booklet' },
  { date: '13-03-2026', text: 'LPCET-2026 Detailed Notification' },
  { date: '13-03-2026', text: 'LPCET-2026 Brief Notification' },
  { date: '03-12-2026', text: 'CCIC/Craft/OTCs - Notification of Affiliations for the Academic Year 2026-27' },
  { date: '09-03-2026', text: 'RVCA Notification - Board Diploma Mid Semester -1 Examinations for C21 V, VI Semester and C24 II & IV Semesters - Jan 2026' },
];

const SERVICES_STATS = [
  { label: 'Migration',       val: '1960',  icon: '⚙️' },
  { label: 'Interim',         val: '36754', icon: '⚙️' },
  { label: 'Bonafied',        val: '11856', icon: '⚙️' },
  { label: 'Transcript',      val: '4174',  icon: '📢' },
  { label: 'Duplicate Memo',  val: '6007',  icon: '📢' },
  { label: 'Duplicate ODC',   val: '31',    icon: '⚙️' },
  { label: 'Transfer',        val: '49430', icon: '⚙️' },
  { label: 'Name Correction', val: '2275',  icon: '📋' },
];

const FEATURES = [
  { icon: '🤖', title: 'Face Biometric', desc: 'Advanced face recognition with blink detection. Your identity is verified in seconds — no spoofing.' },
  { icon: '📍', title: 'GPS Geofencing', desc: 'Attendance can only be marked within your college boundary. No fake attendance from outside.' },
  { icon: '📊', title: 'SBTET-Style Report', desc: 'Monthly calendar view exactly like the official SBTET portal — P, A, H, W, HP statuses.' },
  { icon: '🕐', title: 'Smart Check-In/Out', desc: '6-hour gap for full day. Less than 6 hours = Half Day. Missed checkout = Error.' },
  { icon: '🏫', title: '130+ Colleges', desc: 'All Telangana polytechnic colleges with unique SBTET college codes.' },
  { icon: '👩‍💼', title: 'Multi-Role System', desc: 'Students, Faculty, HOD and Admin — each with their own secure dashboard.' },
];

const ROLES = [
  { icon: '🎓', label: 'Student',  desc: 'Mark attendance with face + GPS, view SBTET-style attendance summary',         bg: 'linear-gradient(135deg,#1a237e,#283593)' },
  { icon: '👨‍🏫', label: 'Faculty',  desc: 'View student attendance, generate monthly reports, track class records',         bg: 'linear-gradient(135deg,#1b5e20,#2e7d32)' },
  { icon: '🏅', label: 'HOD',      desc: 'Approve registrations, override attendance, manage your department only',          bg: 'linear-gradient(135deg,#4a148c,#6a1b9a)' },
  { icon: '⚙️', label: 'Admin',    desc: 'Register colleges, manage all users and holidays across Telangana',               bg: 'linear-gradient(135deg,#b71c1c,#c62828)' },
];

export default function HomePage() {
  const [notifIdx, setNotifIdx] = useState(0);

  // Auto-scroll notifications
  useEffect(() => {
    const t = setInterval(() => setNotifIdx(i => (i + 1) % NOTIFICATIONS.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="home" style={{ fontFamily: 'Arial, sans-serif' }}>

      {/* ══════════════════════════════════════════════════════════════════
          OFFICIAL SBTET HEADER BANNER
      ══════════════════════════════════════════════════════════════════ */}
      <div style={{
        background: '#fff',
        borderBottom: '3px solid #1a8dd9',
        padding: '12px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}>
        {/* Left: Logo + Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img
            src="sbtet.png"
            alt="SBTET Logo"
            style={{ height: 72, objectFit: 'contain' }}
            onError={e => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          {/* Fallback logo */}
          <div style={{
            display: 'none', width: 72, height: 72, borderRadius: '50%',
            background: '#1a237e', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 900, fontSize: 22, flexShrink: 0,
          }}>T</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#1a237e', lineHeight: 1.2 }}>
              STATE BOARD OF TECHNICAL
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#1a237e', lineHeight: 1.2 }}>
              EDUCATION AND TRAINING
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#1a237e', lineHeight: 1.2 }}>
              TELANGANA
            </div>
          </div>
        </div>

        {/* Center: Telangana Rising logo + Officials */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {/* Telangana Rising logo area */}
          <div style={{
            textAlign: 'center', padding: '6px 14px',
            border: '2px solid #e0e0e0', borderRadius: 8,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#0d47a1' }}>TELANGANA</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#e65100' }}>RISING</div>
            <div style={{ fontSize: 9, color: '#555', fontWeight: 600 }}>CURE · PURE · RARE</div>
          </div>

          {/* Officials */}
          <div style={{ display: 'flex', gap: 28 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 60, height: 60, borderRadius: '50%',
                background: 'linear-gradient(135deg,#1a237e,#1a8dd9)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, margin: '0 auto 6px',
              }}>👩‍💼</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#222', lineHeight: 1.3 }}>
                Smt. A. Sridevasena,<br />IAS
              </div>
              <div style={{ fontSize: 10, color: '#555', fontWeight: 700 }}>CHAIRPERSON</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 60, height: 60, borderRadius: '50%',
                background: 'linear-gradient(135deg,#1b5e20,#2e7d32)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, margin: '0 auto 6px',
              }}>👨‍💼</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#222', lineHeight: 1.3 }}>
                Er A Pullaiah
              </div>
              <div style={{ fontSize: 10, color: '#555', fontWeight: 700 }}>SECRETARY</div>
            </div>
          </div>
        </div>

        {/* Right: Contact info */}
        <div style={{ textAlign: 'right', fontSize: 12, color: '#333', lineHeight: 2 }}>
          <div>✉️ sbtet-helpdesk@telangana.gov.in &nbsp; 📞 08031404549</div>
          <div style={{ color: '#555' }}>All Working days: 10:30AM to 05:00PM</div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 4 }}>
            <span style={{
              background: '#1877f2', color: '#fff', borderRadius: '50%',
              width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
            }}>f</span>
            <span style={{
              background: '#1da1f2', color: '#fff', borderRadius: '50%',
              width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12,
            }}>𝕏</span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          BLUE NAV BAR (SBTET style)
      ══════════════════════════════════════════════════════════════════ */}
      <div style={{
        background: '#1a8dd9',
        padding: '0 32px',
        display: 'flex', alignItems: 'center',
        gap: 4, overflowX: 'auto',
      }}>
        {['🏠 Home', '🎓 Student Services', '🏫 College Services', '⚙️ Others Services',
          '📋 Affiliated Colleges', '📚 Courses', '📞 Contact-Us'].map((item, i) => (
          <div key={i} style={{
            padding: '13px 14px', color: '#fff', fontSize: 13,
            fontWeight: 600, whiteSpace: 'nowrap', cursor: 'pointer',
            borderBottom: i === 0 ? '3px solid #fff' : '3px solid transparent',
          }}>{item}</div>
        ))}
        <div style={{ marginLeft: 'auto' }}>
          <Link to="/login" style={{
            padding: '10px 20px', color: '#fff', fontSize: 13,
            fontWeight: 700, whiteSpace: 'nowrap',
            background: 'rgba(255,255,255,0.15)', borderRadius: 4,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>👤 LOGIN</Link>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          ATTENDANCE SYSTEM HERO BANNER
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(135deg, #0d1554 0%, #1a237e 50%, #1a8dd9 100%)',
        padding: '56px 48px',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 48, alignItems: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background blobs */}
        <div style={{ position:'absolute', width:400, height:400, background:'#ff6f00', opacity:.1, borderRadius:'50%', filter:'blur(80px)', top:-100, right:-100 }} />
        <div style={{ position:'absolute', width:250, height:250, background:'#7c4dff', opacity:.1, borderRadius:'50%', filter:'blur(60px)', bottom:50, left:80 }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* "What's New" badge */}
          <div style={{
            display: 'inline-block', padding: '5px 16px',
            background: '#388e3c', color: '#fff',
            borderRadius: 4, fontSize: 13, fontWeight: 700,
            marginBottom: 20,
          }}>🆕 Attendance Management System</div>

          <h1 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 16 }}>
            SBTET Telangana<br />
            <span style={{ color: '#ffa000' }}>Diploma Attendance</span><br />
            System
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.80)', lineHeight: 1.7, marginBottom: 32, maxWidth: 480 }}>
            Official biometric attendance management for all polytechnic colleges across Telangana.
            Powered by <strong style={{ color: '#ffd54f' }}>face recognition</strong> and <strong style={{ color: '#ffd54f' }}>GPS geofencing</strong>.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link to="/register" style={{
              padding: '13px 32px', background: '#ffa000', color: '#fff',
              borderRadius: 6, fontWeight: 700, fontSize: 15, border: 'none',
              textDecoration: 'none', display: 'inline-block',
              boxShadow: '0 4px 16px rgba(255,160,0,0.4)',
            }}>Get Started →</Link>
            <Link to="/login" style={{
              padding: '13px 28px', background: 'rgba(255,255,255,0.12)',
              color: '#fff', borderRadius: 6, fontWeight: 700, fontSize: 15,
              border: '2px solid rgba(255,255,255,0.4)', textDecoration: 'none',
              backdropFilter: 'blur(10px)',
            }}>Login</Link>
          </div>
        </div>

        {/* Right: Attendance card preview */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{
            background: 'rgba(255,255,255,0.97)', borderRadius: 16,
            boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
            overflow: 'hidden', width: '100%', maxWidth: 380,
          }}>
            {/* Card header SBTET style */}
            <div style={{
              background: '#1a237e', padding: '12px 18px',
              color: '#fff', fontSize: 12, fontWeight: 700, letterSpacing: .5,
              textAlign: 'center', textTransform: 'uppercase',
            }}>
              SBTET · Student Attendance Summary
            </div>
            <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* Student info */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4, fontSize: 11 }}>
                {[['PIN','24047-CS-023'],['NAME','MANDALA SANATH'],['BRANCH','CS · 4SEM']].map(([k,v]) => (
                  <div key={k} style={{ background: '#e8eaf6', borderRadius: 4, padding: '5px 8px' }}>
                    <div style={{ color: '#1a237e', fontWeight: 700, fontSize: 9, letterSpacing: .5 }}>{k}</div>
                    <div style={{ fontWeight: 700, fontSize: 10, marginTop: 2 }}>{v}</div>
                  </div>
                ))}
              </div>
              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, textAlign: 'center', margin: '4px 0' }}>
                <div style={{ background: '#f5f5f5', borderRadius: 6, padding: '8px 4px' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#1a237e' }}>90</div>
                  <div style={{ fontSize: 9, color: '#666', marginTop: 2 }}>WORKING DAYS</div>
                </div>
                <div style={{ background: '#e8f5e9', borderRadius: 6, padding: '8px 4px' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#2e7d32' }}>78</div>
                  <div style={{ fontSize: 9, color: '#666', marginTop: 2 }}>DAYS PRESENT</div>
                </div>
                <div style={{ background: '#e8f5e9', borderRadius: 6, padding: '8px 4px' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#2e7d32' }}>86.67%</div>
                  <div style={{ fontSize: 9, color: '#666', marginTop: 2 }}>ATTENDANCE</div>
                </div>
              </div>
              {/* Mini calendar grid */}
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#1a237e', marginBottom: 4 }}>APRIL 2026</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3 }}>
                  {['-','-','-','-','-','-','E','A','E','E','P','W','W','P','P','P','P','P','W','W','P','P','P','P','P','P','W','A','P','P','P'].map((s, i) => {
                    const colors = { P:'#2e7d32', A:'#c62828', W:'#757575', E:'#e65100', H:'#0d47a1', '-':'#ccc' };
                    const bgs    = { P:'#e8f5e9', A:'#ffebee', W:'#f5f5f5', E:'#fff3e0', H:'#e3f2fd', '-':'#fafafa' };
                    return (
                      <div key={i} style={{
                        background: bgs[s] || '#fafafa', color: colors[s] || '#aaa',
                        borderRadius: 3, padding: '4px 1px', textAlign: 'center',
                        fontSize: 9, fontWeight: 700,
                      }}>{s}</div>
                    );
                  })}
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 8, flexWrap: 'wrap' }}>
                  {[['P','#2e7d32','Present'],['A','#c62828','Absent'],['HP','#e65100','Half Day'],['W','#757575','Weekend']].map(([l,c,t]) => (
                    <span key={l} style={{ fontSize: 9, fontWeight: 700, color: c }}>
                      {l} — {t}
                    </span>
                  ))}
                </div>
              </div>
              {/* Eligible badge */}
              <div style={{
                background: '#e8f5e9', border: '1px solid #2e7d32',
                borderRadius: 6, padding: '7px 12px', textAlign: 'center',
                color: '#2e7d32', fontWeight: 700, fontSize: 12,
              }}>✅ ELIGIBLE FOR EXAMINATION — Attendance ≥ 75%</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          MAIN CONTENT: Notifications + Services (SBTET layout)
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{
        display: 'grid', gridTemplateColumns: '1fr 420px',
        gap: 24, padding: '28px 32px', background: '#f5f7fa',
      }}>
        {/* Left: Telangana Rising image area */}
        <div style={{
          background: '#fff', borderRadius: 8, border: '1px solid #e0e0e0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          minHeight: 280, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ textAlign: 'center', padding: 32 }}>
            {/* Telangana map with globe — recreated */}
            <div style={{
              width: 200, height: 200, margin: '0 auto 16px',
              background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
              borderRadius: '50%', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              border: '4px solid #1a8dd9', boxShadow: '0 8px 32px rgba(26,141,217,0.2)',
            }}>
              <div style={{ fontSize: 64 }}>🏛️</div>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#1a237e', letterSpacing: 1 }}>TELANGANA</div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#0d47a1', letterSpacing: 2 }}>RISING</div>
            <div style={{ fontSize: 13, color: '#555', fontWeight: 600, letterSpacing: 2, marginTop: 4 }}>
              CURE · PURE · RARE
            </div>
            <div style={{
              marginTop: 20, padding: '10px 20px',
              background: 'linear-gradient(135deg,#1a237e,#1a8dd9)',
              color: '#fff', borderRadius: 6, fontSize: 13, fontWeight: 700,
            }}>
              Attendance Management System 2026
            </div>
          </div>
          {/* Navigation arrows */}
          <div style={{
            position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(26,141,217,0.8)', color: '#fff', borderRadius: 4,
            padding: '10px 14px', cursor: 'pointer', fontSize: 18,
          }}>‹</div>
          <div style={{
            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(26,141,217,0.8)', color: '#fff', borderRadius: 4,
            padding: '10px 14px', cursor: 'pointer', fontSize: 18,
          }}>›</div>
        </div>

        {/* Right: Notifications panel */}
        <div style={{
          background: '#fff', borderRadius: 8, border: '1px solid #e0e0e0',
          overflow: 'hidden',
        }}>
          <div style={{
            background: '#1a8dd9', padding: '12px 18px',
            color: '#fff', fontWeight: 700, fontSize: 14,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            📋 Notifications
          </div>
          <div style={{ padding: '8px 0' }}>
            {NOTIFICATIONS.map((n, i) => (
              <div key={i} style={{
                padding: '10px 16px',
                borderBottom: '1px solid #f0f0f0',
                display: 'flex', gap: 10,
                background: i === notifIdx ? '#f0f7ff' : '#fff',
                transition: 'background 0.3s',
              }}>
                <span style={{ fontSize: 11, color: '#555', whiteSpace: 'nowrap', marginTop: 2 }}>📄 {n.date}</span>
                <span style={{
                  fontSize: 12, color: '#1a8dd9', cursor: 'pointer', lineHeight: 1.5,
                  fontWeight: i === notifIdx ? 600 : 400,
                }}>{n.text}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: '10px 16px', textAlign: 'right', borderTop: '1px solid #f0f0f0' }}>
            <span style={{
              background: '#1a8dd9', color: '#fff', padding: '6px 18px',
              borderRadius: 4, fontSize: 12, fontWeight: 700, cursor: 'pointer',
            }}>View All</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CURRENT ACADEMIC YEAR STATISTICS (SBTET style)
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: '#f5f7fa', padding: '0 32px 28px' }}>
        <div style={{
          background: '#1a8dd9', padding: '10px 20px',
          color: '#fff', fontWeight: 600, fontSize: 14,
          borderRadius: '4px 4px 0 0', textAlign: 'center',
        }}>
          Current Academic Year Student Services Statistics
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)',
          border: '1px solid #e0e0e0', borderTop: 'none',
          background: '#fff',
        }}>
          {SERVICES_STATS.map((s, i) => (
            <div key={i} style={{
              padding: '18px 10px', textAlign: 'center',
              borderRight: i < SERVICES_STATS.length - 1 ? '1px solid #e0e0e0' : 'none',
            }}>
              <div style={{ fontSize: 13, color: '#1a8dd9', fontWeight: 700, marginBottom: 8 }}>{s.label}</div>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#333' }}>{s.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          QUICK LOGIN SECTION
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: '#1a237e', padding: '40px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 32, flexWrap: 'wrap',
      }}>
        <div>
          <h2 style={{ color: '#fff', fontSize: 26, fontWeight: 800, marginBottom: 8 }}>
            Mark Your Attendance Today
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15 }}>
            Login with your credentials to mark biometric attendance or view your SBTET summary.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link to="/login" style={{
            padding: '13px 32px', background: '#ffa000',
            color: '#fff', borderRadius: 6, fontWeight: 700, fontSize: 15,
            textDecoration: 'none', boxShadow: '0 4px 16px rgba(255,160,0,.35)',
          }}>👤 Login</Link>
          <Link to="/register" style={{
            padding: '13px 28px', background: 'rgba(255,255,255,0.12)',
            color: '#fff', borderRadius: 6, fontWeight: 700, fontSize: 15,
            textDecoration: 'none', border: '2px solid rgba(255,255,255,0.35)',
          }}>Register</Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '64px 48px', background: '#f0f4ff' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            display: 'inline-block', padding: '5px 16px', borderRadius: 20,
            background: 'rgba(26,35,126,0.08)', color: '#1a237e',
            fontSize: 12, fontWeight: 700, letterSpacing: 1,
            textTransform: 'uppercase', marginBottom: 12,
          }}>Features</div>
          <h2 style={{ fontSize: 'clamp(24px,3.5vw,38px)', fontWeight: 800, color: '#1a237e' }}>
            Everything You Need
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 12, padding: 28,
              border: '1px solid #e0e3ef', boxShadow: '0 2px 12px rgba(26,35,126,.07)',
              transition: 'transform .2s, box-shadow .2s',
            }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(26,35,126,.15)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 12px rgba(26,35,126,.07)'; }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ fontSize: 17, color: '#1a237e', fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '64px 48px', background: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            display: 'inline-block', padding: '5px 16px', borderRadius: 20,
            background: 'rgba(26,35,126,0.08)', color: '#1a237e',
            fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12,
          }}>How It Works</div>
          <h2 style={{ fontSize: 'clamp(24px,3.5vw,38px)', fontWeight: 800, color: '#1a237e' }}>
            Attendance in 3 Simple Steps
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, maxWidth: 900, margin: '0 auto' }}>
          {[
            { n: '1', title: 'Come to College', desc: 'GPS confirms you are within the 200m college boundary before attendance opens.' },
            { n: '2', title: 'Face + Blink Verify', desc: 'Look at the camera and blink twice. Your face is matched to prevent proxy attendance.' },
            { n: '3', title: 'Check Out After 6h', desc: 'Check out for full day attendance. Under 6 hours = Half Day. Missed = Error (E).' },
          ].map((s, i) => (
            <React.Fragment key={i}>
              <div style={{
                flex: 1, background: '#f9fafb', borderRadius: 12, padding: '32px 24px',
                border: '1px solid #e0e3ef', textAlign: 'center',
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: '#1a237e', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 20, margin: '0 auto 16px',
                }}>{s.n}</div>
                <h3 style={{ fontSize: 17, color: '#1a237e', fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
              {i < 2 && <div style={{ fontSize: 28, color: '#c5cae9', flexShrink: 0 }}>→</div>}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          ROLES
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '64px 48px', background: '#1a237e' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            display: 'inline-block', padding: '5px 16px', borderRadius: 20,
            background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)',
            fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12,
          }}>User Roles</div>
          <h2 style={{ fontSize: 'clamp(24px,3.5vw,38px)', fontWeight: 800, color: '#fff' }}>
            One Platform, Every Role
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {ROLES.map((r, i) => (
            <div key={i} style={{
              background: r.bg, borderRadius: 12, padding: '32px 24px',
              color: '#fff', transition: 'transform .2s',
            }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseOut={e => e.currentTarget.style.transform = ''}>
              <div style={{ fontSize: 40, marginBottom: 14 }}>{r.icon}</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{r.label}</h3>
              <p style={{ fontSize: 14, opacity: .85, lineHeight: 1.65 }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{
        padding: '72px 48px', textAlign: 'center',
        background: 'linear-gradient(135deg, #ff6f00, #ffa000)',
      }}>
        <h2 style={{ fontSize: 'clamp(24px,3.5vw,40px)', color: '#fff', fontWeight: 800, marginBottom: 14 }}>
          Ready to Modernize Your College Attendance?
        </h2>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.85)', marginBottom: 36 }}>
          Join all polytechnic colleges across Telangana on one secure platform.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register" style={{
            padding: '14px 36px', background: '#fff', color: '#e65100',
            borderRadius: 6, fontWeight: 800, fontSize: 16, textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          }}>Register Now →</Link>
          <Link to="/login" style={{
            padding: '14px 32px', background: 'rgba(255,255,255,0.18)',
            color: '#fff', borderRadius: 6, fontWeight: 700, fontSize: 16,
            textDecoration: 'none', border: '2px solid rgba(255,255,255,0.5)',
          }}>Login</Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FOOTER (SBTET style)
      ══════════════════════════════════════════════════════════════════ */}
      <footer style={{
        background: '#0d1554',
        padding: '28px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%', background: '#1a237e',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 900, fontSize: 16, border: '2px solid #1a8dd9',
          }}>T</div>
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>SBTET Telangana</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>Attendance Management System</div>
          </div>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, textAlign: 'center' }}>
          © 2026 State Board of Technical Education and Training, Telangana
          <br />All Working Days: 10:30 AM to 05:00 PM &nbsp;|&nbsp; 📞 08031404549
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link to="/login" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, textDecoration: 'none' }}>Login</Link>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
          <Link to="/register" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, textDecoration: 'none' }}>Register</Link>
        </div>
      </footer>

    </div>
  );
}