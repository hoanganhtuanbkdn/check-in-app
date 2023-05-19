import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Button, Text } from 'react-native';
import {
	Divider,
	TopNavigation,
	TopNavigationAction,
} from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { ArrowIosBackIcon } from '../../components/icons';
import { BarCodeScanner } from 'expo-barcode-scanner';

export const ScanQRCodeGiftScreen = ({
	navigation,
}: any): React.ReactElement => {
	const renderBackAction = (): React.ReactElement => (
		<TopNavigationAction
			icon={ArrowIosBackIcon as any}
			onPress={navigation.goBack}
		/>
	);
	const [hasPermission, setHasPermission] = useState(false);
	const [scanned, setScanned] = useState(false);

	useEffect(() => {
		const getBarCodeScannerPermissions = async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		};

		getBarCodeScannerPermissions();
	}, []);

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
			<View style={styles.container}>
				<BarCodeScanner
					onBarCodeScanned={
						scanned ? undefined : handleBarCodeScanned
					}
					style={StyleSheet.absoluteFillObject}
				/>
				{scanned && (
					<Button
						title={'Tap to Scan Again'}
						onPress={() => setScanned(false)}
					/>
				)}
			</View>
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
