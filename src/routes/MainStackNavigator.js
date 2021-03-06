import React from "react";
import { View, Text, TouchableOpacity, Image, Dimensions, I18nManager } from 'react-native';
import COLORS from "../consts/colors";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, } from '@react-navigation/drawer';
import styles from '../../assets/styles'
import { useDispatch, useSelector } from "react-redux";
import { logout, tempAuth } from '../actions';
import i18n from "../../locale/i18n";


import Home from "../components/Home";
import InquiryCard from "../components/InquiryCard";
import AccStatement from "../components/AccStatement";
import Notification from "../components/Notification";
import Profile from "../components/Profile";
import EditData from "../components/EditData";
import Settings from "../components/Settings";
import EditPassword from "../components/EditPassword";
import Language from "../components/Language";
import GiftCard from "../components/GiftCard";
import GiftCardSuccessfully from "../components/GiftCardSuccessfully";
import Recharge from "../components/Recharge";
import TransferCredit from "../components/TransferCredit";
import ConfirmCredit from "../components/ConfirmCredit";
import TransferCard from "../components/TransferCard";
import ActivateCard from "../components/ActivateCard";
import MyCards from "../components/MyCards";
import AddCardSuccessfully from "../components/AddCardSuccessfully";
import BankAccounts from "../components/BankAccounts";
import Casher from "../components/Casher";
import EnterBill from "../components/EnterBill";
import ConfirmCard from "../components/ConfirmCard";
import CheckCredit from "../components/CheckCredit";
import ActiveConfirmCard from "../components/ActiveConfirmCard";
import Complaints from "../components/Complaints";
import ContactUs from "../components/ContactUs";
import BarCodeScan from "../components/BarCodeScan";
import CameraCapture from "../components/CameraCapture";


const height = Dimensions.get('window').height;

const MainStack = createStackNavigator();
const HomeStack = createStackNavigator();
const CasherStack = createStackNavigator();
const CommonStack = createStackNavigator();
const Drawer = createDrawerNavigator();


