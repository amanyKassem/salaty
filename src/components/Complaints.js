import React, { useState , useEffect} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform,
    ActivityIndicator,
    KeyboardAvoidingView,
    Dimensions
} from "react-native";
import {Container, Content, Card, Form, Item, Label, Input, Textarea} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import RNPickerSelect from 'react-native-picker-select';
import COLORS from "../consts/colors";
import {useDispatch, useSelector} from "react-redux";
import {addComplaint} from '../actions';

const isIOS = Platform.OS === 'ios';
const height    = Dimensions.get('window').height;
const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

function Complaints({navigation , route}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const user = useSelector(state => state.auth.user.data);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const notifications = useSelector(state => state.notifications.notifications);

    const [fullName, setFullName] = useState('');
    const [fullNameStatus, setFullNameStatus] = useState(0);
    const [email, setEmail] = useState('');
    const [emailStatus, setEmailStatus] = useState(0);
    const [msgSubject, setMsgSubject] = useState('');
    const [msgSubjectStatus, setMsgSubjectStatus] = useState(0);
    const [writeUrMsg, setWriteUrMsg] = useState('');
    const [writeUrMsgStatus, setWriteUrMsgStatus] = useState(0);


    const dispatch = useDispatch();

    useEffect(() => {
        setIsSubmitted(false)
    }, [isSubmitted]);


    function activeInput(type) {
        if (type === 'fullName' || fullName !== '') setFullNameStatus(1);
        if (type === 'email' || email !== '') setEmailStatus(1);
        if (type === 'msgSubject' || msgSubject !== '') setMsgSubjectStatus(1);
        if (type === 'writeUrMsg' || writeUrMsg !== '') setWriteUrMsgStatus(1);
    }

    function unActiveInput(type) {
        if (type === 'fullName' && fullName === '') setFullNameStatus(0);
        if (type === 'email' && email === '') setEmailStatus(0);
        if (type === 'msgSubject' && msgSubject === '') setMsgSubjectStatus(0);
        if (type === 'writeUrMsg' && writeUrMsg === '') setWriteUrMsgStatus(0);
    }

    function renderSubmit() {
        if (fullName == '' || email == ''|| msgSubject == ''|| writeUrMsg == '') {
            return (
                <View
                    style={[styles.greenBtn , styles.Width_100 , styles.marginBottom_35 , {
                        backgroundColor:'#ccc'
                    }]}
                >
                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('send') }</Text>
                </View>
            );
        }

        if (isSubmitted){
            return(
                <View style={[{ justifyContent: 'center', alignItems: 'center' } , styles.marginBottom_35]}>
                    <ActivityIndicator size="large" color={COLORS.mstarda} style={{ alignSelf: 'center' }} />
                </View>
            )
        }

        return (
            <TouchableOpacity
                onPress={() => onEdit()} style={[styles.greenBtn , styles.Width_100 , styles.marginBottom_35]}>
                <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('send') }</Text>
            </TouchableOpacity>
        );
    }

    function onEdit(){
        setIsSubmitted(true)
        dispatch(addComplaint(lang , fullName , email , msgSubject , writeUrMsg , token , navigation));
    }



    return (
       <Container style={[styles.bg_green]}>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_green]}>

                <View style={[IS_IPHONE_X ? styles.marginTop_5 : 0 , styles.marginHorizontal_15 , styles.directionRowSpace]}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/images/back_arrow.png')} style={[styles.icon25, styles.transform]} resizeMode={'contain'} />
                    </TouchableOpacity>

                    <Image source={require('../../assets/images/logo_in_app.png')} style={[styles.icon100,{right:0}]} resizeMode={'contain'} />

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
                        <Image source={require('../../assets/images/complaint.png')} style={[styles.icon35 , styles.marginBottom_7]} resizeMode={'contain'} />
                        <View style={{marginLeft:15}}>
                            <Text style={[styles.textBold , styles.text_black , styles.textSize_14, styles.alignStart]}>{ i18n.t('complaints') }</Text>
                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13, styles.alignStart]}>{ i18n.t('fillComplaint') }</Text>
                        </View>
                    </View>

                    <KeyboardAvoidingView style={[styles.Width_100]}>
                        <Form style={[styles.Width_100 , styles.flexCenter]}>

                            <View style={[styles.height_70, styles.flexCenter, styles.marginBottom_7]}>
                                <Item floatingLabel style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:fullNameStatus === 1 ?  COLORS.green :  COLORS.gray , top:2}]}>{ i18n.t('userName') }</Label>
                                    <Input style={[styles.input, styles.height_50, (fullNameStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(fullName) => setFullName(fullName)}
                                           onBlur={() => unActiveInput('fullName')}
                                           onFocus={() => activeInput('fullName')}
                                    />
                                </Item>
                            </View>

                            <View style={[styles.height_70, styles.flexCenter, styles.marginBottom_7]}>
                                <Item floatingLabel style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:emailStatus === 1 ?  COLORS.green :  COLORS.gray , top:2}]}>{ i18n.t('email') }</Label>
                                    <Input style={[styles.input, styles.height_50, (emailStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(email) => setEmail(email)}
                                           onBlur={() => unActiveInput('email')}
                                           onFocus={() => activeInput('email')}
                                           keyboardType={'email-address'}
                                    />
                                </Item>
                            </View>

                            <View style={[styles.height_70, styles.flexCenter , styles.marginBottom_7]}>
                                <Item floatingLabel style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,{ color:msgSubjectStatus === 1 ?  COLORS.green :  COLORS.gray , top:2}]}>{ i18n.t('msgSubject') }</Label>
                                    <Input style={[styles.input, styles.height_50, (msgSubjectStatus === 1 ? styles.Active : styles.noActive)]}
                                           onChangeText={(msgSubject) => setMsgSubject(msgSubject)}
                                           onBlur={() => unActiveInput('msgSubject')}
                                           onFocus={() => activeInput('msgSubject')}
                                    />
                                </Item>
                            </View>

                            <View style={[styles.Width_100 , {top:-25}]}>
                                <Label style={[styles.label, styles.textRegular ,{ color:writeUrMsgStatus === 1 ?  COLORS.green :  COLORS.gray, top:writeUrMsgStatus === 1 ? 10 : 40}]}>{ i18n.t('writeUrMsg') }</Label>
                                <Textarea style={[styles.input, styles.height_120 , styles.Width_100 , styles.paddingVertical_10,
                                    (writeUrMsgStatus === 1 ? styles.Active : styles.noActive) , styles.marginBottom_25]}
                                          onChangeText={(writeUrMsg) => setWriteUrMsg(writeUrMsg)}
                                          onBlur={() => unActiveInput('writeUrMsg')}
                                          onFocus={() => activeInput('writeUrMsg')}
                                />
                            </View>

                            {renderSubmit()}

                        </Form>

                    </KeyboardAvoidingView>

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

export default Complaints;


