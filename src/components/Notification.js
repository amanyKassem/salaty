import React, { useState , useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, ScrollView} from "react-native";
import {Container, Content, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import  Modal  from "react-native-modal";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const isIOS = Platform.OS === 'ios';

function Notification({navigation , route}) {

    return (
        <Container>
            <Content scrollEnabled={false} contentContainerStyle={[styles.bgFullWidth , styles.bg_green]}>

                <View style={[styles.marginTop_25 , styles.marginHorizontal_15 , styles.directionRowSpace]}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/images/back_arrow.png')} style={[styles.icon25, styles.transform]} resizeMode={'contain'} />
                    </TouchableOpacity>

                    <Image source={require('../../assets/images/logo_in_app.png')} style={[styles.icon100]} resizeMode={'contain'} />

                    <TouchableOpacity onPress={() => navigation.navigate('notification')}>
                        <Image source={require('../../assets/images/notifcation_non_active.png')} style={[styles.icon25]} resizeMode={'contain'} />
                    </TouchableOpacity>

                </View>

                <View style={styles.marginTop_150}>
                    <Image source={require('../../assets/images/notifcation_vector.png')} style={[styles.icon220 , {position:'absolute' , bottom:-55 , left:30 , zIndex:1}]} resizeMode={'contain'} />
                </View>



                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <Text style={[styles.textBold , styles.text_black , styles.textSize_16,styles.alignStart]}>{ i18n.t('notifications') }</Text>

                    <View style={[styles.marginTop_15 , styles.marginBottom_20 , {height:height - 370}]}>

                        <ScrollView contentContainerStyle={[styles.Width_100]} showsVerticalScrollIndicator={false}>

                            <View style={[styles.Radius_7 , styles.marginBottom_12]}>
                                <Card style={[styles.directionBasicRow ,styles.Radius_7 , styles.bgFullWidth , {padding:17}]}>
                                    <Image source={require('../../assets/images/ring_small.png')} style={[styles.icon33 , styles.marginBottom_7]} resizeMode={'contain'} />
                                    <View style={[styles.marginHorizontal_10 ,{flex:1}]}>
                                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14, styles.alignStart]}>رسالة من الاداره</Text>
                                        <Text style={[styles.textBold , styles.text_black , styles.textSize_13, styles.alignStart]}>تم تحويل المبلغ الي بطاقة Amany</Text>
                                        <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13, styles.marginTop_5, styles.alignStart]}>منذ يومين</Text>
                                    </View>
                                    <TouchableOpacity style={[styles.icon23 , {right:-5 , top:-5}]}>
                                        <Image source={require('../../assets/images/rubbish_can_gray.png')} style={[styles.Width_100 , styles.heightFull , styles.marginBottom_7]} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                </Card>
                            </View>

                            <View style={[styles.Radius_7 , styles.marginBottom_12]}>
                                <Card style={[styles.directionBasicRow ,styles.Radius_7 , styles.bgFullWidth , {padding:17}]}>
                                    <Image source={require('../../assets/images/ring_small.png')} style={[styles.icon33 , styles.marginBottom_7]} resizeMode={'contain'} />
                                    <View style={[styles.marginHorizontal_10 ,{flex:1}]}>
                                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14, styles.alignStart]}>رسالة من الاداره</Text>
                                        <Text style={[styles.textBold , styles.text_black , styles.textSize_13, styles.alignStart]}>تم تحويل المبلغ الي بطاقة Amany</Text>
                                        <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13, styles.marginTop_5, styles.alignStart]}>منذ يومين</Text>
                                    </View>
                                    <TouchableOpacity style={[styles.icon23 , {right:-5 , top:-5}]}>
                                        <Image source={require('../../assets/images/rubbish_can_gray.png')} style={[styles.Width_100 , styles.heightFull , styles.marginBottom_7]} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                </Card>
                            </View>

                            <View style={[styles.Radius_7 , styles.marginBottom_12]}>
                                <Card style={[styles.directionBasicRow ,styles.Radius_7 , styles.bgFullWidth , {padding:17}]}>
                                    <Image source={require('../../assets/images/ring_small.png')} style={[styles.icon33 , styles.marginBottom_7]} resizeMode={'contain'} />
                                    <View style={[styles.marginHorizontal_10 ,{flex:1}]}>
                                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14, styles.alignStart]}>رسالة من الاداره</Text>
                                        <Text style={[styles.textBold , styles.text_black , styles.textSize_13, styles.alignStart]}>تم تحويل المبلغ الي بطاقة Amany</Text>
                                        <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13, styles.marginTop_5, styles.alignStart]}>منذ يومين</Text>
                                    </View>
                                    <TouchableOpacity style={[styles.icon23 , {right:-5 , top:-5}]}>
                                        <Image source={require('../../assets/images/rubbish_can_gray.png')} style={[styles.Width_100 , styles.heightFull , styles.marginBottom_7]} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                </Card>
                            </View>

                        </ScrollView>

                    </View>

                </View>

            </Content>
        </Container>
    );
}

export default Notification;


