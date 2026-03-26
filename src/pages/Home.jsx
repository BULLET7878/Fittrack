import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = ({ exercises, items }) => {
  const dayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todayList = exercises.filter(x => x.day === dayName);

  const tips = [
    "Hydration is key. Drink 3L+ today. 💧",
    "Focus on form, not just weight. 🏋️‍♂️",
    "Rest is where the growth happens. 😴",
    "Consistency beats intensity every time. 📈",
    "Listen to your body. Scaled is better than injured. 🛠️",
    "Protein intake should be your priority today. 🥩",
    "Warm up for 10 mins before your first set. 🔥"
  ];

  const [tip, setTip] = useState('');
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    // pick a random tip on load
    setTip(tips[Math.floor(Math.random() * tips.length)]);
  }, []);

  useEffect(() => {
    setChecked(Array(items.length).fill(false));
  }, [items]);

  const handleCheck = (i) => {
    const next = [...checked];
    next[i] = !next[i];
    setChecked(next);
  };

  return (
    <div className="page-content animate-fade-in">
      <header style={{ marginBottom: '3rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '4px' }}>
          Welcome Back
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.6 }}>
          It's {dayName}. Let's get to work.
        </p>
      </header>

      <div className="bento-grid">
        <div className="bento-item large glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '20px' }}>
            <span style={{ fontSize: '1.5rem' }}>💡</span>
            <h2 style={{ margin: 0 }}>Daily Focus</h2>
          </div>
          <div style={{ minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{
              fontSize: '1.6rem',
              fontWeight: '700',
              textAlign: 'center',
              lineHeight: '1.4',
              color: 'var(--primary)'
            }}>
              {tip}
            </p>
          </div>
        </div>

        <div className="bento-item small glass-card" style={{ background: 'var(--primary)', color: 'white' }}>
          <h2>Current Streak</h2>
          <div style={{ fontSize: '3.5rem', fontWeight: '900', textAlign: 'center', margin: '16px 0' }}>
            5 🔥
          </div>
          <p style={{ textAlign: 'center', fontWeight: '600', opacity: 0.9 }}>Keep it going!</p>
        </div>

        <div className="bento-item medium glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ margin: 0 }}>Today's Plan</h2>
            <Link to="/exercises" className="btn-modern btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>Edit All</Link>
          </div>

          {todayList.length === 0 ? (
            <p style={{ opacity: 0.5 }}>Nothing scheduled for today. Rest up!</p>
          ) : (
            <div style={{ display: 'grid', gap: '12px' }}>
              {todayList.map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}>
                  {item.photo && (
                    <img src={item.photo} alt={item.name} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                  )}
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>{item.name}</h3>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bento-item medium glass-card">
          <h2 style={{ marginBottom: '24px' }}>Daily Checklist</h2>
          {items.length === 0 ? (
            <p style={{ opacity: 0.5 }}>No tasks found. Add some in settings!</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '12px' }}>
              {items.map((task, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '8px',
                    transition: '0.2s'
                  }}
                  onClick={() => handleCheck(i)}
                >
                  <div
                    style={{
                      height: '22px',
                      width: '22px',
                      borderRadius: '6px',
                      border: `2px solid ${checked[i] ? 'var(--primary)' : 'rgba(255,255,255,0.2)'}`,
                      backgroundColor: checked[i] ? 'var(--primary)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {checked[i] && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={{ width: '12px', height: '12px' }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span style={{
                    fontSize: '1rem',
                    textDecoration: checked[i] ? 'line-through' : 'none',
                    opacity: checked[i] ? 0.4 : 1
                  }}>
                    {task.text}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
