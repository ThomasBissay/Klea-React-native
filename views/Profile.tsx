import { DrawerActions } from '@react-navigation/native';
import { Text, View, StyleSheet} from "react-native";
import HeaderKlea from "../component/HeaderKlea";
import * as React from "react";
import {StackNavigationProp, createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator<RootStackParamList>();

type RootStackParamList = {
    Profile: undefined;
    EditProfile: undefined;
};

type DrawerNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Profile'
    >;

type Props = {
    navigation: DrawerNavigationProp;
};

function ProfileScreen({navigation}: Props) {
    const _profile = () => {
        return (<View style={styles.mainContainer}>
            <HeaderKlea title={"Profil"} handleMenu={() => navigation.dispatch(DrawerActions.toggleDrawer())} rightIconName={"edit"} handleRightClick={() => navigation.navigate("EditProfile")}/>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Profile Screen</Text>
            </View>
        </View>)
    }

    const _editProfile = () => {
        return (<View style={styles.mainContainer}>
            <HeaderKlea title={"Edit Profil"} handleMenu={() => navigation.dispatch(DrawerActions.toggleDrawer())} rightIconName={"done"} handleRightClick={() => navigation.navigate("Profile")}/>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Profile Screen</Text>
            </View>
        </View>)
    }

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Profile" component={_profile} />
            <Stack.Screen name="EditProfile" component={_editProfile} />
        </Stack.Navigator>);
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
    },
});

export default ProfileScreen;