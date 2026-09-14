# Job Board API

A production-ready REST API built with Node.js, Express, MongoDB and JWT authentication.

## Tech Stack

- **Node.js** — Runtime environment
- **Express** — Web framework
- **MongoDB & Mongoose** — Database and ODM
- **JWT** — Authentication
- **bcryptjs** — Password hashing

## Features

- User registration and login
- JWT token-based authentication
- Password hashing with bcrypt
- Protected routes with middleware
- Role-based access control (user/admin)
- Centralized error handling

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB Atlas account

### Installation

1. Clone the repository

   git clone https://github.com/Francis-O-dev/jobboard-server.git

2. Install dependencies

   npm install

3. Create your .env file

   cp .env.example .env

4. Fill in your values in .env

5. Run the development server

   npm run dev

## API Endpoints

### Auth

| Method | Endpoint           | Access | Description         |
| ------ | ------------------ | ------ | ------------------- |
| POST   | /api/auth/register | Public | Register a new user |
| POST   | /api/auth/login    | Public | Login and get token |

## Project Structure

src/
├── config/ ← Database connection
├── controllers/ ← Business logic
├── middleware/ ← Auth and error handling
├── models/ ← MongoDB schemas
├── routes/ ← URL definitions
└── utils/ ← Helper functions

## Author

Francis O — [GitHub](https://github.com/Francis-O-dev)
