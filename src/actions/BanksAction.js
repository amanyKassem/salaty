import axios from "axios";
import CONST from "../consts";


export const getBanks = (lang , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'banks',
            method      : 'POST',
            data        : {lang},
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getBanks', payload: response.data});
        });
    }
};
