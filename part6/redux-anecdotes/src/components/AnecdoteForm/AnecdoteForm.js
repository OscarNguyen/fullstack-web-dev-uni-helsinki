import React, { useState } from 'react'
import { useDispatch, connect } from 'react-redux'

import { addNew } from '../../actions/anecdote'
import { createNewNotification, resetNotification } from '../../actions/notification'

const AnecdoteForm = (props) => {
    const [content, setContent] = useState("")

    // const dispatch = useDispatch()

    const submitForm = async (event) => {
        event.preventDefault();

        props.createNewNotification(5000)

        // const data = await createNew(content)
        props.addNew(content)

        setTimeout(() => {
            props.resetNotification()
        }, 5000)
    }


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

const mapDispatchToProps = {
    createNewNotification,
    resetNotification,
    addNew
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm