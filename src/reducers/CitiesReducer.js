const INITIAL_STATE = { cities : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getCities':
            return {
                cities: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
