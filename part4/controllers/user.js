const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('express').Router();

const User = require('../models/user');

//sign up
router.post('/', async (req, res) => {
  const { username, password, name } = req.body;
  const saltRounds = 10;
  try {
    if (username && password) {
      if (password.length >= 3) {
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({ username, hashPassword, name });

        const savedUser = await user.save();

        return res.json(savedUser);
      } else {
        return res.status(404).json({ message: 'password needs to be 3 at minimum' });
      }
    } else {
      return res.status(404).json({ message: 'username and password required' });
    }
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

//sign in
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  const correctPassword = user === null ? false : await bcrypt.compare(password, user.hashPassword);

  if (!(user && correctPassword)) {
    return res.status(404).json({ message: 'invalid username or password' });
  }

  const tokenData = {
    username: user.username,
    name: user.name,
    id: user._id,
  };

  const token = jwt.sign(tokenData, process.env.SECRET);
  return res.status(200).json({ token, username: user.username, name: user.name });
});

router.get('/', (req, res) => {
  return User.find({})
    .populate('blogs', { title: 1, url: 1 })
    .then((users) => res.json(users));
});

module.exports = router;
