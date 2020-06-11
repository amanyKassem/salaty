import axios from "axios";
import CONST from "../consts";


export const getUserCards = (lang , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'userCards',
            method      : 'POST',
            data        : {lang},
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getUserCards', payload: response.data});
        });
    }
};
