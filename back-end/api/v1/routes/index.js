import express from 'express';
import { auth } from '../../../utils/middlewares/auth.js';
import userRoutes from './user-routes.js';
import videoRoutes from './video-routes.js';

const indexRoute = express.Router();

console.log('userRoutes is:', userRoutes);
console.log('videoRoutes is:', videoRoutes);

if (!userRoutes) {
  throw new Error('userRoutes import failed! Make sure user-routes.js has `export default router;`');
}
if (!videoRoutes) {
  throw new Error('videoRoutes import failed! Make sure video-routes.js has `export default router;`');
}

// User routes
indexRoute.use('/user', userRoutes);

// Video routes with auth
indexRoute.use('/videos', auth, videoRoutes);

// Health check route
indexRoute.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API v1 is running' });
});

// Optional: catch-all for undefined routes under /api/v1
indexRoute.all('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});
