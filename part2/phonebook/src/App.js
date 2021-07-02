import React, { useEffect, useState } from 'react';
import Filter from './components/Filter/Filter';
import PersonForm from './components/PersonForm/PersonForm';
import Persons from './components/Persons/Persons';
import axios from 'axios';
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchName, setSearchName] = useState('');
  const onChangeNameHandler = (event) => {
    setNewName(event.target.value);
  };
  const onChangePhoneHandler = (event) => {
    setNewPhone(event.target.value);
  };
  const onChangeSearchNameHandler = (event) => {
    setSearchName(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let isAdded = persons.find((person) => person.name === newName) ? true : false;

    if (!isAdded) {
      const newPerson = { name: newName, phone: newPhone };
      setPersons((prev) => [...prev, newPerson]);
      setNewName('');
      setNewPhone('');
    } else {
      alert(`${newName} is already added to the phonebook`);
    }
  };

  let personList = searchName
    ? persons.filter((person) => person.name.toLowerCase().includes(searchName.toLowerCase()))
    : persons;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:3001/persons');
      setPersons(result.data);
      console.log(result);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchName} onChangeHandler={onChangeSearchNameHandler} />
      <h3>Add a new</h3>
      <PersonForm
        name={newName}
        onChangeNameHandler={onChangeNameHandler}
        onChangePhoneHandler={onChangePhoneHandler}
        phone={newPhone}
        onSubmit={submitHandler}
      />
      <h3>Numbers</h3>
      <Persons personList={personList} />
    </div>
  );
};

export default App;
