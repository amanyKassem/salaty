import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const transferCard = (lang , card_identity , phone , notes , token , navigation) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'TransferCards',
            method      : 'POST',
            data        : {lang , card_identity , phone , notes },
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'transferCard', payload: response.data});
            if (response.data.success){
                navigation.navigate('activateCard', {
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
