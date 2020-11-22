import {NavigatorScreenParams} from "@react-navigation/native";

export type ProfileNavigatorParamList = {
    ProfileScreen: undefined,
    EditProfil: undefined
};

export type AppNavigatorParamList = {
    Memos: undefined,
    Profil: NavigatorScreenParams<ProfileNavigatorParamList>,
    Budget: undefined,
    Map: undefined
};