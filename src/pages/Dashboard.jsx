import React, { useState, useEffect, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { calculateCalorieGoal, suggestWorkouts, checkInactivity, generateTip } from '../utils/aiEngine';

const Dashboard = () => {
    const [profile, setProfile] = useState(null);
    const [workouts, setWorkouts] = useState([]);
    const [nutrition, setNutrition] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const email = localStorage.getItem('userEmail');
            try {
                const [profRes, workRes, nutrRes] = await Promise.all([
                    fetch(`http://localhost:5005/api/profile?email=${email}`),
                    fetch(`http://localhost:5005/api/workouts?email=${email}`),
                    fetch(`http://localhost:5005/api/nutrition?email=${email}`)
                ]);

                const [profData, workData, nutrData] = await Promise.all([
                    profRes.json(),
                    workRes.json(),
                    nutrRes.json()
                ]);

                setProfile(profData.profile);
                setWorkouts(workData.workouts || []);
                setNutrition(nutrData.nutrition || []);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const aiInsights = useMemo(() => {
        if (!profile) return null;
        return {
            calorieGoal: calculateCalorieGoal(profile),
            suggestedWorkout: suggestWorkouts(workouts, profile),
            warning: checkInactivity(workouts),
            tip: generateTip(nutrition, workouts)
        };
    }, [profile, workouts, nutrition]);

    const caloriesToday = useMemo(() => {
        const today = new Date().toISOString().split('T')[0];
        return nutrition
            .filter(m => m.date === today)
            .reduce((sum, m) => sum + Number(m.calories || 0), 0);
    }, [nutrition]);

    const burnedToday = useMemo(() => {
        const today = new Date().toISOString().split('T')[0];
        return workouts
            .filter(w => w.date === today)
            .reduce((sum, w) => sum + Number(w.caloriesBurned || 0), 0);
    }, [workouts]);

    const weeklyData = useMemo(() => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const last7Days = [...Array(7)].map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
        }).reverse();

        return last7Days.map(date => {
            const dayCalories = nutrition
                .filter(m => m.date === date)
                .reduce((sum, m) => sum + Number(m.calories || 0), 0);
            return {
                name: days[new Date(date).getDay()],
                calories: dayCalories
            };
        });
    }, [nutrition]);

    if (loading) return <div className="page-content">Loading AI Insights...</div>;

    return (
        <div className="page-content animate-fade-in">
            <header style={{ marginBottom: '3rem' }}>
                <h1 className="text-gradient" style={{ fontSize: '3rem' }}>AI Dashboard</h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>Intelligent tracking. Real results.</p>
            </header>

            <div className="bento-grid">
                {/* AI Insight Bar */}
                <div className="bento-item large glass-card" style={{
                    background: 'linear-gradient(90deg, var(--primary) 0%, #fb923c 100%)',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px'
                }}>
                    <h2 style={{ margin: 0, fontSize: '1.2rem', opacity: 0.9 }}>AI ASSISTANT</h2>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                        {aiInsights?.warning || `Target Calorie Intake: ${aiInsights?.calorieGoal} kcal`}
                    </div>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem' }}>
                            💡 {aiInsights?.tip}
                        </span>
                    </div>
                </div>

                {/* Daily Progress */}
                <div className="bento-item small glass-card">
                    <h3>Net Balance</h3>
                    <div style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--primary)', margin: '10px 0' }}>
                        {caloriesToday - burnedToday}
                    </div>
                    <p style={{ opacity: 0.6 }}>In: {caloriesToday} | Out: {burnedToday}</p>
                </div>

                {/* Weekly Chart */}
                <div className="bento-item large glass-card">
                    <h2>Weekly Nutrition Trend</h2>
                    <div style={{ width: '100%', height: '300px' }}>
                        <ResponsiveContainer>
                            <AreaChart data={weeklyData}>
                                <defs>
                                    <linearGradient id="colorCal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid var(--glass-border)', borderRadius: '12px' }}
                                />
                                <Area type="monotone" dataKey="calories" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorCal)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Suggestion Card */}
                <div className="bento-item medium glass-card" style={{ textAlign: 'center' }}>
                    <h3 style={{ opacity: 0.6 }}>Next Recommendation</h3>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', margin: '20px 0' }}>
                        Try a <span style={{ color: 'var(--primary)' }}>{aiInsights?.suggestedWorkout}</span> session
                    </div>
                    <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Based on your goal to {profile?.goal}</p>
                </div>

                {/* Profile Summary */}
                <div className="bento-item medium glass-card">
                    <h3>Profile Status</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                        <div>
                            <div style={{ opacity: 0.6, fontSize: '0.7rem' }}>WEIGHT</div>
                            <div style={{ fontWeight: '700' }}>{profile?.weight} kg</div>
                        </div>
                        <div>
                            <div style={{ opacity: 0.6, fontSize: '0.7rem' }}>HEIGHT</div>
                            <div style={{ fontWeight: '700' }}>{profile?.height} cm</div>
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                            <div style={{ opacity: 0.6, fontSize: '0.7rem' }}>FITNESS GOAL</div>
                            <div style={{ fontWeight: '700', color: 'var(--primary)' }}>{profile?.goal}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
