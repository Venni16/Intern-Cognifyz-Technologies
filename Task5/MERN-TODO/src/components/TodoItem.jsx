import { useState } from 'react';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleComplete = () => {
    onUpdate(todo._id, { ...todo, completed: !todo.completed });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedData) => {
    onUpdate(todo._id, { ...todo, ...updatedData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isEditing) {
    return <TodoEditForm todo={todo} onSave={handleSave} onCancel={handleCancel} />;
  }

  return (
    <div className={`p-4 rounded-lg shadow-md border-l-4 ${
      todo.completed 
        ? 'bg-gray-50 border-gray-400' 
        : 'bg-white border-blue-400'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggleComplete}
            className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <div className="flex-1">
            <h3 className={`font-medium ${
              todo.completed ? 'text-gray-500 line-through' : 'text-gray-800'
            }`}>
              {todo.title}
            </h3>
            {todo.description && (
              <p className={`mt-1 text-sm ${
                todo.completed ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {todo.description}
              </p>
            )}
            <div className="mt-2 flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(todo.priority)}`}>
                {todo.priority}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(todo.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={handleEdit}
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(todo._id)}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const TodoEditForm = ({ todo, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: todo.title,
    description: todo.description || '',
    priority: todo.priority,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="2"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-3">
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition duration-200"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoItem;