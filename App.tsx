import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/Home';
import EventsScreen from './screens/Events';
import ServicesScreen from './screens/Services';
import EventSingleScreen from './screens/EventSingle';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'events4friends' }}
        />
        <Stack.Screen name="Details" component={EventsScreen} />
        <Stack.Screen name="Services" component={ServicesScreen} />
        <Stack.Screen name="EventSingleScreen" component={EventSingleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
