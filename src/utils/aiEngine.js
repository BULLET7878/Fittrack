/**
 * AI Logic for Fitness Tracker
 * Rule-based approach for personalized recommendations.
 */

// 1. Calorie Recommender (Mifflin-St Jeor Equation)
export const calculateCalorieGoal = (profile) => {
    const { age, height, weight, gender, goal } = profile;
    if (!age || !height || !weight) return 2000; // Default

    let bmr;
    if (gender === 'Male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Assuming moderate activity multiplier (1.55)
    let maintenance = bmr * 1.55;

    if (goal === 'Lose Weight') return Math.round(maintenance - 500);
    if (goal === 'Gain Muscle') return Math.round(maintenance + 400);
    if (goal === 'Gain Weight') return Math.round(maintenance + 500);
    return Math.round(maintenance);
};

// 2. Workout Suggester - NOW WITH GOAL-SPECIFIC DIVERSITY
export const suggestWorkouts = (workouts, profile) => {
    const goal = profile?.goal || 'Maintain';
    const lastWorkouts = workouts.slice(-5).map(w => w.type);

    // Expanded Exercise Database
    const library = {
        gym: ['Bench Press', 'Squats', 'Deadlift', 'Leg Press', 'Shoulder Press', 'Lat Pulldowns'],
        home: ['Push Ups', 'Lunges', 'Bodyweight Squats', 'Plank', 'Burpees'],
        yoga: ['Sun Salutation', 'Warrior Pose', 'Tree Pose', 'Downward Dog', 'Cobra Stretch'],
        recovery: ['Light Walking', 'Static Stretching', 'Foam Rolling']
    };

    if (goal === 'Gain Muscle' || goal === 'Gain Weight') {
        // Recommend a mix of heavy lifting and mobility for balanced growth
        const options = [...library.gym, ...library.yoga, ...library.home];
        const untried = options.filter(ex => !lastWorkouts.includes(ex));
        return untried.length > 0 ? untried[Math.floor(Math.random() * untried.length)] : 'High-Intensity Strength Session';
    }

    if (goal === 'Lose Weight') {
        const options = [...library.home, ...library.gym, 'Cardio HIIT'];
        const untried = options.filter(ex => !lastWorkouts.includes(ex));
        return untried.length > 0 ? untried[Math.floor(Math.random() * untried.length)] : 'Morning Fasted Cardio';
    }

    return library.yoga[Math.floor(Math.random() * library.yoga.length)]; // Default to mobility
};

// 3. Activity Warnings
export const checkInactivity = (workouts) => {
    if (workouts.length === 0) return "You haven't logged any workouts yet. Let's start today! 🚀";

    const lastWorkoutDate = new Date(workouts[workouts.length - 1].date);
    const today = new Date();
    const diffDays = Math.ceil((today - lastWorkoutDate) / (1000 * 60 * 60 * 24));

    if (diffDays > 3) {
        return `It's been ${diffDays} days since your last session. Discipline beats motivation! 💪`;
    }
    return null;
};

// 4. Fitness Tips
export const generateTip = (nutrition, workouts) => {
    const tips = [
        "Drink at least 3L of water today for better muscle recovery.",
        "Prioritize protein in every meal to support muscle protein synthesis.",
        "Did you know? Getting 8 hours of sleep is as important as your workout.",
        "Try to add more fiber to your meals to stay full longer.",
        "Consistency is the key. Even a 15-minute walk counts!",
        "Yoga improves flexibility which helps in heavy lifting form.",
        "Home exercises are great for building foundation strength."
    ];
    return tips[Math.floor(Math.random() * tips.length)];
};
