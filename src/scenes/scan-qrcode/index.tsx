import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Alert } from 'react-native';
import {
	Button,
	Divider,
	TopNavigation,
	TopNavigationAction,
} from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { ArrowIosBackIcon } from '../../components/icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ServiceApi } from '../../services/api';
import moment from 'moment';
import { updateNewParticipantCheckIn } from '../../services/firebase';

export const ScanQRCodeScreen = ({ navigation }: any): React.ReactElement => {
	const renderBackAction = (): React.ReactElement => (
		<TopNavigationAction
			icon={ArrowIosBackIcon as any}
			onPress={navigation.goBack}
		/>
	);
	const [hasPermission, setHasPermission] = useState(false);
	const [scanned, setScanned] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getBarCodeScannerPermissions = async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		};

		getBarCodeScannerPermissions();
	}, []);

	const handleBarCodeScanned = async ({ type, data }: any) => {
		if (scanned) return;
		setScanned(true);
		const participants = await ServiceApi.getParticipants({
			where: {
				code: data,
			},
		});

		const targetParticipant = participants?.[0];
		if (targetParticipant?.id) {
			if (targetParticipant?.checkInAt) {
				Alert.alert(
					'QR Code Used',
					`QR Code was used at: ${moment(
						targetParticipant?.checkInAt
					).format('YYYY-MM-DD hh:mm')}. `,
					[
						{
							text: 'Cancel',
							style: 'cancel',
						},
					]
				);
				return;
			}

			await ServiceApi.editParticipant(targetParticipant?.id, {
				checkInAt: moment().utc()?.toISOString(),
			});

			updateNewParticipantCheckIn(1, targetParticipant);

			Alert.alert(
				'Success',
				`Customer: ${targetParticipant?.name} - ${targetParticipant?.position} - ${targetParticipant?.company}  - ${targetParticipant?.note}`,
				[
					{
						text: 'OK',
					},
				]
			);

			return;
		}

		alert(`QR Code incorrect`);
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
					onBarCodeScanned={handleBarCodeScanned}
					style={StyleSheet.absoluteFillObject}
				/>
				{scanned && (
					<View style={styles.button}>
						<Button size="medium" onPress={() => setScanned(false)}>
							Continue
						</Button>
					</View>
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
	button: {
		position: 'absolute',
		bottom: 10,
		left: 0,
		right: 0,
	},
	text: {},
});
