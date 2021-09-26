import React from 'react';

const Filter = (props) => {
  return (
    <div>
      filter shown with <input type="text" value={props.value} onChange={props.onChangeHandler} />
    </div>
  );
};

export default Filter;
