import React, { useEffect } from 'react';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';
import { AppNavigatorParamList, MenuNavigatorParamList } from '../utils/NavigationTypes';
import updateProfile from '../redux/actions/profileUpdater';
import { clearExpense } from '../redux/actions/expenseUpdater';
import { clearMemo } from '../redux/actions/memoUpdater';

type LogoutSplashScreenNavigationProp = CompositeNavigationProp<
StackNavigationProp<AppNavigatorParamList>,
DrawerNavigationProp<MenuNavigatorParamList, 'Logout'>
>;

type PropsLogout = {
  navigation: LogoutSplashScreenNavigationProp;
};

export default function Logout({ navigation } : PropsLogout): JSX.Element {
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
    dispatch(clearExpense());
    dispatch(clearMemo());
  }

  useEffect(() => {
    delInfos();
    navigation.navigate('Login');
  }, []);

  return (<View />);
}
