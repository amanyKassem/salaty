import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const cridetTransfer = (lang , s_card_identity , r_card_identity , image , amount , token , navigation) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'cridetTransfer',
            method      : 'POST',
            data        : {lang , s_card_identity , r_card_identity , image , amount },
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'cridetTransfer', payload: response.data});
            if (response.data.success){
                navigation.navigate('confirmCredit', {
                    activeCode			: response.data.data.code,
                    trans_id			: response.data.data.trans_id,
                });
            }

            Toast.show({
                text        : response.data.message,
                type        : response.data.success ? "success" : "danger",
                duration    : 3000,
                textStyle   : {
                    color       : "white",
                    fontFamily  : 'cairo',
                    textAlign   : 'center'
                }
            });
        });
    }
};
