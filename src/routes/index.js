import React, { useEffect } from "react";
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackNavigator } from './AuthStackNavigator'
import { MainStackNavigator } from './MainStackNavigator'
import { useSelector, useDispatch } from 'react-redux';
import { chooseLang } from '../actions';


const RootStack = createStackNavigator();

function renderScreens() {
	const dispatch = useDispatch();
	useEffect(() => {
		AsyncStorage.getItem('init').then(init => {
			if (init != 'true') {
				AsyncStorage.setItem('init', 'true');
				dispatch(chooseLang('ar'))
			}
		});
	}, []);


	const auth = useSelector(state => state.auth);


	if (auth.user !== null) {
		return (
			<RootStack.Screen name={'MainStack'} component={MainStackNavigator} />
		)
	}
	return (<RootStack.Screen name={'AuthStack'} component={AuthStackNavigator} />)
}

function AppNavigator() {

	return (
		<NavigationContainer>
			<RootStack.Navigator screenOptions={{ headerShown: false }} >
				{renderScreens()}
			</RootStack.Navigator>
		</NavigationContainer>
	);
}

export default AppNavigator;
