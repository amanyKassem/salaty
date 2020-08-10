import React, { useState , useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Platform, ActivityIndicator} from "react-native";
import {Container, Content, Form, Input, Item, Label} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import RNPickerSelect from 'react-native-picker-select';
import COLORS from "../consts/colors";
import {useDispatch, useSelector} from "react-redux";
import {getUserCards} from '../actions';

const isIOS = Platform.OS === 'ios';

function InquiryCard({navigation , route}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const userCards = useSelector(state => state.userCards.userCards);
    const userCardsLoader = useSelector(state => state.userCards.loader);
    const notifications = useSelector(state => state.notifications.notifications);
    const [card, setCard] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardNumberStatus, setCardNumberStatus] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    function activeInput(type) {
        if (type === 'cardNumber' || cardNumber !== '') setCardNumberStatus(1);
    }

    function unActiveInput(type) {
        if (type === 'cardNumber' && cardNumber === '') setCardNumberStatus(0);
    }


    const dispatch = useDispatch();

    useEffect(() => {
        setIsSubmitted(false)
    }, [isSubmitted]);


    useEffect(() => {
        dispatch(getUserCards(lang , token))
    }, [userCardsLoader]);


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (route.params?.cardNumber) {
                setCard('');
                setCardNumber(route.params.cardNumber);
                setCardNumberStatus(1);
            }

        });

        return unsubscribe;
    }, [route.params?.cardNumber ,navigation]);

    function renderSubmit() {
        if ((card == null || card == '' )&& cardNumber == '') {
            return (
                <View
                    style={[styles.greenBtn , styles.Width_100 , styles.marginTop_20 , {
                        backgroundColor:'#ccc'
                    }]}
                >
                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('send') }</Text>
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
                onPress={() => onConfirm()} style={[styles.greenBtn , styles.Width_100 , styles.marginTop_20]}>
                <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('send') }</Text>
            </TouchableOpacity>
        );
    }

    function onConfirm() {
        navigation.push('accStatement', {card})
    }

    function setCardVal(card){
        setCard(card);

        if (card)
            setCardNumber('')
    }

    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_green]}>

                <View style={[styles.marginTop_25 , styles.marginHorizontal_15 , styles.directionRowSpace]}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/images/back_arrow.png')} style={[styles.icon25, styles.transform]} resizeMode={'contain'} />
                    </TouchableOpacity>

                    <Image source={require('../../assets/images/logo_in_app.png')} style={[styles.icon100]} resizeMode={'contain'} />

                    <TouchableOpacity onPress={() => navigation.push('notification')}>
                        {
                            notifications && (notifications).length > 0 ?
                                <Image source={require('../../assets/images/notifcation_active.png')} style={[styles.icon25]} resizeMode={'contain'} />
                                :
                                <Image source={require('../../assets/images/notifcation_non_active.png')} style={[styles.icon25]} resizeMode={'contain'} />
                        }
                    </TouchableOpacity>

                </View>


                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.directionRow,styles.marginBottom_35]}>
                        <Image source={require('../../assets/images/card_info_small.png')} style={[styles.icon35 , styles.marginBottom_7]} resizeMode={'contain'} />
                        <View style={{marginLeft:15}}>
                           <Text style={[styles.textBold , styles.text_black , styles.textSize_14,styles.alignStart]}>{ i18n.t('inquiry') }</Text>
                           <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13,styles.alignStart]}>{ i18n.t('registerCard') }</Text>
                       </View>
                    </View>

                    <View style={[styles.height_50 ,styles.input ,(card !== ''? styles.Active : styles.noActive), styles.flexCenter,
                        styles.marginBottom_25 , styles.Width_100]}>
                        <RNPickerSelect
                            style={{
                                inputAndroid: {
                                    fontFamily: 'cairo',
                                    color:COLORS.black,
                                    marginRight:20
                                },
                                inputIOS: {
                                    fontFamily: 'cairo',
                                    color:COLORS.black,
                                    alignSelf:'flex-start',
                                },
                            }}
                            placeholder={{
                                label: i18n.t('chooseCard') ,
                            }}
                            onValueChange={(card) => { setCardVal(card) }}
                            items={userCards ?
                                userCards.map((userCard, i) => {
                                        return (
                                            { label: userCard.identity, value: userCard.id , key: userCard.id}
                                        )
                                    }
                                )
                                :  [] }
                            Icon={() => {
                                return <Image source={card !== ''? require('../../assets/images/drop_green_arrow.png') : require('../../assets/images/gray_arrow.png')} style={[styles.icon15 , {top:isIOS ? 7 : 18}]} resizeMode={'contain'} />
                            }}
                            value={card}
                        />
                    </View>
                    <View style={[styles.height_70, styles.flexCenter, styles.marginBottom_7]}>
                        <Item floatingLabel style={[styles.item]}>
                            <Label style={[styles.label, styles.textRegular ,{ color:cardNumberStatus === 1 ?  COLORS.green :  COLORS.gray, top:1}]}>{ i18n.t('cardNumber') }</Label>
                            <Input style={[styles.input, styles.height_50, (cardNumberStatus === 1 ? styles.Active : styles.noActive) , {paddingRight:45}]}
                                   onChangeText={(cardNumber) => {setCardNumber(cardNumber) ; setCard(null)}}
                                   onBlur={() => unActiveInput('cardNumber')}
                                   onFocus={() => activeInput('cardNumber')}
                                   value={cardNumber.toString()}
                            />
                        </Item>

                        <TouchableOpacity onPress={() => navigation.navigate('barCodeScan' , {pathName:'inquiryCard'})} style={{position:'absolute' , right:15 , top:15}}>
                            <Image source={require('../../assets/images/qr.png')} style={[styles.icon20]} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>

                    {renderSubmit()}

                </View>

            </Content>
        </Container>
    );
}

export default InquiryCard;


