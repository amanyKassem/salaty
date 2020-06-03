import React, { useState , useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ImageBackground, KeyboardAvoidingView, I18nManager, AsyncStorage, ActivityIndicator } from "react-native";
import {Container, Content, Form, Input, Item, Label, Toast} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";

function ChangePass({navigation}) {


    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [passwordStatus, setPasswordStatus] = useState(0);
    const [confirmPassStatus, setConfirmPassStatus] = useState(0);
    const [spinner, setSpinner] = useState(false);


    useEffect(() => {
        setTimeout(() => setSpinner(false), 500);
    }, [spinner]);


    function activeInput(type) {
        if (type === 'password' || password !== '') setPasswordStatus(1);
        if (type === 'confirmPass' || confirmPass !== '') setConfirmPassStatus(1);
    }

    function unActiveInput(type) {
        if (type === 'password' && password === '') setPasswordStatus(0);
        if (type === 'confirmPass' && confirmPass === '') setConfirmPassStatus(0);
    }

    function renderSubmit() {
        if (password == '' || confirmPass == '') {
            return (
                <View
                    style={[styles.greenBtn , styles.Width_100 , styles.marginTop_20 , styles.marginBottom_25 , {
                        backgroundColor:'#ccc'
                    }]}
                >
                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('save') }</Text>
                </View>
            );
        }

        return (
            <TouchableOpacity
                onPress={() => onConfirm()} style={[styles.greenBtn , styles.Width_100 , styles.marginTop_20 , styles.marginBottom_25]}>
                <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('save') }</Text>
            </TouchableOpacity>
        );
    }

    function onConfirm(){

        if (confirmPass.length < 6){
            Toast.show({
                text        : i18n.t('passreq'),
                type        : "danger",
                duration    : 3000,
                textStyle   : {
                    color       : "white",
                    fontFamily  : 'cairo',
                    textAlign   : 'center'
                }
            });
            return false
        }else if(password !== confirmPass){
            Toast.show({
                text        : i18n.t('passError'),
                type        : "danger",
                duration    : 3000,
                textStyle   : {
                    color       : "white",
                    fontFamily  : 'cairo',
                    textAlign   : 'center'
                }
            });
            return false
        } else {
            // setIsSubmitted(true)
            navigation.navigate('login')
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

                <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.marginTop_35 , {marginLeft:15}]}>
                    <Image source={require('../../assets/images/back_arrow.png')} style={[styles.icon25, styles.transform]} resizeMode={'contain'} />
                </TouchableOpacity>

                <Image source={require('../../assets/images/login_vector.png')} style={[styles.icon220 , {top:40 , left:30 , zIndex:1}]} resizeMode={'contain'} />

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.directionColumn, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>
                    <Image source={require('../../assets/images/logo_login.png')} style={[styles.icon100]} resizeMode={'contain'} />

                    <Text style={[styles.textRegular , styles.text_black , styles.textCenter , styles.textSize_16 , styles.marginBottom_35]}>{ i18n.t('enterPass') }</Text>


                    <KeyboardAvoidingView style={[styles.Width_100]}>
                        <Form style={[styles.Width_100 , styles.flexCenter]}>
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
                            <View style={[styles.height_70, styles.flexCenter, styles.marginBottom_7 ]}>
                                <Item floatingLabel style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:confirmPassStatus === 1 ?  COLORS.green :  COLORS.gray}]}>{ i18n.t('confirmPass') }</Label>
                                    <Input style={[styles.input, styles.height_50, (confirmPassStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(confirmPass) => setConfirmPass(confirmPass)}
                                           onBlur={() => unActiveInput('confirmPass')}
                                           onFocus={() => activeInput('confirmPass')}
                                           secureTextEntry
                                    />
                                </Item>
                            </View>

                            {renderSubmit()}

                        </Form>
                    </KeyboardAvoidingView>
                </View>
            </Content>
        </Container>
    );
}

export default ChangePass;


