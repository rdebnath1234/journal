import mongoose from 'mongoose';

const connectDB = async (mongoUri) => {
  try {
    if (typeof mongoUri !== 'string' || !mongoUri.trim()) {
      throw new Error('MONGO_URI is not set. Load /server/.env or define MONGO_URI before starting the server.');
    }

    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
