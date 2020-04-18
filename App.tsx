import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import '@firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/Home';
import EventsScreen from './screens/Events';
import ServicesScreen from './screens/Services';
import EventSingleScreen from './screens/EventSingle';
import ServiceSingleScreen from './screens/ServiceSingle';

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

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

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
  }, []);

  useEffect(() => {
    if (user) {
      const db = firebase.firestore();
      db.collection('services')
        .get()
        .then(function(querySnapshot) {
          const services = querySnapshot.docs.map(item => ({
            ...item.data(),
            id: item.id,
          }));
          console.log('Got some services', services);
        })
        .catch(function(error) {
          console.warn('Error getting services, skip: ', error);
        });
    }
  }, [user]);

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
        <Stack.Screen
          name="ServiceSingleScreen"
          component={ServiceSingleScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
