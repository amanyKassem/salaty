import React , {useState , useEffect} from 'react';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AppNavigator from './src/routes';
import { Root } from "native-base";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistedStore } from './src/store';
import './ReactotronConfig';

function App({navigation}) {

	const [isReady, setIsReady] = useState(false);

	useEffect( () => {

		// I18nManager.forceRTL(true);
		// AsyncStorage.clear()

		async function loadFont(){
			await Font.loadAsync({
				sukar             : require('./assets/fonts/Sukar-Regular.ttf'),
				sukarBold         : require('./assets/fonts/Sukar-Bold.ttf'),
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
