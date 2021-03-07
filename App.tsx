import React, { useState, useEffect } from 'react';
import { Alert, Platform, AsyncStorage } from 'react-native';
import { Asset } from 'expo-asset';
import { Notifications } from 'expo';
import AppLoading from 'expo-app-loading';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';
import '@firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import moment from 'moment';
import 'moment/locale/ru';
import HomeScreen from './screens/Home';
import EventsScreen from './screens/Events';
import ServicesScreen from './screens/Services';
import EventSingleScreen from './screens/EventSingle';
import ServiceSingleScreen from './screens/ServiceSingle';

// context
import AuthContext from './context/AuthContext';
import DataContext from './context/DataContext';

// hooks
import useAuth from './hooks/useAuth';
import useData from './hooks/useData';

async function registerForPushNotificationsAsync(
  onGetToken: (token: string) => void,
  onGetTokenFailed: (error: string) => void,
) {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS,
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      onGetTokenFailed(
        'Пожалуйста, разрешите приложению отправку push-уведомлений.',
      );
      return;
    }
    const token = await Notifications.getExpoPushTokenAsync();
    if (token) {
      try {
        await AsyncStorage.setItem('expoPushToken', token);
      } catch (error) {
        console.log('error save expoPushToken: ', error);
      }
      onGetToken(token);
    } else {
      onGetTokenFailed('Не удалось :(, попробуйте еще раз');
    }
  } else {
    console.log('Must use physical device for Push Notifications');
    onGetTokenFailed('Не удалось :(, попробуйте еще раз');
  }

  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('default', {
      name: 'default',
      sound: true,
      priority: 'max',
      vibrate: [0, 250, 250, 250],
    });
  }
}

function updateReminders(
  value: boolean,
  eventId: string,
  expoPushToken: string,
  onStored: Function,
): void {
  const db = firebase.firestore();
  db.collection('reminders')
    .doc(`${expoPushToken}${eventId}`)
    .set({
      value,
      eventId,
      expoPushToken,
    })
    .then(function() {
      onStored();
    })
    .catch(function(error) {
      Alert.alert(
        'Ошибка',
        `Пожалуйста, сообщите в техническую поддержку: ${error}`,
      );
    });
}

const Stack = createStackNavigator();

export default function App() {
  const { user, connectingToFirebase } = useAuth();
  const { events, services, loadingEvents, loadingServices } = useData();

  const [isAppReady, setIsAppReady] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    moment.locale('ru');
  }, []);

  useEffect(() => {
    (async function asyncWrapper() {
      try {
        const value = await AsyncStorage.getItem('expoPushToken');
        if (value !== null) {
          console.log(`Got expoPushToken from AsyncStogage: ${value}`);
          setExpoPushToken(value);
        }
      } catch (error) {
        console.log('Error get expoPushToken: ', error);
      }
    })();
  }, []);

  function cacheResourcesAsync(): Promise<void> {
    const images = [
      require('./assets/img/bike_gradient.png'),
      require('./assets/img/bike.png'),
      require('./assets/img/brain_gradient.png'),
      require('./assets/img/brain.png'),
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
    if (!expoPushToken) {
      registerForPushNotificationsAsync(
        (token: string) => {
          setExpoPushToken(token);
          updateReminders(value, eventId, token, onStored);
        },
        (error: string) => {
          onStoredFailed(error);
        },
      );
    } else {
      updateReminders(value, eventId, expoPushToken, onStored);
    }
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
                header: () => null,
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
              name="EventSingleScreen"
              component={EventSingleScreen}
              options={{ title: 'Событие' }}
            />
            <Stack.Screen
              name="ServiceSingleScreen"
              component={ServiceSingleScreen}
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
