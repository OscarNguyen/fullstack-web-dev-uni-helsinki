import axios from 'axios'

export const BACKEND_API = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const initData = () => {
    return async dispatch => {
        const response = await axios.get(BACKEND_API)
        console.log(response)
        dispatch({
            type: 'INIT_DATA',
            data: response.data
        })
    }
}

export const voteAnecdote = ({ votes, content, id }) => {
    return async dispatch => {
        const data = { votes: ++votes, content, id }
        const response = await axios.put(`${BACKEND_API}/${id}`, data)
        dispatch({
            type: 'VOTE',
            data: response.data
        })
    }
}

export const addNew = (content) => {
    return async dispatch => {
        const data = { votes: 0, content, id: getId() }

        const response = await axios.post(BACKEND_API, data)

        dispatch({
            type: 'ADD_NEW',
            data: response.data
        })
    }
}

