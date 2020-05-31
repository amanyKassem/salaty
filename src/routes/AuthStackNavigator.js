import React from "react";import { createStackNavigator } from '@react-navigation/stack';import {useSelector} from "react-redux";import Login                    from "../components/Login";import Register                 from "../components/Register";import ForgetPass               from "../components/ForgetPass";import ChangePass               from "../components/ChangePass";import ActivationCode               from "../components/ActivationCode";const AuthStack = createStackNavigator();export function AuthStackNavigator()  {	return(		<AuthStack.Navigator mode={'modal'} screenOptions={{headerShown: false}}>			<AuthStack.Screen name="login" component={Login} />			<AuthStack.Screen name="register" component={Register} />			<AuthStack.Screen name="forgetPass" component={ForgetPass} />			<AuthStack.Screen name="changePass" component={ChangePass} />			<AuthStack.Screen name="activationCode" component={ActivationCode} />		</AuthStack.Navigator>	);}