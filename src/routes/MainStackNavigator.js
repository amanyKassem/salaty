import React , {useState} from "react";import {View, Text, TouchableOpacity, Image, Dimensions, I18nManager} from 'react-native';import COLORS from "../consts/colors";import { MaterialCommunityIcons } from 'react-native-vector-icons';import { createStackNavigator } from '@react-navigation/stack';import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem,} from '@react-navigation/drawer';import styles from '../../assets/styles'import {useSelector} from "react-redux";import Home                     from "../components/Home";import InquiryCard              from "../components/InquiryCard";import AccStatement             from "../components/AccStatement";import Notification             from "../components/Notification";import {Content} from "native-base";import i18n from "../../locale/i18n";const height = Dimensions.get('window').height;const MainStack  = createStackNavigator();const HomeStack  = createStackNavigator();const Drawer = createDrawerNavigator();function CustomDrawerContent(props) {	return (		<DrawerContentScrollView {...props} style={[styles.bg_green]}>			<View style={[styles.marginHorizontal_15 , styles.directionRowSpace]}>				<TouchableOpacity onPress={() => props.navigation.closeDrawer()}>					<Image source={require('../../assets/images/close_white.png')} style={[styles.icon20]} resizeMode={'contain'} />				</TouchableOpacity>				<Image source={require('../../assets/images/logo_in_app.png')} style={[styles.icon100]} resizeMode={'contain'} />				<TouchableOpacity onPress={() => navigation.push('notification')}>					<Image source={require('../../assets/images/notifcation_non_active.png')} style={[styles.icon25]} resizeMode={'contain'} />				</TouchableOpacity>			</View>            <View style={[styles.bgFullWidth,styles.bg_White, styles.paddingTop_30, styles.marginTop_15,                {borderTopRightRadius:50 , borderTopLeftRadius:50 , minHeight:height-143}]}>			    {/*<DrawerItemList {...props} />*/}                <DrawerItem                    style={[styles.borderBottomGray, {marginHorizontal:0 ,paddingLeft:15}]}                    label={                        ({ focused, color }) => {                            return (                                <Image source={require('../../assets/images/arrow_gray_side.png')} style={[styles.icon20 , {left:20}]} resizeMode={'contain'} />                            )                        }                    }                    icon={                        ({ focused, color }) => {                            return (                                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_15, styles.alignStart , {flex:1 , writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{ i18n.t('profile') }</Text>                            )                        }                    }                    onPress={() => props.navigation.navigate('profile')}                />                <DrawerItem                    style={[styles.borderBottomGray, {marginHorizontal:0 ,paddingLeft:15}]}                    label={                        ({ focused, color }) => {                            return (                                <Image source={require('../../assets/images/arrow_gray_side.png')} style={[styles.icon20, {left:20}]} resizeMode={'contain'} />                            )                        }                    }                    icon={                        ({ focused, color }) => {                            return (                                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_15, styles.alignStart , {flex:1 , writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{ i18n.t('settings') }</Text>                            )                        }                    }                    onPress={() => props.navigation.navigate('settings')}                />                <DrawerItem                    style={[styles.borderBottomGray, {marginHorizontal:0 ,paddingLeft:15}]}                    label={                        ({ focused, color }) => {                            return (                                <Image source={require('../../assets/images/arrow_gray_side.png')} style={[styles.icon20, {left:20}]} resizeMode={'contain'} />                            )                        }                    }                    icon={                        ({ focused, color }) => {                            return (                                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_15, styles.alignStart , {flex:1 , writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{ i18n.t('giftCard') }</Text>                            )                        }                    }                    onPress={() => props.navigation.navigate('giftCard')}                />                <DrawerItem                    style={[{marginHorizontal:0 ,paddingLeft:15}]}                    label={                        ({ focused, color }) => {                            return (                                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_15, styles.alignStart , {flex:1 , writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{ i18n.t('logout') }</Text>                            )                        }                    }                    onPress={() => alert('logout')}                />            </View>		</DrawerContentScrollView>	);}export function HomeStackStackNavigator()  {	return(		<HomeStack.Navigator mode={'card'} screenOptions={{headerShown: false}} >			<HomeStack.Screen name='home' options={{headerShown:false}} component={Home}/>			<HomeStack.Screen name='inquiryCard' options={{headerShown:false}} component={InquiryCard}/>			<HomeStack.Screen name='accStatement' options={{headerShown:false}} component={AccStatement}/>			<HomeStack.Screen name='notification' options={{headerShown:false}} component={Notification}/>		</HomeStack.Navigator>	);}function MyDrawer() {	return (		<Drawer.Navigator			drawerStyle={[styles.Width_100]}            drawerContentOptions={{                itemStyle: [styles.borderBottomGray , styles.paddingHorizontal_15 , { backgroundColor: 'transparent' , marginHorizontal:0}],                labelStyle: [styles.textRegular ,{color:COLORS.black }],            }}			drawerContent={(props) => <CustomDrawerContent {...props} />}>			<Drawer.Screen name="homeStack" component={HomeStackStackNavigator} options={{ drawerLabel:  i18n.t('home')  }}/>		</Drawer.Navigator>	);}export function MainStackNavigator()  {	return(		<MainStack.Navigator mode={'card'} screenOptions={{headerShown: false}}  >			<MainStack.Screen name='myDrawer' options={{headerShown:false}} component={MyDrawer}/>			<MainStack.Screen name='inquiryCard' options={{headerShown:false}} component={InquiryCard}/>			<MainStack.Screen name='accStatement' options={{headerShown:false}} component={AccStatement}/>			<MainStack.Screen name='notification' options={{headerShown:false}} component={Notification}/>		</MainStack.Navigator>	);}