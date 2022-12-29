import React, { useState, useEffect } from 'react';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// moment
import moment from 'moment';
import 'moment/locale/ru';

// screens
import EventScreen from './screens/Event';
import EventsScreen from './screens/Events';
import HomeScreen from './screens/Home';
import ServiceScreen from './screens/Service';
import ServicesScreen from './screens/Services';

// contexts
import AuthContext from './context/AuthContext';
import DataContext from './context/DataContext';

// hooks
import useAuth from './hooks/useAuth';
import useData from './hooks/useData';

const Stack = createStackNavigator();

export default function App() {
  const { user, connectingToFirebase } = useAuth();
  const {
    events,
    services,
    communities,
    loadingEvents,
    loadingServices,
  } = useData();

  const [isAppReady, setIsAppReady] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    moment.locale('ru');
  }, []);

  function cacheResourcesAsync(): Promise<void> {
    const images = [
      require('./assets/img/icon_place_x4.png'),
      require('./assets/img/icon_telegram_x4.png'),
      require('./assets/img/icon_time_x4.png'),
      require('./assets/img/icon_viber_x4.png'),
      require('./assets/img/icon_whatsapp_x4.png'),
      require('./assets/img/icon_www_x4.png'),
    ];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });
    return (Promise.all(cacheImages) as unknown) as Promise<void>;
  }
  function storeReminder(
    value: boolean,
    eventId: string,
    onStored: Function,
    onStoredFailed: Function,
  ): void {
    // Do nothing
  }

  return isAppReady ? (
    <AuthContext.Provider
      value={{
        user,
        connectingToFirebase,
      }}
    >
      <DataContext.Provider
        value={{
          events,
          services,
          communities,
          loadingEvents,
          loadingServices,
          storeReminder,
        }}
      >
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerTitle: () => null,
                headerLeft: () => null,
                animationEnabled: false,
              }}
            />
            <Stack.Screen
              name="Details"
              component={EventsScreen}
              options={{ title: 'Все события' }}
            />
            <Stack.Screen
              name="Services"
              component={ServicesScreen}
              options={{ title: 'Все услуги' }}
            />
            <Stack.Screen
              name="EventScreen"
              component={EventScreen}
              options={{ title: 'Событие' }}
            />
            <Stack.Screen
              name="ServiceScreen"
              component={ServiceScreen}
              options={{ title: 'Услуга' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </DataContext.Provider>
    </AuthContext.Provider>
  ) : (
    <AppLoading
      startAsync={cacheResourcesAsync}
      onFinish={() => setIsAppReady(true)}
      onError={console.warn}
    />
  );
}
