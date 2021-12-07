const initialState = "";

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_NEW": {
            return 'Successfully created';
        }
        
        case "VOTE_NOTIFICATION": {
            return `You voted ' ${action.text} '`;
        }

        case 'RESET':{
            return ''
        }
        
        default: {
            return state;
        }
    }
};

export default reducer;
