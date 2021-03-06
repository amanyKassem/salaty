import React from "react";
import {View, Text, Image, TouchableOpacity, Dimensions} from "react-native";
import {Container, Content,} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import { useSelector} from "react-redux";

const isIOS = Platform.OS === 'ios';
const height    = Dimensions.get('window').height;
const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

function Casher({navigation}) {
    const user      = useSelector(state => state.auth.user ? state.auth.user.data : { avatar: '../../assets/images/user_small_icon.png', name: null, email: null, phone: null });
    return (
        <Container style={[styles.bg_green]}>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_green]}>

                <View style={[IS_IPHONE_X ? styles.marginTop_5 : 0 , styles.marginHorizontal_15 , styles.directionRowSpace]}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Image source={require('../../assets/images/menu.png')} style={[styles.icon25 , styles.transform]} resizeMode={'contain'} />
                    </TouchableOpacity>

                    <Image source={require('../../assets/images/logo_in_app.png')} style={[styles.icon100, {right:12}]} resizeMode={'contain'} />

                    <View/>

                </View>


                <View style={[styles.bgFullWidth,styles.Width_100 , styles.directionColumnSpace]}>

                    <View style={[styles.flexCenter , styles.paddingHorizontal_15 , {flex:1}]}>
                        <Image source={require('../../assets/images/qr_code_vector.png')} style={[styles.icon200]} resizeMode={'contain'} />
                        <Text style={[styles.textBold , styles.marginBottom_5 , styles.text_White , styles.textSize_16, styles.textCenter]}>{ i18n.t('welcome') } {user.name}</Text>
                        <Text style={[styles.textRegular , styles.text_White , styles.textSize_16, styles.textCenter]}>{ i18n.t('implementDiscount') }</Text>
                    </View>

                    <View style={[styles.bg_White,styles.paddingHorizontal_20 , styles.paddingVertical_45, styles.Width_100, {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>
                        <TouchableOpacity onPress={() => navigation.navigate('confirmCard')} style={[styles.greenBtn , styles.Width_100]}>
                            <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('enterBill') }</Text>
                        </TouchableOpacity>
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

export default Casher;


