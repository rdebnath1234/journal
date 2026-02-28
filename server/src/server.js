import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);
const serverRoot = path.resolve(currentDir, '..');
const envPath = fs.existsSync(path.join(serverRoot, '.env'))
  ? path.join(serverRoot, '.env')
  : path.join(process.cwd(), '.env');

dotenv.config({ path: envPath });

const [{ default: app }, { default: connectDB }, { configureCloudinary }] = await Promise.all([
  import('./app.js'),
  import('./config/db.js'),
  import('./config/cloudinary.js'),
]);

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
