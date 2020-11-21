import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import MemoScreen from './Memo';
import ProfileScreen from './Profile';
import TranslateScreen from './Translate';
import BudgetScreen from './Budget';
import EditProfil from './EditProfil';

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

export default function Menu() {
  return (
    <Drawer.Navigator initialRouteName="Memo">
      <Drawer.Screen name="Mes Mémos" component={MemoScreen} />
      <Drawer.Screen name="Mon Profil" component={Profile} />
      <Drawer.Screen name="Mon Budget" component={BudgetScreen} />
      <Drawer.Screen name="Traduction" component={TranslateScreen} />
      <Drawer.Screen name=" " component={EditProfil} />
    </Drawer.Navigator>

  );
}
