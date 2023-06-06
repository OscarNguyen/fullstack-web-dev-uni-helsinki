import React from 'react';
import { useParams } from 'react-router-dom';

const Anecdote = ({ anecdoteList }) => {
  const { id } = useParams();

  const foundAnecdote = anecdoteList.find((anecdote) => anecdote.id.toString() === id);

  return (
    <div>
      <h1>{foundAnecdote?.content}</h1>
      <p>has {foundAnecdote?.votes} votes</p>
      <p>
        for more info see <a href={`${foundAnecdote?.info}`}>{foundAnecdote?.info}</a>
      </p>
    </div>
  );
};

export default Anecdote;
