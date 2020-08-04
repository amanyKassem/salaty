import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const getCardRecharge = (lang , user_name , account_number , amount, bank_name , image , bank_id , card_identity , token , navigation ) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'cardRecharge',
            method      : 'POST',
            headers     : { Authorization: token },
            data        : {lang ,user_name , account_number , amount , bank_name , image , bank_id , card_identity }
        }).then(response => {

            if (response.data.success){
                navigation.navigate('home');
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
