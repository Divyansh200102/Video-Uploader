// back-end/api/v1/routes/index.js
import express from 'express';
import { auth } from '../../../utils/middlewares/auth.js';

// Safe imports for routers
import userRoutes from './user-routes.js';
import videoRoutes from './video-routes.js';

export const indexRoute = express.Router();

// Sanity checks to catch undefined imports
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

// Optional: catch-all for undefined routes under /api/v1
indexRoute.all('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});
