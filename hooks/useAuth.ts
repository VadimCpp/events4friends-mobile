import { useState, useEffect } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

// константа, можно/нужно вынести из функции, можно вынести из файла, например в .env
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

const useAuth = () => {
  const [user, setUser] = useState<Object | null>(null);
  const [connectingToFirebase, setConnectingToFirebase] = useState(true);

  useEffect(() => {
    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      } else {
        console.log('firebase app is already initialized');
      }

      firebase.auth().onAuthStateChanged(async aUser => {
        if (aUser) {
          if (aUser.isAnonymous) {
            console.log('user is logged in anonymously');
          } else {
            console.log('user is logged in successfully');
          }
          setUser(aUser);
        } else {
          setUser(null);
          await firebase.auth().signInAnonymously();
        }
      });
      setConnectingToFirebase(false);
    } catch (error) {
      console.error('Auth Error', error);
    }
  }, []);

  return { user, connectingToFirebase };
};

export default useAuth;
