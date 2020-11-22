import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import MemoScreen from './Memo';
import ProfileScreen from './Profile';
import BudgetScreen from './Budget';
import EditProfil from './EditProfil';
import MapScreen from './Map';
import SideMenu from '../component/SideMenu';
import Logout from './LogoutSplashScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export function Profile(): JSX.Element {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="ProfileScreen">
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfil" component={EditProfil} />
    </Stack.Navigator>
  );
}

export default function Menu(): JSX.Element {
  return (
    <Drawer.Navigator initialRouteName="Memo" drawerContent={SideMenu}>
      <Drawer.Screen name="Mémos" component={MemoScreen} />
      <Drawer.Screen name="Profil" component={Profile} />
      <Drawer.Screen name="Budget" component={BudgetScreen} />
      <Drawer.Screen name="Map" component={MapScreen} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
}
