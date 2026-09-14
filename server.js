// 1. Load env variables FIRST — before anything else reads process.env
require('dotenv').config();

// 2. This package makes ALL async errors auto-caught (no try/catch needed in routes)
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Import database connection function
const connectDB = require('./src/config/db.js');

// Route imports
const authRoutes = require('./src/routes/authRoutes');

// 3. Create the express app
const app = express();

// --- MIDDLEWARE (runs on every request, in order) ---

// Adds security headers to every response automatically
app.use(helmet());

// Allows cross-origin requests (your frontend calling this API)
app.use(cors());

// Logs every request: method, path, status, time → e.g. GET /api/jobs 200 5ms
app.use(morgan('dev'));

// Parses incoming JSON body — without this, req.body is undefined
app.use(express.json());

// --- ROUTES (we'll add these in later stages) ---
app.get('/', (req, res) => {
    res.json({ message: 'Job Board API is running ✓' });
});

app.use('/api/auth', authRoutes);

// --- ERROR HANDLER (always last) ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Something went wrong',
    });
});

// --- CONNECT TO DATABASE THEN START SERVER ---
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    });
});