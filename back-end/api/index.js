import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'https://video-uploader-frontend-kohriytor.vercel.app',
    'https://video-uploader-frontend-lime.vercel.app',
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

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.status(200).end();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  try {
    res.json({ 
      message: 'Video Uploader Backend API is running!',
      timestamp: new Date().toISOString(),
      routes: [
        'POST /api/v1/user/register',
        'POST /api/v1/user/login',
        'GET /api/v1/user/profile'
      ]
    });
  } catch (error) {
    console.error('Root route error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Simple user routes - inline for now to avoid import issues
app.post('/api/v1/user/register', async (req, res) => {
  try {
    res.json({ message: 'Register endpoint working!', body: req.body });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/v1/user/login', async (req, res) => {
  try {
    res.json({ message: 'Login endpoint working!', body: req.body });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.get('/api/v1/user/profile', async (req, res) => {
  try {
    res.json({ message: 'Profile endpoint working!' });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Profile fetch failed' });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;