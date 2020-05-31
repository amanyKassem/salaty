import React, { useState , useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import {Container, Content, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import  Modal  from "react-native-modal";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const isIOS = Platform.OS === 'ios';

function Home({navigation , route}) {


    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_green]}>

                <View style={[styles.marginTop_25 , styles.marginHorizontal_15 , styles.directionRowSpace]}>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Image source={require('../../assets/images/menu.png')} style={[styles.icon25]} resizeMode={'contain'} />
                    </TouchableOpacity>

                    <Image source={require('../../assets/images/logo_in_app.png')} style={[styles.icon100]} resizeMode={'contain'} />

                    <TouchableOpacity onPress={() => navigation.push('notification')}>
                        <Image source={require('../../assets/images/notifcation_non_active.png')} style={[styles.icon25]} resizeMode={'contain'} />
                    </TouchableOpacity>

                </View>

                <Image source={require('../../assets/images/vector_home.png')} style={[styles.icon220 , {top:47 , left:30 , zIndex:1}]} resizeMode={'contain'} />

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <Text style={[styles.textBold , styles.text_black , styles.textSize_16]}>{ i18n.t('services') }</Text>


                    <View style={[styles.rowGroup , styles.marginTop_15 , styles.marginBottom_20]}>

                       <TouchableOpacity style={[styles.Radius_7 , styles.icon150 , styles.marginBottom_12]}>
                           <Card style={[styles.directionColumnCenter ,styles.Radius_7 , styles.bgFullWidth]}>
                               <Image source={require('../../assets/images/hand_card_small.png')} style={[styles.icon50 , styles.marginBottom_7]} resizeMode={'contain'} />
                               <Text style={[styles.textBold , styles.text_black , styles.textSize_12]}>{ i18n.t('recharge') }</Text>
                           </Card>
                       </TouchableOpacity>

                       <TouchableOpacity onPress={() => navigation.push('inquiryCard')} style={[styles.Radius_7 , styles.icon150 , styles.marginBottom_12]}>
                           <Card style={[styles.directionColumnCenter ,styles.Radius_7 , styles.bgFullWidth]}>
                               <Image source={require('../../assets/images/card_info_small.png')} style={[styles.icon50 , styles.marginBottom_7]} resizeMode={'contain'} />
                               <Text style={[styles.textBold , styles.text_black , styles.textSize_12]}>{ i18n.t('inquiry') }</Text>
                           </Card>
                       </TouchableOpacity>

                       <TouchableOpacity style={[styles.Radius_7 , styles.icon150 , styles.marginBottom_12]}>
                           <Card style={[styles.directionColumnCenter ,styles.Radius_7 , styles.bgFullWidth]}>
                               <Image source={require('../../assets/images/change_card_small.png')} style={[styles.icon50 , styles.marginBottom_7]} resizeMode={'contain'} />
                               <Text style={[styles.textBold , styles.text_black , styles.textSize_12]}>{ i18n.t('transferCard') }</Text>
                           </Card>
                       </TouchableOpacity>

                       <TouchableOpacity style={[styles.Radius_7 , styles.icon150 , styles.marginBottom_12]}>
                           <Card style={[styles.directionColumnCenter ,styles.Radius_7 , styles.bgFullWidth]}>
                               <Image source={require('../../assets/images/transform_money_small.png')} style={[styles.icon50 , styles.marginBottom_7]} resizeMode={'contain'} />
                               <Text style={[styles.textBold , styles.text_black , styles.textSize_12]}>{ i18n.t('transferCredit') }</Text>
                           </Card>
                       </TouchableOpacity>

                       <TouchableOpacity style={[styles.Radius_7 , styles.icon150 , styles.marginBottom_12]}>
                           <Card style={[styles.directionColumnCenter ,styles.Radius_7 , styles.bgFullWidth]}>
                               <Image source={require('../../assets/images/bank_accounts_small.png')} style={[styles.icon50 , styles.marginBottom_7]} resizeMode={'contain'} />
                               <Text style={[styles.textBold , styles.text_black , styles.textSize_12]}>{ i18n.t('bankAccounts') }</Text>
                           </Card>
                       </TouchableOpacity>

                       <TouchableOpacity style={[styles.Radius_7 , styles.icon150 , styles.marginBottom_12]}>
                           <Card style={[styles.directionColumnCenter ,styles.Radius_7 , styles.bgFullWidth]}>
                               <Image source={require('../../assets/images/wallet_small.png')} style={[styles.icon50 , styles.marginBottom_7]} resizeMode={'contain'} />
                               <Text style={[styles.textBold , styles.text_black , styles.textSize_12]}>{ i18n.t('myCards') }</Text>
                           </Card>
                       </TouchableOpacity>

                    </View>

                </View>

            </Content>
        </Container>
    );
}

export default Home;


