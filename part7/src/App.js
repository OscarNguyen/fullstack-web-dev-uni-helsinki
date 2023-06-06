import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/View/About';
import Menu from './components/View/Menu';
import CreateNew from './components/View/CreateNew';
import AnecdoteList from './components/View/AnecdoteList';
import Footer from './components/View/Footer';
import Anecdote from './components/View/Anecdote';
// import {About, Menu,CreateNew,AnecdoteList,Footer,Anecdote} from './components/View'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState('');

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <Router>
      <h1>Software anecdotes</h1>
      <Menu />
      <Routes>
        <Route path="/anecdotes/:id" exact element={<Anecdote anecdoteList={anecdotes} />} />
        <Route path="/create" exact element={<CreateNew addNew={addNew} />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/" exact element={<AnecdoteList anecdotes={anecdotes} />} />
      </Routes>
      {/* <AnecdoteList anecdotes={anecdotes} />
      <About />
      <CreateNew addNew={addNew} /> */}
      <Footer />
    </Router>
  );
};

export default App;
