import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MemoScreen from "./Memo";
import ProfileScreen from "./Profile";
import TranslateScreen from "./Translate";
import BudgetScreen from "./Budget";

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName={"Memo"}>
                <Drawer.Screen name="Mes Mémos" component={MemoScreen}/>
                <Drawer.Screen name="Mon Profil" component={ProfileScreen}/>
                <Drawer.Screen name="Mon Budget" component={BudgetScreen}/>
                <Drawer.Screen name="Traduction" component={TranslateScreen}/>
            </Drawer.Navigator>
        </NavigationContainer>);
}