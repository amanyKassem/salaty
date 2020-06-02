import React, { useState , useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import {Container, Content, Card, Form} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import RNPickerSelect from 'react-native-picker-select';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const isIOS = Platform.OS === 'ios';

function Profile({navigation , route}) {


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
                        <Image source={require('../../assets/images/user_small_icon.png')} style={[styles.icon35 , styles.marginBottom_7]} resizeMode={'contain'} />
                        <View style={{marginLeft:15}}>
                            <Text style={[styles.textBold , styles.text_black , styles.textSize_14]}>{ i18n.t('profile') }</Text>
                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13]}>{ i18n.t('yourInfo') }</Text>
                        </View>
                    </View>

                    <View style={[styles.directionRow , styles.borderBottomGray , styles.paddingHorizontal_25, styles.marginBottom_15,{paddingBottom:15}]}>
                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 , styles.width_90]}>{ i18n.t('name') }</Text>
                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 , { marginRight:20}]}> : </Text>
                        <Text style={[styles.textRegular , styles.text_black , styles.textSize_14]}>أماني</Text>
                    </View>

                    <View style={[styles.directionRow , styles.borderBottomGray , styles.paddingHorizontal_25, styles.marginBottom_15,{paddingBottom:15}]}>
                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 , styles.width_90]}>{ i18n.t('phone') }</Text>
                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 , {marginRight:20}]}> : </Text>
                        <Text style={[styles.textRegular , styles.text_black , styles.textSize_14]}>012345678</Text>
                    </View>

                    <View style={[styles.directionRow , styles.paddingHorizontal_25, styles.marginBottom_15,{paddingBottom:15}]}>
                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 , styles.width_90]}>{ i18n.t('city') }</Text>
                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 , {marginRight:20}]}> : </Text>
                        <Text style={[styles.textRegular , styles.text_black , styles.textSize_14]}>الرياض</Text>
                    </View>



                    <TouchableOpacity onPress={ () => navigation.push('editData')} style={[styles.greenBtn , styles.Width_87 , styles.SelfCenter , styles.marginTop_25]}>
                        <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('editData') }</Text>
                    </TouchableOpacity>

                </View>

            </Content>
        </Container>
    );
}

export default Profile;


