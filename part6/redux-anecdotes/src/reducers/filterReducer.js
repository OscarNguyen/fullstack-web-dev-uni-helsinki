const initialState = ''

const filter = (state = initialState, action) => {
    switch (action.type) {
        case 'ON_CHANGE': {
            return action.text
        }
        default:
            return state
    }
}

export default filter