import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignIn3Screen } from '../scenes/auth/sign-in-3.component';
import { SignUp3Screen } from '../scenes/auth/sign-up-3.component';
import { ForgotPasswordScreen } from '../scenes/auth/forgot-password.component';
import { ListEventScreen } from '../scenes/events/list-events';
import { ListFeatureScreen } from '../scenes/events/list-features';
import { ScanQRCodeScreen } from '../scenes/scan-qrcode';
import { ScanQRCodeGiftScreen } from '../scenes/scan-qrcode-gift';

const Stack = createStackNavigator();

export const AuthNavigator = (): React.ReactElement => (
	<Stack.Navigator headerMode="none">
		<Stack.Screen name="SignIn3" component={SignIn3Screen} />
		<Stack.Screen name="SignUp3" component={SignUp3Screen} />
		<Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
		<Stack.Screen name="ListEvent" component={ListEventScreen} />
		<Stack.Screen name="ListFeature" component={ListFeatureScreen} />
		<Stack.Screen name="ScanQRCode" component={ScanQRCodeScreen} />
		<Stack.Screen name="ScanQRCodeGift" component={ScanQRCodeGiftScreen} />
	</Stack.Navigator>
);
