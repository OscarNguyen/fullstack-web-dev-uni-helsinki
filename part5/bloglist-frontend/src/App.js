import React, { useState, useEffect } from 'react'
import Blog from './components/Blog/Blog'
import CreateBlog from './components/CreateBlog/CreateBlog'
import Login from './components/Login/Login'
import blogService from './services/blogs'
import axios from 'axios'
import Notification from './components/Notification/Notification'

const token = localStorage.getItem('token')
console.log(token)
axios.defaults.baseURL = 'http://localhost:3003/'
axios.defaults.headers.common = { Authorization: `Bearer ${token}` }
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ type: '', text: '' })
  const [isCreateBlogFormOpen, setIsCreateBlogFromOpen] = useState(false)

  const [isUpdateBlog, setIsUpdateBlog] = useState(false)

  // const getBlogsByUserId = async (userId) => {
  //   const blogs = await blogService.getByUser(userId)
  //   setBlogs(blogs)
  // }
  const getBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const logOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const addBlog = (data) => {
    setBlogs([...blogs, data])
  }
  useEffect(() => {
    getBlogs()
  }, [isUpdateBlog])
  useEffect(() => {
    // blogService.getAll().then((blogs) => setBlogs(blogs));
    if (localStorage.getItem('token') && localStorage.getItem('loggedInUser')) {
      const user = JSON.parse(localStorage.getItem('loggedInUser'))
      // getBlogsByUserId(user.id);
      getBlogs()
      setUser(user)
    }
  }, [localStorage.getItem('token'), localStorage.getItem('loggedInUser')])
  console.log(user)
  console.log(blogs)

  useEffect(() => {
    setTimeout(() => {
      setNotification({ type: null, text: null })
    }, 2000)
  }, [notification.text])
  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification type={notification.type}>{notification.text}</Notification>
        <p>{user.name} logged in</p> <button onClick={logOut}>Logout</button>
        <br />
        <button className="openBlogForm" style={{ marginTop: '2rem' }} onClick={() => setIsCreateBlogFromOpen(!isCreateBlogFormOpen)}>
          Create new blog
        </button>
        {isCreateBlogFormOpen && (
          <CreateBlog
            onCloseForm={() => setIsCreateBlogFromOpen(false)}
            onAddBlog={addBlog}
            onSetNotification={setNotification}
          />
        )}
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} onUpdateBlog={setIsUpdateBlog} blog={blog} />
          ))}
      </div>
    )
  } else {
    return (
      <div>
        <Notification type={notification.type}>{notification.text}</Notification>

        <Login onSetNotification={setNotification} onSetUser={setUser} />
      </div>
    )
  }
}

export default App
