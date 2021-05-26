import { useState, useEffect } from 'react';
import * as firebase from 'firebase';

export const getCommunities = (): Promise<any> =>
  firebase
    .firestore()
    .collection('communities')
    .get()
    .then(snapshot =>
      snapshot.docs.map(doc => {
        return {
          name: 'Не указано',
          description: 'Не указано',
          ...doc.data(),
          id: doc.id,
        };
      }),
    )
    .catch(err => {
      console.warn('Error getting communities, skip: ', err);
    });

//
// NOTE!
// Get realtime updates with Cloud Firestore
// https://firebase.google.com/docs/firestore/query-data/listen
//
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

//
// NOTE!
// Get realtime updates with Cloud Firestore
// https://firebase.google.com/docs/firestore/query-data/listen
//
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

const useData = () => {
  const [events, setEvents] = useState([]);
  const [services, setServices] = useState([]);
  const [communities, setCommuities] = useState<Array<any>>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const aCommunities: Array<any> = await getCommunities();
      setCommuities(aCommunities);
    };
    getData();
    const unsubscribeFromServices = subscribeToServiceChanges(
      (aSevices: Array<never>) => {
        setServices(aSevices);
        setLoadingServices(false);
      },
    );
    const unsubscribeFromEvents = subscribeToEventsChanges(
      (anEvents: Array<never>) => {
        setEvents(anEvents);
        setLoadingEvents(false);
      },
    );

    return () => {
      if (unsubscribeFromServices) {
        unsubscribeFromServices();
      }
      if (unsubscribeFromEvents) {
        unsubscribeFromEvents();
      }
    };
  }, []);

  return {
    events,
    services,
    communities,
    loadingEvents,
    loadingServices,
  };
};

export default useData;
