import React from 'react';
import { LogBox } from 'react-native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LayoutsNavigator } from './layouts.navigator';
import { HomeDrawer } from '../scenes/home/home-drawer.component';
import { AuthNavigator } from './auth.navigator';

const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

/*
 * When dev is true in .expo/settings.json (started via `start:dev`),
 * open Components tab as default.
 */
const initialTabRoute: string = __DEV__ ? 'Components' : 'Layouts';

const ROOT_ROUTES: string[] = ['Home', ];


export const HomeNavigator = (): React.ReactElement => (
  <Drawer.Navigator
    screenOptions={{ gestureEnabled: false }}
    drawerContent={props => <HomeDrawer {...props} />}>
    <Drawer.Screen name='Home' component={AuthNavigator} />
  </Drawer.Navigator>
);

LogBox.ignoreLogs(['Accessing the \'state\'']);
