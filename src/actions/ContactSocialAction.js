import axios from "axios";
import CONST from "../consts";


export const getSocial = (lang , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'contact-social',
            method      : 'POST',
            data        : {lang},
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getSocial', payload: response.data});
        });
    }
};
