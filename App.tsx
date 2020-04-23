import React, { useState, useEffect } from 'react';
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

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [services, setServices] = useState([]);

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

  return (
    <DataContext.Provider
      value={{
        events,
        services,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Главная' }}
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
  );
}
