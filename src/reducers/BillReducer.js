const INITIAL_STATE = { bill : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'storeBill':

            console.log('this is default loader : ', state.loader, ' coming loader :  ' , action.payload.success);
            return {
                bill: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
