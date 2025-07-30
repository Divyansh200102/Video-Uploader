import express from 'express';
import { uploadVideo, listVideos } from '../../../controllers/video-controller.js';

const router = express.Router();

router.post('/upload', uploadVideo);
router.get('/all', listVideos);

export default router;
