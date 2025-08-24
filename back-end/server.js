import express from 'express';
import chalk from 'chalk';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';

import { indexRoute } from './api/v1/routes/index.js';
import { Error404 } from './utils/middlewares/404.js';
import { createConnection } from './utils/db/connection.js';
const cors = require('cors');


dotenv.config();

const app = express();

const corsOptions = {
  origin: [
    'https://video-uploader-frontend-qf3tpepiv.vercel.app',
    'http://localhost:3000', // for local development
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


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
