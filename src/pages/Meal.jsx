import React, { useState, useEffect } from 'react';

const Meal = () => {
  const [nutrition, setNutrition] = useState([]);
  const [newMeal, setNewMeal] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNutrition();
  }, []);

  const fetchNutrition = async () => {
    try {
      const email = localStorage.getItem('userEmail');
      const response = await fetch(`http://localhost:5005/api/nutrition?email=${email}`);
      const data = await response.json();
      setNutrition(data.nutrition || []);
    } catch (err) {
      console.error('Error fetching nutrition:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogMeal = async (e) => {
    e.preventDefault();
    if (!newMeal.name || !newMeal.calories) return;

    try {
      const email = localStorage.getItem('userEmail');
      const response = await fetch('http://localhost:5005/api/nutrition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, meal: newMeal }),
      });
      if (response.ok) {
        fetchNutrition();
        setNewMeal({
          name: '',
          calories: '',
          protein: '',
          carbs: '',
          fat: '',
          date: new Date().toISOString().split('T')[0],
        });
      }
    } catch (err) {
      console.error('Error logging meal:', err);
    }
  };

  const handleDeleteMeal = async (id) => {
    try {
      const email = localStorage.getItem('userEmail');
      await fetch('http://localhost:5005/api/nutrition', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, id }),
      });
      fetchNutrition();
    } catch (err) {
      console.error('Error deleting meal:', err);
    }
  };

  const dailyTotals = nutrition
    .filter(m => m.date === new Date().toISOString().split('T')[0])
    .reduce((acc, curr) => ({
      calories: acc.calories + Number(curr.calories || 0),
      protein: acc.protein + Number(curr.protein || 0),
      carbs: acc.carbs + Number(curr.carbs || 0),
      fat: acc.fat + Number(curr.fat || 0),
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  return (
    <div className="page-content animate-fade-in">
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem' }}>Nutrition Tracker</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>Fuel your ambition. Track your macros.</p>
      </header>

      <div className="bento-grid">
        {/* Daily Summary Card */}
        <div className="bento-item large glass-card" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '32px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary)' }}>{dailyTotals.calories}</div>
            <div style={{ opacity: 0.6, fontSize: '0.8rem', textTransform: 'uppercase' }}>Calories</div>
          </div>
          <div style={{ borderLeft: '1px solid var(--glass-border)', height: '40px' }}></div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{dailyTotals.protein}g</div>
            <div style={{ opacity: 0.6, fontSize: '0.8rem', textTransform: 'uppercase' }}>Protein</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{dailyTotals.carbs}g</div>
            <div style={{ opacity: 0.6, fontSize: '0.8rem', textTransform: 'uppercase' }}>Carbs</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{dailyTotals.fat}g</div>
            <div style={{ opacity: 0.6, fontSize: '0.8rem', textTransform: 'uppercase' }}>Fat</div>
          </div>
        </div>

        {/* Log Meal Form */}
        <div className="bento-item small glass-card">
          <h2 style={{ marginBottom: '1.5rem' }}>Log Meal</h2>
          <form onSubmit={handleLogMeal} style={{ display: 'grid', gap: '1rem' }}>
            <input
              className="input-modern"
              placeholder="Meal Name (e.g. Chicken Salad)"
              value={newMeal.name}
              onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
            />
            <input
              className="input-modern"
              type="number"
              placeholder="Calories"
              value={newMeal.calories}
              onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
              <input className="input-modern" type="number" placeholder="Pro (g)" value={newMeal.protein} onChange={(e) => setNewMeal({ ...newMeal, protein: e.target.value })} />
              <input className="input-modern" type="number" placeholder="Car (g)" value={newMeal.carbs} onChange={(e) => setNewMeal({ ...newMeal, carbs: e.target.value })} />
              <input className="input-modern" type="number" placeholder="Fat (g)" value={newMeal.fat} onChange={(e) => setNewMeal({ ...newMeal, fat: e.target.value })} />
            </div>
            <input
              className="input-modern"
              type="date"
              value={newMeal.date}
              onChange={(e) => setNewMeal({ ...newMeal, date: e.target.value })}
            />
            <button className="btn-modern btn-primary">Add Entry</button>
          </form>
        </div>

        {/* Meal History */}
        <div className="bento-item large glass-card">
          <h2 style={{ marginBottom: '1.5rem' }}>Food Diary</h2>
          <div style={{ maxHeight: '400px', overflowY: 'auto', display: 'grid', gap: '0.8rem' }}>
            {nutrition.length === 0 ? (
              <p style={{ opacity: 0.5, textAlign: 'center', padding: '2rem' }}>No meals logged yet.</p>
            ) : (
              [...nutrition].reverse().map((m) => (
                <div key={m.id} className="glass-card" style={{ padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '700' }}>{m.name}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{m.calories} kcal • P: {m.protein}g C: {m.carbs}g F: {m.fat}g</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>{m.date}</div>
                    <button onClick={() => handleDeleteMeal(m.id)} style={{ padding: '4px', background: 'transparent', border: 'none', cursor: 'pointer' }}>🗑️</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meal;
