import React from 'react';

//a props a bemeneti paraméter, segítségével elérjük az app-ban létrehozott title-t
const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  );
};

export default Header;