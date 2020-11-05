import React, { useState , useEffect} from "react";
import {View, Text, Image, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, Dimensions,} from "react-native";
import {Container, Content, Form, Item, Label, Input , Textarea} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import {useDispatch, useSelector} from "react-redux";
import {transferCard} from '../actions';

const isIOS = Platform.OS === 'ios';
const height    = Dimensions.get('window').height;
const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

function TransferCard({navigation , route}) {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const lang  = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);

    const [cardNumber, setCardNumber] = useState('');
    const [cardNumberStatus, setCardNumberStatus] = useState(0);
    const [newPhone, setNewPhone] = useState('');
    const [newPhoneStatus, setNewPhoneStatus] = useState(0);
    const [transferNote, setTransferNote] = useState('');
    const [transferNoteStatus, setTransferNoteStatus] = useState(0);
    const notifications = useSelector(state => state.notifications.notifications);

    const dispatch = useDispatch();

    function activeInput(type) {
        if (type === 'cardNumber' || cardNumber !== '') setCardNumberStatus(1);
        if (type === 'newPhone' || newPhone !== '') setNewPhoneStatus(1);
        if (type === 'transferNote' || transferNote !== '') setTransferNoteStatus(1);
    }

    function unActiveInput(type) {
        if (type === 'cardNumber' && cardNumber === '') setCardNumberStatus(0);
        if (type === 'newPhone' && newPhone === '') setNewPhoneStatus(0);
        if (type === 'transferNote' && transferNote === '') setTransferNoteStatus(0);
    }

    useEffect(() => {
        setIsSubmitted(false)
    }, [isSubmitted]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (route.params?.cardNumber) {
                setCardNumber(route.params.cardNumber);
                setCardNumberStatus(1)
            }
        });

        return unsubscribe;
    }, [navigation , route.params?.cardNumber]);


    function renderConfirm(){
        if ( cardNumber == '' || newPhone == '' || transferNote == ''){
            return (
                <View
                    style={[styles.greenBtn , styles.Width_100 , styles.marginTop_20 , styles.marginBottom_25 , {
                        backgroundColor:'#ccc'
                    }]}
                >
                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('confirm') }</Text>
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
                <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('confirm') }</Text>
            </TouchableOpacity>

        );
    }

    function onConfirm(){
        setIsSubmitted(true);
        dispatch(transferCard(lang , cardNumber , newPhone , transferNote , token , navigation));
    }


    return (
       <Container style={[styles.bg_green]}>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_green]}>

                <View style={[IS_IPHONE_X ? styles.marginTop_5 : styles.marginTop_25 , styles.marginHorizontal_15 , styles.directionRowSpace]}>
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


                <View style={[styles.bgFullWidth,styles.bg_White,styles.paddingHorizontal_20,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.directionRow,styles.marginBottom_35]}>
                        <Image source={require('../../assets/images/change_card_small.png')} style={[styles.icon35 , styles.marginBottom_7]} resizeMode={'contain'} />
                        <View style={{marginLeft:15}}>
                            <Text style={[styles.textBold , styles.text_black , styles.textSize_14,styles.alignStart]}>{ i18n.t('transferCard') }</Text>
                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13,styles.alignStart]}>{ i18n.t('transferData') }</Text>
                        </View>
                    </View>

                    <KeyboardAvoidingView style={[styles.Width_100]}>
                        <Form style={[styles.Width_100 , styles.flexCenter]}>

                            <View style={[styles.height_70, styles.flexCenter, styles.marginBottom_25]}>
                                <Item floatingLabel style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:cardNumberStatus === 1 ?  COLORS.green :  COLORS.gray, top:1}]}>{ i18n.t('cardNumber') }</Label>
                                    <Input style={[styles.input, styles.height_50, (cardNumberStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(cardNumber) => setCardNumber(cardNumber)}
                                           onBlur={() => unActiveInput('cardNumber')}
                                           onFocus={() => activeInput('cardNumber')}
                                           value={cardNumber}
                                    />
                                </Item>
                                <TouchableOpacity onPress={() => navigation.navigate('barCodeScan' , {pathName:'transferCard'})} style={{position:'absolute' , right:15 , top:15}}>
                                    <Image source={require('../../assets/images/qr.png')} style={[styles.icon20]} resizeMode={'contain'} />
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.height_40, styles.flexCenter]}>
                                <Item floatingLabel style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:newPhoneStatus === 1 ?  COLORS.green :  COLORS.gray, top:1}]}>{ i18n.t('newPhone') }</Label>
                                    <Input style={[styles.input, styles.height_50, (newPhoneStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(newPhone) => setNewPhone(newPhone)}
                                           onBlur={() => unActiveInput('newPhone')}
                                           onFocus={() => activeInput('newPhone')}
                                           keyboardType={'number-pad'}
                                    />
                                </Item>
                            </View>

                            <Label style={[styles.label, styles.textRegular ,{ color:transferNoteStatus === 1 ?  COLORS.green :  COLORS.gray, top:transferNoteStatus === 1 ? 10 : 40}]}>{ i18n.t('transferNote') }</Label>
                            <Textarea style={[styles.input, styles.height_120 , styles.Width_100 , styles.paddingVertical_10,
                                (transferNoteStatus === 1 ? styles.Active : styles.noActive) , styles.marginBottom_25]}
                                      onChangeText={(transferNote) => setTransferNote(transferNote)}
                                      onBlur={() => unActiveInput('transferNote')}
                                      onFocus={() => activeInput('transferNote')}
                            />


                            {renderConfirm()}

                        </Form>
                    </KeyboardAvoidingView>

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

export default TransferCard;


