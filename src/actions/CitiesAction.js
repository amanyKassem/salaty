import axios from "axios";
import CONST from "../consts";


export const getCities = (lang) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'cities',
            method      : 'POST',
            data        : {lang},
            // headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getCities', payload: response.data});
        });
    }
};
