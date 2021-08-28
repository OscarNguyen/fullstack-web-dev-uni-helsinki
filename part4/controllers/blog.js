const router = require('express').Router();
const jwt = require('jsonwebtoken');

const { tokenExtractor, userExtractor } = require('../middlewares/helper');
const Blog = require('../models/blog');
const User = require('../models/user');

router.get('/', (request, response) => {
  Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .then((blogs) => {
      response.json(blogs);
    });
});

router.post('/', userExtractor, async (request, response) => {
  let data = null;
  // console.log(request.token);
  // const decodedToken = jwt.verify(request.token, process.env.SECRET);

  // if (!decodedToken) {
  //   return response.status(401).json({ msg: 'invalid or missing token' });
  // }
  let user = request.user;
  if (!user) {
    return response.status(401).json({ msg: 'unauthorized user' });
  }
  user = await User.findById(user.id);
  console.log(user);

  let likes = 0;
  if (request.body.likes === undefined) {
    likes = 0;
  } else if (request.body.title === undefined && request.body.url === undefined) {
    response.status(400).end();
  } else {
    likes = request.body.likes;
  }
  data = { ...request.body, likes, user: user.id };
  const blog = new Blog(data);
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  return response.status(201).json(savedBlog);
});

router.delete('/:id', tokenExtractor, async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  const userId = decodedToken.id;
  console.log(userId);

  const blog = await Blog.findById(req.params.id);
  console.log(blog.user);
  if (blog.user.toString() === userId.toString()) {
    return Blog.findByIdAndDelete(req.params.id)
      .then(() => res.status(204).json({ state: 'deleted' }))
      .catch((err) => res.json({ error: err.message }));
  }
  return res.status(400).json({ msg: 'cant delete due to different owner' });
});

router.put('/:id', (req, res) => {
  const opts = { runValidators: true, new: true, context: 'query' };
  const data = req.body;
  return Blog.findByIdAndUpdate(req.params.id, data, opts)
    .then((result) => res.json(result))
    .catch((err) => res.json({ error: err.message }));
});

module.exports = router;
