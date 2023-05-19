import React, { ReactElement, useEffect } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Button, Input, Text, Icon } from '@ui-kitten/components';
import { ImageOverlay } from './extra/image-overlay.component';
import { PersonIcon, PasswordIcon } from './extra/icons';
import { KeyboardAvoidingView } from './extra/3rd-party';
import { Formik } from 'formik';
import { ServiceApi, isSuccess } from '../../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '../../../navigation/auth.navigator';

export default ({ navigation }: any): React.ReactElement => {
	const loginSuccess = useAuthStore((state) => state.loginSuccess);

	const [passwordVisible, setPasswordVisible] =
		React.useState<boolean>(false);

	const onForgotPasswordButtonPress = (): void => {
		navigation && navigation.navigate('ForgotPassword');
	};

	const onPasswordIconPress = (): void => {
		setPasswordVisible(!passwordVisible);
	};

	const renderPasswordIcon = (props: any): ReactElement => (
		<TouchableWithoutFeedback onPress={onPasswordIconPress}>
			<Icon {...props} name={passwordVisible ? 'eye-off' : 'eye'} />
		</TouchableWithoutFeedback>
	);

	useEffect(() => {
		(async () => {
			const token = await AsyncStorage.getItem('token');
			if (token) {
				navigation?.navigate('ListEvent');
			}
		})();
	}, []);
	return (
		<KeyboardAvoidingView>
			<ImageOverlay
				style={styles.container}
				source={require('./assets/image-background.jpg')}
			>
				<View style={styles.headerContainer}>
					<Text category="h1" status="control">
						Hello
					</Text>
					<Text
						style={styles.signInLabel}
						category="s1"
						status="control"
					>
						Sign in to your account
					</Text>
				</View>
				<Formik
					initialValues={{ email: '', password: '' }}
					onSubmit={async (values, actions) => {
						const res: any = await ServiceApi.login(values);
						if (isSuccess(res) && res?.data?.token) {
							AsyncStorage.setItem('token', res?.data?.token);
							actions.setSubmitting(false);
							loginSuccess(res?.data?.token, {
								id: 0,
								email: '',
								firstName: '',
								lastName: '',
							});
							return;
						}

						alert('Email or Password incorrect');
					}}
				>
					{(props) => (
						<>
							<View style={styles.formContainer}>
								<Input
									status="control"
									placeholder="Email"
									accessoryLeft={PersonIcon as any}
									value={props?.values?.email}
									onChangeText={(value) =>
										props?.setFieldValue('email', value)
									}
									inputMode="email"
									keyboardType="email-address"
									autoCapitalize="none"
								/>
								<Input
									style={styles.passwordInput}
									status="control"
									placeholder="Password"
									accessoryRight={renderPasswordIcon}
									accessoryLeft={PasswordIcon as any}
									value={props?.values?.password}
									onChangeText={(value) =>
										props?.setFieldValue('password', value)
									}
									secureTextEntry={!passwordVisible}
								/>
								<View style={styles.forgotPasswordContainer}>
									<Button
										style={styles.forgotPasswordButton}
										appearance="ghost"
										status="control"
										onPress={onForgotPasswordButtonPress}
									>
										Forgot your password?
									</Button>
								</View>
							</View>
							<Button
								style={styles.signInButton}
								status="control"
								size="giant"
								onPress={props.handleSubmit as any}
							>
								SIGN IN
							</Button>
							{/* <Button
								style={styles.signUpButton}
								appearance="ghost"
								status="control"
								onPress={onSignUpButtonPress}
							>
								Don't have an account? Sign Up
							</Button> */}
						</>
					)}
				</Formik>
			</ImageOverlay>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: 20,
	},
	headerContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: 216,
	},
	formContainer: {
		flex: 1,
		marginTop: 32,
		paddingHorizontal: 16,
	},
	signInLabel: {
		marginTop: 16,
	},
	signInButton: {
		marginHorizontal: 16,
	},
	signUpButton: {
		marginVertical: 12,
		marginHorizontal: 16,
	},
	forgotPasswordContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	passwordInput: {
		marginTop: 16,
	},
	forgotPasswordButton: {
		paddingHorizontal: 0,
	},
});
