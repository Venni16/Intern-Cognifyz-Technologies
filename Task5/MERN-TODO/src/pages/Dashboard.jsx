import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { useToast } from '../contexts/ToastContext';
import todoService from '../services/todoService';

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoService.getTodos();
      setTodos(data);
    } catch (error) {
      setError('Failed to fetch todos');
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (todoData) => {
    try {
      const newTodo = await todoService.createTodo(todoData);
      setTodos([newTodo, ...todos]);
    } catch (error) {
      setError('Failed to create todo');
      console.error('Error creating todo:', error);
    }
  };

  const handleUpdateTodo = async (id, todoData) => {
    try {
      const updatedTodo = await todoService.updateTodo(id, todoData);
      setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
    } catch (error) {
      setError('Failed to update todo');
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = (id) => {
    const todo = todos.find((t) => t._id === id);
    setTodoToDelete(todo);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!todoToDelete) return;

    try {
      await todoService.deleteTodo(todoToDelete._id);
      setTodos(todos.filter((todo) => todo._id !== todoToDelete._id));
      addToast('Todo deleted successfully', 'success');
      setIsDeleteModalOpen(false);
      setTodoToDelete(null);
    } catch (error) {
      addToast('Failed to delete todo', 'error');
      console.error('Error deleting todo:', error);
      setIsDeleteModalOpen(false);
      setTodoToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setTodoToDelete(null);
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'completed':
        return todo.completed;
      case 'pending':
        return !todo.completed;
      case 'high':
        return todo.priority === 'high';
      case 'medium':
        return todo.priority === 'medium';
      case 'low':
        return todo.priority === 'low';
      default:
        return true;
    }
  });

  const todoStats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    pending: todos.filter(todo => !todo.completed).length,
    high: todos.filter(todo => todo.priority === 'high').length,
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tasks</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-blue-600">{todoStats.total}</div>
                <div className="text-sm text-gray-600">Total Tasks</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-green-600">{todoStats.completed}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-yellow-600">{todoStats.pending}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-red-600">{todoStats.high}</div>
                <div className="text-sm text-gray-600">High Priority</div>
              </div>
            </div>
          </div>

          <TodoForm onSubmit={handleCreateTodo} />

          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full text-sm transition duration-200 ${
                filter === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1 rounded-full text-sm transition duration-200 ${
                filter === 'pending'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 rounded-full text-sm transition duration-200 ${
                filter === 'completed'
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter('high')}
              className={`px-3 py-1 rounded-full text-sm transition duration-200 ${
                filter === 'high'
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              High Priority
            </button>
            <button
              onClick={() => setFilter('medium')}
              className={`px-3 py-1 rounded-full text-sm transition duration-200 ${
                filter === 'medium'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Medium Priority
            </button>
            <button
              onClick={() => setFilter('low')}
              className={`px-3 py-1 rounded-full text-sm transition duration-200 ${
                filter === 'low'
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              Low Priority
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading todos...</p>
            </div>
          ) : filteredTodos.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg shadow">
              <p className="text-gray-500">
                {filter === 'all' ? 'No todos yet. Create your first one above!' : `No ${filter} todos found.`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onUpdate={handleUpdateTodo}
                  onDelete={handleDeleteTodo}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Todo"
        message={`Are you sure you want to delete "${todoToDelete?.title}"? This action cannot be undone.`}
      />
    </>
  );
};

export default Dashboard;
