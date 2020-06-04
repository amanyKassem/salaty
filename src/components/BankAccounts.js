import React, { useState , useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import {Container, Content, Card, Form} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const isIOS = Platform.OS === 'ios';

function BankAccounts({navigation , route}) {

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


                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.directionRow,styles.marginBottom_35]}>
                        <Image source={require('../../assets/images/bank_accounts_small.png')} style={[styles.icon35 , styles.marginBottom_7]} resizeMode={'contain'} />
                        <View style={{marginLeft:15}}>
                            <Text style={[styles.textBold , styles.text_black , styles.textSize_14,styles.alignStart]}>{ i18n.t('bankAccounts') }</Text>
                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13,styles.alignStart]}>{ i18n.t('registeredBank') }</Text>
                        </View>
                    </View>

                    <View style={[styles.Radius_7 , styles.Width_100, styles.marginBottom_12]}>
                        <Card style={[styles.directionRow ,styles.Radius_7 , styles.bgFullWidth , {overflow:'hidden'}]}>
                            <View style={[styles.paddingHorizontal_10 ,{ borderBottomWidth:1 , borderColor: COLORS.mstarda }]}>
                                <Image source={require('../../assets/images/bank_alqahra.png')} style={[styles.icon100 , styles.marginBottom_7]} resizeMode={'contain'} />
                            </View>
                            <View style={{flex:1 , marginLeft:7 , paddingRight:7}}>
                                <View style={[styles.directionRow]}>
                                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('bank') } :</Text>
                                    <Text style={[styles.textBold , styles.text_black , styles.textSize_12, {marginLeft:5}]}>بنك القاهرة</Text>
                                </View>
                                <View style={[styles.directionRow , {flexWrap:'wrap'}]}>
                                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('accName') } :</Text>
                                    <Text style={[styles.textBold , styles.text_black , styles.textSize_12, {marginLeft:5}]}>12345678911</Text>
                                </View>
                            </View>
                        </Card>
                    </View>

                    <View style={[styles.Radius_7 , styles.Width_100, styles.marginBottom_12]}>
                        <Card style={[styles.directionRow ,styles.Radius_7 , styles.bgFullWidth , {overflow:'hidden'}]}>
                            <View style={[styles.paddingHorizontal_10 ,{ borderBottomWidth:1 , borderColor: COLORS.mstarda }]}>
                                <Image source={require('../../assets/images/cib.png')} style={[styles.icon100 , styles.marginBottom_7]} resizeMode={'contain'} />
                            </View>
                            <View style={{flex:1 , marginLeft:7 , paddingRight:7}}>
                                <View style={[styles.directionRow]}>
                                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('bank') } :</Text>
                                    <Text style={[styles.textBold , styles.text_black , styles.textSize_12, {marginLeft:5}]}>بنك CIB</Text>
                                </View>
                                <View style={[styles.directionRow , {flexWrap:'wrap'}]}>
                                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('accName') } :</Text>
                                    <Text style={[styles.textBold , styles.text_black , styles.textSize_12, {marginLeft:5 }]}>123456789119999</Text>
                                </View>
                            </View>
                        </Card>
                    </View>

                    <View style={[styles.Radius_7 , styles.Width_100, styles.marginBottom_12]}>
                        <Card style={[styles.directionRow ,styles.Radius_7 , styles.bgFullWidth , {overflow:'hidden'}]}>
                            <View style={[styles.paddingHorizontal_10 ,{ borderBottomWidth:1 , borderColor: COLORS.mstarda }]}>
                                <Image source={require('../../assets/images/alrajhe.png')} style={[styles.icon100 , styles.marginBottom_7]} resizeMode={'contain'} />
                            </View>
                            <View style={{flex:1 , marginLeft:7 , paddingRight:7}}>
                                <View style={[styles.directionRow]}>
                                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('bank') } :</Text>
                                    <Text style={[styles.textBold , styles.text_black , styles.textSize_12, {marginLeft:5}]}>بنك الراجحي</Text>
                                </View>
                                <View style={[styles.directionRow , {flexWrap:'wrap'}]}>
                                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('accName') } :</Text>
                                    <Text style={[styles.textBold , styles.text_black , styles.textSize_12, {marginLeft:5}]}>12345678911</Text>
                                </View>
                            </View>
                        </Card>
                    </View>


                </View>

            </Content>
        </Container>
    );
}

export default BankAccounts;


