const INITIAL_STATE = { lang: 'ar' };

export default (state = INITIAL_STATE, action) => {
    // console.log('actionLaaaang' , action.payload)
    switch (action.type) {
        case 'chooseLang':
            return { lang: action.payload };
        default:
            return state;
    }
};
