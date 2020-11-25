import React, { useState , useEffect} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView, ActivityIndicator, Dimensions,
} from "react-native";
import {Container, Content, Form, Item, Label, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {useDispatch, useSelector} from "react-redux";
import {cridetTransfer} from '../actions';
import Modal from "react-native-modal";

const isIOS = Platform.OS === 'ios';
const height    = Dimensions.get('window').height;
const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

function TransferCredit({navigation , route}) {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const notifications = useSelector(state => state.notifications.notifications);

    const [cardImage, setCardImage] = useState(i18n.t('cardImage'));
    const [base64, setBase64] = useState('');

    const [cardNumber, setCardNumber] = useState('');
    const [cardNumberStatus, setCardNumberStatus] = useState(0);

    const [cardTrans, setCardTrans] = useState('');
    const [cardTransrStatus, setCardTransStatus] = useState(0);

    const [amountTransfer, setAmountTransfer] = useState('');
    const [amountTransferStatus, setAmountTransferStatus] = useState(0);
    const [showModal, setShowModal] 		= useState(false);

    function activeInput(type) {
        if (type === 'cardNumber' || cardNumber !== '') setCardNumberStatus(1);
        if (type === 'cardTrans' || cardTrans !== '') setCardTransStatus(1);
        if (type === 'amountTransfer' || amountTransfer !== '') setAmountTransferStatus(1);
    }

    function unActiveInput(type) {
        if (type === 'cardNumber' && cardNumber === '') setCardNumberStatus(0);
        if (type === 'cardTrans' && cardTrans === '') setCardTransStatus(0);
        if (type === 'amountTransfer' && amountTransfer === '') setAmountTransferStatus(0);
    }

    function toggleModal() {
        setShowModal(!showModal)
    }

    const dispatch = useDispatch();

    useEffect(() => {
        setIsSubmitted(false)
    }, [isSubmitted]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (route.params?.photo) {
                setCardImage(route.params.photo.uri);
                setBase64(route.params.photo.base64);
            }
        });

        return unsubscribe;
    }, [route.params?.photo ,navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (route.params?.cardNumber) {
                setCardNumber(route.params.cardNumber);
                setCardNumberStatus(1)
            }
        });

        return unsubscribe;
    }, [navigation , route.params?.cardNumber]);

    const askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    };

    const _pickImage = async () => {

        askPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64:true,
        });


        if (!result.cancelled) {
            setCardImage(result.uri.split('/').pop());
            setBase64(result.base64);
        }
    };

    function renderConfirm(){
        if ( cardNumber == '' ||cardTrans == '' || amountTransfer == ''){
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
        dispatch(cridetTransfer(lang , cardNumber , cardTrans , base64 , amountTransfer , token , navigation));
    }


    return (
       <Container style={[styles.bg_green]}>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_green]}>

                <View style={[IS_IPHONE_X ? styles.marginTop_5 : 0 , styles.marginHorizontal_15 , styles.directionRowSpace]}>
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
                        <Image source={require('../../assets/images/transform_money_small.png')} style={[styles.icon35 , styles.marginBottom_7]} resizeMode={'contain'} />
                        <View style={{marginLeft:15}}>
                            <Text style={[styles.textBold , styles.text_black , styles.textSize_14,styles.alignStart]}>{ i18n.t('transferCredit') }</Text>
                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13,styles.alignStart]}>{ i18n.t('cardInfo') }</Text>
                        </View>
                    </View>

                    <KeyboardAvoidingView style={[styles.Width_100]}>
                        <Form style={[styles.Width_100 , styles.flexCenter]}>

                            <View style={[styles.height_70, styles.flexCenter, styles.marginBottom_7]}>
                                <Item floatingLabel style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:cardNumberStatus === 1 ?  COLORS.green :  COLORS.gray, top:1}]}>{ i18n.t('cardNumber') }</Label>
                                    <Input style={[styles.input, styles.height_50, (cardNumberStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(cardNumber) => setCardNumber(cardNumber)}
                                           onBlur={() => unActiveInput('cardNumber')}
                                           onFocus={() => activeInput('cardNumber')}
                                           value={cardNumber}
                                    />
                                </Item>
                                <TouchableOpacity onPress={() => navigation.navigate('barCodeScan' , {pathName:'transferCredit'})} style={{position:'absolute' , right:15 , top:15}}>
                                    <Image source={require('../../assets/images/qr.png')} style={[styles.icon20]} resizeMode={'contain'} />
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.height_70, styles.flexCenter, styles.marginBottom_7]}>
                                <Item floatingLabel style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:cardTransrStatus === 1 ?  COLORS.green :  COLORS.gray, top:1}]}>{ i18n.t('cardTrans') }</Label>
                                    <Input style={[styles.input, styles.height_50, (cardTransrStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(cardTrans) => setCardTrans(cardTrans)}
                                           onBlur={() => unActiveInput('cardTrans')}
                                           onFocus={() => activeInput('cardTrans')}
                                    />
                                </Item>
                            </View>

                            <TouchableOpacity onPress={toggleModal} style={[styles.height_50 ,styles.input ,(cardImage !== '' && cardImage !== i18n.t('cardImage') ? styles.Active : styles.noActive), styles.directionRowSpace,
                                styles.marginBottom_25 , styles.Width_100]}>
                                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13]}>{cardImage.substr(0,38)}</Text>
                                <Image source={require('../../assets/images/camera_green.png')} style={[styles.icon20]} resizeMode={'contain'} />
                            </TouchableOpacity>

                            <View style={[styles.height_70, styles.flexCenter, styles.marginBottom_7]}>
                                <Item floatingLabel style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:amountTransferStatus === 1 ?  COLORS.green :  COLORS.gray, top:1}]}>{ i18n.t('amountTransfer') }</Label>
                                    <Input style={[styles.input, styles.height_50, (amountTransferStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(amountTransfer) => setAmountTransfer(amountTransfer)}
                                           onBlur={() => unActiveInput('amountTransfer')}
                                           onFocus={() => activeInput('amountTransfer')}
                                    />
                                </Item>
                            </View>


                            {renderConfirm()}

                        </Form>
                    </KeyboardAvoidingView>

                </View>
                <Modal
                    onBackdropPress     = {toggleModal}
                    onBackButtonPress   = {toggleModal}
                    isVisible           = {showModal}
                    style               = {styles.bgModel}
                    avoidKeyboard  		= {true}
                >
                    <View style={[{borderTopLeftRadius:30,
                        borderTopRightRadius:30},styles.bg_White, styles.overHidden, styles.Width_100, styles.paddingVertical_10 , styles.paddingHorizontal_10]}>
                        <View style={[styles.overHidden, styles.Width_100 , styles.paddingHorizontal_25]}>

                            <TouchableOpacity onPress={() => {_pickImage() ; setShowModal(false)}} style={[styles.marginBottom_10]}>
                                <Text style={[styles.text_black , styles.textBold , styles.textSize_16]}>{ i18n.t('photos') }</Text>
                            </TouchableOpacity>

                            <View style={[styles.borderGray , styles.marginBottom_5]}/>

                            <TouchableOpacity onPress={() => {navigation.navigate('commonStack', {screen: 'cameraCapture', params: { pathName:'transferCredit' }}) ; setShowModal(false)}} style={[styles.marginBottom_15]}>
                                <Text style={[styles.text_black , styles.textBold , styles.textSize_16]}>{ i18n.t('camera') }</Text>
                            </TouchableOpacity>


                        </View>
                    </View>

                </Modal>
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

export default TransferCredit;


