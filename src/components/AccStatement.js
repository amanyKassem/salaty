import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity , ScrollView , ActivityIndicator , Dimensions} from "react-native";
import {Container, Content, Accordion, Card} from 'native-base'
import styles from '../../assets/styles'
import COLORS from "../consts/colors";
import i18n from "../../locale/i18n"
import {useDispatch, useSelector} from "react-redux";
import {getCardEnquiry} from '../actions';

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function AccStatement({navigation , route}) {

    const card = route.params.card;
    const [type, setType] = useState('all');
    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user.data.token);
    const notifications = useSelector(state => state.notifications.notifications);
    const cardEnquiry = useSelector(state => state.cardEnquiry.cardEnquiry);
    const cardEnquiryLoader = useSelector(state => state.cardEnquiry.loader);
    const [screenLoader , setScreenLoader ] = useState(true);

    const dispatch = useDispatch();

    function fetchData(){
        setScreenLoader(true)
        dispatch(getCardEnquiry(lang , card , type, token))
    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            setType('all')
            fetchData();
        });

        return unsubscribe;
    }, [navigation , cardEnquiryLoader]);

    useEffect(() => {
        setScreenLoader(false)
    }, [cardEnquiry]);


    function changeType(newType) {
        setScreenLoader(true)
        setType(newType);
        dispatch(getCardEnquiry(lang , card , newType, token))
    }


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
        if (cardEnquiry && (cardEnquiry).length <= 0) {
            return (
                <View style={[styles.directionColumnCenter , styles.Width_100, styles.marginTop_25]}>
                    <Image source={require('../../assets/images/note.png')} resizeMode={'contain'}
                           style={{alignSelf: 'center', width: 200, height: 200}}/>
                </View>
            );
        }

        return null
    }

    function _allHeader(item, expanded) {
        return (
            <Card style={[styles.directionRowSpace , styles.marginBottom_10, {padding:10}]}>
                <View style={[styles.directionRow]}>
                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('opDate') } :</Text>
                    <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.date }</Text>
                </View>
                {expanded
                    ? <Image source={require('../../assets/images/arrow_yellow_open.png')} style={[styles.icon15 , styles.transform]} resizeMode={'contain'} />
                    : <Image source={require('../../assets/images/drop_green_arrow.png')} style={[styles.icon15]} resizeMode={'contain'} />}
            </Card>
        );
    }

    function _allContent(item) {
        return (
            <View style={{padding:10 , paddingTop:5}}>

                {
                        type === 'all' ?
                            <View style={[styles.directionRow]}>
                                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('amount') } :</Text>
                                <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.amount }</Text>
                            </View>
                            :
                            type === 'discount' ?
                                <View style={[styles.directionRow]}>
                                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('disAmount') } :</Text>
                                    <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.amount }</Text>
                                </View>
                                :
                                type === 'charge' ?
                                    <View style={[styles.directionRow]}>
                                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('chargeAmount') } :</Text>
                                        <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.amount }</Text>
                                    </View>
                                    :
                                    type === 'transfer' ?
                                        <View style={[styles.directionRow]}>
                                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('transfreAmount') } :</Text>
                                            <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.amount }</Text>
                                        </View>
                                        :
                                        null
                }


                <View style={[styles.directionRow]}>
                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('time') } :</Text>
                    <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.time }</Text>
                </View>
                {
                    type === 'all' ?
                        <View style={[styles.directionRow]}>
                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('status') } :</Text>
                            <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.type }</Text>
                        </View>
                        :
                        null
                }
                {
                    (type === 'all' || type === 'transfer' ) && item.case && item.case != '' && item.case != null ?
                        <View style={[styles.directionRow]}>
                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('type') } :</Text>
                            <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.case }</Text>
                        </View>
                        :
                        null
                }
            </View>
        );
    }


    return (
        <Container>
            {renderLoader()}
            <Content scrollEnabled={false} contentContainerStyle={[styles.bgFullWidth , styles.bg_green]}>

                <View style={[styles.marginTop_25 , styles.marginHorizontal_15 , styles.directionRowSpace]}>
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

                <View style={styles.marginTop_65}>
                    <View style={[styles.paddingHorizontal_30, styles.paddingBottom55 , styles.paddingTop20, styles.Width_100,
                        {backgroundColor:'#03683f',borderTopRightRadius:50 , borderTopLeftRadius:50 ,
                            position:'absolute' , bottom:-40}]}>
                        <ScrollView style={[styles.scrollView]} horizontal={true} showsHorizontalScrollIndicator={false}
                        contentContainerStyle={[styles.directionRowSpace , styles.Width_100 ]}>
                            <TouchableOpacity onPress={() => changeType('all')}>
                                <Text style={[styles.textBold , type === 'all' ? styles.text_White : styles.text_green , styles.textSize_15]}>{ i18n.t('all') }</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => changeType('discount')}>
                                <Text style={[styles.textBold , type === 'discount' ? styles.text_White : styles.text_green , styles.textSize_15]}>{ i18n.t('discount') }</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => changeType('charge')}>
                                <Text style={[styles.textBold , type === 'charge' ? styles.text_White : styles.text_green , styles.textSize_15]}>{ i18n.t('charge') }</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => changeType('transfer')}>
                                <Text style={[styles.textBold , type === 'transfer' ? styles.text_White : styles.text_green , styles.textSize_15]}>{ i18n.t('transfer') }</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.directionRow,styles.marginBottom_35]}>
                        <Image source={require('../../assets/images/Statement_small.png')} style={[styles.icon35 , styles.marginBottom_7]} resizeMode={'contain'} />
                        <View style={{marginLeft:15}}>
                            <Text style={[styles.textBold , styles.text_black , styles.textSize_14,styles.alignStart]}>{ i18n.t('accStatement') }</Text>
                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13,styles.alignStart]}>{ i18n.t('cardOp') }</Text>
                        </View>
                    </View>
                    <View style={[styles.marginTop_15 , styles.marginBottom_20 , {height:height - 350}]}>
                        {renderNoData()}
                        <ScrollView contentContainerStyle={[styles.Width_100]} showsVerticalScrollIndicator={false}>
                            <Accordion
                                dataArray={cardEnquiry}
                                animation={true}
                                expanded={true}
                                renderHeader={_allHeader}
                                renderContent={_allContent}
                                style={[{borderWidth:0}]}
                            />
                        </ScrollView>
                    </View>

                </View>

            </Content>
        </Container>
    );
}

export default AccStatement;


