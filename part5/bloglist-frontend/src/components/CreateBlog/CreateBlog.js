import React, { useState } from 'react'
import classes from './CreateBlog.module.css'
import blogService from '../../services/blogs'

const CreateBlog = (props) => {
  const [userInput, setUserInput] = useState({ title: '', author: '', url: '' })
  const onChangeUserInput = (event) => {
    setUserInput({ ...userInput, [event.target.name]: event.target.value && event.target.value.trim() })
  }

  const onSubmitForm = async (event) => {
    event.preventDefault()
    const token = localStorage.getItem('token')
    console.log(token)
    if (userInput.title && userInput.author && userInput.url && token) {
      try {
        const result = await blogService.postBlog(userInput, token.trim())
        console.log('result', result)
        props.onAddBlog(result)
        props.onSetNotification({ type: 'success', text: `A new blog ${result.title} by ${result.author} added` })
        props.onCloseForm()
      } catch (error) {
        console.log(error)
      }
    } else if (userInput.title && userInput.author && userInput.url && !token) {
      const title = userInput.title
      const author = userInput.author
      const url = userInput.url
      props.onAddBlog({ title, author, url })

    }
  }
  return (
    <div className={classes['create-blog']}>
      <h1>Create new</h1>
      <form>
        <div className={classes.form}>
          <input id="title" type="text" placeholder="title" name="title" onChange={onChangeUserInput} value={userInput.title} />
          <input id="author" type="text" placeholder="author" name="author" onChange={onChangeUserInput} value={userInput.author} />
          <input id="url" type="text" placeholder="url" name="url" onChange={onChangeUserInput} value={userInput.url} />
        </div>
        <button className="submitBtn" onClick={onSubmitForm} type="submit">
          Create
        </button>
        <button onClick={props.onCloseForm}>Cancel</button>
      </form>
    </div>
  )
}

export default CreateBlog
