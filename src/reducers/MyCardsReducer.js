const INITIAL_STATE = { myCards : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getMyCards':
            return {
                myCards: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
