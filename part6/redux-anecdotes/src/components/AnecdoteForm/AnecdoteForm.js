import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNew } from '../../actions/anecdote'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const submitForm = event => {
        event.preventDefault();
        console.log(content);
        dispatch(addNew(content))
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