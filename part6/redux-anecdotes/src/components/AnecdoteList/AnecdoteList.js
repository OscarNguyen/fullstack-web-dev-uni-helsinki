import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../../actions/anecdote'
import { resetNotification, voteNotification } from '../../actions/notification'

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(({ anecdote, filter }) => {
        if (filter && filter.trim().length !== 0) {
           
            return anecdote.filter(item=>item.content===filter).sort((a, b) =>
            a.votes - b.votes
            )
        }
        return anecdote.sort((a, b) =>
        a.votes - b.votes
    )
        
    })

    const vote = (id, message) => {

        dispatch(voteNotification(message))

        dispatch(voteAnecdote(id))

        setTimeout(() => {
            dispatch(resetNotification())
        }, 5000)
    }

    return <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                </div>
            </div>
        )}
    </div>
}

export default AnecdoteList