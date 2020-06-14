const INITIAL_STATE = { cardEnquiry : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getCardEnquiry':
            return {
                cardEnquiry: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
