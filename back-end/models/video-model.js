import mongoose, { Schema, SchemaTypes } from 'mongoose';

const videoSchema = new Schema({
    title: { type: SchemaTypes.String, required: true, unique: true },
    description: { type: SchemaTypes.String, minLength: 8, required: true },
    videourl: { type: SchemaTypes.String, required: true },
    thumbnail: { type: SchemaTypes.String },
    status: { type: SchemaTypes.String, default: 'active' }
});

export const VideoModel = mongoose.model('videos', videoSchema);
