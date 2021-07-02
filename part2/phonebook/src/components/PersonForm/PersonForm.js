import React from 'react';

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        <p>
          name: <input type="text" value={props.name} onChange={props.onChangeNameHandler} />
        </p>
        <p>
          phone: <input type="text" value={props.phone} onChange={props.onChangePhoneHandler} />
        </p>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
