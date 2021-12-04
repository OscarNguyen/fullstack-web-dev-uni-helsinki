const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const BlogRouter = require('./controllers/blog');
const UserRouter = require('./controllers/user');
const TestingRouter = require('./controllers/testing')
const { PORT, MONGODB_URI } = require('./utils/config');
const { error, info } = require('./utils/logger');
const { tokenExtractor } = require('./middlewares/helper');

// Load the full build.

// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => info('db connected'))
  .catch((err) => error(err.message));

app.use(cors());
app.use(express.json());

//* Middlewares
// app.use(tokenExtractor);

app.use('/api/blogs', BlogRouter);
app.use('/api/users', UserRouter);

if(process.env.NODE_ENV==='test'){
  app.use('/api/testing',TestingRouter)
}
module.exports = app;
