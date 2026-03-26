import React, { useState } from 'react';

const Checklist = ({ items, setItems }) => {
  const [newItem, setNewItem] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const [timers, setTimers] = useState({});
  const [timerInputs, setTimerInputs] = useState({});
  const [intervals, setIntervals] = useState({});

  const addItem = () => {
    if (newItem.trim() !== '') {
      const newItems = [...items, { text: newItem, done: false }];
      setItems(newItems);
      setNewItem('');
    }
  };

  const deleteItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
    stopTimer(index);
    const updatedTimers = { ...timers };
    delete updatedTimers[index];
    setTimers(updatedTimers);
  };

  const toggleItem = (index) => {
    const updated = [...items];
    updated[index].done = !updated[index].done;
    setItems(updated);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditText(items[index].text);
  };

  const saveEdit = (index) => {
    if (editText.trim() !== '') {
      const updated = [...items];
      updated[index].text = editText;
      setItems(updated);
      setEditingIndex(null);
      setEditText('');
    }
  };

  const startTimer = (index) => {
    const minutes = parseInt(timerInputs[index]);
    if (!minutes || isNaN(minutes) || minutes <= 0) return;
    const seconds = minutes * 60;
    setTimers(prev => ({ ...prev, [index]: seconds }));

    const intervalId = setInterval(() => {
      setTimers(prev => {
        const updated = { ...prev };
        if (updated[index] > 0) {
          updated[index] -= 1;
          if (updated[index] === 0) {
            clearInterval(intervalId);
            alert(`Time's up for: ${items[index]?.text}`);
          }
        }
        return updated;
      });
    }, 1000);

    setIntervals(prev => ({ ...prev, [index]: intervalId }));
    setTimerInputs(prev => ({ ...prev, [index]: '' }));
  };

  const stopTimer = (index) => {
    if (intervals[index]) {
      clearInterval(intervals[index]);
      const updatedIntervals = { ...intervals };
      delete updatedIntervals[index];
      setIntervals(updatedIntervals);
    }
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="page-content animate-fade-in">
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem' }}>Action Checklist</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>{today}'s roadmap to excellence.</p>
      </header>

      <div className="glass-card" style={{ maxWidth: '700px', margin: '0 auto' }}>
        {/* Input Form */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '2.5rem' }}>
          <input
            className="input-modern"
            type="text"
            value={newItem}
            placeholder="What's the next objective?"
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
          />
          <button onClick={addItem} className="btn-modern btn-primary" style={{ padding: '0 32px' }}>Add</button>
        </div>

        {/* Task List */}
        <div style={{ display: 'grid', gap: '1rem' }}>
          {items.length === 0 ? (
            <p style={{ textAlign: 'center', opacity: 0.5, padding: '2rem' }}>No active objectives. Stay sharp.</p>
          ) : (
            items.map((item, idx) => (
              <div key={idx} className="glass-card" style={{
                padding: '1.25rem',
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div
                    onClick={() => toggleItem(idx)}
                    style={{
                      width: '24px',
                      height: '24px',
                      minWidth: '24px',
                      borderRadius: '8px',
                      border: `2px solid ${item.done ? 'var(--primary)' : 'rgba(128,128,128,0.3)'}`,
                      backgroundColor: item.done ? 'var(--primary)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'var(--transition)'
                    }}
                  >
                    {item.done && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={{ width: '14px', height: '14px' }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>

                  {editingIndex === idx ? (
                    <div style={{ display: 'flex', gap: '8px', flexGrow: 1 }}>
                      <input
                        className="input-modern"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        style={{ padding: '4px 12px' }}
                      />
                      <button onClick={() => saveEdit(idx)} className="btn-modern btn-primary" style={{ padding: '4px 12px', fontSize: '0.8rem' }}>Save</button>
                    </div>
                  ) : (
                    <span
                      style={{
                        flexGrow: 1,
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        textDecoration: item.done ? 'line-through' : 'none',
                        opacity: item.done ? 0.4 : 1,
                        cursor: 'pointer'
                      }}
                      onClick={() => toggleItem(idx)}
                    >
                      {item.text}
                    </span>
                  )}

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => startEditing(idx)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', opacity: 0.6 }}>✏️</button>
                    <button onClick={() => deleteItem(idx)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', opacity: 0.6 }}>🗑️</button>
                  </div>
                </div>

                {/* Timer Control */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--glass-border)',
                  marginTop: '0.25rem'
                }}>
                  {timers[idx] > 0 ? (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      background: 'rgba(34, 197, 94, 0.1)',
                      padding: '4px 12px',
                      borderRadius: '8px',
                      color: 'var(--primary)',
                      fontWeight: '800'
                    }}>
                      <span style={{ fontSize: '0.9rem' }}>⏱️ {formatTime(timers[idx])}</span>
                      <button onClick={() => stopTimer(idx)} style={{ background: 'transparent', border: 'none', color: '#ef4444', fontWeight: '800', cursor: 'pointer' }}>STOP</button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="number"
                        placeholder="Min"
                        className="input-modern"
                        value={timerInputs[idx] || ''}
                        onChange={(e) => setTimerInputs({ ...timerInputs, [idx]: e.target.value })}
                        style={{ width: '70px', padding: '4px 10px', fontSize: '0.85rem' }}
                      />
                      <button onClick={() => startTimer(idx)} className="btn-modern" style={{ fontSize: '0.75rem', padding: '6px 12px' }}>Start Timer</button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Checklist;
