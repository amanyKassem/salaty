import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const confirmCard = (lang , card_identity , amount , bill_image  , token , navigation) => {
    return async (dispatch) => {
        await axios({
            url         : CONST.url + 'storeBill',
            method      : 'POST',
            data        : {lang , card_identity , amount , bill_image},
            headers     : {Authorization: token}
        }).then(response => {
            if (response.data.success){
                navigation.navigate('activeConfirmCard', {
                    activeCode			: response.data.data.code,
                    credit			    : response.data.data.credit,
                    bill_id			    : response.data.data.bill_id,
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
