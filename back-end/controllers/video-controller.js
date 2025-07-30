import fs from 'fs';
import path from 'path';

const UPLOAD_DIR = path.resolve('uploads');

export const uploadVideo = async (req, res) => {
    try {
        const videoFile = req.files?.video;

        if (!videoFile) {
            return res.status(400).json({ error: 'No video file uploaded' });
        }

        const fileName = videoFile.name;
        const savePath = path.join(UPLOAD_DIR, fileName);

        fs.writeFileSync(savePath, videoFile.data);
        res.status(200).json({ message: 'Video uploaded successfully', fileName });
    } catch (err) {
        console.error('Video Upload Error:', err);
        res.status(500).json({ message: 'Failed to upload video' });
    }
};

export const listVideos = (req, res) => {
    try {
        const files = fs.readdirSync(UPLOAD_DIR);
        res.status(200).json({ videos: files });
    } catch (err) {
        console.error('List Videos Error:', err);
        res.status(500).json({ message: 'Failed to list videos' });
    }
};
