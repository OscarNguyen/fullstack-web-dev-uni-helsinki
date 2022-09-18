const initialState = []

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case 'VOTE': {
      return state.map(item => item.id === action.data.id ? action.data : item)
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