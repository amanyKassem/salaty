import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const confirmCard = (lang , card_identity , phone , image  , token , navigation) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'confirmCard',
            method      : 'POST',
            data        : {lang , card_identity , phone },
            headers     : {Authorization: token}
        }).then(response => {
            if (response.data.success){
                navigation.navigate('activeConfirmCard', {
                    activeCode			: response.data.data.code,
                    credit			    : response.data.data.credit,
                    image,
                    phone,
                    card_identity,
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
