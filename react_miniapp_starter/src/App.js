import React, { useEffect, useState } from 'react';
import './scss/style.scss';
import Header from './components/Header';
import TodoCounter from './components/TodoCounter';
import { v4 as uuidv4 } from 'uuid';
import TodoItem from './components/TodoItem';

// class App extends React.Component {
//   //ma már nem használják a class based componenteket, elég a function component
// emiatt nem sima class kulcsszót adunk meg, hanem className-et
// }


//ez már itt egy react komponens, ami return-öl egy JSX-et
// const App = () => {
//   const name = 'Angi';
//   return (
//     // <div style={{ fontSize: '50px' }}>Hello {name}</div> //a return-ben lévő rész a JSX, lehet csinálni inline style-t is
//     <div>Hello {name}</div>
//   );
// };

const App = () => {
  //const name = 'Angi';

  //array destructuring
  const [todo, setTodo] = useState('');
  // az alapért. state-je a todos-nak egy tömb, az összes todo-t fogja tárolni
  const [todos, setTodos] = useState([]);

  //setTodo('new item'); mindig a set-el állítjuk be a változó értékét
  // const result = useState('');
  // const todo = result[0];
  // const setTodo = result[1];
  //console.log(todo);

  const handleSubmit = (event) => {
    event.preventDefault(); //megtíltjuk az alapért. működését a webform-nak, hogy a weboldal ne töltődjön újra a form miatt
    if (todo !== '') {
      setTodos([...todos, { name: todo, id: uuidv4() }]); //spread operator
      setTodo(''); //az input field-et kiürítjük
    }
  };

  const handleRemove = (id) => {
    const newTodos = todos.filter((elem) => elem.id !== id);
    setTodos(newTodos);
  }

  //speciális react függvény, csak azután fut le a callback, ha a todos state megváltozik
  useEffect(() => {
    console.log(todos);
  }, [todos]);

  //event.target = itt az input field value-ja
  return (
    //react fragment
    <>
      <Header title={'Add to your list'} />
      <form className="todo-form" onSubmit={handleSubmit}>
        <input type="text"
          className="todo-input"
          value={todo} //two way databinding
          onChange={(event) => { setTodo(event.target.value); }} />
        <input type="submit" className="todo-add" value='Add' />
      </form>
      <div>
        <TodoCounter count={todos.length} />
        <ul className="todo-container">
          {
            //ua.mint a for of ciklus, vagy mint a foreach
            todos.map((todoItem) =>
              <TodoItem
                key={todoItem.id}
                id={todoItem.id}
                name={todoItem.name}
                removeHandler={handleRemove}
              />
              //return <li key={todoItem.id}>{todoItem.name}</li>;
            )
          }
        </ul>
      </div>
    </>
  );
};

export default App;
