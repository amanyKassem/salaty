import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const addConatct = (lang , name , email , message , token , navigation ) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'addConatct',
            method      : 'POST',
            data        : {lang ,  name , email , message },
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
