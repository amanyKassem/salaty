import React from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, Dimensions} from "react-native";
import {Container, Content} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import { useSelector} from "react-redux";

const isIOS = Platform.OS === 'ios';
const height    = Dimensions.get('window').height;
const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

function Profile({navigation , route}) {

    const authType = route.params.authType ;
    const notifications = useSelector(state => state.notifications.notifications);

    const user      = useSelector(state => state.auth.user ? state.auth.user.data : { avatar: '../../assets/images/user_small_icon.png', name: null, email: null, phone: null });

    return (
       <Container style={[styles.bg_green]}>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_green]}>

                <View style={[IS_IPHONE_X ? styles.marginTop_5 : styles.marginTop_25 , styles.marginHorizontal_15 , styles.directionRowSpace]}>
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
                        <Image source={{uri:user.avatar}} style={[styles.icon35 , styles.marginBottom_7]} resizeMode={'contain'} />
                        <View style={{marginLeft:15}}>
                            <Text style={[styles.textBold , styles.text_black , styles.textSize_14, styles.alignStart]}>{ i18n.t('profile') }</Text>
                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13, styles.alignStart]}>{ i18n.t('yourInfo') }</Text>
                        </View>
                    </View>

                    <View style={[styles.directionRow , styles.borderBottomGray , styles.paddingHorizontal_25, styles.marginBottom_15,{paddingBottom:15}]}>
                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 , styles.width_90, {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{ i18n.t('name') }</Text>
                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 , { marginRight:20}]}> : </Text>
                        <Text style={[styles.textRegular , styles.text_black , styles.textSize_14]}>{user.name}</Text>
                    </View>

                    <View style={[styles.directionRow , styles.borderBottomGray , styles.paddingHorizontal_25, styles.marginBottom_15,{paddingBottom:15}]}>
                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 , styles.width_90, {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{ i18n.t('phone') }</Text>
                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 , {marginRight:20}]}> : </Text>
                        <Text style={[styles.textRegular , styles.text_black , styles.textSize_14]}>{user.phone}</Text>
                    </View>

                    {
                        authType === 'user' ?
                            <View
                                style={[styles.directionRow, styles.paddingHorizontal_25, styles.marginBottom_15, {paddingBottom: 15}]}>
                                <Text
                                    style={[styles.textRegular, styles.text_gray, styles.textSize_14, styles.width_90, {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{i18n.t('city')}</Text>
                                <Text
                                    style={[styles.textRegular, styles.text_gray, styles.textSize_14, {marginRight: 20}]}> : </Text>
                                <Text
                                    style={[styles.textRegular, styles.text_black, styles.textSize_14]}>{user.city}</Text>
                            </View>
                            :
                            null
                    }



                    <TouchableOpacity onPress={ () => navigation.push('editData',{ authType })} style={[styles.greenBtn , styles.Width_87 , styles.SelfCenter , styles.marginTop_25]}>
                        <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('editData') }</Text>
                    </TouchableOpacity>

                </View>

            </Content>
           {
               IS_IPHONE_X ?
                   <View style={[styles.bg_White , {height:40 , zIndex:1}]}/>
                   :
                   null
           }
        </Container>
    );
}

export default Profile;


