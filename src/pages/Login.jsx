import React, { useState } from 'react';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [reveal, setReveal] = useState(false);
  const [err, setErr] = useState('');
  const [signup, setSignup] = useState(false);
  const [working, setWorking] = useState(false);

  const auth = async (e) => {
    e.preventDefault();
    setWorking(true);
    setErr('');

    const route = signup ? '/register' : '/login';
    const host = 'http://127.0.0.1:5005/api';

    try {
      const res = await fetch(`${host}${route}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass, username: signup ? name : undefined }),
      });

      if (!res.ok) {
        let msg = 'Authentication failed.';
        try {
          const body = await res.json();
          msg = body.message || msg;
        } catch (e) {
          msg = `server error (${res.status})`;
        }
        throw new Error(msg);
      }

      const user = await res.json();
      localStorage.setItem('token', user.token);
      localStorage.setItem('userEmail', user.email);
      setIsLoggedIn(true);

    } catch (e) {
      console.error('auth error:', e);
      setErr(e.name === 'TypeError' ? 'Backend unreachable. Running server?' : e.message);
    } finally {
      setWorking(false);
    }
  };

  return (
    <div className="login-page" style={{
      background: 'linear-gradient(rgba(2, 6, 23, 0.7), rgba(2, 6, 23, 0.8)), url("/src/images/bg-login.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: "'Inter', sans-serif",
      color: '#f8fafc'
    }}>
      <div style={{ position: 'absolute', top: '10%', left: '10%', width: '400px', height: '400px', background: 'rgba(59, 130, 246, 0.05)', filter: 'blur(100px)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '300px', height: '300px', background: 'rgba(99, 102, 241, 0.05)', filter: 'blur(100px)', borderRadius: '50%' }} />

      <div className="login-container animate-fade-in" style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: '1000px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '40px',
        alignItems: 'center'
      }}>
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', color: '#3b82f6', fontWeight: '800', fontSize: '1.2rem' }}>
            <div style={{ width: '32px', height: '32px', background: '#3b82f6', borderRadius: '8px' }} />
            FITTRACK AI
          </div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: 'white', lineHeight: '1.1', letterSpacing: '-0.04em' }}>
            Drive <span style={{ color: '#3b82f6' }}>Performance</span>.
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.5, marginTop: '20px', maxWidth: '450px', lineHeight: '1.6' }}>
            Log sessions, track intake, and let our custom engine optimize the strategy. built for the dedicated.
          </p>

          <div style={{ marginTop: '40px', display: 'flex', gap: '16px' }}>
            <div className="glass-card" style={{ padding: '16px 24px', borderRadius: '16px', background: 'rgba(255,255,255,0.03)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#3b82f6' }}>12k+</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.4, textTransform: 'uppercase' }}>Athletes</div>
            </div>
            <div className="glass-card" style={{ padding: '16px 24px', borderRadius: '16px', background: 'rgba(255,255,255,0.03)' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#3b82f6' }}>98%</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.4, textTransform: 'uppercase' }}>Success Rate</div>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '48px', borderRadius: '32px', background: 'rgba(15, 23, 42, 0.4)' }}>
          <header style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>{signup ? 'Join the Elite' : 'Welcome Back'}</h2>
            <p style={{ opacity: 0.4, fontSize: '0.9rem', marginTop: '4px' }}>Sync your progress now.</p>
          </header>

          <form onSubmit={auth} style={{ display: 'grid', gap: '16px' }}>
            {signup && (
              <div style={{ display: 'grid', gap: '4px' }}>
                <label style={{ fontSize: '0.7rem', fontWeight: '800', opacity: 0.3, letterSpacing: '0.1em' }}>NAME</label>
                <input className="input-modern" required type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            )}
            <div style={{ display: 'grid', gap: '4px' }}>
              <label style={{ fontSize: '0.7rem', fontWeight: '800', opacity: 0.3, letterSpacing: '0.1em' }}>EMAIL</label>
              <input className="input-modern" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div style={{ display: 'grid', gap: '4px' }}>
              <label style={{ fontSize: '0.7rem', fontWeight: '800', opacity: 0.3, letterSpacing: '0.1em' }}>PASS</label>
              <div style={{ position: 'relative' }}>
                <input className="input-modern" required type={reveal ? "text" : "password"} value={pass} onChange={(e) => setPass(e.target.value)} />
                <button type="button" onClick={() => setReveal(!reveal)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#3b82f6', opacity: 0.6 }}>
                  {reveal ? 'HIDE' : 'SHOW'}
                </button>
              </div>
            </div>

            {err && <div style={{ color: '#f87171', fontSize: '0.8rem', background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '8px' }}>{err}</div>}

            <button type="submit" className="btn-modern btn-primary" disabled={working} style={{ padding: '16px', fontWeight: '800', marginTop: '12px' }}>
              {working ? 'Processing...' : (signup ? 'Create Account' : 'Unlock Dashboard')}
            </button>
          </form>

          <footer style={{ marginTop: '24px', textAlign: 'center' }}>
            <span style={{ opacity: 0.4, fontSize: '0.96rem' }}>{signup ? 'Already in?' : 'Not a member?'}</span>
            <button className="text-btn" style={{ color: '#3b82f6', fontWeight: '800', marginLeft: '8px' }} onClick={() => { setSignup(!signup); setErr(''); }}>
              {signup ? 'Log In' : 'Join Now'}
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;
