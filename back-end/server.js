import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';

import { indexRoute } from './api/v1/routes/index.js';
import { Error404 } from './utils/middlewares/404.js';
import { createConnection } from './utils/db/connection.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: "https://video-uploader-frontend-lime.vercel.app", // allow your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(fileUpload({ limits: { fileSize: 5 * 1024 * 1024 } }));
app.use('/upload', express.static('uploads'));

app.use('/api/v1', indexRoute);
app.use(Error404);

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
