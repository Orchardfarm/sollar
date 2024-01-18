import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LocationScreen from './screens/LocationScreen'; 
import RegistrationScreen from './screens/RegisterScreen';
import UserTypeSelectionScreen from './screens/UserTypeSelectionScreen';
import LoginScreen from './screens/LoginScreen';
import CustomersDashboardScreen from './screens/CustomerDashboardScreen';
import FarmerDashboardScreen from './screens/FarmerDashboardScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import AdminDashboardScreen from './screens/AdminDashboaerdScreen';
import AboutScreen from './screens/AboutScreen';
import SupportDashboardScreen from './screens/SupportDashboardScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="About">
      <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{ title: 'About', headerShown: false }}
        />
        <Stack.Screen
          name="Location"
          component={LocationScreen}
          options={{ title: 'Location', headerShown: false }}
        />
      <Stack.Screen
          name="Register"
          component={RegistrationScreen}
          options={{ title: 'Register', headerShown: false }}
        />
        <Stack.Screen
          name="UserType"
          component={UserTypeSelectionScreen}
          options={{ title: 'User Type Selection', headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login', headerShown: false }}
        />
        <Stack.Screen
          name="CustomerDashboard"
          component={CustomersDashboardScreen}
          options={{ title: 'Dashboard', headerShown: false }}
        />
        <Stack.Screen
          name="FarmerDashboard"
          component={FarmerDashboardScreen}
          options={{ title: 'Dashboard', headerShown: false }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPasswordScreen}
          options={{ title: 'Password', headerShown: false }}
        />
         <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboardScreen}
          options={{ title: 'Dashboard', headerShown: false }}
        />
          <Stack.Screen
          name="Special"
          component={SupportDashboardScreen}
          options={{ title: 'Dashboard', headerShown: false }}
        />
     
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
