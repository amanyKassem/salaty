import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const addComplaint = (lang , user_name , email , subject , message , token , navigation ) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'addComplaint',
            method      : 'POST',
            data        : {lang , user_name , email , subject , message },
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
