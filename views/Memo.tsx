import { DrawerActions } from '@react-navigation/native';
import { Text, View, StyleSheet} from "react-native";
import HeaderKlea from "../component/HeaderKlea";
import * as React from "react";
import {StackNavigationProp} from "@react-navigation/stack";

type RootStackParamList = {
    Memo: undefined;
};

type DrawerNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Memo'
    >;

type Props = {
    navigation: DrawerNavigationProp;
};

function MemoScreen({navigation}: Props) {
        return (
            <View style={styles.mainContainer}>
                <HeaderKlea title={"Mémo"} handleMenu={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Memo Screen</Text>
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

export default MemoScreen;