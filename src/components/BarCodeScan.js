import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from "../../assets/styles";
import {Container, Content} from "native-base";

const height    = Dimensions.get('window').height;

export default function BarCodeScan({navigation , route}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const pathName = route.params.pathName;
    const authType = route.params.authType;

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);

		navigation.navigate(pathName, { authType , cardNumber:data } );
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <Content contentContainerStyle={[styles.bgFullWidth]}>

            <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.marginTop_35 ,styles.bg_White , styles.icon35 , styles.centerContext
                , styles.Radius_50, {marginLeft:15,position:'absolute' , zIndex:1, top:20}]}>
                <Image source={require('../../assets/images/arrow_yellow_open.png')} style={[styles.icon20, styles.transformReverse]} resizeMode={'contain'} />
            </TouchableOpacity>
            <View style={{flex:1}}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            </View>
        </Content>
    );
}
