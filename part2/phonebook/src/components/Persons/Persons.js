import React from 'react';

const Persons = (props) => {
  return (
    <ul>
      {props.personList.map((person) => (
        <li key={person.name}>
          {person.name} {person.phone}
        </li>
      ))}
    </ul>
  );
};

export default Persons;
