import express from 'express';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import cors from 'cors';

import indexRoute from './v1/routes/index.js'; // Note: default import
import { Error404 } from '../utils/middlewares/404.js';
import { createConnection } from '../utils/db/connection.js';

dotenv.config();

const app = express();

const corsOptions = {
  origin: [
    'https://video-uploader-frontend-kohriytor.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(fileUpload({ limits: { fileSize: 5 * 1024 * 1024 } }));
app.use('/upload', express.static('uploads'));

// Add a root route for health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Video Uploader API is running',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/v1', indexRoute);

// 404 handler
app.use(Error404);

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: error.message
  });
});

// Connect to database
createConnection()
  .then(() => {
    console.log('✅ Database connected');
  })
  .catch((err) => {
    console.error('❌ DB connection failed:', err);
  });

export default app;