import React from 'react';
import Part from '../Part/Part';

const Content = (props) => {
  return (
    <ul>
      {props.parts.map((item, index) => (
        <Part key={item.id} part={item} />
      ))}
    </ul>
  );
};

export default Content;
