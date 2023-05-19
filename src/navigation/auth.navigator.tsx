import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignIn3Screen } from '../scenes/auth/sign-in.component';
import { SignUp3Screen } from '../scenes/auth/sign-up.component';
import { ForgotPasswordScreen } from '../scenes/auth/forgot-password.component';
import { ListEventScreen } from '../scenes/events/list-events';
import { ListFeatureScreen } from '../scenes/events/list-features';
import { ScanQRCodeScreen } from '../scenes/scan-qrcode';
import { ScanQRCodeGiftScreen } from '../scenes/scan-qrcode-gift';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashImage } from '../components/splash-image.component';
import { IUser, ServiceApi, setApiAuthorization } from '../services/api';
import { create } from 'zustand';

const Stack = createStackNavigator();

interface IAuthStore {
	token: null | string;
	isLoggedIn: boolean;
	profile: null | IUser;
	loginSuccess: (token: string, profile: IUser) => void;
	logout: () => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
	token: null,
	isLoggedIn: false,
	profile: null,
	loginSuccess: (token: string, profile: IUser) =>
		set(() => ({ token, isLoggedIn: true, profile })),
	logout: () => set(() => ({ token: null, isLoggedIn: false })),
}));

export const AuthNavigator = (): React.ReactElement => {
	const [loading, setLoading] = useState(true);

	const { loginSuccess, isLoggedIn } = useAuthStore((state) => state);

	const getUserMe = async () => {
		try {
			const token = await AsyncStorage.getItem('token');
			if (token) {
				setApiAuthorization(token);
				const res = await ServiceApi.getUserMe(token);
				if (res?.data?.id) {
					loginSuccess(token, res?.data);
					return;
				}

				AsyncStorage.removeItem('token');
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getUserMe();
	}, []);

	if (loading) {
		return (
			<SplashImage
				loading={loading}
				source={require('../assets/images/image-splash.png')}
			/>
		);
	}

	return (
		<Stack.Navigator headerMode="none">
			{isLoggedIn ? (
				<>
					<Stack.Screen
						name="ListEvent"
						component={ListEventScreen}
					/>
					<Stack.Screen
						name="ListFeature"
						component={ListFeatureScreen}
					/>
					<Stack.Screen
						name="ScanQRCode"
						component={ScanQRCodeScreen}
					/>
					<Stack.Screen
						name="ScanQRCodeGift"
						component={ScanQRCodeGiftScreen}
					/>
				</>
			) : (
				<>
					<Stack.Screen name="SignIn3" component={SignIn3Screen} />
					<Stack.Screen name="SignUp3" component={SignUp3Screen} />
					<Stack.Screen
						name="ForgotPassword"
						component={ForgotPasswordScreen}
					/>
				</>
			)}
		</Stack.Navigator>
	);
};
