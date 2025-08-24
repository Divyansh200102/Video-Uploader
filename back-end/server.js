import express from 'express';
import chalk from 'chalk';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import cors from 'cors';

import indexRoute from './api/v1/routes/index.js'; // Changed to default import
import { Error404 } from './utils/middlewares/404.js';
import { createConnection } from './utils/db/connection.js';

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

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Video Uploader API - Local Development',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/v1', indexRoute);
app.use(Error404);

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: error.message
  });
});

// For Vercel, we need to export the app
export default app;

// Only start the server if not in Vercel environment
if (process.env.NODE_ENV !== 'production') {
  createConnection()
    .then(() => {
      console.log(chalk.blueBright('✅ Database connected'));
      const PORT = 7777;
      app.listen(PORT, () => {
        console.log(chalk.greenBright.bold(`🚀 Server running on port ${PORT}`));
      });
    })
    .catch((err) => {
      console.log(chalk.redBright.bold('❌ DB connection failed:'), err);
    });
} else {
  // Connect to database for Vercel
  createConnection()
    .then(() => {
      console.log('Database connected');
    })
    .catch((err) => {
      console.log('DB connection failed:', err);
    });
}