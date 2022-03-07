import React from 'react';

export const TodoList = ({
  items,
  onChangeEdit,
  onChangeCompleted,
  onChangeDelete,
}) => {
  return (
    <div className='todos-container'>
      {items?.map((item) => (
        <div
          className={`todo-item ${item.completed ? 'completed' : ''}`}
          key={item.id}
        >
          <p>{item.title}</p>
          <p>{item.description}</p>
          <ul className='options'>
            <li>
              <input
                name='checkbox'
                type='checkbox'
                defaultChecked={item.completed}
                onChange={() => onChangeCompleted(item)}
              />
            </li>
            <li>
              <i
                className='fa-solid fa-pen'
                onClick={() => onChangeEdit(item)}
              ></i>
            </li>
            <li>
              <i
                className='fas fa-trash-alt'
                onClick={() => onChangeDelete(item.id)}
              ></i>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};
