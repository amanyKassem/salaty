import React , {useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, ScrollView, Vibration} from "react-native";
import {Container, Content, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import { Notifications } from 'expo'
import {useSelector} from "react-redux";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function Home({navigation}) {

    const notifications = useSelector(state => state.notifications.notifications);

    useEffect(() => {
        Notifications.addListener(handleNotification);
    }, []);

    function handleNotification(notification) {
        if (notification && notification.origin !== 'received') {
            navigation.navigate('notification');
        }

        if (notification.remote) {
            Vibration.vibrate();
            const notificationId = Notifications.presentLocalNotificationAsync({
                title: notification.data.title  ? notification.data.title : i18n.t('newNotification'),
                body: notification.data.body ? notification.data.body : i18n.t('_newNotification'),
                ios: { _displayInForeground: true }
            });
        }
    }


    return (
        <Container>
            <Content scrollEnabled={false} contentContainerStyle={[styles.bgFullWidth , styles.bg_green]}>

                <View style={[styles.marginTop_25 , styles.marginHorizontal_15 , styles.directionRowSpace]}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Image source={require('../../assets/images/menu.png')} style={[styles.icon25 , styles.transform]} resizeMode={'contain'} />
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

                <View style={styles.marginTop_135}>
                    <Image source={require('../../assets/images/vector_home.png')} style={[styles.icon220 , {position:'absolute' , bottom:-55 , left:30 , zIndex:1}]} resizeMode={'contain'} />
                </View>



                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    {/*<Text style={[styles.textBold , styles.text_black , styles.textSize_16,styles.alignStart]}>{ i18n.t('services') }</Text>*/}

                    <View style={[styles.marginTop_25 , styles.marginBottom_20 , {height:height - 300}]}>

                        <ScrollView contentContainerStyle={[styles.rowGroup]} showsVerticalScrollIndicator={false}>
                            <TouchableOpacity onPress={() => navigation.push('recharge')} style={[styles.Radius_7 , styles.width_155 , styles.height_120 , styles.marginBottom_5]}>
                                <Card style={[styles.directionColumnCenter ,styles.Radius_7 , styles.bgFullWidth]}>
                                    <Image source={require('../../assets/images/hand_card_small.png')} style={[styles.icon50 , styles.marginBottom_7]} resizeMode={'contain'} />
                                    <Text style={[styles.textBold , styles.text_black , styles.textSize_13]}>{ i18n.t('recharge') }</Text>
                                </Card>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.push('inquiryCard')} style={[styles.Radius_7 , styles.width_155 , styles.height_120 , styles.marginBottom_5]}>
                                <Card style={[styles.directionColumnCenter ,styles.Radius_7 , styles.bgFullWidth]}>
                                    <Image source={require('../../assets/images/card_info_small.png')} style={[styles.icon50 , styles.marginBottom_7]} resizeMode={'contain'} />
                                    <Text style={[styles.textBold , styles.text_black , styles.textSize_13]}>{ i18n.t('inquiry') }</Text>
                                </Card>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.push('transferCard')} style={[styles.Radius_7 , styles.width_155 , styles.height_120 , styles.marginBottom_5]}>
                                <Card style={[styles.directionColumnCenter ,styles.Radius_7 , styles.bgFullWidth]}>
                                    <Image source={require('../../assets/images/change_card_small.png')} style={[styles.icon50 , styles.marginBottom_7]} resizeMode={'contain'} />
                                    <Text style={[styles.textBold , styles.text_black , styles.textSize_13]}>{ i18n.t('transferCard') }</Text>
                                </Card>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.push('transferCredit')} style={[styles.Radius_7 , styles.width_155 , styles.height_120 , styles.marginBottom_5]}>
                                <Card style={[styles.directionColumnCenter ,styles.Radius_7 , styles.bgFullWidth]}>
                                    <Image source={require('../../assets/images/transform_money_small.png')} style={[styles.icon50 , styles.marginBottom_7]} resizeMode={'contain'} />
                                    <Text style={[styles.textBold , styles.text_black , styles.textSize_13]}>{ i18n.t('transferCredit') }</Text>
                                </Card>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.push('bankAccounts')} style={[styles.Radius_7 , styles.width_155 , styles.height_120 , styles.marginBottom_5]}>
                                <Card style={[styles.directionColumnCenter ,styles.Radius_7 , styles.bgFullWidth]}>
                                    <Image source={require('../../assets/images/bank_accounts_small.png')} style={[styles.icon50 , styles.marginBottom_7]} resizeMode={'contain'} />
                                    <Text style={[styles.textBold , styles.text_black , styles.textSize_13]}>{ i18n.t('bankAccounts') }</Text>
                                </Card>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.push('myCards')} style={[styles.Radius_7 , styles.width_155 , styles.height_120 , styles.marginBottom_5]}>
                                <Card style={[styles.directionColumnCenter ,styles.Radius_7 , styles.bgFullWidth]}>
                                    <Image source={require('../../assets/images/wallet_small.png')} style={[styles.icon50 , styles.marginBottom_7]} resizeMode={'contain'} />
                                    <Text style={[styles.textBold , styles.text_black , styles.textSize_13]}>{ i18n.t('myCards') }</Text>
                                </Card>
                            </TouchableOpacity>
                        </ScrollView>

                    </View>

                </View>

            </Content>
        </Container>
    );
}

export default Home;


