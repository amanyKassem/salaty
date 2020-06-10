import React, { useState , useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, KeyboardAvoidingView, ActivityIndicator} from "react-native";
import {Container, Content, Form, Item, Label, Input, Toast} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import {useDispatch, useSelector} from "react-redux";
import {changePass} from '../actions';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const isIOS = Platform.OS === 'ios';

function EditPassword({navigation , route}) {

    const authType = route.params.authType ;
    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user.data.token);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [newpass, setNewpass] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [newpassStatus, setNewpassStatus] = useState(0);
    const [passwordStatus, setPasswordStatus] = useState(0);
    const [confirmPassStatus, setConfirmPassStatus] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsSubmitted(false)
    }, [isSubmitted]);


    function renderConfirm(){
        if (password == '' || newpass == '' || confirmPass == ''){
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
        if (isSubmitted){
            return(
                <View style={[{ justifyContent: 'center', alignItems: 'center' } , styles.marginTop_20 , styles.marginBottom_25]}>
                    <ActivityIndicator size="large" color={COLORS.mstarda} style={{ alignSelf: 'center' }} />
                </View>
            )
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
        }else if(newpass !== confirmPass){
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
            setIsSubmitted(true)
            dispatch(changePass(lang , password , confirmPass , token , navigation , authType));
        }
    }

    function activeInput(type) {

        if (type === 'newpass' || newpass !== '') {
            setNewpassStatus(1)
        }

        if (type === 'password' || password !== '') {
            setPasswordStatus(1)
        }

        if (type === 'confirmPass' || confirmPass !== '') {
            setConfirmPassStatus(1)
        }

    }

    function unActiveInput(type) {

        if (type === 'newpass' && newpass === '') {
            setNewpassStatus(0)
        }

        if (type === 'password' && password === '') {
            setPasswordStatus(0)
        }

        if (type === 'confirmPass' && confirmPass === '') {
            setConfirmPassStatus(0)
        }

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
                                <Image source={require('../../assets/images/notifcation_non_active.png')} style={[styles.icon25]} resizeMode={'contain'} />
                            </TouchableOpacity>
                            :
                            <View/>
                    }

                </View>


                <View style={[styles.bgFullWidth,styles.bg_White,styles.paddingHorizontal_20,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.directionRow,styles.marginBottom_35]}>
                        <Image source={require('../../assets/images/setting_small.png')} style={[styles.icon35 , styles.marginBottom_7]} resizeMode={'contain'} />
                        <View style={{marginLeft:15}}>
                            <Text style={[styles.textBold , styles.text_black , styles.textSize_14, styles.alignStart]}>{ i18n.t('password') }</Text>
                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13, styles.alignStart]}>{ i18n.t('changeYourPass') }</Text>
                        </View>
                    </View>

                    <KeyboardAvoidingView style={[styles.Width_100]}>
                        <Form style={[styles.Width_100 , styles.flexCenter]}>

                            <View style={[styles.height_70, styles.flexCenter, styles.marginBottom_7]}>
                                <Item floatingLabel style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:passwordStatus === 1 ?  COLORS.green :  COLORS.gray , top:2}]}>{ i18n.t('oldPassword') }</Label>
                                    <Input style={[styles.input, styles.height_50, (passwordStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(password) => setPassword(password)}
                                           onBlur={() => unActiveInput('password')}
                                           onFocus={() => activeInput('password')}
                                           secureTextEntry
                                    />
                                </Item>
                            </View>

                            <View style={[styles.height_70, styles.flexCenter, styles.marginBottom_7]}>
                                <Item floatingLabel style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:newpassStatus === 1 ?  COLORS.green :  COLORS.gray , top:2}]}>{ i18n.t('newpass') }</Label>
                                    <Input style={[styles.input, styles.height_50, (newpassStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(newpass) => setNewpass(newpass)}
                                           onBlur={() => unActiveInput('newpass')}
                                           onFocus={() => activeInput('newpass')}
                                           secureTextEntry
                                    />
                                </Item>
                            </View>

                            <View style={[styles.height_70, styles.flexCenter, styles.marginBottom_7]}>
                                <Item floatingLabel style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:confirmPassStatus === 1 ?  COLORS.green :  COLORS.gray , top:2}]}>{ i18n.t('confirmNewPass') }</Label>
                                    <Input style={[styles.input, styles.height_50, (confirmPassStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(confirmPass) => setConfirmPass(confirmPass)}
                                           onBlur={() => unActiveInput('confirmPass')}
                                           onFocus={() => activeInput('confirmPass')}
                                           secureTextEntry
                                    />
                                </Item>
                            </View>


                            {renderConfirm()}

                        </Form>
                    </KeyboardAvoidingView>

                </View>

            </Content>
        </Container>
    );
}

export default EditPassword;


