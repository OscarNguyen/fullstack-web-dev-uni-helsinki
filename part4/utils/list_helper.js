var _ = require('lodash');
const dummy = (blogs) => {
  // ...
  return 1;
};
const totalLikes = (blogs) => {
  return blogs.reduce((prev, current) => {
    return prev + current.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  const likes = blogs.map((item) => item.likes);
  const maxLikes = Math.max(...likes);
  const result = blogs.find((item) => item.likes === maxLikes);
  return { author: result.author, likes: result.likes, title: result.title };
};

const mostBlogs = (blogs) => {
  let tmp = 0;
  let author = '';
  const result = _.countBy(blogs, 'author');

  for (let key in result) {
    if (result[key] > tmp) {
      tmp = result[key];
      author = key;
    }
  }
  return { blogs: tmp, author };
};

const mostLikes = (blogs) => {
  let sum = 0;
  let author = '';
  let tmp = 0;
  const result = _.groupBy(blogs, 'author');

  for (let key in result) {
    tmp = result[key].reduce((prev, cur) => {
      return prev + cur.likes;
    }, 0);
    if (tmp > sum) {
      sum = tmp;
      author = key;
    }
  }
  return { author, likes: sum };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
