import mongoose from 'mongoose';
export const createConnection = ()=>{
    return mongoose.connect(process.env.MONGO_URL,{
        maxPoolSize: 5
    });
}