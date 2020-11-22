import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Menu from './Menu';
import Login from './Login';
import Register from './Register';

const Stack = createStackNavigator();

export default function AppNavigator(): JSX.Element {
  const registerOption = {
    headerShown: true,
    title: 'Créer son compte',
    headerStyle: { backgroundColor: '#5d9783' },
    headerTintColor: '#fff',
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} options={registerOption} />
        <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
