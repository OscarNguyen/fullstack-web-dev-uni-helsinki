import React from 'react';

const Button = ({ clickHandler, children }) => {
  return <button onClick={clickHandler}>{children}</button>;
};

export default Button;
