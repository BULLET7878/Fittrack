import React, { useState } from 'react';

const BMI = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    if (!weight || !height) return;
    const h = height / 100;
    const result = weight / (h * h);
    const bmiValue = result.toFixed(1);
    setBmi(bmiValue);
    setCategory(getBMICategory(result));
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi < 24.9) return 'Normal';
    if (bmi >= 25 && bmi < 29.9) return 'Overweight';
    if (bmi >= 30) return 'Obese';
    return '';
  };

  const getGaugePosition = () => {
    if (!bmi) return 0;
    const val = parseFloat(bmi);
    if (val < 15) return 0;
    if (val > 40) return 100;
    return ((val - 15) / (40 - 15)) * 100;
  };

  const categories = [
    { range: 'Less than 18.5', label: 'Underweight', color: '#38bdf8' },
    { range: '18.5 – 24.9', label: 'Normal weight', color: '#f97316' },
    { range: '25 – 29.9', label: 'Overweight', color: '#fbbf24' },
    { range: '30 and above', label: 'Obese', color: '#ef4444' },
  ];

  return (
    <div className="page-content animate-fade-in">
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem' }}>BMI Analysis</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>Know your numbers. Own your health.</p>
      </header>

      <div className="bento-grid">
        {/* Calculator Form */}
        <div className="bento-item medium glass-card">
          <h2 style={{ marginBottom: '2rem' }}>Calculate Now</h2>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '600', opacity: 0.8 }}>Weight (kg)</label>
              <input
                className="input-modern"
                type="number"
                placeholder="e.g. 75"
                value={weight}
                onChange={e => setWeight(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontWeight: '600', opacity: 0.8 }}>Height (cm)</label>
              <input
                className="input-modern"
                type="number"
                placeholder="e.g. 180"
                value={height}
                onChange={e => setHeight(e.target.value)}
              />
            </div>
            <button
              className="btn-modern btn-primary"
              onClick={calculateBMI}
              style={{ padding: '16px', marginTop: '1rem' }}
            >
              Check Statistics
            </button>
          </div>
        </div>

        {/* Results Visualizer */}
        <div className="bento-item medium glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {!bmi ? (
            <div style={{ textAlign: 'center', opacity: 0.5 }}>
              <span style={{ fontSize: '4rem' }}>⚖️</span>
              <p>Enter your details to see results</p>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ opacity: 0.7, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Your Result</h2>
              <div style={{ fontSize: '5rem', fontWeight: '900', color: 'var(--primary)', margin: '0.5rem 0' }}>
                {bmi}
              </div>
              <div style={{
                padding: '8px 20px',
                borderRadius: '50px',
                background: 'var(--primary)',
                color: 'white',
                display: 'inline-block',
                fontWeight: '800',
                fontSize: '1.2rem',
                marginBottom: '2rem'
              }}>
                {category}
              </div>

              {/* Gauge */}
              <div style={{ position: 'relative', width: '100%', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', marginTop: '2rem' }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to right, #38bdf8, #f97316, #fbbf24, #ef4444)',
                  borderRadius: '10px',
                  opacity: 0.3
                }}></div>
                <div style={{
                  position: 'absolute',
                  left: `${getGaugePosition()}%`,
                  top: '-10px',
                  width: '4px',
                  height: '32px',
                  background: 'white',
                  borderRadius: '2px',
                  boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                  transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', opacity: 0.5, marginTop: '1.5rem' }}>
                <span>Underweight</span>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obese</span>
              </div>
            </div>
          )}
        </div>

        {/* Categories Reference */}
        <div className="bento-item large glass-card">
          <h2 style={{ marginBottom: '1.5rem' }}>Reference Table</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {categories.map((cat, i) => (
              <div key={i} style={{
                padding: '1.5rem',
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${cat.color}33`,
                textAlign: 'center'
              }}>
                <div style={{ color: cat.color, fontWeight: '800', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{cat.label}</div>
                <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>{cat.range}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMI;
