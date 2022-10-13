import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screen/Login';
import RegistrationOne from '../screen/RegistrationOne';
import RegistrationTwo from '../screen/RegistrationTwo';
import RegistrationThree from '../screen/RegistrationThree';
import Form from '../screen/Form';

import ForgotPassword from '../components/ForgotPassword';
import SideMenuStack from './SideMenuStack';
import BottamStack from './BottamStack';
const MainStack = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          options={{headerShown: false}}
          name="BottamStack"
          component={BottamStack}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="SideMenuStack"
          component={SideMenuStack}
        />
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
        <Stack.Screen
          options={{headerShown: false}}
          name="ForgotPassword"
          component={ForgotPassword}
        />
        {/* <Stack.Screen
          options={{headerShown: false}}
          name="Forms"
          component={Form}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
