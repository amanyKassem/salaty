import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const ChangeCheck = (lang , card_id , is_checked , token  ) => {
    return (dispatch) => {
        axios({
            url         : CONST.url + 'changeCheckCard',
            method      : 'POST',
            data        : {lang ,  card_id , is_checked },
            headers     : {Authorization: token}
        }).then(response => {

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
