



const initialState = []

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case 'VOTE': {
      const foundAnecdote = state.find(item => item.id === action.id)

      const modifiedAnecdote = {
        ...foundAnecdote, votes: ++foundAnecdote.votes
      }

      return state.map(item => item.id === action.id ? modifiedAnecdote : item)
    }

    case 'ADD_NEW': {
      return [...state, action.data]
    }

    case 'INIT_DATA': {
      return action.data
    }



    default: {
      return state
    }
  }
}

export default reducer