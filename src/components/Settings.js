import React, { useState , useEffect} from "react";
import {View, Text, Image, TouchableOpacity , Switch} from "react-native";
import {Container, Content} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";;
import {useDispatch, useSelector} from "react-redux";
import {getNoti} from "../actions";

const isIOS = Platform.OS === 'ios';

function Settings({navigation , route}) {

    const authType = route.params.authType ;

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    let isNotify = useSelector(state => state.auth.isNotify);
    const notifications = useSelector(state => state.notifications.notifications);

    const [switchValue, setSwitchValue] = useState(isNotify);

    const dispatch = useDispatch();

    useEffect(() => {
        setSwitchValue(isNotify);
    }, [isNotify]);

    function toggleSwitch(value) {
        setSwitchValue(value)
        dispatch(getNoti(lang , value , token))
    }

    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_green]}>

                <View style={[styles.marginTop_25 , styles.marginHorizontal_15 , styles.directionRowSpace]}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/images/back_arrow.png')} style={[styles.icon25, styles.transform]} resizeMode={'contain'} />
                    </TouchableOpacity>

                    <Image source={require('../../assets/images/logo_in_app.png')} style={[styles.icon100,{right: authType === 'user' ? 0 : 12}]} resizeMode={'contain'} />

                    {
                        authType === 'user' ?
                            <TouchableOpacity onPress={() => navigation.push('notification')}>
                                {
                                    notifications && (notifications).length > 0 ?
                                        <Image source={require('../../assets/images/notifcation_active.png')} style={[styles.icon25]} resizeMode={'contain'} />
                                        :
                                        <Image source={require('../../assets/images/notifcation_non_active.png')} style={[styles.icon25]} resizeMode={'contain'} />
                                }
                            </TouchableOpacity>
                            :
                            <View/>
                    }

                </View>


                <View style={[styles.bgFullWidth,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.directionRow,styles.marginBottom_35 , styles.paddingHorizontal_25]}>
                        <Image source={require('../../assets/images/setting_small.png')} style={[styles.icon35 , styles.marginBottom_7]} resizeMode={'contain'} />
                        <View style={{marginLeft:15}}>
                            <Text style={[styles.textBold , styles.text_black , styles.textSize_14, styles.alignStart]}>{ i18n.t('settings') }</Text>
                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13, styles.alignStart]}>{ i18n.t('controlSettings') }</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => navigation.push('editPassword', {authType})} style={[styles.directionRowSpace , styles.borderBottomGray , styles.paddingHorizontal_25, styles.marginBottom_15,{paddingBottom:15}]}>
                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_15]}>{ i18n.t('password') }</Text>
                        <Image source={require('../../assets/images/arrow_gray_side.png')} style={[styles.icon20, styles.transform, {left:10}]} resizeMode={'contain'} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.push('language', {authType})} style={[styles.directionRowSpace , styles.borderBottomGray , styles.paddingHorizontal_25, styles.marginBottom_15,{paddingBottom:15}]}>
                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_15]}>{ i18n.t('language') }</Text>
                        <Image source={require('../../assets/images/arrow_gray_side.png')} style={[styles.icon20, styles.transform, {left:10}]} resizeMode={'contain'} />
                    </TouchableOpacity>
                    {
                        authType === 'user' ?

                            <View
                                style={[styles.directionRowSpace, styles.borderBottomGray, styles.paddingHorizontal_25, styles.marginBottom_15, {paddingBottom: 15}]}>
                                <Text
                                    style={[styles.textRegular, styles.text_gray, styles.textSize_15]}>{i18n.t('notifications')}</Text>
                                <Switch
                                    style={{left: 10}}
                                    onValueChange={() => toggleSwitch(!switchValue)}
                                    value={switchValue}
                                    trackColor={COLORS.mstarda}
                                    thumbColor={COLORS.mstarda}
                                />
                            </View>
                            :
                            null
                    }

                </View>

            </Content>
        </Container>
    );
}

export default Settings;


