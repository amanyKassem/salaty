const INITIAL_STATE = { userCards : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getUserCards':
            return {
                userCards: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
