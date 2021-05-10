import React from 'react';

//ha csak egy bemeneti paramétere van az arrow functionnek akkor el lehet hagyni a zárójlet
const TodoCounter = props => {
  return (
    <h2>You have {props.count} {
      props.count <= 1 ? 'todo' : 'todos'
    } </h2>
  );
};

export default TodoCounter;