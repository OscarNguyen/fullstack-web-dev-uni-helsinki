import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { addNew } from '../../actions/anecdote'
import { createNewNotification, resetNotification } from '../../actions/notification'
import { BACKEND_API, createNew } from '../../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const submitForm = async (event) => {
        event.preventDefault();
        console.log(content);
        dispatch(createNewNotification())

        const data = await createNew(content)
        dispatch(addNew(data))

        setTimeout(() => {
            dispatch(resetNotification())
        }, 5000)
    }

    const [content, setContent] = useState("")

    const handleOnChange = event => {
        setContent(event.target.value)
    }

    return <div>
        <h2>create new</h2>
        <form onSubmit={submitForm}>
            <div><input type="text" value={content} onChange={handleOnChange} /></div>
            <button type="submit">create</button>
        </form>
    </div>
}

export default AnecdoteForm