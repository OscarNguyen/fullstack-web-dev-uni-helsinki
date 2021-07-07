const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const data = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];
const baseURL = '/api/persons';

//*Middlewares
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'));
app.use(cors());

//* morgan configuration
morgan.token('body', (req, res) => {
  return JSON.stringify(req.body);
});

//* GET
app.get(`${baseURL}`, (req, res) => {
  return res.json(data);
});

app.get('/info', (req, res) => {
  const result = `Phonebook has info for ${data.length} people`;
  const time = new Date().toUTCString();
  return res.send(`<p>${result}</p><p>${time}</p>`);
});

app.get(`${baseURL}/:id`, (req, res) => {
  const id = Number(req.params.id);
  const foundPerson = data.find((person) => person.id === id);
  if (foundPerson) {
    return res.json(foundPerson);
  } else {
    return res.status(404).json({ error: 'Person not found' });
  }
});

//* POST
app.post(`${baseURL}`, (req, res) => {
  const { name, number } = req.body;
  if (name && number) {
    const duplicatePerson = data.find((person) => person.name.toLowerCase() === name.toLowerCase()) ? true : false;
    if (duplicatePerson) {
      return res.status(404).json({ error: 'name must be unique' });
    } else {
      const person = { id: Math.floor(Math.random() * 100 + 1), ...req.body };
      data.push(person);
      return res.json(person);
    }
  } else {
    return res.status(404).json({ error: 'Cannot add person' });
  }
});

//* DELETE
app.delete(`${baseURL}/:id`, (req, res) => {
  const id = Number(req.params.id);
  const foundPersonIndex = data.findIndex((person) => person.id === id);
  console.log(foundPersonIndex);
  if (foundPersonIndex > 0) {
    data.splice(foundPersonIndex, 1);
    return res.json({ id, state: 'deleted' });
  } else if (foundPersonIndex === 0) {
    data.shift();
    return res.json({ id, state: 'deleted' });
  } else {
    return res.status(404).json({ error: 'Cant delete due to person not being found' });
  }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('Server is running'));
