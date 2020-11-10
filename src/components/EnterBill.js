import React, { useState , useEffect} from "react";
import {View, Text, Image, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, Dimensions,} from "react-native";
import {Container, Content, Form, Item, Label, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {useDispatch, useSelector} from "react-redux";
import {storeBill} from '../actions';

const isIOS = Platform.OS === 'ios';
const height    = Dimensions.get('window').height;
const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

function EnterBill({navigation , route}) {

    const credit        = route.params.credit;
    const image         = route.params.image;
    const phone         = route.params.phone;
    const card_identity = route.params.card_identity;

    const lang  = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [billImage, setBillImage] = useState(i18n.t('billImage'));
    const [base64, setBase64] = useState('');

    const [totalBillAmount, setTotalBillAmount] = useState('');
    const [totalBillAmountStatus, setTotalBillAmountStatus] = useState(0);

    function activeInput(type) {
        if (type === 'totalBillAmount' || totalBillAmount !== '') setTotalBillAmountStatus(1);
    }

    function unActiveInput(type) {
        if (type === 'totalBillAmount' && totalBillAmount === '') setTotalBillAmountStatus(0);
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
            setBillImage(result.uri.split('/').pop());
            setBase64(result.base64);
        }
    };


    function renderConfirm(){
        if ( totalBillAmount == '' || billImage == i18n.t('billImage')|| billImage == ''){
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
        dispatch(storeBill(lang , card_identity , phone , totalBillAmount , base64 , image  , token , navigation ));
    }

    return (
       <Container style={[styles.bg_green]}>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_green]}>

                <View style={[IS_IPHONE_X ? styles.marginTop_5 : 0 , styles.marginHorizontal_15 , styles.directionRowSpace]}>
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
                        <Image source={require('../../assets/images/bill_small.png')} style={[styles.icon35 , styles.marginBottom_7]} resizeMode={'contain'} />
                        <View style={{marginLeft:15}}>
                            <Text style={[styles.textBold , styles.text_black , styles.textSize_14,styles.alignStart]}>{ i18n.t('enterBill') }</Text>
                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13,styles.alignStart]}>{ i18n.t('enterBillData') }</Text>
                        </View>
                    </View>

                    <KeyboardAvoidingView style={[styles.Width_100]}>
                        <Form style={[styles.Width_100 , styles.flexCenter]}>

                            <View style={[styles.height_70, styles.flexCenter, styles.marginBottom_7]}>
                                <Item floatingLabel style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:totalBillAmountStatus === 1 ?  COLORS.green :  COLORS.gray, top:1}]}>{ i18n.t('totalBillAmount') }</Label>
                                    <Input style={[styles.input, styles.height_50, (totalBillAmountStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(totalBillAmount) => setTotalBillAmount(totalBillAmount)}
                                           onBlur={() => unActiveInput('totalBillAmount')}
                                           onFocus={() => activeInput('totalBillAmount')}
                                           keyboardType={'decimal-pad'}
                                    />
                                </Item>
                            </View>

                            <TouchableOpacity onPress={_pickImage} style={[styles.height_50 ,styles.input ,(billImage !== '' && billImage !== i18n.t('billImage') ? styles.Active : styles.noActive), styles.directionRowSpace,
                                styles.marginBottom_25 , styles.Width_100]}>
                                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13]}>{billImage.substr(0,38)}</Text>
                                <Image source={require('../../assets/images/camera_green.png')} style={[styles.icon20]} resizeMode={'contain'} />
                            </TouchableOpacity>


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

export default EnterBill;


