import React, { useState , useEffect } from "react";
import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import {Container, Content, Form, Input, Item, Label, Toast} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import { useDispatch, useSelector } from 'react-redux'
import {checkInquery} from "../actions";

function BalanceInquiry({navigation, route}) {

    const lang = useSelector(state => state.lang.lang);
    const dispatch = useDispatch();

    const [cardNumber, setCardNumber] = useState('');
    const [cardNumberStatus, setCardNumberStatus] = useState(0);
    const [spinner, setSpinner] = useState(false);


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSpinner(false)
        });
        setSpinner(false)
        return unsubscribe;
    }, [navigation, spinner]);

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			if (route.params?.cardNumber) {
				setCardNumber(route.params.cardNumber);
				setCardNumberStatus(1);
			}
		});

		return unsubscribe;
	}, [route.params?.cardNumber ,navigation]);


    function activeInput(type) {
        if (type === 'cardNumber' || cardNumber !== '') setCardNumberStatus(1);
    }

    function unActiveInput(type) {
        if (type === 'cardNumber' && cardNumber === '') setCardNumberStatus(0);
    }


    function renderSubmit() {
        if (cardNumber == '') {
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

        return (
            <TouchableOpacity
                onPress={() => onConfirm()} style={[styles.greenBtn , styles.Width_100 , styles.marginTop_20]}>
                <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('send') }</Text>
            </TouchableOpacity>
        );
    }

    function onConfirm() {
        // setSpinner(true);
        dispatch(checkInquery(cardNumber, lang));
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

                <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.marginTop_35 , {marginLeft:15}]}>
                    <Image source={require('../../assets/images/back_arrow.png')} style={[styles.icon25, styles.transform]} resizeMode={'contain'} />
                </TouchableOpacity>

                <Image source={require('../../assets/images/login_vector.png')} style={[styles.icon220 , {top:40 , left:30 , zIndex:1}]} resizeMode={'contain'} />

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.directionColumn, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>
                    <Image source={require('../../assets/images/logo_login.png')} style={[styles.icon100]} resizeMode={'contain'} />

                    <KeyboardAvoidingView style={[styles.Width_100, styles.marginTop_20]}>
                        <Form style={[styles.Width_100 , styles.flexCenter]}>
                            <View style={[styles.height_70, styles.flexCenter, styles.marginBottom_7]}>
                                <Item floatingLabel style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:cardNumberStatus === 1 ?  COLORS.green :  COLORS.gray}]}>{ i18n.t('cardNumber') }</Label>
                                    <Input style={[styles.input, styles.height_50, (cardNumberStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(cardNumber) => setCardNumber(cardNumber)}
                                           onBlur={() => unActiveInput('cardNumber')}
                                           onFocus={() => activeInput('cardNumber')}
										   value={cardNumber}
                                    />
                                </Item>

								<TouchableOpacity onPress={() => navigation.navigate('barCodeScan' , {pathName:'balanceInquiry'})} style={{position:'absolute' , right:15 , top:15}}>
									<Image source={require('../../assets/images/qr.png')} style={[styles.icon20]} resizeMode={'contain'} />
								</TouchableOpacity>
                            </View>

                            {renderSubmit()}

                        </Form>
                    </KeyboardAvoidingView>
                </View>
            </Content>
        </Container>
    );
}

export default BalanceInquiry;


