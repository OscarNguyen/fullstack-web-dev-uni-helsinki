import React, { useState } from 'react'
import classes from './Blog.module.css'
import blogService from '../../services/blogs'

const Blog = ({ blog, onUpdateBlog }) => {
  const [isOpen, setIsOpen] = useState(false)
  let [likes, setLikes] = useState(blog.likes)

  const updateBlog = async (blogId) => {
    const blogData = { title: blog.title, author: blog.author, url: blog.url, likes: ++blog.likes }
    setLikes(++likes)
    const result = await blogService.updateBlog(blogId, blogData)
    console.log(result)
  }

  const deleteBlog = async (blogId) => {
    const isDelete = window.confirm(`Remove blog ${blog.title}`)
    if (isDelete) {
      try {
        await blogService.deleteBlog(blogId)
        onUpdateBlog(true)
      } catch (error) {
        console.log(error)
      }
    }
  }
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
  // console.log(loggedInUser);
  return (
    <div className={classes.blog}>
      <div className="summary">

        {blog.title} {blog.author}
      </div>
      <button onClick={() => setIsOpen(!isOpen)} className={classes.btn}>
        View
      </button>
      {isOpen && (
        <div >
          <div className="details">
            <p>{blog.url}</p>
            <span>{likes}</span>
          </div>
          <button className="likeBtn"
            onClick={() => {
              updateBlog(blog.id)
            }}
          >
            Like
          </button>
          <p>{blog.author}</p>
          {blog.user && blog.user.id === loggedInUser.id ? (
            <button onClick={() => deleteBlog(blog.id)}>Remove</button>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default Blog
