import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
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

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

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

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
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
        await (Promise.all(cacheImages) as unknown) as Promise<void>;
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    moment.locale('ru');
  }, []);


  function storeReminder(
    value: boolean,
    eventId: string,
    onStored: Function,
    onStoredFailed: Function,
  ): void {
    // Do nothing
  }

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{ minWidth: '100%', minHeight: '100%' }}
      onLayout={onLayoutRootView}
    >
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
    </View>
  );
}
