import React, { useState , useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, ScrollView} from "react-native";
import {Container, Content, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useDispatch, useSelector} from "react-redux";
import {getNotifications , deleteNoti} from '../actions';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const isIOS = Platform.OS === 'ios';

function Notification({navigation , route}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user.data.token);
    const notifications = useSelector(state => state.notifications.notifications);
    const notificationsLoader = useSelector(state => state.notifications.loader);

    const dispatch = useDispatch();

    function fetchData(){
        dispatch(getNotifications(lang, token))
    }
    function deleteNotify(id){
        dispatch(deleteNoti(lang , id, token))
    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , notificationsLoader]);


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

                            {
                                notifications.map((notification, i) => {
                                    return (

                                        <View key={notification.id} style={[styles.Radius_7, styles.marginBottom_12]}>
                                            <Card
                                                style={[styles.directionBasicRow, styles.Radius_7, styles.bgFullWidth, {padding: 17}]}>
                                                <Image source={require('../../assets/images/ring_small.png')}
                                                       style={[styles.icon33, styles.marginBottom_7]}
                                                       resizeMode={'contain'}/>
                                                <View style={[styles.marginHorizontal_10, {flex: 1}]}>
                                                    <Text
                                                        style={[styles.textRegular, styles.text_gray, styles.textSize_14, styles.alignStart]}>{notification.title}</Text>
                                                    <Text
                                                        style={[styles.textBold, styles.text_black, styles.textSize_13, styles.alignStart]}>{notification.body}</Text>
                                                    <Text
                                                        style={[styles.textRegular, styles.text_light_gray, styles.textSize_13, styles.marginTop_5, styles.alignStart]}>{notification.date}</Text>
                                                </View>
                                                <TouchableOpacity onPress = {() => deleteNotify(notification.id)} style={[styles.icon23, {right: -5, top: -5}]}>
                                                    <Image source={require('../../assets/images/rubbish_can_gray.png')}
                                                           style={[styles.Width_100, styles.heightFull, styles.marginBottom_7]}
                                                           resizeMode={'contain'}/>
                                                </TouchableOpacity>
                                            </Card>
                                        </View>
                                    )
                                })
                            }

                        </ScrollView>

                    </View>

                </View>

            </Content>
        </Container>
    );
}

export default Notification;


