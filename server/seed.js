import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import slugify from 'slugify';

const envPath = fs.existsSync(path.join(process.cwd(), '.env'))
  ? path.join(process.cwd(), '.env')
  : path.join(process.cwd(), 'server', '.env');

dotenv.config({ path: envPath });

const [
  { default: connectDB },
  { default: User },
  { default: Post },
  { default: Comment },
  { default: samplePosts },
] = await Promise.all([
  import('./src/config/db.js'),
  import('./src/models/User.js'),
  import('./src/models/Post.js'),
  import('./src/models/Comment.js'),
  import('./src/data/samplePosts.js'),
]);

const runSeed = async () => {
  await connectDB(process.env.MONGO_URI);

  await Comment.deleteMany();
  await Post.deleteMany();
  await User.deleteMany();

  const passwordHash = await bcrypt.hash('Password123!', 10);
  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@example.com',
    passwordHash,
    role: 'admin',
  });

  const postsWithAuthor = samplePosts.map((post) => ({
    ...post,
    slug: slugify(post.title, { lower: true, strict: true }),
    author: admin._id,
  }));

  await Post.insertMany(postsWithAuthor);

  console.log('Seed complete. Admin: admin@example.com / Password123!');
  await mongoose.connection.close();
};

runSeed();
