import React, { useState , useEffect} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
    KeyboardAvoidingView,
    ScrollView
} from "react-native";
import {Container, Content, Card, Form, Item, Label, Input, Toast} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {useDispatch, useSelector} from "react-redux";
import {getBanks , getCardRecharge} from '../actions';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const isIOS = Platform.OS === 'ios';

function Recharge({navigation , route}) {

    const [isSubmitted, setIsSubmitted] = useState(false);

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user.data.token);
    const banks = useSelector(state => state.banks.banks);
    const banksLoader = useSelector(state => state.banks.loader);

    const [bankId, setBankId] = useState(null);

    const [draftImage, setDraftImage] = useState(i18n.t('draftImage'));
    const [base64, setBase64] = useState('');

    const [username, setUsername] = useState('');
    const [usernameStatus, setUsernameStatus] = useState(0);
    const [accName, setAccName] = useState('');
    const [accNameStatus, setAccNameStatus] = useState(0);
    const [bankTransName, setBankTransName] = useState('');
    const [bankTransNameStatus, setBankTransNameStatus] = useState(0);
    const [cardNumber, setCardNumber] = useState('');
    const [cardNumberStatus, setCardNumberStatus] = useState(0);

    function activeInput(type) {
        if (type === 'accName' || accName !== '') setAccNameStatus(1);
        if (type === 'username' || username !== '') setUsernameStatus(1);
        if (type === 'bankTransName' || bankTransName !== '') setBankTransNameStatus(1);
        if (type === 'cardNumber' || cardNumber !== '') setCardNumberStatus(1);
    }

    function unActiveInput(type) {
        if (type === 'accName' && accName === '') setAccNameStatus(0);
        if (type === 'username' && username === '') setUsernameStatus(0);
        if (type === 'bankTransName' && bankTransName === '') setBankTransNameStatus(0);
        if (type === 'cardNumber' && cardNumber === '') setCardNumberStatus(0);
    }


    const dispatch = useDispatch();

    function fetchData(){
        dispatch(getBanks(lang, token))
    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , banksLoader]);


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
            setDraftImage(result.uri.split('/').pop());
            setBase64(result.base64);
        }
    };



    function renderConfirm(){
        if (bankId == null || username == '' || accName == '' || bankTransName == '' ||  cardNumber == '' || draftImage == i18n.t('draftImage')|| draftImage == ''){
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
                <View style={[{ justifyContent: 'center', alignItems: 'center' } , styles.marginTop_20 , styles.marginBottom_25]}>
                    <ActivityIndicator size="large" color={COLORS.mstarda} style={{ alignSelf: 'center' }} />
                </View>
            )
        }

        return (
            <TouchableOpacity
                onPress={() => onConfirm()} style={[styles.greenBtn , styles.Width_100 , styles.marginTop_20 , styles.marginBottom_25]}>
                <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('send') }</Text>
            </TouchableOpacity>

        );
    }

    function onConfirm(){
        setIsSubmitted(true);
        dispatch(getCardRecharge(lang , username , accName , bankTransName , base64 , bankId , cardNumber , token , navigation));
    }

    function selectBank(id){
        setBankId(id)
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
                        <Image source={require('../../assets/images/notifcation_non_active.png')} style={[styles.icon25]} resizeMode={'contain'} />
                    </TouchableOpacity>

                </View>


                <View style={[styles.bgFullWidth,styles.bg_White,styles.paddingHorizontal_20,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.directionRow,styles.marginBottom_35]}>
                        <Image source={require('../../assets/images/hand_card_small.png')} style={[styles.icon35 , styles.marginBottom_7]} resizeMode={'contain'} />
                        <View style={{marginLeft:15}}>
                            <Text style={[styles.textBold , styles.text_black , styles.textSize_14, styles.alignStart]}>{ i18n.t('recharge') }</Text>
                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13, styles.alignStart]}>{ i18n.t('fillInfo') }</Text>
                        </View>
                    </View>


                    <View style={[styles.marginBottom_10]}>

                        <ScrollView style={[styles.scrollView]} horizontal={true} showsHorizontalScrollIndicator={false}>
                            {
                                banks.map((bank, i) => {
                                    return(
                                        <TouchableOpacity key={bank.id} onPress={() => selectBank(bank.id)}
                                                          style={[styles.Radius_7, styles.icon130, styles.marginBottom_12, {marginRight: 10}]}>
                                            <Card
                                                style={[styles.directionColumnCenter, styles.Radius_7, styles.bgFullWidth, {
                                                    borderWidth: 1,
                                                    borderColor: bankId === bank.id ? COLORS.mstarda : 'transparent'
                                                }]}>
                                                <Image source={{uri:bank.image}}
                                                       style={[styles.icon100, styles.marginBottom_7]}
                                                       resizeMode={'contain'}/>
                                            </Card>
                                        </TouchableOpacity>
                                    )
                                })
                            }

                        </ScrollView>
                    </View>

                    <View style={[styles.borderGray , styles.marginBottom_25 , {borderColor:'#eee' , borderWidth:0.5}]}/>

                    <KeyboardAvoidingView style={[styles.Width_100]}>
                        <Form style={[styles.Width_100 , styles.flexCenter]}>

                            <View style={[styles.height_70, styles.flexCenter, styles.marginBottom_7]}>
                                <Item floatingLabel style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:usernameStatus === 1 ?  COLORS.green :  COLORS.gray, top:1}]}>{ i18n.t('username') }</Label>
                                    <Input style={[styles.input, styles.height_50, (usernameStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(username) => setUsername(username)}
                                           onBlur={() => unActiveInput('username')}
                                           onFocus={() => activeInput('username')}
                                    />
                                </Item>
                            </View>

                            <View style={[styles.height_70, styles.flexCenter, styles.marginBottom_7]}>
                                <Item floatingLabel style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:accNameStatus === 1 ?  COLORS.green :  COLORS.gray, top:1}]}>{ i18n.t('accName') }</Label>
                                    <Input style={[styles.input, styles.height_50, (accNameStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(accName) => setAccName(accName)}
                                           onBlur={() => unActiveInput('accName')}
                                           onFocus={() => activeInput('accName')}
                                           keyboardType={'number-pad'}
                                    />
                                </Item>
                            </View>

                            <View style={[styles.height_70, styles.flexCenter, styles.marginBottom_7]}>
                                <Item floatingLabel style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:bankTransNameStatus === 1 ?  COLORS.green :  COLORS.gray , top:1}]}>{ i18n.t('bankName') }</Label>
                                    <Input style={[styles.input, styles.height_50, (bankTransNameStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(bankTransName) => setBankTransName(bankTransName)}
                                           onBlur={() => unActiveInput('bankTransName')}
                                           onFocus={() => activeInput('bankTransName')}
                                    />
                                </Item>
                            </View>

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

                            <TouchableOpacity onPress={_pickImage} style={[styles.height_50 ,styles.input ,(draftImage !== '' && draftImage !== i18n.t('draftImage') ? styles.Active : styles.noActive), styles.directionRowSpace,
                                styles.marginBottom_20 , styles.Width_100]}>
                                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13]}>{draftImage.substr(0,38)}</Text>
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

export default Recharge;


