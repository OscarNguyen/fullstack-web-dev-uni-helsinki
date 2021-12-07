import React from 'react'
import AnecdoteForm from './components/AnecdoteForm/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList/AnecdoteList'
import Filter from './components/Filter/Filter'
import Notification from './components/Notification'

const App = () => {
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App