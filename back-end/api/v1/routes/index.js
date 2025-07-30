import express from 'express';
import userRoutes from './user-routes.js';
import videoRoutes from './video-routes.js'; // ✅ add this
import { auth } from '../../../utils/middlewares/auth.js';

export const indexRoute = express.Router();

indexRoute.use('/user', userRoutes);
indexRoute.use('/videos',auth, videoRoutes);
