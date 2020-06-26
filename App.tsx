import React, { useState, useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import { Asset } from 'expo-asset';
import { AppLoading, Notifications } from 'expo';
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
import DataContext from './context/DataContext';

async function registerForPushNotificationsAsync(
  onGetToken: (token: string) => void,
  onGetTokenFailed: () => void,
) {
  let token = null;

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
      Alert.alert(
        'Пожалуйста, разрешите приложению отправку push-уведомлений.',
      );
      return;
    }
    token = await Notifications.getExpoPushTokenAsync();
    if (token) {
      onGetToken(token);
    } else {
      onGetTokenFailed();
    }
  } else {
    console.log('Must use physical device for Push Notifications');
    onGetTokenFailed();
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

function initializeApp() {
  // Initialize Firebase
  const firebaseConfig = {
    apiKey: 'AIzaSyBjAQdqx3qkki7MVb6dd1eASw-0UGs2Bg0',
    authDomain: 'events4friends.firebaseapp.com',
    databaseURL: 'https://events4friends.firebaseio.com',
    projectId: 'events4friends',
    storageBucket: 'events4friends.appspot.com',
    messagingSenderId: '610960096409',
    appId: '1:610960096409:web:337ff9ec4ca355a6c28c08',
    measurementId: 'G-4T13RKFFSG',
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

function subscribeToServiceChanges(
  onServicesUpdated: Function,
): Function | null {
  const db = firebase.firestore();
  db.collection('services')
    .get()
    .then(function(querySnapshot) {
      const services = querySnapshot.docs.map(item => ({
        ...item.data(),
        id: item.id,
      }));
      onServicesUpdated(services);
    })
    .catch(function(error) {
      console.warn('Error getting services, skip: ', error);
    });
  return null;
}

function subscribeToEventsChanges(onEventsUpdated: Function): Function | null {
  const db = firebase.firestore();
  return db.collection('events').onSnapshot(async snapshot => {
    if (snapshot && snapshot.docs && snapshot.docs.length) {
      const events = snapshot.docs.reduce((result: Array<any>, item: any) => {
        return [...result, { ...item.data(), id: item.id }];
      }, []);
      onEventsUpdated(events);
    }
  });
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
  const [isAppReady, setIsAppReady] = useState(false);
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [services, setServices] = useState([]);
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    initializeApp();

    firebase.auth().onAuthStateChanged((aUser: any) => {
      if (aUser) {
        if (aUser.isAnonymous) {
          console.log('onAuthStateChanged: user is logged in anonymously');
        } else {
          console.log('onAuthStateChanged: user is logged in successfully');
        }

        setUser(aUser);
      } else {
        console.log(
          'onAuthStateChanged: user is not loggen in, login anonymously',
        );
        firebase
          .auth()
          .signInAnonymously()
          .catch(function(error) {
            console.warn('Error signing in anonymously, skip: ', error);
          });
      }
    });

    moment.locale('ru');
  }, []);

  useEffect(() => {
    let unsubscribeFromServices: Function | null = null;
    let unsubscribeFromEvents: Function | null = null;

    if (user) {
      unsubscribeFromServices = subscribeToServiceChanges(
        (aSevices: Array<never>) => {
          setServices(aSevices);
        },
      );
      unsubscribeFromEvents = subscribeToEventsChanges(
        (anEvents: Array<never>) => {
          setEvents(anEvents);
        },
      );
    }

    return () => {
      if (unsubscribeFromServices) {
        unsubscribeFromServices();
      }
      if (unsubscribeFromEvents) {
        unsubscribeFromEvents();
      }
    };
  }, [user]);

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
          updateReminders(value, eventId, expoPushToken, onStored);
        },
        () => {
          onStoredFailed();
        },
      );
    } else {
      updateReminders(value, eventId, expoPushToken, onStored);
    }
  }

  return isAppReady ? (
    <DataContext.Provider
      value={{
        events,
        services,
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
  ) : (
    <AppLoading
      startAsync={cacheResourcesAsync}
      onFinish={() => setIsAppReady(true)}
      onError={console.warn}
    />
  );
}
