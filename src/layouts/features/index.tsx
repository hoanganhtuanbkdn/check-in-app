import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Toggle } from '@ui-kitten/components';
import { Setting } from './extra/settings-section.component';
import { useNavigation } from '@react-navigation/native';

export default (): React.ReactElement => {
	const navigation = useNavigation();

	const onCheckIn = (): void => {
		navigation.navigate('ScanQRCode');
	};

	const onTakeGift = (): void => {
		navigation.navigate('ScanQRCodeGift');
	};

	return (
		<Layout style={styles.container}>
			<Setting
				style={styles.setting}
				hint="Check In"
				onPress={onCheckIn}
			/>
			<Setting
				style={styles.setting}
				onPress={onTakeGift}
				hint="Confirm Take Gift"
			/>
		</Layout>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	setting: {
		padding: 16,
	},
	section: {
		paddingTop: 32,
	},
});
