import React, { useState } from 'react';
import type { Task } from '../types/index';
import { Calendar, Edit, CheckCircle, Clock, Play } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onUpdate: (data: { title?: string; description?: string; due_date?: string; status?: 'pending' | 'in-progress' | 'done' }) => void;
  onEdit: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate, onEdit }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'done':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'in-progress':
        return <Play className="h-4 w-4" />;
      case 'done':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handleStatusChange = async (newStatus: 'pending' | 'in-progress' | 'done') => {
    if (newStatus === task.status) return;
    
    setIsUpdating(true);
    try {
      await onUpdate({ status: newStatus });
    } catch (error) {
      console.error('Failed to update task status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== 'done';

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow ${
      isOverdue ? 'border-red-200 bg-red-50' : ''
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {task.title}
            </h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
              {getStatusIcon(task.status)}
              <span className="ml-1 capitalize">{task.status.replace('-', ' ')}</span>
            </span>
          </div>
          
          {task.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {task.description}
            </p>
          )}
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            {task.due_date && (
              <div className={`flex items-center space-x-1 ${
                isOverdue ? 'text-red-600' : 'text-gray-500'
              }`}>
                <Calendar className="h-4 w-4" />
                <span>Due: {formatDate(task.due_date)}</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <span>Created: {formatDate(task.created_at)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          <div className="flex space-x-1">
            <button
              onClick={() => handleStatusChange('pending')}
              disabled={isUpdating || task.status === 'pending'}
              className={`p-1 rounded ${
                task.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-600'
                  : 'text-gray-400 hover:text-yellow-600'
              } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
              title="Mark as pending"
            >
              <Clock className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleStatusChange('in-progress')}
              disabled={isUpdating || task.status === 'in-progress'}
              className={`p-1 rounded ${
                task.status === 'in-progress'
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-400 hover:text-blue-600'
              } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
              title="Mark as in progress"
            >
              <Play className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleStatusChange('done')}
              disabled={isUpdating || task.status === 'done'}
              className={`p-1 rounded ${
                task.status === 'done'
                  ? 'bg-green-100 text-green-600'
                  : 'text-gray-400 hover:text-green-600'
              } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
              title="Mark as done"
            >
              <CheckCircle className="h-4 w-4" />
            </button>
          </div>
          
          <button
            onClick={onEdit}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
            title="Edit task"
          >
            <Edit className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
