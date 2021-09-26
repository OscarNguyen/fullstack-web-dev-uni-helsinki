const mongoose = require('mongoose')
let uniqueValidator = require('mongoose-unique-validator')
const url = process.env.MONGODB_URI
console.log('connecting to', url)
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('connected to db'))
  .catch((err) => console.log('error connecting to db', err.message))

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    require: true,
    unique: true,
  },
  number: {
    type: String,
    minLength: 8,
    require: true,
    unique: true,
  },
})
// phonebookSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });
phonebookSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Phonebook', phonebookSchema)
