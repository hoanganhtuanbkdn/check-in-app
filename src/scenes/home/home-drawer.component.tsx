import React, { ReactElement, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
	Avatar,
	Divider,
	Drawer,
	DrawerItem,
	DrawerElement,
	Layout,
	Text,
	IndexPath,
} from '@ui-kitten/components';
import { LogOutIcon } from '../../components/icons';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { AppInfoService } from '../../services/app-info.service';
import { useAuthStore } from '../../navigation/auth.navigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const version: string = AppInfoService.getVersion();

export const HomeDrawer = ({ navigation }: any): DrawerElement => {
	const [selectedIndex, setSelectedIndex] = useState<IndexPath>(null);
	const logout = useAuthStore((state) => state.logout);

	const DATA = [
		{
			title: 'Logout',
			icon: LogOutIcon,
			onPress: () => {
				navigation.toggleDrawer();
				logout();
				AsyncStorage.removeItem('token');
			},
		},
	];

	const renderHeader = (): ReactElement => (
		<SafeAreaLayout insets="top" level="2">
			<Layout style={styles.header} level="2">
				<View style={styles.profileContainer}>
					<Avatar
						size="giant"
						source={require('../../assets/images/image-app-icon.png')}
					/>
					<Text style={styles.profileName} category="h6">
						Check In App
					</Text>
				</View>
			</Layout>
		</SafeAreaLayout>
	);

	const renderFooter = () => (
		<SafeAreaLayout insets="bottom">
			<React.Fragment>
				<Divider />
				<View style={styles.footer}>
					<Text>{`Version ${
						AppInfoService.getVersion() || '1.0.0'
					}`}</Text>
				</View>
			</React.Fragment>
		</SafeAreaLayout>
	);

	return (
		<Drawer
			header={renderHeader}
			footer={renderFooter}
			selectedIndex={selectedIndex}
			onSelect={(index) => setSelectedIndex(index)}
		>
			{DATA.map((el, index) => (
				<DrawerItem
					key={index}
					title={el.title}
					onPress={el.onPress}
					accessoryLeft={el.icon as any}
				/>
			))}
		</Drawer>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	header: {
		height: 128,
		paddingHorizontal: 16,
		justifyContent: 'center',
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		marginLeft: 16,
		paddingVertical: 10,
	},
	profileContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	profileName: {
		marginHorizontal: 16,
	},
});
