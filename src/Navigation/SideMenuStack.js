import {Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../screen/Login';
import RegistrationOne from '../screen/RegistrationOne';
import RegistrationTwo from '../screen/RegistrationTwo';
import RegistrationThree from '../screen/RegistrationThree';
const Drawer = createDrawerNavigator();

export default function SideMenuStack() {
  return (
    
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="RegistrationOne" component={RegistrationOne} />
        <Drawer.Screen name="RegistrationTwo" component={RegistrationTwo} />
      </Drawer.Navigator>
   
  );
}
