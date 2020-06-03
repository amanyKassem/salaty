import React, { useState , useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator, KeyboardAvoidingView} from "react-native";
import {Container, Content, Card, Form, Item, Label, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import RNPickerSelect from 'react-native-picker-select';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const isIOS = Platform.OS === 'ios';

function EditData({navigation , route}) {

    const authType = 'casher' ;
    const [fullName, setFullName] = useState('اماني');
    const [phone, setPhone] = useState('012345678');
    const [city, setCity] = useState('mansoura');
    const [fullNameStatus, setFullNameStatus] = useState(1);
    const [phoneStatus, setPhoneStatus] = useState(1);
    const [spinner, setSpinner] = useState(false);


    useEffect(() => {
        setTimeout(() => setSpinner(false), 500);
    }, [spinner]);


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

        return (
            <TouchableOpacity
                onPress={() => onEdit()} style={[styles.greenBtn , styles.Width_100 , styles.marginTop_25 , styles.marginBottom_35]}>
                <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('save') }</Text>
            </TouchableOpacity>
        );
    }

    function onEdit() {
        navigation.navigate('profile')
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
                        <Image source={require('../../assets/images/user_small_icon.png')} style={[styles.icon35 , styles.marginBottom_7]} resizeMode={'contain'} />
                        <View style={{marginLeft:15}}>
                            <Text style={[styles.textBold , styles.text_black , styles.textSize_14]}>{ i18n.t('profile') }</Text>
                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13]}>{ i18n.t('editPersonalData') }</Text>
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


