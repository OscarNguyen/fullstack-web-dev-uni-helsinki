import React from 'react';
import Part from '../Part/Part';

const Content = (props) => {
  return (
    <div>
      {props.parts.map((item, index) => (
        <Part key={index} part={item} />
      ))}
    </div>
  );
};

export default Content;
