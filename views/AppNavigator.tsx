import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import MemoScreen from './Memo';
import ProfileScreen from './Profile';
import BudgetScreen from './Budget';
import EditProfil from './EditProfil';
import MapScreen from "./Map";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export function Profile(): JSX.Element {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="ProfileScreen">
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfil" component={EditProfil} />
    </Stack.Navigator>
  );
}

export default function AppNavigator(): JSX.Element {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Memo">
        <Drawer.Screen name="Mes Mémos" component={MemoScreen} />
          <Drawer.Screen name="Mon Profil" component={Profile} />
          <Drawer.Screen name="Mon Budget" component={BudgetScreen} />
          <Drawer.Screen name="Ma Carte" component={MapScreen} />
          <Drawer.Screen name=" " component={EditProfil} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
