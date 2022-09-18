let timeId = null

export const createNewNotification = (time) => {
    return async dispatch => {
        dispatch({ type: 'CREATE_NEW' })

        if (timeId) {
            clearTimeout(timeId)
        }

        timeId = setTimeout(() =>
            dispatch({
                type: 'RESET',
            }), time
        )
    }
}

export const voteNotification = (text, time) => {
    return async (dispatch) => {
        dispatch(
            {
                type: 'VOTE_NOTIFICATION',
                text
            }
        )

        if (timeId) {
            clearTimeout(timeId)
        }

        timeId = setTimeout(() => {
            dispatch({
                type: 'RESET',
            })
        }, time
        )
    }
}

export const resetNotification = () => ({
    type: 'RESET'
})

