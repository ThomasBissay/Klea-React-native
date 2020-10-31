import { DrawerActions } from '@react-navigation/native';
import { Text, View, StyleSheet} from "react-native";
import HeaderKlea from "../component/HeaderKlea";
import * as React from "react";
import {StackNavigationProp} from "@react-navigation/stack";

type RootStackParamList = {
    Traduction: undefined;
};

type DrawerNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Traduction'
    >;

type Props = {
    navigation: DrawerNavigationProp;
};

function TranslateScreen({navigation}: Props) {
    return (
        <View style={styles.mainContainer}>
            <HeaderKlea title={"Traduction"} handleMenu={() => navigation.dispatch(DrawerActions.toggleDrawer())} rightIconName={"none"} handleRightClick={() => console.log("test")}/>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Traduction Screen</Text>
            </View>
        </View>
    );
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

export default TranslateScreen;