import React , {useState , useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Switch} from "react-native";
import styles from '../../assets/styles'
import COLORS from "../consts/colors";
import i18n from "../../locale/i18n";
import {ChangeCheck} from '../actions';
import {useDispatch, useSelector} from "react-redux";

function Card({navigation , item}) {

    const [switchValue, setSwitchValue] = useState( item.is_checked);

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);

    const dispatch = useDispatch();

    useEffect(() => {
        setSwitchValue(item.is_checked);
    }, [item.is_checked]);

    function toggleSwitch(value) {
        setSwitchValue(value)
        dispatch(ChangeCheck(lang , item.id , value , token))
    }


    return (

        <View style={{padding:10 , paddingTop:5}}>

            <View style={[styles.directionRow]}>
                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('credit') } :</Text>
                <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.credit }</Text>
            </View>

            <View style={[styles.directionRow]}>
                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('phone') } :</Text>
                <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.phone }</Text>
            </View>

            <View style={[styles.directionRow]}>
                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('status') } :</Text>
                <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.statue }</Text>
            </View>

            <View style={[styles.directionRow]}>
                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('verifyCard') } :</Text>
                <Switch
                    style={{}}
                    onValueChange={() => toggleSwitch(!switchValue)}
                    value={switchValue}
                    trackColor={COLORS.mstarda}
                    thumbColor={COLORS.mstarda}
                />
            </View>

        </View>
    );
}

export default Card;