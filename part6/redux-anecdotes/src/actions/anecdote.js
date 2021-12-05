export const voteAnecdote = (id) => {
    return {
        type: 'VOTE',
        id
    }
}

export const addNew = (content) => {
    return {
        type: 'ADD_NEW',
        content
    }
}