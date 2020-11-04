import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const storeBill = (lang , card_identity , phone , amount , bill_image , card_image  , token , navigation) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'storeBill',
            method      : 'POST',
            data        : {lang ,card_identity , phone , amount , bill_image , card_image },
            headers     : {Authorization: token}
        }).then(response => {
            if (response.data.success){
                navigation.navigate('checkCredit' , {hasCredit : true});
            }
            if (!response.data.success){
                navigation.navigate('checkCredit' , {hasCredit : false});
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


export const activeBill = (lang , bill_id , token, navigation) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'confirmCard',
            method      : 'POST',
            data        : {lang , bill_id },
            headers     : {Authorization: token}
        }).then(response => {
            if (response.data.success){
                navigation.navigate('checkCredit' , {hasCredit : true});
            }
            if (!response.data.success){
                navigation.navigate('checkCredit' , {hasCredit : false});
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
