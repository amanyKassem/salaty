import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const confirmTransferCard = (lang , trans_id , token , navigation) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'confirmTransferCards',
            method      : 'POST',
            data        : {lang , trans_id },
            headers     : {Authorization: token}
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
