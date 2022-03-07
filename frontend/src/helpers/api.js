import axios from 'axios';

const baseUrl = 'http://localhost:4000/api/v1/todos';

const getAllTodos = async () => {
  try {
    const { data } = await axios.get(baseUrl);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const createTodo = async (data) => {
  const { title, description } = data;
  try {
    const { data } = await axios.post(baseUrl, {
      title,
      description,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateTodo = async (data) => {
  const { id, title, description } = data;
  try {
    const res = await axios.patch(`${baseUrl}/${id}`, {
      title,
      description,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

const completeTodo = async (data) => {
  const { id, completed } = data;
  try {
    const res = await axios.patch(`${baseUrl}/${id}/completed`, {
      completed: !completed,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

const deleteTodo = async (id) => {
  try {
    const { data } = await axios.delete(`${baseUrl}/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getAllTodos, createTodo, updateTodo, completeTodo, deleteTodo };
