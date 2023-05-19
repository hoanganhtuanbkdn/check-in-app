import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import {
	Divider,
	TopNavigation,
	TopNavigationAction,
} from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { ArrowIosBackIcon } from '../../components/icons';
import ContentView from '../../layouts/features';
import { Camera, CameraType } from 'expo-camera';

export const ScanQRCodeScreen = ({ navigation }: any): React.ReactElement => {
	const renderBackAction = (): React.ReactElement => (
		<TopNavigationAction
			icon={ArrowIosBackIcon as any}
			onPress={navigation.goBack}
		/>
	);
	const [type, setType] = useState(CameraType.back);
	const [scanned, setScanned] = useState(false);

	const [hasPermission, setHasPermission] = useState(false);

	useEffect(() => {
		const getBarCodeScannerPermissions = async () => {
			const { status } = await Camera.getCameraPermissionsAsync();
			setHasPermission(status === 'granted');
		};

		getBarCodeScannerPermissions();
	}, []);

	function toggleCameraType() {
		setType((current) =>
			current === CameraType.back ? CameraType.front : CameraType.back
		);
	}

	const handleBarCodeScanned = ({ type, data }: any) => {
		setScanned(true);
		alert(`Bar code with type ${type} and data ${data} has been scanned!`);
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<SafeAreaLayout style={styles.container} insets="top">
			<TopNavigation
				title="Check In QRCode"
				accessoryLeft={renderBackAction}
			/>
			<Divider />
			<Camera
				style={styles.camera}
				type={type}
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
			>
				<View style={styles.buttonContainer}>
					<Button
						title={'Tap to Scan Again'}
						onPress={() => setScanned(false)}
					/>
				</View>
			</Camera>
		</SafeAreaLayout>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		position: 'absolute',
		bottom: 10,
		left: 0,
		right: 0,
	},
	button: {},
	text: {},
});
