import { filterObj } from '../helpers/filterObj.js';
import { ToDo } from '../models/todo.model.js';

// GET fetch all ToDos
const getAllToDos = async (req, res) => {
  const todos = await ToDo.findAll();
  res.status(200).json({
    status: 'success',
    data: { todos }
  });
};

// POST Create new ToDo
const createToDo = async (req, res) => {
  const { title, description } = req.body;

  if (!title.length || !description.length) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide title and description'
    });
  }

  try {
    const newToDo = await ToDo.create({ ...req.body });
    res.status(201).json({
      status: 'success',
      message: 'ToDo created successfully'
    });
  } catch (error) {
    console.log(error);
  }
};

// PATCH Update ToDo given an ID
const updateToDo = async (req, res) => {
  const { id } = req.params;
  try {
    const data = filterObj(req.body, ['title', 'description']);
    const post = await ToDo.findOne({ where: { id } });

    if (!post) {
      return res.status(404).json({
        status: 'fail',
        message: 'ToDo not found'
      });
    }

    await post.update({ ...data });
    res.status(200).json({
      status: 'success',
      message: 'ToDo updated successfully'
    });
  } catch (error) {
    console.log(error);
  }
};

// PATCH complete ToDo given an ID
const completeToDo = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await ToDo.findOne({ where: { id } });
    if (!post) {
      return res.status(404).json({
        status: 'fail',
        message: 'ToDo not found'
      });
    }

    await post.update({ completed: !post.completed });
    res.status(200).json({
      status: 'success',
      message: 'ToDo completed successfully'
    });
  } catch (error) {
    console.log(error);
  }
};

// DELETE Delete ToDo given an ID (destroy or soft delete)
const deleteToDo = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await ToDo.findOne({ where: { id } });

    if (!post) {
      return res.status(404).json({
        status: 'fail',
        message: 'ToDo not found'
      });
    }

    await post.destroy();
    res.status(200).json({
      status: 'success',
      message: 'ToDo deleted successfully'
    });
  } catch (error) {
    console.log(error);
  }
};

export { getAllToDos, createToDo, updateToDo, completeToDo, deleteToDo };
