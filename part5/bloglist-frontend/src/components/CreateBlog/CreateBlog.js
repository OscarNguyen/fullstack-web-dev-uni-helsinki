import React, { useState } from 'react';
import classes from './CreateBlog.module.css';
import blogService from '../../services/blogs';

const CreateBlog = (props) => {
  const [userInput, setUserInput] = useState({ title: '', author: '', url: '' });
  const onChangeUserInput = (event) => {
    setUserInput({ ...userInput, [event.target.name]: event.target.value.trim() });
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    if (userInput.title && userInput.author && userInput.url) {
      try {
        const result = await blogService.postBlog(userInput, token.trim());
        console.log('result', result);
        props.onAddBlog(result);
        props.onSetNotification({ type: 'success', text: `A new blog ${result.title} by ${result.author} added` });
      } catch (error) {}
    }
  };
  return (
    <div className={classes['create-blog']}>
      <h1>Create new</h1>
      <form>
        <div className={classes.form}>
          <input type="text" placeholder="title" name="title" onChange={onChangeUserInput} value={userInput.title} />
          <input type="text" placeholder="author" name="author" onChange={onChangeUserInput} value={userInput.author} />
          <input type="text" placeholder="url" name="url" onChange={onChangeUserInput} value={userInput.url} />
        </div>
        <button onClick={onSubmitForm} type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
