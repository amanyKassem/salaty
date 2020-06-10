import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const getNoti = (lang , isNotify , token ) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'changeNotifyStatue',
            method      : 'POST',
            headers     : { Authorization: token },
            data        : {lang ,isNotify }
        }).then(response => {
            dispatch({type: 'isNotify'});
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
