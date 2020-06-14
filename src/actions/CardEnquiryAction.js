import axios from "axios";
import CONST from "../consts";


export const getCardEnquiry = (lang , card_id , type , token) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'cardEnquiry',
            method      : 'POST',
            data        : {lang , card_id , type},
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getCardEnquiry', payload: response.data});
        });
    }
};
