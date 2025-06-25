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

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB Connected');
        app.listen(5000, () => {
            console.log('🚀 Server running on port 5000');
        });
    })
    .catch((err) => console.error('MongoDB connection error:', err));
