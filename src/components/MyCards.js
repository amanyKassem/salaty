import React, { useState , useEffect} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity, ActivityIndicator, ScrollView, Dimensions, Switch,
} from "react-native";
import {Container, Content, Accordion, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import {useDispatch, useSelector} from "react-redux";
import {getMyCards, cardOrder} from '../actions';
import MyCard from "./Card";

const isIOS = Platform.OS === 'ios';
const height    = Dimensions.get('window').height;
const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

function MyCards({navigation}) {


    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const myCards = useSelector(state => state.myCards.myCards);
    const myCardsLoader = useSelector(state => state.myCards.loader);
    const notifications = useSelector(state => state.notifications.notifications);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [screenLoader , setScreenLoader ] = useState(true);
    const [isExpanded , setIsExpanded ] = useState(false);

    const dispatch = useDispatch();

    function fetchData(){
        setScreenLoader(true)
        dispatch(getMyCards(lang, token))
    }

    useEffect(() => {
        setIsSubmitted(false)
    }, [isSubmitted]);



    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , myCardsLoader , isExpanded]);

    useEffect(() => {
        setScreenLoader(false)
    }, [myCards]);

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
        if (myCards && (myCards).length <= 0) {
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
        setIsExpanded(expanded);
        return (
            <Card style={[styles.directionRowSpace , styles.marginBottom_10, {padding:10}]}>
                <View style={[styles.directionRow]}>
                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('cardNumber') } :</Text>
                    <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.identity }</Text>
                </View>
                {
                    expanded ?
                        <Image source={require('../../assets/images/arrow_yellow_open.png')} style={[styles.icon15 , styles.transform]} resizeMode={'contain'} />
                    : <Image source={require('../../assets/images/drop_green_arrow.png')} style={[styles.icon15]} resizeMode={'contain'} />
                }
            </Card>
        );
    }

    function _allContent(item) {
        return (
            <MyCard key={item.identity} item={item} navigation={navigation}/>
        );
    }

    function renderConfirm(){

        if (isSubmitted){
            return(
                <View style={[{ justifyContent: 'center', alignItems: 'center' } , styles.marginTop_40 , styles.marginBottom_25]}>
                    <ActivityIndicator size="large" color={COLORS.mstarda} style={{ alignSelf: 'center' }} />
                </View>
            )
        }

        return (
            <TouchableOpacity onPress={() => onConfirm()} style={[styles.greenBtn , styles.Width_100 , styles.marginTop_40 , styles.marginBottom_25]}>
                <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('requestCard') }</Text>
            </TouchableOpacity>

        );
    }

    function onConfirm(){
        setIsSubmitted(true);
        dispatch(cardOrder(lang , token , navigation));
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


                <View style={[styles.bgFullWidth,styles.bg_White,styles.paddingHorizontal_20,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.directionRow,styles.marginBottom_35]}>
                        <Image source={require('../../assets/images/wallet_small.png')} style={[styles.icon35 , styles.marginBottom_7]} resizeMode={'contain'} />
                        <View style={{marginLeft:15}}>
                            <Text style={[styles.textBold , styles.text_black , styles.textSize_14,styles.alignStart]}>{ i18n.t('myCards') }</Text>
                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13,styles.alignStart]}>{ i18n.t('registeredCards') }</Text>
                        </View>
                    </View>
                    <View style={[styles.marginTop_15 , styles.marginBottom_20 , {height:height - 460}]}>
                    {renderNoData()}
                        <ScrollView contentContainerStyle={[styles.Width_100]} showsVerticalScrollIndicator={false}>
                            <Accordion
                                dataArray={myCards}
                                animation={true}
                                onAccordionOpen={() => {
                                    dispatch(getMyCards(lang, token))
                                }}
                                renderHeader={_allHeader}
                                renderContent={_allContent}
                                style={[{borderWidth:0}]}
                            />
                        </ScrollView>
                    </View>

                    {renderConfirm()}

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

export default MyCards;


