import React from 'react';

const Total = (props) => {
  let valueArray = props.parts.map((item) => item.exercises);

  let total = valueArray.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);

  return (
    <div>
      <b>Total of {total} exercises </b>
    </div>
  );
};

export default Total;
