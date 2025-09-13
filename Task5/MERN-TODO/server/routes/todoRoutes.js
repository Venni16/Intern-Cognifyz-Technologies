import express from 'express';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/todoController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All todo routes are protected

router.route('/').get(getTodos).post(createTodo);
router.route('/:id').put(updateTodo).delete(deleteTodo);

export default router;