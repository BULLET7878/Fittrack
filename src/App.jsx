import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './pages/Footer';

// Pages
import Home from './pages/Home';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import BMI from './pages/BMI';
import Checklist from './pages/Checklist';
import Exercises from './pages/Exercises';
import Meal from './pages/Meal';
import Profile from './pages/Profile';
import Login from './pages/Login';

const API = 'http://127.0.0.1:5005/api';

function App() {
  const [exercises, setExercises] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    const boot = async () => {
      const auth = localStorage.getItem('isLoggedIn');
      const email = localStorage.getItem('userEmail');

      if (auth === 'true' && email) {
        setIsLoggedIn(true);
        try {
          const res = await fetch(`${API}/sync?email=${email}`);
          if (res.ok) {
            const data = await res.json();
            setExercises(data.exercises || []);
            setItems(data.items || []);
          }
        } catch (e) {
          console.error('failed to sync initial data', e);
        }
      }
      setLoading(false);
    };
    boot();
  }, []);

  // auto-sync changes to db
  useEffect(() => {
    if (isLoggedIn && !loading) {
      fetch(`${API}/exercises`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exercises),
      }).catch(err => console.debug('exercises sync failed', err));
    }
  }, [exercises, isLoggedIn, loading]);

  useEffect(() => {
    if (isLoggedIn && !loading) {
      fetch(`${API}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items),
      }).catch(err => console.debug('items sync failed', err));
    }
  }, [items, isLoggedIn, loading]);

  useEffect(() => {
    document.body.classList.add('dark');
  }, []);

  const syncAuth = (state) => {
    setIsLoggedIn(state);
    if (!state) {
      localStorage.clear();
    } else {
      localStorage.setItem('isLoggedIn', 'true');
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>STAY FOCUSED...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login setIsLoggedIn={syncAuth} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="app-root">
        <Sidebar
          isOpen={sidebar}
          toggleSidebar={() => setSidebar(!sidebar)}
          handleLogout={() => syncAuth(false)}
        />

        <div className={`main-layout ${sidebar ? 'sidebar-open' : ''}`}>
          <Navbar
            setIsLoggedIn={syncAuth}
            toggleSidebar={() => setSidebar(!sidebar)}
          />

          <div className="page-content">
            <Routes>
              <Route path="/" element={<Home exercises={exercises} items={items} />} />
              <Route path="/dashboard" element={<Dashboard exercises={exercises} items={items} />} />
              <Route path="/bmi" element={<BMI />} />
              <Route path="/checklist" element={<Checklist items={items} setItems={setItems} />} />
              <Route path="/exercises" element={<Exercises exercises={exercises} setExercises={setExercises} />} />
              <Route path="/meal" element={<Meal />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
