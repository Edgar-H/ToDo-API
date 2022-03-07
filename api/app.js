import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { sequelize } from './src/database.config.js';
import { todoRouter } from './src/routes/todos.routes.js';
// Create server Express

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/v1/todos', todoRouter);

sequelize
  .authenticate()
  .then(() => console.log('Authentication successful'))
  .catch((err) => console.log(err));

sequelize
  .sync()
  .then(() => console.log('Sync successful'))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.clear();
  console.log(`Server is running on port ${PORT}`);
});
// Define endpoint for ToDos
// GET fetch all ToDos
// POST Create new ToDo
// PATCH Update ToDo given an ID
// DELETE Delete ToDo given an ID (destroy or soft delete)

// Establish a connection with a Database (Postgress)

// Create ToDo model
// Use the model to interact with the controller functions

// Must structure project with routes, controllers and models folders (utils)

// IMPORTANT: Prettier format

// Install cors library (npm i cors)
// app.use(cors())
