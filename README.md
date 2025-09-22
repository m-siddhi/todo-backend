# To-Do List Backend (Node.js + Express + MongoDB)

This is the backend for the To-Do List app, built with **Node.js**, **Express.js**, and **MongoDB**.  
It provides RESTful APIs to manage tasks (create, read, update, delete, and search).

Challenge: MongoDB Atlas was not connecting on Render.
Solution: Added 0.0.0.0/0 in IP Access List in MongoDB Atlas so that Render could connect.

## Setup
1. Clone the repo
2. Run `npm install`
3. Created a `.env` file
4. Run locally with npm start
5.  Test APIs with Postman:
- `POST /api/tasks`
- `GET /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

Deployment with Render : https://todo-backend-1-1jez.onrender.com/
