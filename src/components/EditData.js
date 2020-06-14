import React, { useState , useEffect} from "react";
import {View, Text, Image, TouchableOpacity , Platform, ActivityIndicator, KeyboardAvoidingView} from "react-native";
import {Container, Content, Card, Form, Item, Label, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import RNPickerSelect from 'react-native-picker-select';
import COLORS from "../consts/colors";
import {useDispatch, useSelector} from "react-redux";
import {updateProfile , getCities} from '../actions';

const isIOS = Platform.OS === 'ios';

function EditData({navigation , route}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const user = useSelector(state => state.auth.user.data);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const cities = useSelector(state => state.cities.cities);
    const citiesLoader = useSelector(state => state.cities.loader);
    const notifications = useSelector(state => state.notifications.notifications);

    const authType = route.params.authType ;
    const [fullName, setFullName] = useState(user.name);
    const [phone, setPhone] = useState(user.phone);
    const [city, setCity] = useState(user.city_id);
    const [fullNameStatus, setFullNameStatus] = useState(1);
    const [phoneStatus, setPhoneStatus] = useState(1);


    const dispatch = useDispatch();

    useEffect(() => {
        setIsSubmitted(false)
    }, [isSubmitted]);


    useEffect(() => {
        dispatch(getCities(lang))
    }, [citiesLoader]);

    function activeInput(type) {
        if (type === 'fullName' || fullName !== '') setFullNameStatus(1);
        if (type === 'phone' || phone !== '') setPhoneStatus(1);
    }

    function unActiveInput(type) {
        if (type === 'fullName' && fullName === '') setFullNameStatus(0);
        if (type === 'phone' && phone === '') setPhoneStatus(0);
    }

    function renderSubmit() {
        if (fullName == '' || phone == '' || city == null) {
            return (
                <View
                    style={[styles.greenBtn , styles.Width_100 , styles.marginTop_25 , styles.marginBottom_35 , {
                        backgroundColor:'#ccc'
                    }]}
                >
                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('save') }</Text>
                </View>
            );
        }

        if (isSubmitted){
            return(
                <View style={[{ justifyContent: 'center', alignItems: 'center' } , styles.marginTop_25]}>
                    <ActivityIndicator size="large" color={COLORS.mstarda} style={{ alignSelf: 'center' }} />
                </View>
            )
        }

        return (
            <TouchableOpacity
                onPress={() => onEdit()} style={[styles.greenBtn , styles.Width_100 , styles.marginTop_25 , styles.marginBottom_35]}>
                <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('save') }</Text>
            </TouchableOpacity>
        );
    }

    function onEdit(){
        setIsSubmitted(true)
        dispatch(updateProfile(lang , fullName , phone , city , token , navigation , authType));
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


                <View style={[styles.bgFullWidth,styles.bg_White,styles.paddingHorizontal_20,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.directionRow,styles.marginBottom_35]}>
                        <Image source={require('../../assets/images/user_small_icon.png')} style={[styles.icon35 , styles.marginBottom_7]} resizeMode={'contain'} />
                        <View style={{marginLeft:15}}>
                            <Text style={[styles.textBold , styles.text_black , styles.textSize_14, styles.alignStart]}>{ i18n.t('profile') }</Text>
                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13, styles.alignStart]}>{ i18n.t('editPersonalData') }</Text>
                        </View>
                    </View>

                    <KeyboardAvoidingView style={[styles.Width_100]}>
                        <Form style={[styles.Width_100 , styles.flexCenter]}>
                            <View style={[styles.height_70, styles.flexCenter, styles.marginBottom_7]}>
                                <Item floatingLabel style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:fullNameStatus === 1 ?  COLORS.green :  COLORS.gray , top:2}]}>{ i18n.t('fullName') }</Label>
                                    <Input style={[styles.input, styles.height_50, (fullNameStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(fullName) => setFullName(fullName)}
                                           onBlur={() => unActiveInput('fullName')}
                                           onFocus={() => activeInput('fullName')}
                                           value={fullName}
                                    />
                                </Item>
                            </View>
                            <View style={[styles.height_70, styles.flexCenter, styles.marginBottom_7]}>
                                <Item floatingLabel style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:phoneStatus === 1 ?  COLORS.green :  COLORS.gray , top:2}]}>{ i18n.t('phone') }</Label>
                                    <Input style={[styles.input, styles.height_50, (phoneStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(phone) => setPhone(phone)}
                                           onBlur={() => unActiveInput('phone')}
                                           onFocus={() => activeInput('phone')}
                                           keyboardType={'number-pad'}
                                           value={phone}
                                    />
                                </Item>
                            </View>

                            <View style={[styles.height_50 ,styles.input ,(city !== ''? styles.Active : styles.noActive), styles.flexCenter, styles.marginBottom_30 , styles.Width_100]}>
                                <RNPickerSelect
                                    style={{
                                        inputAndroid: {
                                            fontFamily: 'cairo',
                                            color:COLORS.black,
                                        },
                                        inputIOS: {
                                            fontFamily: 'cairo',
                                            color:COLORS.black,
                                            alignSelf:'flex-start',
                                        },
                                    }}
                                    placeholder={{
                                        label: i18n.t('city') ,
                                    }}
                                    onValueChange={(city) => setCity(city)}
                                    items={cities ?
                                        cities.map((city, i) => {
                                                return (
                                                    { label: city.name, value: city.id , key: city.id}
                                                )
                                            }
                                        )
                                        :  [] }
                                    Icon={() => {
                                        return <Image source={city !== ''? require('../../assets/images/drop_green_arrow.png') : require('../../assets/images/gray_arrow.png')} style={[styles.icon15 , {top:isIOS ? 7 : 18}]} resizeMode={'contain'} />
                                    }}
                                    value={city}
                                />
                            </View>


                            {renderSubmit()}

                        </Form>
                    </KeyboardAvoidingView>

                </View>

            </Content>
        </Container>
    );
}

export default EditData;


