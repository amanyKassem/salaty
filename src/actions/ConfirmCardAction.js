import axios from "axios";
import CONST from "../consts";
import { Toast } from "native-base";
import Casher from "../components/Casher";


export const confirmCard = (lang, card_identity, amount, bill_image, token, navigation) => {
    return async (dispatch) => {
        await axios({
            url: CONST.url + 'storeBill',
            method: 'POST',
            data: { lang, card_identity, amount, },
            headers: { Authorization: token }
        }).then(response => {

            const imgBody = new FormData();

            imgBody.append('bill_image', bill_image);
            imgBody.append('bill_id', response.data.data.bill_id);


            axios.post(CONST.url + 'uploadeImage', imgBody).then(response => {
                if (response.data.success && response.data.data.is_checked) {
                    navigation.navigate('activeConfirmCard', {
                        activeCode: response.data.data.code,
                        credit: response.data.data.credit,
                        bill_id: response.data.data.bill_id,
                    });
                } else if (response.data.success) {

                    axios({
                        url         : CONST.url + 'confirmCard',
                        method      : 'POST',
                        data        : {lang , bill_id:response.data.data.bill_id },
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

                    // navigation.navigate('casher');
                }

                Toast.show({
                    text: response.data.message,
                    type: response.data.success ? "success" : "danger",
                    duration: 3000,
                    textStyle: {
                        color: "white",
                        fontFamily: 'cairo',
                        textAlign: 'center'
                    }
                });
            })


        }
        )
    }
}

