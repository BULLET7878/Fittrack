const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    profile: {
        age: { type: String, default: '' },
        height: { type: String, default: '' },
        weight: { type: String, default: '' },
        gender: { type: String, default: 'Male' },
        goal: { type: String, default: 'Maintain' }
    },
    workouts: [{
        id: { type: Number, default: Date.now },
        type: String,
        duration: String,
        caloriesBurned: String,
        date: String
    }],
    nutrition: [{
        id: { type: Number, default: Date.now },
        name: String,
        calories: String,
        protein: String,
        carbs: String,
        fat: String,
        date: String
    }],
    exercises: { type: Array, default: [] },
    items: { type: Array, default: [] }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
