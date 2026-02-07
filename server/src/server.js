import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';
import { configureCloudinary } from './config/cloudinary.js';
import fs from 'fs';
import path from 'path';

dotenv.config();

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  await connectDB(process.env.MONGO_URI);
  configureCloudinary();
  const uploadsPath = path.join(process.cwd(), 'uploads');
  fs.mkdirSync(uploadsPath, { recursive: true });
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
