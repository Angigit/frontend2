import React from 'react';

//a props a bemeneti paraméter, segítségével elérjük az app-ban létrehozott title-t
const TodoItem = (props) => {
  return (
    <li className="todo-item"> {props.name}
      <span className="remove-button"
        onClick={() => { props.removeHandler(props.id); }}
      ></span>
    </li>
  );
};

export default TodoItem;