import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const cardOrder = (lang , token , navigation) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'cradOrder',
            method      : 'POST',
            data        : {lang },
            headers     : {Authorization: token}
        }).then(response => {
            if (response.data.success){
                navigation.navigate('addCardSuccessfully');
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
