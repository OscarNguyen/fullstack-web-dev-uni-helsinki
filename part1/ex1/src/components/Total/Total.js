import React from 'react';

const Total = (props) => {
  let total = 0;

  for (let item of props.parts) {
    total += item.exercises;
  }

  return (
    <div>
      <p>Number of exercises {total} </p>
    </div>
  );
};

export default Total;
