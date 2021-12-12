export const initData = (data) => {
    return {
        type: 'INIT_DATA',
        data
    }
}

export const voteAnecdote = (id) => {
    return {
        type: 'VOTE',
        id
    }
}

export const addNew = (data) => {
    return {
        type: 'ADD_NEW',
        data
    }
}