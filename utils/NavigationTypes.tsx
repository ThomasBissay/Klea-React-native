import { NavigatorScreenParams } from '@react-navigation/native';

export type ProfileNavigatorParamList = {
  ProfileScreen: undefined,
  EditProfil: undefined
};

export type MenuNavigatorParamList = {
  Mémos: undefined,
  Profil: NavigatorScreenParams<ProfileNavigatorParamList>,
  Budget: undefined,
  Map: undefined,
  Logout: undefined
};

export type AppNavigatorParamList = {
  Login: undefined,
  Register: undefined,
  Menu: NavigatorScreenParams<MenuNavigatorParamList>
};
