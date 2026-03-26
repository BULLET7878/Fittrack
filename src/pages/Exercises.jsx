import React, { useState, useEffect } from 'react';

const Exercises = () => {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({
    type: '',
    duration: '',
    caloriesBurned: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(true);

  const exerciseLibrary = [
    { name: 'Bench Press', category: 'Chest', icon: '💪' },
    { name: 'Squats', category: 'Legs', icon: '🦵' },
    { name: 'Deadlift', category: 'Back', icon: '🏋️' },
    { name: 'Bicep Curls', category: 'Arms', icon: '🥖' },
    { name: 'Plank', category: 'Core', icon: '🧘' },
    { name: 'Push Ups', category: 'Chest', icon: '🙇' },
  ];

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const email = localStorage.getItem('userEmail');
      const response = await fetch(`http://localhost:5005/api/workouts?email=${email}`);
      const data = await response.json();
      setWorkouts(data.workouts || []);
    } catch (err) {
      console.error('Error fetching workouts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogWorkout = async (e) => {
    e.preventDefault();
    if (!newWorkout.type || !newWorkout.duration) return;

    try {
      const email = localStorage.getItem('userEmail');
      const response = await fetch('http://localhost:5005/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, workout: newWorkout }),
      });
      if (response.ok) {
        fetchWorkouts();
        setNewWorkout({
          type: '',
          duration: '',
          caloriesBurned: '',
          date: new Date().toISOString().split('T')[0],
        });
      }
    } catch (err) {
      console.error('Error logging workout:', err);
    }
  };

  const handleDeleteWorkout = async (id) => {
    try {
      const email = localStorage.getItem('userEmail');
      await fetch('http://localhost:5005/api/workouts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, id }),
      });
      fetchWorkouts();
    } catch (err) {
      console.error('Error deleting workout:', err);
    }
  };

  return (
    <div className="page-content animate-fade-in">
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem' }}>Workouts</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>Log your sweat. Witness your growth.</p>
      </header>

      <div className="bento-grid">
        {/* Log Workout Form */}
        <div className="bento-item medium glass-card">
          <h2 style={{ marginBottom: '1.5rem' }}>Log Session</h2>
          <form onSubmit={handleLogWorkout} style={{ display: 'grid', gap: '1rem' }}>
            <select
              className="input-modern"
              value={newWorkout.type}
              onChange={(e) => setNewWorkout({ ...newWorkout, type: e.target.value })}
            >
              <option value="">Select Exercise</option>
              {exerciseLibrary.map((ex) => (
                <option key={ex.name} value={ex.name}>{ex.icon} {ex.name}</option>
              ))}
            </select>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input
                className="input-modern"
                type="number"
                placeholder="Duration (min)"
                value={newWorkout.duration}
                onChange={(e) => setNewWorkout({ ...newWorkout, duration: e.target.value })}
              />
              <input
                className="input-modern"
                type="number"
                placeholder="Calories"
                value={newWorkout.caloriesBurned}
                onChange={(e) => setNewWorkout({ ...newWorkout, caloriesBurned: e.target.value })}
              />
            </div>
            <input
              className="input-modern"
              type="date"
              value={newWorkout.date}
              onChange={(e) => setNewWorkout({ ...newWorkout, date: e.target.value })}
            />
            <button className="btn-modern btn-primary" style={{ padding: '14px' }}>
              Log Activity
            </button>
          </form>
        </div>

        {/* History List */}
        <div className="bento-item medium glass-card">
          <h2 style={{ marginBottom: '1.5rem' }}>History</h2>
          <div style={{ maxHeight: '400px', overflowY: 'auto', display: 'grid', gap: '1rem' }}>
            {workouts.length === 0 ? (
              <p style={{ opacity: 0.5, textAlign: 'center', padding: '2rem' }}>No workouts logged yet.</p>
            ) : (
              [...workouts].reverse().map((w) => (
                <div key={w.id} className="glass-card" style={{ padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '700' }}>{w.type}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{w.duration} min • {w.caloriesBurned} kcal • {w.date}</div>
                  </div>
                  <button onClick={() => handleDeleteWorkout(w.id)} style={{ padding: '8px', background: 'transparent', border: 'none', cursor: 'pointer' }}>🗑️</button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exercises;
