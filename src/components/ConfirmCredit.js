import React, { useState , useEffect} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView, ActivityIndicator,
} from "react-native";
import {Container, Content, Form, Item, Label, Input, Toast} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import {cridetTransferConfirm} from "../actions";
import {useDispatch, useSelector} from "react-redux";

const isIOS = Platform.OS === 'ios';

function ConfirmCredit({navigation , route}) {


    const activeCode = route.params.activeCode;
    const trans_id = route.params.trans_id;
    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const notifications = useSelector(state => state.notifications.notifications);

    useEffect(() => {
        // alert('activation code : ' + activeCode)
    }, []);

    const [isSubmitted, setIsSubmitted] = useState(false);

    const [code, setCode] = useState('');
    const [codeStatus, setCodeStatus] = useState(0);

    function activeInput(type) {
        if (type === 'code' || code !== '') setCodeStatus(1);
    }

    function unActiveInput(type) {
        if (type === 'code' && code === '') setCodeStatus(0);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        setIsSubmitted(false)
    }, [isSubmitted]);



    function renderConfirm(){
        if ( code == ''){
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
        if (activeCode == code) {
            setIsSubmitted(true);
            dispatch(cridetTransferConfirm(lang , trans_id, token , navigation));
        }
        else {
            Toast.show({
                text        	: i18n.t('codeNotMatch'),
                type			: "danger",
                duration    	: 3000,
                textStyle   	: {
                    color       	: "white",
                    fontFamily  	: 'cairo',
                    textAlign   	: 'center'
                }
            });
        }
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


                <View style={[styles.bgFullWidth,styles.bg_White,styles.paddingHorizontal_20,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.directionRow,styles.marginBottom_35]}>
                        <Image source={require('../../assets/images/transform_money_small.png')} style={[styles.icon35 , styles.marginBottom_7]} resizeMode={'contain'} />
                        <View style={{marginLeft:15}}>
                            <Text style={[styles.textBold , styles.text_black , styles.textSize_14,styles.alignStart]}>{ i18n.t('transferCredit') }</Text>
                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13,styles.alignStart]}>{ i18n.t('enterCode') }</Text>
                        </View>
                    </View>

                    <KeyboardAvoidingView style={[styles.Width_100]}>
                        <Form style={[styles.Width_100 , styles.flexCenter]}>

                            <View style={[styles.height_70, styles.flexCenter, styles.marginBottom_7]}>
                                <Item floatingLabel style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:codeStatus === 1 ?  COLORS.green :  COLORS.gray}]}>{ i18n.t('code') }</Label>
                                    <Input style={[styles.input, styles.height_50, (codeStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(code) => setCode(code)}
                                           onBlur={() => unActiveInput('code')}
                                           onFocus={() => activeInput('code')}
                                           keyboardType={'number-pad'}
                                    />
                                </Item>
                            </View>


                            {renderConfirm()}

                        </Form>
                    </KeyboardAvoidingView>

                </View>

            </Content>
        </Container>
    );
}

export default ConfirmCredit;


