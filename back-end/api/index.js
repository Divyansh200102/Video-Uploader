import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';

import { indexRoute } from '../api/v1/routes/index.js';
import { Error404 } from '../utils/middlewares/404.js';
import { createConnection } from '../utils/db/connection.js';

dotenv.config();

const app = express();

// CORS configuration with your current frontend URL
const corsOptions = {
  origin: [
    'https://video-uploader-frontend-kohriytor.vercel.app', // ✅ Updated URL
    'https://video-uploader-frontend-lime.vercel.app', // Keep old one just in case
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
  optionsSuccessStatus: 200
};

// Apply CORS before other middlewares
app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.status(200).end();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ limits: { fileSize: 5 * 1024 * 1024 } }));

// Static file serving for uploads
app.use('/upload', express.static('uploads'));

// API routes
app.use('/api/v1', indexRoute);

// Root route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Video Uploader Backend API is running!' });
});

// 404 handler
app.use(Error404);

// Connect to database
createConnection()
  .then(() => {
    console.log('✅ Database connected');
  })
  .catch((err) => {
    console.log('❌ DB connection failed:', err);
  });

export default app;