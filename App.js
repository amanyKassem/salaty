import React, { useState, useEffect } from 'react';
import { AsyncStorage, Text } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AppNavigator from './src/routes';
import { Root } from "native-base";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistedStore } from './src/store';
import './ReactotronConfig';
import * as Notifications from 'expo-notifications';

function App({ navigation }) {


	const [isReady, setIsReady] = useState(false);

	useEffect(() => {

		// I18nManager.forceRTL(true);
		// AsyncStorage.clear()
		console.disableYellowBox = true;
		if (Platform.OS === 'android') {
			Notifications.setNotificationChannelAsync('orders', {
				name: 'E-mail notifications',
				importance: Notifications.AndroidImportance.HIGH,
				sound: true, // <- for Android 8.0+, see channelId property below
			});
		}

		if (Text.defaultProps == null) Text.defaultProps = {};
		Text.defaultProps.allowFontScaling = false;

		async function loadFont() {
			await Font.loadAsync({
				cairo: require('./assets/fonts/Cairo-Regular.ttf'),
				cairoBold: require('./assets/fonts/Cairo-Bold.ttf'),
				Roboto: require('native-base/Fonts/Roboto.ttf'),
				Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
				...Ionicons.font,
			});
			setIsReady(true)
		}
		loadFont();

	}, []);

	if (!isReady) {
		return <AppLoading />;
	}

	return (
		<Provider store={store}>
			<PersistGate persistor={persistedStore}>
				<Root>
					<AppNavigator />
				</Root>
			</PersistGate>
		</Provider>
	);
}

export default App;


// Keystore password: 0bc851c9d65745588171921599773229
// Key alias:         QG1fc2hhbXMvU2FsYXR5
// Key password:      2feaf955721042b7929e661d70ef7ffb
