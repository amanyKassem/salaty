import React from "react";
import { View, Text, Image, TouchableOpacity} from "react-native";
import {Container, Content} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";

function SelectUser({navigation}) {

    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_green]}>

                <Image source={require('../../assets/images/login_vector.png')} style={[styles.icon220 , {top:40 , left:30 , zIndex:1}]} resizeMode={'contain'} />

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.directionColumn, styles.paddingTop_50,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>
                    <Image source={require('../../assets/images/logo_login.png')} style={[styles.icon150]} resizeMode={'contain'} />

                    <Text style={[styles.textRegular , styles.text_gray , styles.textCenter , styles.textSize_16 , styles.marginBottom_35]}>{ i18n.t('selectUser') }</Text>

                    <TouchableOpacity onPress={ () => navigation.push('login' , {userType:'user'})} style={[styles.greenBtn , styles.Width_100 , styles.marginTop_20 , styles.marginBottom_20]}>
                        <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('client') }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => navigation.push('login' , {userType:'cashier'})} style={[styles.greenBtn , styles.Width_100 , styles.marginBottom_35]}>
                        <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('cashier') }</Text>
                    </TouchableOpacity>

                </View>
            </Content>
        </Container>
    );
}

export default SelectUser;


