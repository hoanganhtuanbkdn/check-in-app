import React from 'react';
import { EventsListScreen } from '../../layouts/events';
import { TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { StyleSheet } from 'react-native';
import { MenuIcon } from '../../components/icons';

export const ListEventScreen = (props: any): React.ReactElement => {
	const renderDrawerAction = (): React.ReactElement => (
		<TopNavigationAction
			icon={MenuIcon as any}
			onPress={props.navigation.toggleDrawer}
		/>
	);
	return (
		<SafeAreaLayout style={styles.container} insets="top">
			<TopNavigation title="Events" accessoryLeft={renderDrawerAction} />
			<EventsListScreen {...props} />
		</SafeAreaLayout>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