function CustomDrawerContent(props) {

    const lang = useSelector(state => state.lang.lang);
    const auth = useSelector(state => state.auth);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const notifications = useSelector(state => state.notifications.notifications);

    const dispatch = useDispatch();

    function logoutFunc() {
        dispatch(logout(lang, token));
        dispatch(tempAuth(token));
    }
    const authType = auth.user && auth.user.data.type ? auth.user.data.type : '';

    return (
        <DrawerContentScrollView {...props} style={[styles.bg_green]}>
            <View style={[styles.marginHorizontal_15, styles.directionRowSpace]}>
                <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
                    <Image source={require('../../assets/images/close_white.png')} style={[styles.icon20]} resizeMode={'contain'} />
                </TouchableOpacity>

                <Image source={require('../../assets/images/logo_in_app.png')} style={[styles.icon100, { right: authType === 'user' ? 0 : 12 }]} resizeMode={'contain'} />
                {
                    authType === 'user' ?
                        <TouchableOpacity onPress={() => navigation.push('notification')}>
                            {
                                notifications && (notifications).length > 0 ?
                                    <Image source={require('../../assets/images/notifcation_active.png')} style={[styles.icon25]} resizeMode={'contain'} />
                                    :
                                    <Image source={require('../../assets/images/notifcation_non_active.png')} style={[styles.icon25]} resizeMode={'contain'} />
                            }
                        </TouchableOpacity>
                        :
                        <View />
                }


            </View>

            <View style={[styles.bgFullWidth, styles.bg_White, styles.paddingTop_30, styles.marginTop_15,
            { borderTopRightRadius: 50, borderTopLeftRadius: 50, minHeight: height - 143 }]}>
                {/*<DrawerItemList {...props} />*/}
                <DrawerItem
                    style={[styles.borderBottomGray, { marginHorizontal: 0 }]}
                    label={
                        ({ focused, color }) => {
                            return (
                                <Text style={[styles.textRegular, styles.text_gray, styles.textSize_15, styles.alignStart, { writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr', right: 15 }]}>{i18n.t('profile')}</Text>
                            )
                        }
                    }
                    icon={
                        ({ focused, color }) => {
                            return (
                                <Image source={require('../../assets/images/arrow_gray_side.png')} style={[styles.icon20, styles.transform, { right: 20, position: 'absolute' }]} resizeMode={'contain'} />
                            )
                        }
                    }
                    onPress={() => props.navigation.navigate('commonStack', {
                        screen: 'profile',
                        params: { authType }
                    })}
                />
                <DrawerItem
                    style={[styles.borderBottomGray, { marginHorizontal: 0 }]}
                    label={
                        ({ focused, color }) => {
                            return (
                                <Text style={[styles.textRegular, styles.text_gray, styles.textSize_15, styles.alignStart, { writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr', right: 15 }]}>{i18n.t('settings')}</Text>
                            )
                        }
                    }
                    icon={
                        ({ focused, color }) => {
                            return (
                                <Image source={require('../../assets/images/arrow_gray_side.png')} style={[styles.icon20, styles.transform, { right: 20, position: 'absolute' }]} resizeMode={'contain'} />
                            )
                        }
                    }
                    onPress={() => props.navigation.navigate('commonStack', {
                        screen: 'settings',
                        params: { authType }
                    })}
                />

                {
                    authType === 'user' ?
                        <DrawerItem
                            style={[styles.borderBottomGray, { marginHorizontal: 0 }]}
                            label={
                                ({ focused, color }) => {
                                    return (
                                        <Text style={[styles.textRegular, styles.text_gray, styles.textSize_15, styles.alignStart, { writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr', right: 15 }]}>{i18n.t('giftCard')}</Text>
                                    )
                                }
                            }
                            icon={
                                ({ focused, color }) => {
                                    return (
                                        <Image source={require('../../assets/images/arrow_gray_side.png')} style={[styles.icon20, styles.transform, { right: 20, position: 'absolute' }]} resizeMode={'contain'} />
                                    )
                                }
                            }

                            onPress={() => props.navigation.navigate('commonStack', {
                                screen: 'giftCard',
                                params: { authType }
                            })}
                        />
                        :
                        null
                }
                {
                    authType === 'user' ?
                        <DrawerItem
                            style={[styles.borderBottomGray, { marginHorizontal: 0 }]}
                            label={
                                ({ focused, color }) => {
                                    return (
                                        <Text style={[styles.textRegular, styles.text_gray, styles.textSize_15, styles.alignStart, { writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr', right: 15 }]}>{i18n.t('complaints')}</Text>
                                    )
                                }
                            }
                            icon={
                                ({ focused, color }) => {
                                    return (
                                        <Image source={require('../../assets/images/arrow_gray_side.png')} style={[styles.icon20, styles.transform, { right: 20, position: 'absolute' }]} resizeMode={'contain'} />
                                    )
                                }
                            }

                            onPress={() => props.navigation.navigate('complaints')}
                        />
                        :
                        null
                }
                {
                    authType === 'user' ?
                        <DrawerItem
                            style={[styles.borderBottomGray, { marginHorizontal: 0 }]}
                            label={
                                ({ focused, color }) => {
                                    return (
                                        <Text style={[styles.textRegular, styles.text_gray, styles.textSize_15, styles.alignStart, { writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr', right: 15 }]}>{i18n.t('contactUs')}</Text>
                                    )
                                }
                            }
                            icon={
                                ({ focused, color }) => {
                                    return (
                                        <Image source={require('../../assets/images/arrow_gray_side.png')} style={[styles.icon20, styles.transform, { right: 20, position: 'absolute' }]} resizeMode={'contain'} />
                                    )
                                }
                            }

                            onPress={() => props.navigation.navigate('contactUs')}
                        />
                        :
                        null
                }

                <DrawerItem
                    style={[{ marginHorizontal: 0, paddingLeft: 17 }]}
                    label={
                        ({ focused, color }) => {
                            return (
                                <Text style={[styles.textRegular, styles.text_gray, styles.textSize_15, styles.alignStart, { flex: 1, writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' }]}>{i18n.t('logout')}</Text>
                            )
                        }
                    }
                    onPress={() => logoutFunc()}
                />
            </View>
        </DrawerContentScrollView>
    );
}

export function CommonStackNavigator() {
    return (
        <CommonStack.Navigator mode={'card'} screenOptions={{ headerShown: false }} >
            <CommonStack.Screen name='profile' options={{ headerShown: false }} component={Profile} />
            <CommonStack.Screen name='settings' options={{ headerShown: false }} component={Settings} />
            <CommonStack.Screen name='editData' options={{ headerShown: false }} component={EditData} />
            <CommonStack.Screen name='editPassword' options={{ headerShown: false }} component={EditPassword} />
            <CommonStack.Screen name='language' options={{ headerShown: false }} component={Language} />
            <CommonStack.Screen name='giftCard' options={{ headerShown: false }} component={GiftCard} />
            <CommonStack.Screen name='giftCardSuccessfully' options={{ headerShown: false }} component={GiftCardSuccessfully} />
            <CommonStack.Screen name='cameraCapture' options={{ headerShown: false }} component={CameraCapture} />
        </CommonStack.Navigator>
    );
}

export function HomeStackStackNavigator() {
    return (
        <HomeStack.Navigator mode={'card'} screenOptions={{ headerShown: false }} >
            <HomeStack.Screen name='home' options={{ headerShown: false }} component={Home} />
            <HomeStack.Screen name='inquiryCard' options={{ headerShown: false }} component={InquiryCard} />
            <HomeStack.Screen name='accStatement' options={{ headerShown: false }} component={AccStatement} />
            <HomeStack.Screen name='notification' options={{ headerShown: false }} component={Notification} />
            <HomeStack.Screen name='commonStack' options={{ headerShown: false }} component={CommonStackNavigator} />
            <HomeStack.Screen name='recharge' options={{ headerShown: false }} component={Recharge} />
            <HomeStack.Screen name='transferCredit' options={{ headerShown: false }} component={TransferCredit} />
            <HomeStack.Screen name='confirmCredit' options={{ headerShown: false }} component={ConfirmCredit} />
            <HomeStack.Screen name='transferCard' options={{ headerShown: false }} component={TransferCard} />
            <HomeStack.Screen name='activateCard' options={{ headerShown: false }} component={ActivateCard} />
            <HomeStack.Screen name='myCards' options={{ headerShown: false }} component={MyCards} />
            <HomeStack.Screen name='addCardSuccessfully' options={{ headerShown: false }} component={AddCardSuccessfully} />
            <HomeStack.Screen name='bankAccounts' options={{ headerShown: false }} component={BankAccounts} />
            <HomeStack.Screen name='complaints' options={{ headerShown: false }} component={Complaints} />
            <HomeStack.Screen name='contactUs' options={{ headerShown: false }} component={ContactUs} />
            <HomeStack.Screen name='barCodeScan' options={{ headerShown: false }} component={BarCodeScan} />
        </HomeStack.Navigator>
    );
}

export function CasherStackStackNavigator() {
    return (
        <CasherStack.Navigator mode={'card'} screenOptions={{ headerShown: false }} >
            <CasherStack.Screen name='casher' options={{ headerShown: false }} component={Casher} />
            <CasherStack.Screen name='enterBill' options={{ headerShown: false }} component={EnterBill} />
            <CasherStack.Screen name='confirmCard' options={{ headerShown: false }} component={ConfirmCard} />
            <CasherStack.Screen name='checkCredit' options={{ headerShown: false }} component={CheckCredit} />
            <CasherStack.Screen name='commonStack' options={{ headerShown: false }} component={CommonStackNavigator} />
            <CasherStack.Screen name='activeConfirmCard' options={{ headerShown: false }} component={ActiveConfirmCard} />
            <CasherStack.Screen name='barCodeScan' options={{ headerShown: false }} component={BarCodeScan} />
        </CasherStack.Navigator>
    );
}

function MyDrawer() {

    const auth = useSelector(state => state.auth);

    const authType = auth.user && auth.user.data.type ? auth.user.data.type : '';

    return (
        <Drawer.Navigator
            drawerStyle={[styles.Width_100]}
            drawerContentOptions={{
                itemStyle: [styles.borderBottomGray, styles.paddingHorizontal_15, { backgroundColor: 'transparent', marginHorizontal: 0 }],
                labelStyle: [styles.textRegular, { color: COLORS.black }],
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}>
            {
                authType === 'user' ?
                    <Drawer.Screen name="homeStack" component={HomeStackStackNavigator} options={{ drawerLabel: i18n.t('home') }} />
                    :
                    <Drawer.Screen name="casherStack" component={CasherStackStackNavigator} options={{ drawerLabel: i18n.t('home') }} />
            }
        </Drawer.Navigator>
    );
}


export function MainStackNavigator() {
    return (
        <MainStack.Navigator mode={'card'} screenOptions={{ headerShown: false }}  >
            <MainStack.Screen name='myDrawer' options={{ headerShown: false }} component={MyDrawer} />
        </MainStack.Navigator>
    );
}

