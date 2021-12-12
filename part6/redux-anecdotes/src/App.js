import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAll } from './services/anecdotes'
import AnecdoteForm from './components/AnecdoteForm/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList/AnecdoteList'
import Filter from './components/Filter/Filter'
import Notification from './components/Notification'
import { initData } from './actions/anecdote'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    fetchAll().then(anecdotes => dispatch(initData(anecdotes)))
  }, [dispatch])

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