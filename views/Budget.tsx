import { DrawerActions } from '@react-navigation/native';
import { Text, View, StyleSheet} from "react-native";
import HeaderKlea from "../component/HeaderKlea";
import * as React from "react";
import {StackNavigationProp} from "@react-navigation/stack";

type RootStackParamList = {
    Budget: undefined;
};

type DrawerNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Budget'
    >;

type Props = {
    navigation: DrawerNavigationProp;
};

function BudgetScreen({navigation}: Props) {
    return (
        <View style={styles.mainContainer}>
            <HeaderKlea title={"Mon Budget"} handleMenu={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Budget Screen</Text>
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

export default BudgetScreen;