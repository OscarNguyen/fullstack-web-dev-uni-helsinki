const express = require('express')
require('dotenv').config()
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const ErrorHandler = require('./middlewares/ErrorHandler')
const PORT = process.env.PORT
const Phonebook = require('./models/phonebook')
const baseURL = '/api/persons'

//*Middlewares
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'))
app.use(cors())
app.use(express.static('build'))

//* morgan configuration
morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

//* GET
app.get(`${baseURL}`, (req, res, next) => {
  return Phonebook.find({})
    .then((result) => res.json(result))
    .catch((err) => next(err))
})

app.get('/info', async (req, res) => {
  const length = await Phonebook.estimatedDocumentCount()
  console.log('length', length)
  const result = `Phonebook has info for ${length} people`
  const time = new Date().toUTCString()
  return res.send(`<p>${result}</p><p>${time}</p>`)
})

app.get(`${baseURL}/:id`, (req, res, next) => {
  const id = req.params.id
  return Phonebook.findById(id)
    .then((person) => {
      if (person) {
        return res.json(person)
      } else {
        return res.status(500).json({ error: 'person not found' })
      }
    })
    .catch((err) => next(err))
  // const foundPerson = data.find((person) => person.id === id);
  // if (foundPerson) {
  //   return res.json(foundPerson);
  // } else {
  //   return res.status(404).json({ error: 'Person not found' });
  // }
})

//* POST
app.post(`${baseURL}`, (req, res, next) => {
  let { name, number } = req.body
  if (name && number) {
    // const duplicatePerson = data.find((person) => person.name.toLowerCase() === name.toLowerCase()) ? true : false;
    // if (duplicatePerson) {
    //   return res.status(404).json({ error: 'name must be unique' });
    // } else {
    //   const person = { id: Math.floor(Math.random() * 100 + 1), ...req.body };
    //   data.push(person);
    //   return res.json(person);
    // }
    // number = Number(number);
    return Phonebook.findOne({ name })
      .then((person) => {
        if (person) {
          return res.status(400).json({ error: 'duplicate person' })
        } else {
          const newPerson = new Phonebook({ name, number })
          return newPerson
            .save()
            .then((result) => res.json(result))
            .catch((err) => next(err))
          // .catch((err) => res.json({ error: err.message }));
        }
      })
      .catch((err) => next(err))
  } else {
    return res.status(404).json({ error: 'content is missing' })
  }
})

//* DELETE
app.delete(`${baseURL}/:id`, (req, res, next) => {
  const id = req.params.id
  // const id = req.params.id;
  // const foundPersonIndex = data.findIndex((person) => person.id === id);
  // console.log(foundPersonIndex);
  // if (foundPersonIndex > 0) {
  //   data.splice(foundPersonIndex, 1);
  //   return res.json({ id, state: 'deleted' });
  // } else if (foundPersonIndex === 0) {
  //   data.shift();
  //   return res.json({ id, state: 'deleted' });
  // } else {
  //   return res.status(404).json({ error: 'Cant delete due to person not being found' });
  // }

  return Phonebook.findByIdAndDelete(id)
    .then(() => res.json({ status: 'success' }))
    .catch((err) => next(err))
})

//* UPDATE
app.put(`${baseURL}/:id`, (req, res, next) => {
  const id = req.params.id
  const update = { name: req.body.name, number: req.body.number }
  const opts = { runValidators: true, new: true, context: 'query' }
  return Phonebook.findByIdAndUpdate(id, update, opts)
    .exec()
    .then((update) => res.json(update))
    .catch((err) => next(err))

  // return Phonebook.findById(id)
  //   .then((person) => {
  //     if (person) {
  //       person.name = update.name;
  //       person.number = update.number;
  //       return person.save().then((person) => res.json(person));
  //     }
  //   })
  //   .catch((err) => next(err));
})
//Error handler middlewares
app.use(ErrorHandler)
app.listen(PORT, () => console.log('Server is running'))
