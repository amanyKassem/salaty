import React, { useState , useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions , ScrollView} from "react-native";
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
            <Content contentContainerStyle={[styles.bgFullWidth]}>

                <View style={[styles.Width_100 , styles.bg_yellow , styles.flexCenter , styles.paddingVertical_45 ]}>
                    <Text style={[styles.textBold , styles.text_black , styles.textSize_20]}>Hunger station</Text>
                </View>

                <View style={[styles.paddingHorizontal_20 , styles.bgFullWidth, styles.Width_100, {paddingBottom:10}]}>
                   <TouchableOpacity onPress={toggleModal}>
                       <Card style={[styles.bg_White, styles.directionRowSpace , styles.paddingHorizontal_10 , styles.Radius_10 , {height:50 , top:-30}]}>
                           <View style={[styles.directionRow]}>
                               <Image source={require('../../assets/images/location.png')} style={[styles.icon15]} resizeMode={'contain'} />
                               <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14 , styles.marginHorizontal_5]}>|</Text>
                               <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14]}>{ i18n.t('deliveryTo') } {cityName}</Text>
                           </View>
                           <Image source={require('../../assets/images/dropdown.png')} style={[styles.icon15]} resizeMode={'contain'} />
                       </Card>
                   </TouchableOpacity>

                </View>
            </Content>
        </Container>
    );
}

export default Home;


