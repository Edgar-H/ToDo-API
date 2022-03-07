import { useEffect, useState } from 'react';
import { createTodo, updateTodo } from '../helpers/api';

export const CreateTodo = ({ getTodos, editTodo }) => {
  const [formValue, setFormValue] = useState({}),
    [error, setError] = useState(''),
    [editMode, setEditMode] = useState(false);

  const handlerChange = ({ name, value }) => {
    setFormValue({ ...formValue, [name]: value });
  };

  const formValid = ({ title, description }) => {
    setError('');
    if (
      !title ||
      !description ||
      title.length === 0 ||
      description.length === 0
    ) {
      setError('Please fill in all fields');
      return false;
    }
    return true;
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    if (formValid(formValue)) {
      const data = {
        id: formValue.id,
        title: formValue.title,
        description: formValue.description,
      };
      await updateTodo(data);
      setEditMode(false);
      getTodos();
      setFormValue('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValid(formValue)) {
      createTodo(formValue)
        .then(() => {
          getTodos();
          setFormValue('');
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (editTodo?.isEdit) {
      setEditMode(true);
      setFormValue(editTodo);
    }
  }, [editTodo]);

  return (
    <form onSubmit={editMode ? handleEdit : handleSubmit}>
      <div className='errors-msg'>{error && <p>{error}</p>}</div>
      <div className='input-container'>
        <label htmlFor='title'>Title ToDo:</label>
        <input
          type='text'
          name='title'
          id='title'
          value={formValue.title || ''}
          onChange={(e) => handlerChange(e.target)}
        />
      </div>
      <div className='input-container'>
        <label htmlFor='description'>Description ToDo:</label>
        <input
          type='text'
          name='description'
          id='description'
          value={formValue.description || ''}
          onChange={(e) => handlerChange(e.target)}
        />
      </div>
      <div className='btn-container'>
        <button className={editMode ? 'update-task' : ''}>
          {editMode ? 'Update task' : 'Add to list'}
        </button>
      </div>
    </form>
  );
};
