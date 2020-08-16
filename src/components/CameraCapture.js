import React, { useState, useEffect ,useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import styles from '../../assets/styles'
import {Icon} from 'native-base'
import COLORS from "../consts/colors";

export default function CameraCapture({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    let camRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    async function takePicture() {
        await camRef.current.takePictureAsync({ onPictureSaved , base64 :true })
    };

    function onPictureSaved(photo){
        // console.log(photo);
        navigation.navigate('confirmCard', {photo});
    }

    return (
        <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={type} ref={camRef} ratio={'4:3'}>
                <View style={[styles.paddingHorizontal_25,styles.paddingVertical_25,{
                        flex: 1,
                        backgroundColor: 'transparent',
                        flexDirection:'column',
                        justifyContent:'space-between'
                    }]}>
                    <TouchableOpacity
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Icon name={'sync'} type={'AntDesign'} style={{ color: COLORS.mstarda, fontSize: 25 }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.icon60 ,styles.flexCenter, styles.Radius_50 , styles.bg_mstarda]} onPress={takePicture} >
                        <Icon name={'camera'} type={'AntDesign'} style={{ color: COLORS.black, fontSize: 25 }} />
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}