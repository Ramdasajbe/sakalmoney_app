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
import DashboardScreen from '../screen/DashboardScreen';
import {List} from '../components/List';
import AgentLoanView from '../screen/AgentLoanView';
import Profile from '../screen/UserProfile';
import EditProfile from '../screen/EditProfile';
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
        <Stack.Screen
          options={{headerShown: false}}
          name="DashboardScreen"
          component={DashboardScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="List"
          component={List}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="AgentLoanView"
          component={AgentLoanView}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Profile"
          component={Profile}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="EditProfile"
          component={EditProfile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
