# Task Handler API Documentation

## Overview

A RESTful API for managing tasks with user authentication. Built with Node.js, Express, Prisma, and PostgreSQL.

## Base URL

```
http://localhost:3000
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### Authentication Routes (`/auth`)

#### 1. Register User

**POST** `/auth/register`

Creates a new user account.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "john@example.com"
  }
}
```

**Status Codes:**

- `201` - User created successfully
- `400` - User already exists
- `500` - Registration failed

#### 2. Login User

**POST** `/auth/login`

Authenticates a user and returns a JWT token.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Status Codes:**

- `200` - Login successful
- `404` - User not found
- `400` - Invalid credentials
- `500` - Login failed

### Task Routes (`/tasks`)

All task routes require authentication. Include the JWT token in the Authorization header.

#### 1. Create Task

**POST** `/tasks`

Creates a new task for the authenticated user.

**Headers:**

```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation for the task handler",
  "due_date": "2024-01-15T10:00:00Z"
}
```

**Response:**

```json
{
  "id": 1,
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation for the task handler",
  "due_date": "2024-01-15T10:00:00.000Z",
  "status": "pending",
  "created_at": "2024-01-10T08:30:00.000Z",
  "userId": 1
}
```

**Status Codes:**

- `200` - Task created successfully
- `500` - Failed to create task

#### 2. Get All Tasks

**GET** `/tasks`

Retrieves all tasks for the authenticated user, ordered by creation date (newest first).

**Headers:**

```
Authorization: Bearer <your-jwt-token>
```

**Response:**

```json
[
  {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive API documentation for the task handler",
    "due_date": "2024-01-15T10:00:00.000Z",
    "status": "pending",
    "created_at": "2024-01-10T08:30:00.000Z",
    "userId": 1
  },
  {
    "id": 2,
    "title": "Review code",
    "description": "Review the frontend integration code",
    "due_date": null,
    "status": "in-progress",
    "created_at": "2024-01-09T14:20:00.000Z",
    "userId": 1
  }
]
```

**Status Codes:**

- `200` - Tasks retrieved successfully
- `500` - Failed to fetch tasks

#### 3. Update Task

**PUT** `/tasks/:id`

Updates an existing task. Only the task owner can update their tasks.

**Headers:**

```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

**URL Parameters:**

- `id` (integer) - The ID of the task to update

**Request Body:**

```json
{
  "title": "Updated task title",
  "description": "Updated task description",
  "due_date": "2024-01-20T15:00:00Z",
  "status": "in-progress"
}
```

**Response:**

```json
{
  "message": "✅ Task updated successfully"
}
```

**Status Codes:**

- `200` - Task updated successfully
- `404` - Task not found or not authorized
- `500` - Failed to update task

## Data Models

### User

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashed_password",
  "created_at": "2024-01-10T08:00:00.000Z"
}
```

### Task

```json
{
  "id": 1,
  "title": "Task title",
  "description": "Task description",
  "due_date": "2024-01-15T10:00:00.000Z",
  "status": "pending",
  "created_at": "2024-01-10T08:30:00.000Z",
  "userId": 1
}
```

### Task Status Values

- `pending` - Task is not started (default)
- `in-progress` - Task is currently being worked on
- `done` - Task is completed

## Error Responses

All error responses follow this format:

```json
{
  "message": "Error description",
  "error": "Detailed error message"
}
```

### Common Error Codes

- `400` - Bad Request (invalid data)
- `401` - Unauthorized (missing or invalid token)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/task_handler_db"
JWT_SECRET="your-super-secret-jwt-key"
PORT=3000
```

## Database Schema

The API uses PostgreSQL with Prisma ORM. The database includes two main tables:

### Users Table

- `id` (Primary Key, Auto Increment)
- `name` (String, Optional)
- `email` (String, Unique)
- `password` (String, Hashed)
- `created_at` (DateTime, Default: now())

### Tasks Table

- `id` (Primary Key, Auto Increment)
- `title` (String, Required)
- `description` (String, Optional)
- `due_date` (DateTime, Optional)
- `status` (String, Default: "pending")
- `created_at` (DateTime, Default: now())
- `userId` (Foreign Key to Users.id)

## Getting Started

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Set up Environment Variables:**
   Create a `.env` file with the required variables.

3. **Set up Database:**

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

4. **Start the Server:**
   ```bash
   npm start
   ```

The server will start on `http://localhost:3000` (or the port specified in your environment variables).

## Example Usage

### 1. Register a new user

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 2. Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Create a task

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Learn React",
    "description": "Complete React tutorial",
    "due_date": "2024-01-20T10:00:00Z"
  }'
```

### 4. Get all tasks

```bash
curl -X GET http://localhost:3000/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 5. Update a task

```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Learn React and TypeScript",
    "status": "in-progress"
  }'
```

## Security Notes

- Passwords are hashed using bcrypt before storage
- JWT tokens expire after 1 hour
- All task operations are user-scoped (users can only access their own tasks)
- Input validation should be added for production use
- Consider implementing rate limiting for production deployment
