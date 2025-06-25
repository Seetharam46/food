// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const PORT = 5000;

// Load env vars
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 👇 Import your auth routes
const authRoutes = require('./routes/authRoutes');

// 👇 Use the routes
app.use('/api/auth', authRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB Connected');
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((err) => console.error('MongoDB connection error:', err));
