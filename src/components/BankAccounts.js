import React, { useState , useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, ScrollView, ActivityIndicator} from "react-native";
import {Container, Content, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import {useDispatch, useSelector} from "react-redux";
import {getBanks} from '../actions';

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';
const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

function BankAccounts({navigation}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const banks = useSelector(state => state.banks.banks);
    const banksLoader = useSelector(state => state.banks.loader);
    const notifications = useSelector(state => state.notifications.notifications);
    const [screenLoader , setScreenLoader ] = useState(true);

    const dispatch = useDispatch();

    function fetchData(){
        setScreenLoader(true)
        dispatch(getBanks(lang, token))
    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , banksLoader]);


    useEffect(() => {
        setScreenLoader(false)
    }, [banks]);

    function renderLoader(){
        if (screenLoader){
            return(
                <View style={[styles.loading, styles.flexCenter, {backgroundColor:'#fff'}]}>
                    <ActivityIndicator size="large" color={COLORS.mstarda} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }

    function renderNoData() {
        if (banks && (banks).length <= 0) {
            return (
                <View style={[styles.directionColumnCenter , styles.Width_100, styles.marginTop_25]}>
                    <Image source={require('../../assets/images/note.png')} resizeMode={'contain'}
                           style={{alignSelf: 'center', width: 200, height: 200}}/>
                </View>
            );
        }

        return null
    }


    return (
       <Container style={[styles.bg_green]}>
            {renderLoader()}
            <Content scrollEnabled={false} contentContainerStyle={[styles.bgFullWidth , styles.bg_green]}>

                <View style={[IS_IPHONE_X ? styles.marginTop_5 : 0 , styles.marginHorizontal_15 , styles.directionRowSpace]}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/images/back_arrow.png')} style={[styles.icon25, styles.transform]} resizeMode={'contain'} />
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

                    <View style={[{height:height - 250}]}>
                        {renderNoData()}
                        <ScrollView contentContainerStyle={[styles.Width_100]} showsVerticalScrollIndicator={false}>

                            {
                                banks.map((bank, i) => {
                                    return (
                                        <View key={bank.id} style={[styles.Radius_7, styles.Width_100, styles.marginBottom_12]}>
                                            <Card
                                                style={[styles.directionRow, styles.Radius_7, styles.bgFullWidth, {overflow: 'hidden'}]}>
                                                <View style={[styles.paddingHorizontal_10, {
                                                    borderBottomWidth: 1,
                                                    borderColor: COLORS.mstarda
                                                }]}>
                                                    <Image source={{uri:bank.image}}
                                                           style={[styles.icon100, styles.marginBottom_7]}
                                                           resizeMode={'contain'}/>
                                                </View>
                                                <View style={{flex: 1, marginLeft: 7, paddingRight: 7}}>
                                                    <View style={[styles.directionRow, {flexWrap: 'wrap'}]}>
                                                        <Text
                                                            style={[styles.textRegular, styles.text_gray, styles.textSize_14]}>{i18n.t('bank')} :</Text>
                                                        <Text
                                                            style={[styles.textBold, styles.text_black, styles.textSize_12, {marginLeft: 5}]}>{bank.name}</Text>
                                                    </View>
                                                    <View style={[styles.directionRow, {flexWrap: 'wrap'}]}>
                                                        <Text
                                                            style={[styles.textRegular, styles.text_gray, styles.textSize_14]}>{i18n.t('accName')} :</Text>
                                                        <Text
                                                            style={[styles.textBold, styles.text_black, styles.textSize_12, {marginLeft: 5}]}>{bank.account_number}</Text>
                                                    </View>
                                                </View>
                                            </Card>
                                        </View>
                                    )
                                })
                            }

                        </ScrollView>
                    </View>

                </View>

            </Content>
           {
               IS_IPHONE_X ?
                   <View style={[styles.bg_White , {height:40 , zIndex:1}]}/>
                   :
                   null
           }
        </Container>
    );
}

export default BankAccounts;


