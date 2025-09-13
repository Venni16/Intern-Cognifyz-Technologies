import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Error handling middleware
app.use(errorHandler);

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'MERN Todo API Server is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});