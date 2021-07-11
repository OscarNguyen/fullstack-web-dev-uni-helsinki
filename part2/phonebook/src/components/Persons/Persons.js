import React from 'react';

const Persons = (props) => {
  return (
    <ul>
      {props.personList.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}
          <button onClick={() => props.onDelete(person._id, person.name)} style={{ marginLeft: 8 }}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;
