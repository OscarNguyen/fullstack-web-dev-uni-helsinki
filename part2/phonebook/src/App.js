import React, { useEffect, useState } from 'react';
import Filter from './components/Filter/Filter';
import PersonForm from './components/PersonForm/PersonForm';
import Persons from './components/Persons/Persons';
import { create, deleteService, getAll, update } from './services/phoneBook';
import classes from './App.module.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [notification, setNotification] = useState('');
  const [cssClass, setCssClass] = useState('');
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

  const deletePerson = async (id, name) => {
    const condition = window.confirm(`Delete ${name} ?`);
    console.log(id);
    if (condition) {
      const result = await deleteService(id);
      console.log(result);
      // setPersons((prev) => [...prev, prev.filter((person) => person.id !== id)]);
      setPersons(persons.filter((person) => person._id !== id));
    } else {
      return;
    }
  };
  const submitHandler = async (event) => {
    event.preventDefault();

    let isAdded = persons.find((person) => person.name === newName) ? true : false;
    const newPerson = { name: newName, number: newPhone };

    if (!isAdded) {
      try {
        const result = await create(newPerson);
        console.log(result);
        setPersons((prev) => [...prev, result]);
        setNewName('');
        setNewPhone('');
        setNotification(`Added ${newName}`);
        setCssClass('notification-success');
        setTimeout(() => {
          setNotification('');
        }, 5000);
      } catch (err) {
        console.log(err.response);
        setNotification(err.response.data.error);
        setCssClass('notification-error');
        setTimeout(() => {
          setNotification('');
        }, 5000);
      }
      // if (result.error) {

      //   return;
      // }
    } else {
      const condition = window.confirm(
        `${newName} is already added to the phonebook, replace old number with the new one?`,
      );
      if (condition) {
        let id = persons.find((person) => person.name === newName)._id;
        console.log(id);
        console.log(newName);
        update(id, newPerson)
          .then((ketQua) => {
            console.log(ketQua);
            console.log(newPerson);
            setPersons(persons.map((person) => (person._id !== id ? person : { ...newPerson, _id: id })));
            setNotification(`Updated ${newName}`);
            setCssClass('notification-success');
          })
          .catch((error) => {
            console.log(error.response);
            if (error.response.data.error) {
              setNotification(error.response.data.error);
            } else {
              setNotification(`Information of ${newName} has been removed from the server`);
            }
            setCssClass('notification-error');
          });

        setTimeout(() => {
          setNotification('');
        }, 5000);
      }
    }
  };

  let personList = searchName
    ? persons.filter((person) => person.name.toLowerCase().includes(searchName.toLowerCase()))
    : persons;

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAll();
      setPersons(result);
    };
    fetchData();
  }, []);

  console.log(persons);

  return (
    <div>
      <h2>Phonebook</h2>

      {notification.length !== 0 && <p className={classes[cssClass]}>{notification}</p>}
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
      <Persons onDelete={deletePerson} personList={personList} />
    </div>
  );
};

export default App;
