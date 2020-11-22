import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';
import MemoScreen from './Memo';
import ProfileScreen from './Profile';
import TranslateScreen from './Translate';
import BudgetScreen from './Budget';
import EditProfil from './EditProfil';
import SideMenu from '../component/SideMenu';
import updateProfile from '../redux/actions/profileUpdater';
import { deleteMemo } from '../redux/actions/memoUpdater';

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

function Logout(props : any) {
  const dispatch = useDispatch();

  function delInfos() {
    dispatch(
      updateProfile({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        address: '',
        phoneNumber: '',
        bio: '',
        imageProfil: '',
        connected: false,
      }),
    );
    dispatch(
      clearMemo(),
    );
  }

  useEffect(() => {
    delInfos();
    props.navigation.navigate('Login');
  }, []);

  return (<View />);
}

export default function Menu(): JSX.Element {
  return (
    <Drawer.Navigator initialRouteName="Memo" drawerContent={(props) => <SideMenu {...props} />}>
      <Drawer.Screen name="Mes Mémos" component={MemoScreen} />
      <Drawer.Screen name="Mon Profil" component={Profile} />
      <Drawer.Screen name="Mon Budget" component={BudgetScreen} />
      <Drawer.Screen name="Traduction" component={TranslateScreen} />
      <Drawer.Screen name="Se déconnecter" component={Logout} />
    </Drawer.Navigator>

  );
}
