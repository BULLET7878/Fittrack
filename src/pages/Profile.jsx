import React, { useState, useEffect } from 'react';

const Profile = () => {
    const [profile, setProfile] = useState({
        age: '',
        height: '',
        weight: '',
        gender: 'Male',
        goal: 'Maintain',
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const email = localStorage.getItem('userEmail');
                const response = await fetch(`http://localhost:5005/api/profile?email=${email}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.profile) {
                        setProfile(data.profile);
                    }
                }
            } catch (err) {
                console.error('Error fetching profile:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const email = localStorage.getItem('userEmail');
            const response = await fetch('http://localhost:5005/api/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, profile }),
            });
            if (response.ok) {
                setMessage('Profile updated successfully! ✨');
            } else {
                setMessage('Failed to update profile.');
            }
        } catch (err) {
            setMessage('Error updating profile.');
        }
    };

    if (loading) return <div>Loading Profile...</div>;

    return (
        <div className="page-content animate-fade-in">
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 className="text-gradient" style={{ fontSize: '3rem' }}>Your Profile</h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>Tailor your AI experience.</p>
            </header>

            <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontWeight: '600', opacity: 0.8 }}>Age</label>
                            <input
                                className="input-modern"
                                type="number"
                                value={profile.age}
                                onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                                placeholder="25"
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontWeight: '600', opacity: 0.8 }}>Gender</label>
                            <select
                                className="input-modern"
                                value={profile.gender}
                                onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontWeight: '600', opacity: 0.8 }}>Height (cm)</label>
                            <input
                                className="input-modern"
                                type="number"
                                value={profile.height}
                                onChange={(e) => setProfile({ ...profile, height: e.target.value })}
                                placeholder="175"
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontWeight: '600', opacity: 0.8 }}>Weight (kg)</label>
                            <input
                                className="input-modern"
                                type="number"
                                value={profile.weight}
                                onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
                                placeholder="70"
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontWeight: '600', opacity: 0.8 }}>Fitness Goal</label>
                        <select
                            className="input-modern"
                            value={profile.goal}
                            onChange={(e) => setProfile({ ...profile, goal: e.target.value })}
                        >
                            <option value="Lose Weight">Lose Weight</option>
                            <option value="Maintain">Maintain</option>
                            <option value="Gain Muscle">Gain Muscle</option>
                            <option value="Gain Weight">Gain Weight</option>
                        </select>
                    </div>

                    {message && (
                        <div style={{
                            padding: '12px',
                            borderRadius: '12px',
                            background: message.includes('success') ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                            color: message.includes('success') ? '#22c55e' : '#ef4444',
                            textAlign: 'center',
                            fontWeight: '600'
                        }}>
                            {message}
                        </div>
                    )}

                    <button className="btn-modern btn-primary" style={{ padding: '16px', marginTop: '1rem' }}>
                        Save Profile & Update AI
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
