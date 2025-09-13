import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // You can replace this with your actual MongoDB connection string
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-todo', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;