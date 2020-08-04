import axios from "axios";
import CONST from "../consts";
import {Toast} from "native-base";


export const checkInquery = (identity, lang) => {
    return (dispatch) => {
        axios({
            url: CONST.url + 'cardBalance',
            method: 'POST',
            data: { identity, lang }
        }).then(response => {

            if (response.data.success){
                Toast.show({
                    text        	: response.data.data.credit,
                    type			: "success",
                    duration    	: 5000,
                    textStyle   	: {
                        color       	: "white",
                        fontFamily  	: 'cairo',
                        textAlign   	: 'center'
                    }
                });
            } else {
                Toast.show({
                    text        	: response.data.message,
                    type			: response.data.success ? "success" : "danger",
                    duration    	: 5000,
                    textStyle   	: {
                        color       	: "white",
                        fontFamily  	: 'cairo',
                        textAlign   	: 'center'
                    }
                });
            }


        })
    }
};
