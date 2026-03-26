import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Landing = () => {
  return (
    <div className="landing-page" style={{
      minHeight: '100vh',
      background: 'linear-gradient(rgba(2, 6, 23, 0.85), rgba(2, 6, 23, 0.95)), url("/src/images/bg-dark.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 24px',
      color: 'white',
      fontFamily: "'Inter', sans-serif",
      overflowX: 'hidden'
    }}>
      <nav style={{
        width: '100%',
        maxWidth: '1200px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '80px',
        padding: '0 20px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: '#3b82f6',
          fontWeight: '900',
          fontSize: '1.4rem'
        }}>
          <div style={{ width: '36px', height: '36px', background: '#3b82f6', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6.5 6.5 11 11M6.5 17.5l11-11"/></svg>
          </div>
          FITTRACK AI
        </div>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontWeight: '500', opacity: 0.7 }}>About</Link>
          <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontWeight: '500', opacity: 0.7 }}>Pricing</Link>
          <Link to="/login" className="btn-modern btn-primary" style={{ padding: '10px 24px', fontSize: '0.9rem', borderRadius: '100px' }}>
            Sign In
          </Link>
        </div>
      </nav>

      <div className="animate-fade-in" style={{ maxWidth: '900px', textAlign: 'center' }}>
        <div style={{
          display: 'inline-block',
          padding: '8px 16px',
          borderRadius: '100px',
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          color: '#3b82f6',
          fontSize: '0.85rem',
          fontWeight: '700',
          marginBottom: '32px'
        }}>
          NEW: HYPER-PERSONALIZED TRAINING
        </div>
        
        <h1 style={{
          fontSize: '4.8rem',
          fontWeight: '900',
          lineHeight: '1',
          marginBottom: '32px',
          letterSpacing: '-0.04em'
        }}>
          Train <span className="text-gradient">Smarter</span>.
          <br />
          Grow Faster.
        </h1>
        
        <p style={{
          fontSize: '1.2rem',
          opacity: 0.6,
          marginBottom: '56px',
          lineHeight: '1.6',
          maxWidth: '600px',
          margin: '0 auto 56px auto'
        }}>
          The only platform that combines raw data with AI to build the perfect plan for your physique. No more guessing.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '80px' }}>
          <Link to="/login" className="btn-modern btn-primary" style={{ padding: '20px 40px', fontSize: '1rem', borderRadius: '100px', boxShadow: '0 10px 30px -5px rgba(59, 130, 246, 0.4)' }}>
            Try it Free
          </Link>
          <Link to="/login" className="btn-modern" style={{ 
            background: 'rgba(255,255,255,0.03)', 
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '20px 40px',
            fontSize: '1rem',
            color: 'white',
            borderRadius: '100px'
          }}>
            How it Works
          </Link>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        width: '100%',
        maxWidth: '1100px'
      }}>
        <div className="glass-card" style={{ padding: '40px', borderRadius: '32px' }}>
          <div style={{ fontSize: '2rem', marginBottom: '24px' }}>🦾</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '12px', fontWeight: '800' }}>Custom Engine</h3>
          <p style={{ opacity: 0.5, lineHeight: '1.6' }}>We skip the templates. Our algorithms build an actual roadmap for your unique phenotype and recovery rate.</p>
        </div>
        
        <div className="glass-card" style={{ padding: '40px', borderRadius: '32px' }}>
          <div style={{ fontSize: '2rem', marginBottom: '24px' }}>🍣</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '12px', fontWeight: '800' }}>Macro Tracking</h3>
          <p style={{ opacity: 0.5, lineHeight: '1.6' }}>Track your fuel with zero friction. We handle the math so you can focus on the food and the lifting.</p>
        </div>
        
        <div className="glass-card" style={{ padding: '40px', borderRadius: '32px' }}>
          <div style={{ fontSize: '2rem', marginBottom: '24px' }}>📈</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '12px', fontWeight: '800' }}>Deep Insights</h3>
          <p style={{ opacity: 0.5, lineHeight: '1.6' }}>Visual progress is slow, but the data doesn't lie. See your power curves and volume trends in real-time.</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
