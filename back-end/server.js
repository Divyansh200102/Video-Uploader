import express from 'express';
import chalk from 'chalk';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import cors from 'cors'; // ✅ Changed to import

import { indexRoute } from './api/v1/routes/index.js';
import { Error404 } from './utils/middlewares/404.js';
import { createConnection } from './utils/db/connection.js';

dotenv.config();

const app = express();

const corsOptions = {
  origin: [
    'https://video-uploader-frontend-lime.vercel.app', // ✅ Fixed URL
    'http://localhost:3000',
    'http://localhost:5173' // Add this for Vite if needed
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Add this middleware to handle preflight requests
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(fileUpload({ limits: { fileSize: 5 * 1024 * 1024 } }));
app.use('/upload', express.static('uploads'));

app.use('/api/v1', indexRoute);
app.use(Error404);

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