import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screen/Login';
import RegistrationOne from '../screen/RegistrationOne';
import RegistrationTwo from '../screen/RegistrationTwo';
import RegistrationThree from '../screen/RegistrationThree';

import Form from '../screen/Form';
const MainStack = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Form"
          component={Form}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="RegistrationOne"
          component={RegistrationOne}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="RegistrationTwo"
          component={RegistrationTwo}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="RegistrationThree"
          component={RegistrationThree}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
