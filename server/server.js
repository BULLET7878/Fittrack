const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 5005;

// db
const db_url = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fittrack';
mongoose.connect(db_url)
    .then(() => console.log('db connected'))
    .catch(err => console.error('db connection error:', err));

// middleware
app.use(cors());
app.use(express.json());

// log requests
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

// routes
app.use('/api', require('./routes/api'));

app.get('/health', (req, res) => {
    res.json({ status: 'ok', up: true });
});

app.get('/', (req, res) => {
    res.send('Fittrack API');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`running on port ${port}`);
});
