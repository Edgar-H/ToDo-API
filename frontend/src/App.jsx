import { useEffect, useState } from 'react';
import './style.scss';
import { CreateTodo } from './components/CreateTodo';
import { completeTodo, deleteTodo, getAllTodos } from './helpers/api';
import { TodoList } from './components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([]),
    [editTodo, setEditTodo] = useState([]),
    [isLoading, setIsLoading] = useState(true);

  const getTodos = async () => {
    const { data } = await getAllTodos();
    setTodos(data.todos);
    setIsLoading(false);
  };

  const handleEdit = async (data) => setEditTodo({ ...data, isEdit: true });

  const handleCompleted = async (data) => {
    try {
      await completeTodo(data);
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className='app'>
      <div className='container'>
        <CreateTodo getTodos={getTodos} editTodo={editTodo} />
        {isLoading ? (
          'Loading...'
        ) : (
          <TodoList
            items={todos}
            onChangeEdit={handleEdit}
            onChangeCompleted={handleCompleted}
            onChangeDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default App;
