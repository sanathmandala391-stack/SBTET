import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const FEATURES = [
  { icon: '🤖', title: 'Face Biometric', desc: 'Advanced face recognition with blink detection to prevent photo spoofing. Your identity is verified in seconds.' },
  { icon: '📍', title: 'GPS Geofencing', desc: 'Attendance can only be marked within your college premises. No fake attendance from outside.' },
  { icon: '📊', title: 'Live Attendance', desc: 'Real-time attendance tracking with detailed monthly calendar view, just like SBTET official portal.' },
  { icon: '🕐', title: 'Smart Marking', desc: 'Check in & check out system. Full day needs 6hr gap. Half day for early checkout. Error for missed checkout.' },
  { icon: '🏫', title: '100+ Colleges', desc: 'Supports all 95–134 Telangana polytechnic colleges with unique college codes for easy management.' },
  { icon: '👩‍💼', title: 'Multi-Role System', desc: 'Students, Faculty, HODs and Admin each have tailored dashboards with role-based access control.' }
];

const ROLES = [
  { icon: '🎓', label: 'Student', desc: 'Mark attendance, view your attendance calendar and percentage', color: '#1a237e', bg: 'linear-gradient(135deg,#1a237e,#283593)' },
  { icon: '👨‍🏫', label: 'Faculty', desc: 'View and report student attendance, track class progress', color: '#1b5e20', bg: 'linear-gradient(135deg,#1b5e20,#2e7d32)' },
  { icon: '🏅', label: 'HOD', desc: 'Approve registrations, override attendance, full department control', color: '#4a148c', bg: 'linear-gradient(135deg,#4a148c,#6a1b9a)' },
  { icon: '⚙️', label: 'Admin', desc: 'Register colleges, manage all users across Telangana', color: '#b71c1c', bg: 'linear-gradient(135deg,#b71c1c,#c62828)' }
];

const STATS = [
  { val: '130+', label: 'Polytechnic Colleges' },
  { val: '50K+', label: 'Diploma Students' },
  { val: '99.9%', label: 'Uptime' },
  { val: '< 5s', label: 'Face Verify Speed' }
];

export default function HomePage() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-blob blob1" />
          <div className="hero-blob blob2" />
          <div className="hero-blob blob3" />
        </div>
        <div className="hero-content fade-in">
          <div className="hero-badge">🎓 State Board of Technical Education & Training</div>
          <h1 className="hero-title">
            Telangana Diploma<br />
            <span className="hero-accent">Attendance System</span>
          </h1>
          <p className="hero-sub">
            A modern, secure attendance management platform for all polytechnic colleges across Telangana.
            Powered by face biometrics and GPS geofencing.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-accent" style={{ padding: '14px 32px', fontSize: 16 }}>
              Get Started →
            </Link>
            <Link to="/login" className="btn btn-outline" style={{ padding: '14px 32px', fontSize: 16, borderColor: '#fff', color: '#fff' }}>
              Login
            </Link>
          </div>
        </div>
        <div className="hero-visual fade-in">
          <div className="hero-card">
            <div className="hc-header">
              <div className="hc-dot red"/><div className="hc-dot yellow"/><div className="hc-dot green"/>
              <span>Attendance Dashboard</span>
            </div>
            <div className="hc-body">
              <div className="hc-row">
                <span>Mandala Sanath Kumar</span>
                <span className="hc-badge p">Present</span>
              </div>
              <div className="hc-row">
                <span>Working Days</span>
                <strong>90</strong>
              </div>
              <div className="hc-row">
                <span>Days Present</span>
                <strong style={{color:'#2e7d32'}}>78</strong>
              </div>
              <div className="hc-row">
                <span>Attendance %</span>
                <strong style={{color:'#2e7d32'}}>86.67%</strong>
              </div>
              <div className="hc-calendar">
                {['P','P','W','H','P','P','A','P','P','P','W','W','P','P'].map((s,i) => (
                  <div key={i} className={`hc-day status-${s}`}>{s}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        {STATS.map((s, i) => (
          <div key={i} className="stat-item fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="stat-val">{s.val}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* About Diploma */}
      <section className="about-section">
        <div className="section-tag">About</div>
        <h2 className="section-title">Diploma & Polytechnic Education<br />in Telangana</h2>
        <div className="about-grid">
          <div className="about-text">
            <p>The <strong>State Board of Technical Education and Training (SBTET), Telangana</strong> governs technical education across the state, overseeing more than <strong>130 polytechnic colleges</strong> offering diploma programs.</p>
            <p>Diploma programs span 3 years (6 semesters) across branches including Computer Science (CS), Mechanical (ME), Civil (CE), Electrical (EE), Electronics (EC), and many more. Each college has a unique college code assigned by SBTET.</p>
            <p>Students must maintain a minimum <strong>75% attendance</strong> to be eligible for examinations. Our system automates this tracking with biometric precision and full transparency.</p>
          </div>
          <div className="branches-box card">
            <div style={{ padding: 24 }}>
              <h4 style={{ marginBottom: 16, fontFamily: 'var(--font)' }}>Popular Branches</h4>
              {['Computer Science (CS)','Mechanical Engineering (ME)','Civil Engineering (CE)','Electrical Engineering (EE)','Electronics & Comm (EC)','Chemical Technology (CH)','Information Technology (IT)'].map(b => (
                <div key={b} className="branch-item">✓ {b}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="section-tag">Features</div>
        <h2 className="section-title">Everything You Need</h2>
        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <div key={i} className="feature-card card fade-in" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-section">
        <div className="section-tag">How It Works</div>
        <h2 className="section-title">Attendance in 3 Simple Steps</h2>
        <div className="steps">
          <div className="step card">
            <div className="step-num">1</div>
            <h3>Open App at College</h3>
            <p>Come to your college. The GPS check confirms you are within the 200m college boundary.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step card">
            <div className="step-num">2</div>
            <h3>Face + Blink Verify</h3>
            <p>Look at the camera and blink twice. The system matches your face to prevent fake attendance.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step card">
            <div className="step-num">3</div>
            <h3>Check Out After 6 Hours</h3>
            <p>Mark check-out after 6 hours for full attendance. Less than 6 hours counts as Half Day.</p>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="roles-section">
        <div className="section-tag">User Roles</div>
        <h2 className="section-title">One Platform, Every Role</h2>
        <div className="roles-grid">
          {ROLES.map((r, i) => (
            <div key={i} className="role-card" style={{ background: r.bg }}>
              <div className="role-icon">{r.icon}</div>
              <h3>{r.label}</h3>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready to Modernize Your College Attendance?</h2>
        <p>Join all polytechnic colleges across Telangana on one secure platform.</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register" className="btn btn-accent" style={{ padding: '14px 36px', fontSize: 16 }}>Register Now →</Link>
          <Link to="/login" className="btn" style={{ padding: '14px 36px', fontSize: 16, background: 'rgba(255,255,255,0.15)', color: '#fff', backdropFilter: 'blur(10px)' }}>Login</Link>
        </div>
      </section>

      <footer className="footer">
        <p>© 2024 SBTET Telangana Attendance System | State Board of Technical Education and Training, Telangana</p>
      </footer>
    </div>
  );
}
