const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET = process.env.JWT_SECRET || 'fittrack_secret_2024';

// auth
router.post('/register', async (req, res) => {
    const { email, password, username } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: 'Missing fields' });
    }

    try {
        const check = await User.findOne({ email });
        if (check) return res.status(400).json({ message: 'User exists' });

        const hash = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            username: username || email.split('@')[0],
            password: hash,
            profile: { age: '', height: '', weight: '', gender: 'Male', goal: 'Maintain' },
            workouts: [],
            nutrition: []
        });

        await user.save();
        const token = jwt.sign({ email }, SECRET, { expiresIn: '24h' });
        res.status(201).json({ token, email });
    } catch (e) {
        console.error('reg error', e);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'No user found' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: 'Wrong password' });

        const token = jwt.sign({ email: user.email }, SECRET, { expiresIn: '24h' });
        res.json({ token, email: user.email });
    } catch (e) {
        console.error('login error', e);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/sync', async (req, res) => {
    const { email } = req.query;
    try {
        if (!email) return res.json({ exercises: [], items: [] });
        const user = await User.findOne({ email });
        res.json({
            exercises: user ? user.exercises : [],
            items: user ? user.items : []
        });
    } catch (e) {
        res.status(500).json({ message: 'Sync failed' });
    }
});

router.get('/profile', async (req, res) => {
    const { email } = req.query;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Not found' });
        res.json({ profile: user.profile });
    } catch (e) {
        res.status(500).json({ message: 'Fetch error' });
    }
});

router.post('/profile', async (req, res) => {
    const { email, profile } = req.body;
    try {
        const user = await User.findOneAndUpdate({ email }, { profile }, { new: true });
        if (!user) return res.status(404).json({ message: 'Not found' });
        res.json({ message: 'Updated' });
    } catch (e) {
        res.status(500).json({ message: 'Update failed' });
    }
});

// workouts & activity
router.get('/workouts', async (req, res) => {
    const { email } = req.query;
    try {
        const user = await User.findOne({ email });
        res.json({ workouts: user ? user.workouts : [] });
    } catch (e) {
        res.status(500).json({ message: 'Fetch error' });
    }
});

router.post('/workouts', async (req, res) => {
    const { email, workout } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Not found' });

        user.workouts.push({ ...workout, id: Date.now() });
        await user.save();
        res.json({ message: 'Logged' });
    } catch (e) {
        res.status(500).json({ message: 'Log error' });
    }
});

router.delete('/workouts', async (req, res) => {
    const { email, id } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Not found' });

        user.workouts = user.workouts.filter(w => w.id !== id);
        await user.save();
        res.json({ message: 'Deleted' });
    } catch (e) {
        res.status(500).json({ message: 'Delete error' });
    }
});

// meal tracking
router.get('/nutrition', async (req, res) => {
    const { email } = req.query;
    try {
        const user = await User.findOne({ email });
        res.json({ nutrition: user ? user.nutrition : [] });
    } catch (e) {
        res.status(500).json({ message: 'Fetch error' });
    }
});

router.post('/nutrition', async (req, res) => {
    const { email, meal } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Not found' });

        user.nutrition.push({ ...meal, id: Date.now() });
        await user.save();
        res.json({ message: 'Logged' });
    } catch (e) {
        res.status(500).json({ message: 'Log error' });
    }
});

module.exports = router;
