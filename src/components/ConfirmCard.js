import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView, ActivityIndicator, Dimensions,
} from "react-native";
import { Container, Content, Form, Item, Label, Input } from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { useDispatch, useSelector } from "react-redux";
import { confirmCard } from '../actions';
import Modal from "react-native-modal";

const isIOS = Platform.OS === 'ios';
const height = Dimensions.get('window').height;
const IS_IPHONE_X = (height === 812 || height === 896) && Platform.OS === 'ios';

function ConfirmCard({ navigation, route }) {
    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [cardImage, setCardImage] = useState(i18n.t('cardImg'));
    const [base64, setBase64] = useState('');

    const [cardNumber, setCardNumber] = useState('');
    const [cardNumberStatus, setCardNumberStatus] = useState(0);

    const [amount, setAmount] = useState('');
    const [amountStatus, setAmountStatus] = useState(0);

    const [showModal, setShowModal] = useState(false);

    const [imgURI, setImgURI] = useState(i18n.t('cardImg'));

    const ImagePickerMultiPart = async () => {
        await askPermissionsAsync();
        let response = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });

        console.log(response);

        if (!response.cancelled)
            setImgURI(response.uri)



    }


    function activeInput(type) {
        if (type === 'cardNumber' || cardNumber !== '') setCardNumberStatus(1);
        if (type === 'amount' || amount !== '') setAmountStatus(1);
    }

    function unActiveInput(type) {
        if (type === 'amount' && amount === '') setAmountStatus(0);
        if (type === 'cardNumber' && cardNumber === '') setCardNumberStatus(0);
    }

    function toggleModal() {
        setShowModal(!showModal)
    }

    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (route.params?.photo) {
                setCardImage(route.params.photo.uri);
                setImgURI(route.params.photo.uri);
                setBase64(route.params.photo.base64);
            }
        });

        return unsubscribe;
    }, [route.params?.photo, navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (route.params?.cardNumber) {
                setCardNumber(route.params.cardNumber);
                setCardNumberStatus(1)
            }
        });

        return unsubscribe;
    }, [navigation, route.params?.cardNumber]);

    const askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    };

    // const _pickImage = async () => {

    //     askPermissionsAsync();

    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         base64: true,
    //     });

    //     console.log('result', result)

    //     if (!result.cancelled) {
    //         setCardImage(result.uri.split('/').pop());
    //         setBase64(result.base64);
    //     }
    // };

    function renderConfirm() {
        if (amount === '' || cardNumber === '' || (imgURI == i18n.t('cardImg') || imgURI == '')) {
            return (
                <View
                    style={[styles.greenBtn, styles.Width_100, styles.marginTop_20, styles.marginBottom_25, {
                        backgroundColor: '#ccc'
                    }]}
                >
                    <Text style={[styles.textRegular, styles.text_White, styles.textSize_16]}>{i18n.t('next')}</Text>
                </View>
            );
        }
        if (isSubmitted) {
            return (
                <View style={[{ justifyContent: 'center', alignItems: 'center' }, styles.marginTop_20, styles.marginBottom_25]}>
                    <ActivityIndicator size="large" color={COLORS.mstarda} style={{ alignSelf: 'center' }} />
                </View>
            )
        }

        return (
            <TouchableOpacity
                onPress={() => onConfirm()} style={[styles.greenBtn, styles.Width_100, styles.marginTop_20, styles.marginBottom_25]}>
                <Text style={[styles.textRegular, styles.text_White, styles.textSize_16]}>{i18n.t('next')}</Text>
            </TouchableOpacity>
        );
    }

    function onConfirm() {
        setIsSubmitted(true);


        let localUri = imgURI;
        let filename = localUri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = `image/${match[1]}`;

        const image = {
            uri: localUri,
            type,
            name: filename
        }


        dispatch(confirmCard(lang, cardNumber, amount, image, token, navigation)).then(() => setIsSubmitted(false));
    }

    return (
        <Container style={[styles.bg_green]}>
            <Content contentContainerStyle={[styles.bgFullWidth, styles.bg_green]}>

                <View style={[IS_IPHONE_X ? styles.marginTop_5 : 0, styles.marginHorizontal_15, styles.directionRowSpace]}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/images/back_arrow.png')} style={[styles.icon25, styles.transform]} resizeMode={'contain'} />
                    </TouchableOpacity>
                    <Image source={require('../../assets/images/logo_in_app.png')} style={[styles.icon100, { right: 12 }]} resizeMode={'contain'} />
                    <View />
                </View>

                <View style={[styles.bgFullWidth, styles.bg_White, styles.paddingHorizontal_20,
                styles.Width_100, styles.paddingTop_30,
                { borderTopRightRadius: 50, borderTopLeftRadius: 50 }]}>

                    <View style={[styles.directionRow, styles.marginBottom_35]}>
                        <Image source={require('../../assets/images/confirmat_card.png')} style={[styles.icon35, styles.marginBottom_7]} resizeMode={'contain'} />
                        <View style={{ marginLeft: 15 }}>
                            <Text style={[styles.textBold, styles.text_black, styles.textSize_14, styles.alignStart]}>{i18n.t('confirmCard')}</Text>
                            <Text style={[styles.textRegular, styles.text_gray, styles.textSize_13, styles.alignStart]}>{i18n.t('numOrImg')}</Text>
                        </View>
                    </View>

                    <KeyboardAvoidingView style={[styles.Width_100]}>
                        <Form style={[styles.Width_100, styles.flexCenter]}>
                            <View style={[styles.height_70, styles.flexCenter, styles.marginBottom_10]}>
                                <Item floatingLabel style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular, { color: cardNumberStatus === 1 ? COLORS.green : COLORS.gray, top: 1 }]}>{i18n.t('cardNumber')}</Label>
                                    <Input style={[styles.input, styles.height_50, (cardNumberStatus === 1 ? styles.Active : styles.noActive)]}
                                        onChangeText={(cardNumber) => setCardNumber(cardNumber)}
                                        onBlur={() => unActiveInput('cardNumber')}
                                        onFocus={() => activeInput('cardNumber')}
                                        value={cardNumber}
                                    />
                                </Item>
                                <TouchableOpacity onPress={() => navigation.navigate('barCodeScan', { pathName: 'confirmCard' })} style={{ position: 'absolute', right: 15, top: 15 }}>
                                    <Image source={require('../../assets/images/qr.png')} style={[styles.icon20]} resizeMode={'contain'} />
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.height_70, styles.flexCenter, styles.marginBottom_7]}>
                                <Item floatingLabel style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular, { color: amountStatus === 1 ? COLORS.green : COLORS.gray }]}>{i18n.t('amount')}</Label>
                                    <Input style={[styles.input, styles.height_50, (amountStatus === 1 ? styles.Active : styles.noActive)]}
                                        onChangeText={(amount) => setAmount(amount)}
                                        onBlur={() => unActiveInput('amount')}
                                        onFocus={() => activeInput('amount')}
                                        keyboardType={'decimal-pad'}
                                    />
                                </Item>
                            </View>

                            <TouchableOpacity onPress={toggleModal} style={[styles.height_50, styles.input, (cardImage !== '' && cardImage !== i18n.t('cardImg') ? styles.Active : styles.noActive), styles.directionRowSpace,
                            styles.marginBottom_25, styles.Width_100]}>
                                <Text style={[styles.textRegular, styles.text_gray, styles.textSize_13]}>{imgURI.substr(0, 45)}</Text>
                                <Image source={require('../../assets/images/camera_green.png')} style={[styles.icon20]} resizeMode={'contain'} />
                            </TouchableOpacity>


                            {renderConfirm()}

                        </Form>
                    </KeyboardAvoidingView>

                </View>
                <Modal
                    onBackdropPress={toggleModal}
                    onBackButtonPress={toggleModal}
                    isVisible={showModal}
                    style={styles.bgModel}
                    avoidKeyboard={true}
                >
                    <View style={[{
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30
                    }, styles.bg_White, styles.overHidden, styles.Width_100, styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                        <View style={[styles.overHidden, styles.Width_100, styles.paddingHorizontal_25]}>

                            <TouchableOpacity onPress={() => { ImagePickerMultiPart(); setShowModal(false) }} style={[styles.marginBottom_10]}>
                                <Text style={[styles.text_black, styles.textBold, styles.textSize_16]}>{i18n.t('photos')}</Text>
                            </TouchableOpacity>

                            <View style={[styles.borderGray, styles.marginBottom_5]} />

                            <TouchableOpacity onPress={() => { navigation.navigate('commonStack', { screen: 'cameraCapture', params: { pathName: 'confirmCard' } }); setShowModal(false) }} style={[styles.marginBottom_15]}>
                                <Text style={[styles.text_black, styles.textBold, styles.textSize_16]}>{i18n.t('camera')}</Text>
                            </TouchableOpacity>



                        </View>
                    </View>

                </Modal>
            </Content>
            {
                IS_IPHONE_X ?
                    <View style={[styles.bg_White, { height: 40, zIndex: 1 }]} />
                    :
                    null
            }


        </Container>
    );
}

export default ConfirmCard;


