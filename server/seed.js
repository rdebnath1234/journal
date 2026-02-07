import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import slugify from 'slugify';
import connectDB from './src/config/db.js';
import User from './src/models/User.js';
import Post from './src/models/Post.js';
import Comment from './src/models/Comment.js';
import samplePosts from './src/data/samplePosts.js';

dotenv.config();

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
