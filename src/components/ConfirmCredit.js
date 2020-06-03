import React, { useState , useEffect} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    KeyboardAvoidingView,
} from "react-native";
import {Container, Content, Form, Item, Label, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const isIOS = Platform.OS === 'ios';

function ConfirmCredit({navigation , route}) {

    const [isSubmitted, setIsSubmitted] = useState(false);

    const [code, setCode] = useState('');
    const [codeStatus, setCodeStatus] = useState(0);

    function activeInput(type) {
        if (type === 'code' || code !== '') setCodeStatus(1);
    }

    function unActiveInput(type) {
        if (type === 'code' && code === '') setCodeStatus(0);
    }


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
                <TouchableOpacity
                    onPress={() => onConfirm()} style={[styles.greenBtn , styles.Width_100 , styles.marginTop_20 , styles.marginBottom_25]}>
                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('send') }</Text>
                </TouchableOpacity>
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
        // setIsSubmitted(true)
        navigation.navigate('home')
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
                        <Image source={require('../../assets/images/transform_money_small.png')} style={[styles.icon35 , styles.marginBottom_7]} resizeMode={'contain'} />
                        <View style={{marginLeft:15}}>
                            <Text style={[styles.textBold , styles.text_black , styles.textSize_14]}>{ i18n.t('transferCredit') }</Text>
                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13]}>{ i18n.t('enterCode') }</Text>
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


