import React, { useState, useEffect } from 'react';
import type { Task } from '../types/index';
import { taskAPI } from '../services/api';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { Plus, RefreshCw } from 'lucide-react';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const fetchedTasks = await taskAPI.getTasks();
      setTasks(fetchedTasks);
      setError('');
    } catch {
      setError('Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (taskData: { title: string; description?: string; due_date?: string }) => {
    try {
      const newTask = await taskAPI.createTask(taskData);
      setTasks([newTask, ...tasks]);
      setShowForm(false);
    } catch {
      setError('Failed to create task');
    }
  };

  const handleUpdateTask = async (id: number, taskData: { title?: string; description?: string; due_date?: string; status?: 'pending' | 'in-progress' | 'done' }) => {
    try {
      await taskAPI.updateTask(id, taskData);
      await fetchTasks(); // Refresh the list
      setEditingTask(null);
    } catch {
      setError('Failed to update task');
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-lg">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Tasks</h2>
        <div className="flex space-x-3">
          <button
            onClick={fetchTasks}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? (data) => handleUpdateTask(editingTask.id, data) : handleCreateTask}
          onCancel={handleCancelForm}
        />
      )}

      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No tasks yet</div>
          <p className="text-gray-400 mt-2">Create your first task to get started!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdate={(data) => handleUpdateTask(task.id, data)}
              onEdit={() => handleEditTask(task)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
