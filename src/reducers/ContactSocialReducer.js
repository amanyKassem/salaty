const INITIAL_STATE = { contactSocial : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getSocial':
            return {
                contactSocial: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
