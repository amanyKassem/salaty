import React, { useState , useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import {Container, Content, Card, Form} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import {useSelector, useDispatch} from 'react-redux';
import { chooseLang } from '../actions';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const isIOS = Platform.OS === 'ios';

function Language({navigation , route}) {

    const language = useSelector(state => state.lang);
    const [lang, setLang] = useState(language.lang);
    console.log("language" , language.lang)


    const dispatch = useDispatch()

    function selectLang(newLang) {
        if(newLang !== lang){
            setLang(newLang)
            navigation.navigate('settings');
            dispatch(chooseLang(newLang))
        }
    }

    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_green]}>

                <View style={[styles.marginTop_25 , styles.marginHorizontal_15 , styles.directionRowSpace]}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/images/back_arrow.png')} style={[styles.icon25]} resizeMode={'contain'} />
                    </TouchableOpacity>

                    <Image source={require('../../assets/images/logo_in_app.png')} style={[styles.icon100]} resizeMode={'contain'} />

                    <TouchableOpacity onPress={() => navigation.push('notification')}>
                        <Image source={require('../../assets/images/notifcation_non_active.png')} style={[styles.icon25]} resizeMode={'contain'} />
                    </TouchableOpacity>

                </View>


                <View style={[styles.bgFullWidth,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.directionRow,styles.marginBottom_35 , styles.paddingHorizontal_25]}>
                        <Image source={require('../../assets/images/setting_small.png')} style={[styles.icon35 , styles.marginBottom_7]} resizeMode={'contain'} />
                        <View style={{marginLeft:15}}>
                            <Text style={[styles.textBold , styles.text_black , styles.textSize_14]}>{ i18n.t('language') }</Text>
                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13]}>{ i18n.t('setLang') }</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => selectLang('ar')} style={[styles.directionRowSpace , styles.borderBottomGray , styles.paddingHorizontal_25, styles.marginBottom_15,{paddingBottom:15}]}>
                        <Text style={[styles.textRegular , lang === 'ar' ? styles.text_mstarda : styles.text_gray , styles.textSize_15 ]}>عربي</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => selectLang('en')} style={[styles.directionRowSpace , styles.paddingHorizontal_25, styles.marginBottom_15,{paddingBottom:15}]}>
                        <Text style={[styles.textRegular , lang === 'en' ? styles.text_mstarda : styles.text_gray , styles.textSize_15 ]}>English</Text>
                    </TouchableOpacity>

                </View>

            </Content>
        </Container>
    );
}

export default Language;


