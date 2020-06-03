import React, { useState , useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ImageBackground, KeyboardAvoidingView, I18nManager, AsyncStorage, ActivityIndicator } from "react-native";
import {Container, Content, Form, Input, Item, Label, Toast} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import RNPickerSelect from 'react-native-picker-select';


function Register({navigation}) {


    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [fullNameStatus, setFullNameStatus] = useState(0);
    const [phoneStatus, setPhoneStatus] = useState(0);
    const [cityStatus, setCityStatus] = useState(0);
    const [passwordStatus, setPasswordStatus] = useState(0);
    const [confirmPassStatus, setConfirmPassStatus] = useState(0);
    const [spinner, setSpinner] = useState(false);


    useEffect(() => {
        setTimeout(() => setSpinner(false), 500);
    }, [spinner]);


    function activeInput(type) {
        if (type === 'fullName' || fullName !== '') setFullNameStatus(1);
        if (type === 'phone' || phone !== '') setPhoneStatus(1);
        if (type === 'city' || city !== '') setCityStatus(1);
        if (type === 'password' || password !== '') setPasswordStatus(1);
        if (type === 'confirmPass' || confirmPass !== '') setConfirmPassStatus(1);
    }

    function unActiveInput(type) {
        if (type === 'fullName' && fullName === '') setFullNameStatus(0);
        if (type === 'phone' && phone === '') setPhoneStatus(0);
        if (type === 'city' && city === '') setCityStatus(0);
        if (type === 'password' && password === '') setPasswordStatus(0);
        if (type === 'confirmPass' && confirmPass === '') setConfirmPassStatus(0);
    }

    function renderSubmit() {
        if (fullName == '' ||password == '' || phone == '' || confirmPass == ''|| city == null) {
            return (
                <View
                    style={[styles.greenBtn , styles.Width_100 , styles.marginTop_25 , styles.marginBottom_35 , {
                        backgroundColor:'#ccc'
                    }]}
                >
                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('register') }</Text>
                </View>
            );
        }

        return (
            <TouchableOpacity
                onPress={() => onRegisterPressed()} style={[styles.greenBtn , styles.Width_100 , styles.marginTop_25 , styles.marginBottom_35]}>
                <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('register') }</Text>
            </TouchableOpacity>
        );
    }

    function onRegisterPressed() {
        navigation.push('activationCode')
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
                    <Image source={require('../../assets/images/logo_login.png')} style={[styles.icon100 , styles.marginBottom_35]} resizeMode={'contain'} />
                    <KeyboardAvoidingView style={[styles.Width_100]}>
                        <Form style={[styles.Width_100 , styles.flexCenter]}>
                            <View style={[styles.height_70, styles.flexCenter, styles.marginBottom_7]}>
                                <Item floatingLabel style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:fullNameStatus === 1 ?  COLORS.green :  COLORS.gray}]}>{ i18n.t('fullName') }</Label>
                                    <Input style={[styles.input, styles.height_50, (fullNameStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(fullName) => setFullName(fullName)}
                                           onBlur={() => unActiveInput('fullName')}
                                           onFocus={() => activeInput('fullName')}
                                    />
                                </Item>
                            </View>
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

                            <View style={[styles.height_50 ,styles.input ,(city !== ''? styles.Active : styles.noActive), styles.flexCenter, styles.marginBottom_30 , styles.Width_100]}>
                                <RNPickerSelect
                                    style={{
                                        inputAndroid: {
                                            fontFamily: 'cairo',
                                            color:COLORS.black
                                        },
                                        inputIOS: {
                                            fontFamily: 'cairo',
                                            color:COLORS.black
                                        },
                                    }}
                                    placeholder={{
                                        label: i18n.t('city') ,
                                    }}
                                    onValueChange={(city) => setCity(city)}
                                    items={[
                                        { label: 'القاهرة', value: 'cairo' },
                                        { label: 'الاسكندرية', value: 'alex' },
                                        { label: 'المنصورة', value: 'mansoura' },
                                    ]}
                                    Icon={() => {
                                        return <Image source={city !== ''? require('../../assets/images/drop_green_arrow.png') : require('../../assets/images/gray_arrow.png')} style={[styles.icon15 , {top:18}]} resizeMode={'contain'} />
                                    }}
                                />
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

export default Register;


