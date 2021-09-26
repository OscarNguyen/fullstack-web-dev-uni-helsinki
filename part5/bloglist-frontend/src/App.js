import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import CreateBlog from './components/CreateBlog/CreateBlog';
import Login from './components/Login/Login';
import blogService from './services/blogs';
import axios from 'axios';

const token = localStorage.getItem('token');
console.log(token);
axios.defaults.baseURL = 'http://localhost:3003/';
axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({ type: '', text: '' });

  const getBlogsByUserId = async (userId) => {
    const blogs = await blogService.getByUser(userId);
    setBlogs(blogs);
  };

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  const addBlog = (data) => {
    setBlogs([...blogs, data]);
  };

  useEffect(() => {
    // blogService.getAll().then((blogs) => setBlogs(blogs));
    if (localStorage.getItem('token') && localStorage.getItem('loggedInUser')) {
      const user = JSON.parse(localStorage.getItem('loggedInUser'));
      getBlogsByUserId(user.id);
      setUser(user);
    }
  }, [localStorage.getItem('token'), localStorage.getItem('loggedInUser')]);
  console.log(user);
  console.log(blogs);
  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p> <button onClick={logOut}>Logout</button>
        <CreateBlog onAddBlog={addBlog} />
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <Login onSetUser={setUser} />
      </div>
    );
  }
};

export default App;
