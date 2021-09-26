import React, { useState } from 'react';
import classes from './App.module.css';
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients',
  ];

  const [selected, setSelected] = useState(0);

  const [vote, setVote] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });

  let voteArray = [];

  let maxIndex = null;

  const generateNewAnecdote = () => {
    let index = Math.floor(Math.random() * anecdotes.length);
    setSelected(index);
  };

  const voteHandler = () => {
    setVote((prev) => ({ ...prev, [selected]: vote[selected] + 1 }));
  };

  for (let key in vote) {
    voteArray.push(vote[key]);
  }

  let maxVote = Math.max(...voteArray);

  for (let key in vote) {
    if (maxVote === vote[key]) {
      maxIndex = key;
    }
  }

  return (
    <div className={classes.root}>
      <h1>Anecdote of the day</h1>
      <p>
        {anecdotes[selected]} has votes of {vote[selected]}
      </p>
      <button onClick={voteHandler}>Vote</button>
      <button onClick={generateNewAnecdote}>Next anecdotes</button>
      <h1>The most votes of Anecdote </h1>
      <p>
        {anecdotes[maxIndex]} has highest votes of {vote[maxIndex]}
      </p>
    </div>
  );
};

export default App;
