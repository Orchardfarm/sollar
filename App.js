import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LocationScreen from './screens/LocationScreen'; 
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import WeatherScreen from './screens/WeatherScreen';

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
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home', headerShown: false }}
        />
         <Stack.Screen
          name="Weather"
          component={WeatherScreen}
          options={{ title: 'Weather', headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
