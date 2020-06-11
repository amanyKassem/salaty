import axios from "axios";
import CONST from "../consts";


export const getMyCards = (lang , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'userAllCards',
            method      : 'POST',
            data        : {lang},
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getMyCards', payload: response.data});
        });
    }
};
