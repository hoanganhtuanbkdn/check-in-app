import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SignIn3Screen } from '../scenes/auth/sign-in-3.component';
import { SignUp3Screen } from '../scenes/auth/sign-up-3.component';
import { ForgotPasswordScreen } from '../scenes/auth/forgot-password.component';
import { ListEventScreen } from '../scenes/events';

const Stack = createStackNavigator();

export const AuthNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name='SignIn3' component={SignIn3Screen}/>
    <Stack.Screen name='SignUp3' component={SignUp3Screen}/>
    <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen}/>
    <Stack.Screen name='ListEvent' component={ListEventScreen}/>
  </Stack.Navigator>
);
