import 'react-native-gesture-handler';

import * as React from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import HomeScreen from './pages/HomeScreen';
// import DetailsScreen from './pages/DetailsScreen';
// import ProfileScreen from './pages/ProfileScreen';
// import SettingsScreen from './pages/SettingsScreen';
import {List} from '../components/List';
import Form from '../screen/Form';
import StatusWindow from '../screen/StatusWindow';
import UserProfile from '../screen/UserProfile';
import SideMenuStack from './SideMenuStack';
import DashboardScreen from '../screen/DashboardScreen';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function DashBoard() {
  return (
    <Stack.Navigator
      initialRouteName="DashboardScreen"
      screenOptions={{
        // headerStyle: {backgroundColor: '#42f44b'},
        headerShown: false,
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'bold'},
      }}>
      <Stack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{title: 'DashboardScreen'}}
      />
    </Stack.Navigator>
  );
}

function Loan() {
  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{
        headerShown: false,
        // headerStyle: {backgroundColor: '#42f44b'},
        // headerTintColor: '#fff',
        // headerTitleStyle: {fontWeight: 'bold'},
      }}>
      <Stack.Screen name="List" component={List} options={{title: 'List'}} />
    </Stack.Navigator>
  );
}

function BottamStack() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        headerShown: false,
        activeTintColor: '#42f44b',
      }}>
      <Tab.Screen
        name="DashBoard"
        component={DashBoard}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="monitor-dashboard"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Loan"
        component={Loan}
        options={{
          tabBarLabel: 'Loan',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="money" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default BottamStack;
