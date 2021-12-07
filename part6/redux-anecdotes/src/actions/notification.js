export const createNewNotification =()=>({
    type: 'CREATE_NEW'
})

export const voteNotification =(text)=>({
    type: 'VOTE_NOTIFICATION',
    text
})

export const resetNotification =()=>({
    type: 'RESET'
})
