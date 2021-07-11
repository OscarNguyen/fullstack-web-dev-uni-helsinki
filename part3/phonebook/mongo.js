const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://minh:${password}@phonebook.wtmef.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

const newPhoneBook = new Phonebook({
  name,
  number,
})

if (process.argv.length <= 3) {
  console.log('Phonebook')
  return Phonebook.find({}).then((result) => result.map((item) => console.log(item.name, item.number)))
}

return newPhoneBook.save().then(() => {
  console.log(`added ${name} ${number} to the phonebook`)
})
