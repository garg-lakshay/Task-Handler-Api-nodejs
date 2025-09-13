export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  due_date?: string;
  status: 'pending' | 'in-progress' | 'done';
  created_at: string;
  userId: number;
}

export interface AuthResponse {
  message: string;
  token?: string;
  user?: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  due_date?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  due_date?: string;
  status?: 'pending' | 'in-progress' | 'done';
}
