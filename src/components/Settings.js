import React, { useState , useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions , Switch} from "react-native";
import {Container, Content, Card, Form} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import RNPickerSelect from 'react-native-picker-select';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const isIOS = Platform.OS === 'ios';

function Settings({navigation , route}) {

    const [switchValue, setSwitchValue] = useState(false);

    function toggleSwitch(value) {
        setSwitchValue(value);
    }

    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_green]}>

                <View style={[styles.marginTop_25 , styles.marginHorizontal_15 , styles.directionRowSpace]}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/images/back_arrow.png')} style={[styles.icon25]} resizeMode={'contain'} />
                    </TouchableOpacity>

                    <Image source={require('../../assets/images/logo_in_app.png')} style={[styles.icon100]} resizeMode={'contain'} />

                    <TouchableOpacity onPress={() => navigation.push('notification')}>
                        <Image source={require('../../assets/images/notifcation_non_active.png')} style={[styles.icon25]} resizeMode={'contain'} />
                    </TouchableOpacity>

                </View>


                <View style={[styles.bgFullWidth,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.directionRow,styles.marginBottom_35 , styles.paddingHorizontal_25]}>
                        <Image source={require('../../assets/images/setting_small.png')} style={[styles.icon35 , styles.marginBottom_7]} resizeMode={'contain'} />
                        <View style={{marginLeft:15}}>
                            <Text style={[styles.textBold , styles.text_black , styles.textSize_14]}>{ i18n.t('settings') }</Text>
                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_13]}>{ i18n.t('controlSettings') }</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => navigation.push('editPassword')} style={[styles.directionRowSpace , styles.borderBottomGray , styles.paddingHorizontal_25, styles.marginBottom_15,{paddingBottom:15}]}>
                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_15]}>{ i18n.t('password') }</Text>
                        <Image source={require('../../assets/images/arrow_gray_side.png')} style={[styles.icon20, {left:10}]} resizeMode={'contain'} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.push('language')} style={[styles.directionRowSpace , styles.borderBottomGray , styles.paddingHorizontal_25, styles.marginBottom_15,{paddingBottom:15}]}>
                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_15]}>{ i18n.t('language') }</Text>
                        <Image source={require('../../assets/images/arrow_gray_side.png')} style={[styles.icon20, {left:10}]} resizeMode={'contain'} />
                    </TouchableOpacity>


                    <View style={[styles.directionRowSpace , styles.borderBottomGray , styles.paddingHorizontal_25, styles.marginBottom_15,{paddingBottom:15}]}>
                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_15]}>{ i18n.t('notifications') }</Text>
                        <Switch
                            style={{left:10}}
                            onValueChange={() => toggleSwitch(!switchValue)}
                            value={switchValue}
                            trackColor={COLORS.mstarda}
                            thumbColor={COLORS.mstarda}
                        />
                    </View>

                </View>

            </Content>
        </Container>
    );
}

export default Settings;


