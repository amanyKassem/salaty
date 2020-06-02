import React, { useState , useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator, KeyboardAvoidingView} from "react-native";
import {Container, Content, Card, Form, Item, Label, Input, Toast} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import RNPickerSelect from 'react-native-picker-select';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const isIOS = Platform.OS === 'ios';

function GiftCard({navigation , route}) {

    const [isSubmitted, setIsSubmitted] = useState(false);

    const [phone, setPhone] = useState('');
    const [phoneStatus, setPhoneStatus] = useState(0);
    const [card, setCard] = useState('');

    function activeInput(type) {
        if (type === 'phone' || phone !== '') setPhoneStatus(1);
    }

    function unActiveInput(type) {
        if (type === 'phone' && phone === '') setPhoneStatus(0);
    }


    useEffect(() => {
        setIsSubmitted(false)
    }, [isSubmitted]);


    function renderConfirm(){
        if (phone == '' || card == null || card == ''){
            return (
                <View
                    style={[styles.greenBtn , styles.Width_100 , styles.marginTop_20 , styles.marginBottom_25 , {
                        backgroundColor:'#ccc'
                    }]}
                >
                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('send') }</Text>
                </View>
            );
        }
        if (isSubmitted){
            return(
                <TouchableOpacity
                    onPress={() => onConfirm()} style={[styles.greenBtn , styles.Width_100 , styles.marginTop_20 , styles.marginBottom_25]}>
                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('send') }</Text>
                </TouchableOpacity>
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

        setIsSubmitted(true)
        navigation.navigate('giftCardSuccessfully')
    }



    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_green]}>

                <View style={[styles.marginTop_25 , styles.marginHorizontal_15 , styles.directionRowSpace]}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/images/back_arrow.png')} style={[styles.icon25]} resizeMode={'contain'} />
                    </TouchableOpacity>

                    <Image source={require('../../assets/images/logo_in_app.png')} style={[styles.icon100]} resizeMode={'contain'} />

                    <TouchableOpacity onPress={() => navigation.push('notification')}>
                        <Image source={require('../../assets/images/notifcation_non_active.png')} style={[styles.icon25]} resizeMode={'contain'} />
                    </TouchableOpacity>

                </View>


                <View style={[styles.bgFullWidth,styles.bg_White,styles.paddingHorizontal_20,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.directionRow,styles.marginBottom_35]}>
                        <Image source={require('../../assets/images/gift_small.png')} style={[styles.icon35 , styles.marginBottom_7]} resizeMode={'contain'} />
                        <View style={{marginLeft:15}}>
                            <Text style={[styles.textBold , styles.text_black , styles.textSize_14]}>{ i18n.t('giftCard') }</Text>
                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13]}>{ i18n.t('presentCard') }</Text>
                        </View>
                    </View>

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

                            <View style={[styles.height_50 ,styles.input ,(card !== ''? styles.Active : styles.noActive), styles.flexCenter,
                                styles.marginBottom_30 , styles.Width_100]}>
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
                                        label: i18n.t('chooseCard') ,
                                    }}
                                    onValueChange={(card) => setCard(card)}
                                    items={[
                                        { label: 'القاهرة', value: 'cairo' },
                                        { label: 'الاسكندرية', value: 'alex' },
                                        { label: 'المنصورة', value: 'mansoura' },
                                    ]}
                                    Icon={() => {
                                        return <Image source={card !== ''? require('../../assets/images/drop_green_arrow.png') : require('../../assets/images/gray_arrow.png')} style={[styles.icon15 , {top:18}]} resizeMode={'contain'} />
                                    }}
                                />
                            </View>


                            {renderConfirm()}

                        </Form>
                    </KeyboardAvoidingView>

                </View>

            </Content>
        </Container>
    );
}

export default GiftCard;


