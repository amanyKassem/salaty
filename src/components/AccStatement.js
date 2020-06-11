import React, { useState } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions , ScrollView } from "react-native";
import {Container, Content, Accordion, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n"

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const isIOS = Platform.OS === 'ios';

function AccStatement({navigation , route}) {

    const card = route.params.card;
    const [type, setType] = useState(0);

    const allData = [
        { date: "20/5/2020", amount:'20 ريال' ,disAmount:'20 ريال' , transfreAmount:'20 ريال' , chargeAmount:'20 ريال' , time:'20 : 20 pm' , status:'خصم' },
        { date: "21/5/2020", amount:'20 ريال' ,disAmount:'20 ريال' , transfreAmount:'20 ريال' , chargeAmount:'20 ريال' , time:'20 : 20 pm' , status:'خصم' },
        { date: "22/5/2020", amount:'20 ريال' ,disAmount:'20 ريال' , transfreAmount:'20 ريال' , chargeAmount:'20 ريال' , time:'20 : 20 pm' , status:'خصم' }
    ];

    // const allData = [
    //     { date: "20/5/2020", amount:'20 ريال' , time:'20 : 20 pm' , status:'خصم' },
    //     { date: "21/5/2020", amount:'20 ريال' , time:'20 : 20 pm' , status:'خصم' },
    //     { date: "22/5/2020", amount:'20 ريال' , time:'20 : 20 pm' , status:'خصم' }
    // ];
    //
    // const discountData = [
    //     { date: "20/5/2020", disAmount:'20 ريال' , time:'20 : 20 pm' },
    //     { date: "21/5/2020", disAmount:'20 ريال' , time:'20 : 20 pm' },
    //     { date: "22/5/2020", disAmount:'20 ريال' , time:'20 : 20 pm' }
    // ];
    //
    // const chargeData = [
    //     { date: "20/5/2020", chargeAmount:'20 ريال' , time:'20 : 20 pm' },
    //     { date: "21/5/2020", chargeAmount:'20 ريال' , time:'20 : 20 pm' },
    //     { date: "22/5/2020", chargeAmount:'20 ريال' , time:'20 : 20 pm' }
    // ];
    //
    // const transfreData = [
    //     { date: "20/5/2020", transfreAmount:'20 ريال' , time:'20 : 20 pm' },
    //     { date: "21/5/2020", transfreAmount:'20 ريال' , time:'20 : 20 pm' },
    //     { date: "22/5/2020", transfreAmount:'20 ريال' , time:'20 : 20 pm' }
    // ];

    function changeType(newType) {
        setType(newType)
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
                        type === 0 ?
                            <View style={[styles.directionRow]}>
                                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('amount') } :</Text>
                                <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.amount }</Text>
                            </View>
                            :
                            type === 1 ?
                                <View style={[styles.directionRow]}>
                                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('disAmount') } :</Text>
                                    <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.disAmount }</Text>
                                </View>
                                :
                                type === 2 ?
                                    <View style={[styles.directionRow]}>
                                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('chargeAmount') } :</Text>
                                        <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.chargeAmount }</Text>
                                    </View>
                                    :
                                    type === 3 ?
                                        <View style={[styles.directionRow]}>
                                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('transfreAmount') } :</Text>
                                            <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.transfreAmount }</Text>
                                        </View>
                                        :
                                        null
                }


                <View style={[styles.directionRow]}>
                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('time') } :</Text>
                    <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.time }</Text>
                </View>
                {
                    type === 0 ?
                        <View style={[styles.directionRow]}>
                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('status') } :</Text>
                            <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.status }</Text>
                        </View>
                        :
                        null
                }
            </View>
        );
    }

    // function _allHeader(item, expanded) {
    //     return (
    //         <Card style={[styles.directionRowSpace , styles.marginBottom_10, {padding:10}]}>
    //             <View style={[styles.directionRow]}>
    //                 <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('opDate') } :</Text>
    //                 <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.date }</Text>
    //             </View>
    //             {expanded
    //                 ? <Image source={require('../../assets/images/arrow_yellow_open.png')} style={[styles.icon15 , styles.transform]} resizeMode={'contain'} />
    //                 : <Image source={require('../../assets/images/drop_green_arrow.png')} style={[styles.icon15]} resizeMode={'contain'} />}
    //         </Card>
    //     );
    // }
    //
    // function _allContent(item) {
    //     return (
    //        <View style={{padding:10 , paddingTop:5}}>
    //            <View style={[styles.directionRow]}>
    //                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('amount') } :</Text>
    //                <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.amount }</Text>
    //            </View>
    //            <View style={[styles.directionRow]}>
    //                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('time') } :</Text>
    //                <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.time }</Text>
    //            </View>
    //            <View style={[styles.directionRow]}>
    //                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('status') } :</Text>
    //                <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.status }</Text>
    //            </View>
    //        </View>
    //     );
    // }
    //
    // function _disContent(item) {
    //     return (
    //        <View style={{padding:10 , paddingTop:5}}>
    //            <View style={[styles.directionRow]}>
    //                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('disAmount') } :</Text>
    //                <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.disAmount }</Text>
    //            </View>
    //            <View style={[styles.directionRow]}>
    //                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('time') } :</Text>
    //                <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.time }</Text>
    //            </View>
    //        </View>
    //     );
    // }
    //
    // function _chargeContent(item) {
    //     return (
    //        <View style={{padding:10 , paddingTop:5}}>
    //            <View style={[styles.directionRow]}>
    //                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('chargeAmount') } :</Text>
    //                <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.chargeAmount }</Text>
    //            </View>
    //            <View style={[styles.directionRow]}>
    //                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('time') } :</Text>
    //                <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.time }</Text>
    //            </View>
    //        </View>
    //     );
    // }
    //
    // function _transfreContent(item) {
    //     return (
    //        <View style={{padding:10 , paddingTop:5}}>
    //            <View style={[styles.directionRow]}>
    //                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('transfreAmount') } :</Text>
    //                <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.transfreAmount }</Text>
    //            </View>
    //            <View style={[styles.directionRow]}>
    //                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14]}>{ i18n.t('time') } :</Text>
    //                <Text style={[styles.textBold , styles.text_black , styles.textSize_13, {marginLeft:5}]}>{ item.time }</Text>
    //            </View>
    //        </View>
    //     );
    // }
    //
    //
    // function changeTypeContent() {
    //     if (type === 0) {
    //         return (
    //            <View>
    //                <Accordion
    //                    dataArray={allData}
    //                    animation={true}
    //                    expanded={true}
    //                    renderHeader={_allHeader}
    //                    renderContent={_allContent}
    //                    style={[{borderWidth:0}]}
    //                />
    //            </View>
    //         );
    //     }else if(type === 1){
    //         return (
    //             <View>
    //                 <Accordion
    //                     dataArray={discountData}
    //                     animation={true}
    //                     expanded={true}
    //                     renderHeader={_allHeader}
    //                     renderContent={_disContent}
    //                     style={[{borderWidth:0}]}
    //                 />
    //             </View>
    //         );
    //     }else if(type === 2){
    //         return (
    //             <View>
    //                 <Accordion
    //                     dataArray={chargeData}
    //                     animation={true}
    //                     expanded={true}
    //                     renderHeader={_allHeader}
    //                     renderContent={_chargeContent}
    //                     style={[{borderWidth:0}]}
    //                 />
    //             </View>
    //         );
    //     }else{
    //         return (
    //             <View>
    //                 <Accordion
    //                     dataArray={transfreData}
    //                     animation={true}
    //                     expanded={true}
    //                     renderHeader={_allHeader}
    //                     renderContent={_transfreContent}
    //                     style={[{borderWidth:0}]}
    //                 />
    //             </View>
    //         );
    //     }
    // }


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

                <View style={styles.marginTop_65}>
                    <View style={[styles.paddingHorizontal_30, styles.paddingBottom55 , styles.paddingTop20, styles.Width_100,
                        {backgroundColor:'#03683f',borderTopRightRadius:50 , borderTopLeftRadius:50 ,
                            position:'absolute' , bottom:-40}]}>
                        <ScrollView style={[styles.scrollView]} horizontal={true} showsHorizontalScrollIndicator={false}
                        contentContainerStyle={[styles.directionRowSpace , styles.Width_100 ]}>
                            <TouchableOpacity onPress={() => changeType(0)}>
                                <Text style={[styles.textBold , type === 0 ? styles.text_White : styles.text_green , styles.textSize_15]}>{ i18n.t('all') }</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => changeType(1)}>
                                <Text style={[styles.textBold , type === 1 ? styles.text_White : styles.text_green , styles.textSize_15]}>{ i18n.t('discount') }</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => changeType(2)}>
                                <Text style={[styles.textBold , type === 2 ? styles.text_White : styles.text_green , styles.textSize_15]}>{ i18n.t('charge') }</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => changeType(3)}>
                                <Text style={[styles.textBold , type === 3 ? styles.text_White : styles.text_green , styles.textSize_15]}>{ i18n.t('transfer') }</Text>
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

                    {/*{changeTypeContent()}*/}

                    <View>
                        <Accordion
                            dataArray={allData}
                            animation={true}
                            expanded={true}
                            renderHeader={_allHeader}
                            renderContent={_allContent}
                            style={[{borderWidth:0}]}
                        />
                    </View>

                </View>

            </Content>
        </Container>
    );
}

export default AccStatement;


