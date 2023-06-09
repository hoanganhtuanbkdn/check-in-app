import React from 'react';
import { StyleSheet } from 'react-native';
import {
	Divider,
	TopNavigation,
	TopNavigationAction,
} from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { ArrowIosBackIcon } from '../../components/icons';
import ContentView from '../../layouts/features';

export const ListFeatureScreen = ({ navigation }: any): React.ReactElement => {
	const renderBackAction = (): React.ReactElement => (
		<TopNavigationAction
			icon={ArrowIosBackIcon as any}
			onPress={navigation.goBack}
		/>
	);

	return (
		<SafeAreaLayout style={styles.container} insets="top">
			<TopNavigation
				title="List Features"
				accessoryLeft={renderBackAction}
			/>
			<Divider />
			<ContentView />
		</SafeAreaLayout>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
