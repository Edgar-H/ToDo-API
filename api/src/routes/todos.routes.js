import express from 'express';
import {
  getAllToDos,
  createToDo,
  updateToDo,
  completeToDo,
  deleteToDo
} from '../controller/todos.controller.js';

const router = express.Router();

// GET fetch all ToDos
router.get('/', getAllToDos);

// POST Create new ToDo
router.post('/', createToDo);

// PATCH Update ToDo given an ID
router.patch('/:id', updateToDo);

// PATCH complete ToDo given an ID
router.patch('/:id/completed', completeToDo);

// DELETE Delete ToDo given an ID (destroy or soft delete)
router.delete('/:id', deleteToDo);

export { router as todoRouter };
