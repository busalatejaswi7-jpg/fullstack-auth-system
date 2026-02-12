
# Task Management Backend API
A secure and scalable RESTful API built using Node.js, Express, and MongoDB.
This backend supports authentication, role-based authorization, secure task management, filtering, pagination, search functionality, and admin analytics.
## Features
- User Registration & Login (JWT Authentication)
- Role-based Access Control (Admin / User)
- Secure CRUD Operations
- Task Ownership Protection
- Filtering (status, priority)
- Sorting
- Pagination
- Search (regex-based)
- Admin Analytics Dashboard
- Centralized Error Handling
- Input Validation (express-validator)
- Security Middleware (Helmet, CORS, Morgan)
##Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- express-validator
- Helmet
- CORS
- Morgan
## Project Structure

├── models/
├── routes/
├── middle-ware/
├── database/
├── app.js
├── server.js
├── .env
├── package.json
## Authentication Flow
1. User registers
2. User logs in and receives a JWT token
3. Token must be sent in `Authorization` header:
 Authorization: Bearer <token>
4. Protected routes verify token using auth middleware
5. Admin routes additionally verify role
## API Endpoints

### Auth Routes

- POST `/api/auth/register`
- POST `/api/auth/login`
### Task Routes

- POST `/api/tasks/create`
- GET `/api/tasks/mytasks`
- PUT `/api/tasks/update/:id`
- DELETE `/api/tasks/delete/:id`

Supports:
- Filtering → `?status=pending`
- Pagination → `?page=1&limit=5`
- Search → `?search=backend`
- Sorting → `?sort=createdAt`

### Admin Route

- GET `/api/admin/analytics`

Returns:
- Total Users
- Total Tasks
- Completed Tasks
- Pending Tasks

Admin access only.
##  Environment Variables

Create a `.env` file in root directory:

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key

## Deployment

This project can be deployed on:

- Render
Make sure:
- PORT is dynamic (`process.env.PORT`)
- MongoDB is Atlas (cloud)
- Environment variables are added in deployment dashboard
## Project Purpose

This project demonstrates:

- Authentication & Authorization
- Secure API design
- Scalable architecture
- Middleware usage
- Error handling best practices
- Backend engineering fundamentals