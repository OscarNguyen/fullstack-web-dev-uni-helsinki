import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useField } from '../../hooks';

const CreateNew = ({ addNew, setNotification }) => {
  const { htmlAttributes: content, reset: resetContent } = useField('content', 'text');
  const { htmlAttributes: author, reset: resetAuthor } = useField('author', 'text');
  const { htmlAttributes: info, reset: resetInfo } = useField('info', 'text');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });

    navigate('/');

    setNotification(`A new anecdote ${content.value} created!`);
  };

  const resetValues = (event) => {
    event.preventDefault();

    resetContent();
    resetAuthor();
    resetInfo();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button onClick={resetValues}>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
