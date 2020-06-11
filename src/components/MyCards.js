import React, { useState , useEffect} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    KeyboardAvoidingView, ActivityIndicator,
} from "react-native";
import {Container, Content, Accordion, Item, Label, Input, Card, Toast} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import {useDispatch, useSelector} from "react-redux";
import {getMyCards, cardOrder} from '../actions';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const isIOS = Platform.OS === 'ios';

function MyCards({navigation , route}) {


    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user.data.token);
    const myCards = useSelector(state => state.myCards.myCards);
    const myCardsLoader = useSelector(state => state.myCards.loader);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const dispatch = useDispatch();

    function fetchData(){
        dispatch(getMyCards(lang, token))
    }

    useEffect(() => {
        setIsSubmitted(false)
    }, []);

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , myCardsLoader]);



    function _allHeader(item, expanded) {
        return (
            <Card style={[styles.directionRowSpace , styles.marginBottom_10, {padding:10}]}>
                <View style={[styles.directionRow]}>
                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('cardNumber') } :</Text>
                    <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.identity }</Text>
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

                <View style={[styles.directionRow]}>
                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('credit') } :</Text>
                    <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.credit }</Text>
                </View>

                <View style={[styles.directionRow]}>
                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('phone') } :</Text>
                    <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.phone }</Text>
                </View>

                <View style={[styles.directionRow]}>
                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('status') } :</Text>
                    <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.statue }</Text>
                </View>

            </View>
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

                    <View>
                        <Accordion
                            dataArray={myCards}
                            animation={true}
                            expanded={true}
                            renderHeader={_allHeader}
                            renderContent={_allContent}
                            style={[{borderWidth:0}]}
                        />
                    </View>

                    {renderConfirm()}

                </View>

            </Content>
        </Container>
    );
}

export default MyCards;

