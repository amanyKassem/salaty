import React, { useState , useEffect} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    KeyboardAvoidingView, ActivityIndicator,
} from "react-native";
import {Container, Content, Form, Item, Label, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {useDispatch, useSelector} from "react-redux";
import {confirmCard} from '../actions';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const isIOS = Platform.OS === 'ios';

function ConfirmCard({navigation , route}) {
    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user.data.token);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [cardImage, setCardImage] = useState(i18n.t('cardImg'));
    const [base64, setBase64] = useState('');

    const [cardNumber, setCardNumber] = useState('');
    const [cardNumberStatus, setCardNumberStatus] = useState(0);

    const [phone, setPhone] = useState('');
    const [phoneStatus, setPhoneStatus] = useState(0);

    function activeInput(type) {
        if (type === 'cardNumber' || cardNumber !== '') setCardNumberStatus(1);
        if (type === 'phone' || phone !== '') setPhoneStatus(1);
    }

    function unActiveInput(type) {
        if (type === 'phone' && phone === '') setPhoneStatus(0);
        if (type === 'cardNumber' && cardNumber === '') setCardNumberStatus(0);
    }


    const dispatch = useDispatch();

    useEffect(() => {
        setIsSubmitted(false)
    }, []);


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

        console.log('result' , result)

        if (!result.cancelled) {
            setCardImage(result.uri.split('/').pop());
            setBase64(result.base64);
        }
    };

    function renderConfirm(){
        if (phone == '' ||  cardNumber == '' || (cardImage == i18n.t('cardImg')|| cardImage == '')){
            return (
                <View
                    style={[styles.greenBtn , styles.Width_100 , styles.marginTop_20 , styles.marginBottom_25 , {
                        backgroundColor:'#ccc'
                    }]}
                >
                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('next') }</Text>
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
                <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('next') }</Text>
            </TouchableOpacity>

        );
    }

    function onConfirm(){
        setIsSubmitted(true);
        dispatch(confirmCard(lang , cardNumber , phone , base64  , token , navigation));
    }


    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_green]}>

                <View style={[styles.marginTop_25 , styles.marginHorizontal_15 , styles.directionRowSpace]}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/images/back_arrow.png')} style={[styles.icon25, styles.transform]} resizeMode={'contain'} />
                    </TouchableOpacity>

                    <Image source={require('../../assets/images/logo_in_app.png')} style={[styles.icon100, {right:12}]} resizeMode={'contain'} />

                    <View/>

                </View>

                <View style={[styles.bgFullWidth,styles.bg_White,styles.paddingHorizontal_20,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.directionRow,styles.marginBottom_35]}>
                        <Image source={require('../../assets/images/confirmat_card.png')} style={[styles.icon35 , styles.marginBottom_7]} resizeMode={'contain'} />
                        <View style={{marginLeft:15}}>
                            <Text style={[styles.textBold , styles.text_black , styles.textSize_14,styles.alignStart]}>{ i18n.t('confirmCard') }</Text>
                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13,styles.alignStart]}>{ i18n.t('numOrImg') }</Text>
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

                            <TouchableOpacity onPress={_pickImage} style={[styles.height_50 ,styles.input ,(cardImage !== '' && cardImage !== i18n.t('cardImg') ? styles.Active : styles.noActive), styles.directionRowSpace,
                                styles.marginBottom_25 , styles.Width_100]}>
                                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13]}>{cardImage.substr(0,38)}</Text>
                                <Image source={require('../../assets/images/camera_green.png')} style={[styles.icon20]} resizeMode={'contain'} />
                            </TouchableOpacity>


                            {renderConfirm()}

                        </Form>
                    </KeyboardAvoidingView>

                </View>

            </Content>
        </Container>
    );
}

export default ConfirmCard;

