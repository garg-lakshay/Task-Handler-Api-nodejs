# Frontend API Integration

This frontend application integrates with the Task Handler API to provide a complete task management system.

## Features

- **User Authentication**: Login and registration with JWT tokens
- **Task Management**: Create, read, update, and manage tasks
- **Real-time Updates**: Tasks update immediately after changes
- **Responsive Design**: Works on desktop and mobile devices
- **Status Management**: Track task status (pending, in-progress, done)
- **Due Date Tracking**: Set and track task due dates

## API Integration

The frontend connects to the API at `http://localhost:3000` and includes:

### Authentication

- POST `/auth/register` - User registration
- POST `/auth/login` - User login

### Task Management

- GET `/tasks` - Fetch all user tasks
- POST `/tasks` - Create new task
- PUT `/tasks/:id` - Update existing task

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Make sure the backend API is running on `http://localhost:3000`

## Usage

1. **Register**: Create a new account or use existing credentials
2. **Login**: Sign in to access your tasks
3. **Create Tasks**: Click "Add Task" to create new tasks
4. **Manage Tasks**: Edit tasks, change status, or set due dates
5. **Track Progress**: Use status buttons to update task progress

## Components

- `App.tsx` - Main application with routing and authentication
- `Login.tsx` - User login form
- `Register.tsx` - User registration form
- `TaskList.tsx` - Main task management interface
- `TaskForm.tsx` - Create/edit task form
- `TaskItem.tsx` - Individual task display and controls
- `AuthContext.tsx` - Authentication state management
- `api.ts` - API service layer

## Styling

The application uses Tailwind CSS for styling and includes:

- Responsive design
- Modern UI components
- Status indicators
- Form validation
- Loading states
