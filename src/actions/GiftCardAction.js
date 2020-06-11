import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const giftCard = (lang , phone , card_id , notes , token , navigation , authType) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'giftCard',
            method      : 'POST',
            data        : {lang , phone , card_id , notes },
            headers     : {Authorization: token}
        }).then(response => {
            if (response.data.success){
                navigation.navigate('giftCardSuccessfully',{ authType });
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
