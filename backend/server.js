import dotenv from 'dotenv';
dotenv.config(); // MUST run before importing anything that reads process.env at module load time

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import addressRoutes from './routes/addressRoutes.js';
import planRoutes from './routes/planRoutes.js';
import termRoutes from './routes/termRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();

// MIDDLEWARE: Ensure CORS and JSON parsing are before routes
app.use(cors());
app.use(express.json());

// DATABASE CONNECTION
// No hardcoded fallback anymore — fail loudly if MONGO_URI isn't set,
// rather than silently connecting to a credential that lives in source.
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('MONGO_URI is not set in your .env file');
    process.exit(1);
}

mongoose.connect(MONGO_URI)
    .then(() => console.log('🚀 MongoDB Connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

// ROUTES: Directs traffic to your route files
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/terms', termRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/orders', orderRoutes);

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});