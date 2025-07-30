import { VideoModel } from "../models/video-model.js";

export const addNewVideo = async (videoObject) => {
    try {
        videoObject.videourl = process.env.VIDEO_URL_BASE + videoObject.filename;

        const doc = await VideoModel.create(videoObject);

        if (doc && doc._id) {
            return { message: "Video added successfully" };
        }
    } catch (err) {
        throw err;
    }
};

export const getAllVideos = async () => {
    try {
        const docs = await VideoModel.find().exec();
        return docs ? { videos: docs } : null;
    } catch (err) {
        console.error("Error fetching videos:", err);
        throw new Error("Error retrieving videos");
    }
};
