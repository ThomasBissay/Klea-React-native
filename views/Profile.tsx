import { DrawerActions } from '@react-navigation/native';
import { Text, View, StyleSheet} from "react-native";
import HeaderKlea from "../component/HeaderKlea";
import * as React from "react";
import {StackNavigationProp, createStackNavigator} from "@react-navigation/stack";
import {decrementCount, incrementCount} from "../redux/actions/incrementer";
import {connect} from "react-redux";

const Stack = createStackNavigator<RootStackParamList>();

type RootStackParamList = {
    Profile: undefined;
    EditProfile: undefined;
};

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

function ProfileScreen(props: any) {
    const _profile = () => {
        return (<View style={styles.mainContainer}>
            <HeaderKlea title={"Profil"} handleMenu={() => props.navigation.dispatch(DrawerActions.toggleDrawer())} rightIconName={"edit"} handleRightClick={() => props.navigation.navigate("EditProfile")}/>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Profile Screen</Text>
            </View>
        </View>)
    }

    const _editProfile = () => {
        return (<View style={styles.mainContainer}>
            <HeaderKlea title={"Edit Profil"} handleMenu={() => props.navigation.dispatch(DrawerActions.toggleDrawer())} rightIconName={"done"} handleRightClick={() => props.navigation.navigate("Profile")}/>
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

const mapStateProps = (state: any) => {
    return {
        counter: state.counter,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        increment: (counter: number) => {
            dispatch(incrementCount(counter));
        },

        decrement: (counter: number) => {
            dispatch(decrementCount(counter));
        },
    };
};

export default connect(
    mapStateProps,
    mapDispatchToProps,
)(ProfileScreen);