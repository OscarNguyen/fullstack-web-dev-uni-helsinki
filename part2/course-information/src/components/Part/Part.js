import React from 'react';

const Part = (props) => {
  return (
    <li>
      {props.part.name} {props.part.exercises}
    </li>
  );
};

export default Part;
