import React, { useState , useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ImageBackground, KeyboardAvoidingView, I18nManager, AsyncStorage, ActivityIndicator } from "react-native";
import {Container, Content, Form, Input, Item, Label, Toast} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import {useSelector, useDispatch} from 'react-redux';
import {userLogin} from '../actions';
import * as Permissions from 'expo-permissions';
import {Notifications} from 'expo'

function Login({navigation}) {


    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [deviceId, setDeviceId] = useState('');
    const [userId, setUserId] = useState(null);
    const [phoneStatus, setPhoneStatus] = useState(0);
    const [passwordStatus, setPasswordStatus] = useState(0);
    const [spinner, setSpinner] = useState(false);

    const getDeviceId = async () => {
        const {status: existingStatus} = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );

        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            return;
        }

        const deviceId = await Notifications.getExpoPushTokenAsync();

        setDeviceId(deviceId);
        setUserId(null);

        AsyncStorage.setItem('deviceID', deviceId);
    };

    useEffect(() => {
        getDeviceId()
    }, []);

    useEffect(() => {
        setTimeout(() => setSpinner(false), 500);
    }, [spinner]);


    function activeInput(type) {
        if (type === 'phone' || phone !== '') setPhoneStatus(1);
        if (type === 'password' || password !== '') setPasswordStatus(1);
    }

    function unActiveInput(type) {
        if (type === 'phone' && phone === '') setPhoneStatus(0);
        if (type === 'password' && password === '') setPasswordStatus(0);
    }

    function validate() {
        let isError = false;
        let msg = '';

        if (phone.length <= 0) {
            isError = true;
            msg = i18n.t('namereq');
        } else if (password.length < 6) {
            isError = true;
            msg = i18n.t('passreq');
        }
        if (msg !== '') {
            Toast.show({
                text: msg,
                type: "danger",
                duration: 3000,
                textStyle: {
                    color: "white",
                    fontFamily: 'sukar',
                    textAlign: 'center',
                }
            });
        }
        return isError;
    };

    function renderSubmit() {
        if (password == '' || phone == '') {
            return (
                <View
                    style={[styles.greenBtn , styles.Width_100 , styles.marginTop_40 , {
                        backgroundColor:'#ccc'
                    }]}
                >
                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('login') }</Text>
                </View>
            );
        }

        return (
            <TouchableOpacity
                onPress={() => onLoginPressed()} style={[styles.greenBtn , styles.Width_100 , styles.marginTop_40]}>
                <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('login') }</Text>
            </TouchableOpacity>
        );
    }

    function onLoginPressed() {
        const err = validate();

        if (!err){
            setSpinner(true);
            // dispatch(userLogin(phone, password, deviceId , lang , navigation));
        }
    }

    function renderLoader(){
        if (spinner){
            return(
                <View style={[styles.loading, styles.flexCenter, {height:'100%'}]}>
                    <ActivityIndicator size="large" color={COLORS.blue} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }

    return (
        <Container>
            {renderLoader()}
                <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_green]}>

                    <Image source={require('../../assets/images/login_vector.png')} style={[styles.icon220 , {top:40 , left:30 , zIndex:1}]} resizeMode={'contain'} />

                    <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                        styles.Width_100, styles.directionColumn, styles.paddingTop_30,
                       {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>
                       <Image source={require('../../assets/images/logo_login.png')} style={[styles.icon100 , styles.marginBottom_35]} resizeMode={'contain'} />
                       <KeyboardAvoidingView style={[styles.Width_100]}>
                           <Form style={[styles.Width_100 , styles.flexCenter]}>
                               <View style={[styles.height_70, styles.flexCenter, styles.marginBottom_7]}>
                                   <Item floatingLabel style={[styles.item]}>
                                       <Label style={[styles.label, styles.textRegular ,{ color:phoneStatus === 1 ?  COLORS.green :  COLORS.gray}]}>{ i18n.t('phone') }</Label>
                                       <Input style={[styles.input, styles.height_50, (phoneStatus === 1 ? styles.Active : styles.noActive)]}
                                              onChangeText={(phone) => setPhone(phone)}
                                              onBlur={() => unActiveInput('phone')}
                                              onFocus={() => activeInput('phone')}
                                              keyboardType={'number-pad'}
                                       />
                                   </Item>
                               </View>
                               <View style={[styles.height_70, styles.flexCenter, styles.marginBottom_7 ]}>
                                   <Item floatingLabel style={[styles.item]}>
                                       <Label style={[styles.label, styles.textRegular ,{ color:passwordStatus === 1 ?  COLORS.green :  COLORS.gray}]}>{ i18n.t('password') }</Label>
                                       <Input style={[styles.input, styles.height_50, (passwordStatus === 1 ? styles.Active : styles.noActive)]}
                                              onChangeText={(password) => setPassword(password)}
                                              onBlur={() => unActiveInput('password')}
                                              onFocus={() => activeInput('password')}
                                              secureTextEntry
                                       />
                                   </Item>
                               </View>

                               <TouchableOpacity onPress={() => navigation.push('forgetPass')} style={[{alignSelf:'flex-end'}]}>
                                   <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('forgetPassword') }</Text>
                               </TouchableOpacity>

                               {renderSubmit()}

                               <TouchableOpacity onPress={() => navigation.push('register')} style={[styles.directionRow , styles.marginTop_60 , styles.marginBottom_15]}>
                                   <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('haveNoAcc') }</Text>
                                   <Text style={[styles.textRegular , styles.text_green , styles.textSize_14 , {marginLeft:5}]}>{ i18n.t('createAcc') }</Text>
                               </TouchableOpacity>

                           </Form>
                       </KeyboardAvoidingView>
                   </View>
                </Content>
        </Container>
    );
}

export default Login;


