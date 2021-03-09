import React, { useState, useContext, useCallback } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import moment from 'moment';

// components
import EventsListItem from '../../components/EventsListItem';
import Button from '../../components/Button';
import NoDataContainer from '../../components/NoDataContainer';

// constants
import { NOTICE_CONNECTING, NOTICE_LOADING } from '../../constants';

// contexts
import AuthContext from '../../context/AuthContext';
import DataContext from '../../context/DataContext';

// interfaces
import { IEvent, INavigation } from '../../interfaces';

// utils
import { calcSize } from '../../utils/Misc';

enum EventsFilter {
  Upcoming = 'UPCOMING_EVENTS',
  Past = 'PAST_EVENTS',
  // TODO: add more types here
}

interface EventsScreenParams {
  navigation: INavigation;
}

export default function EventsScreen(props: EventsScreenParams) {
  const { navigation } = props;
  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);
  const { connectingToFirebase } = authContext;
  const { events, loadingEvents } = dataContext;
  const [filterType, setFilterType] = useState(EventsFilter.Upcoming);

  const onEventPress = useCallback(
    event => {
      navigation.navigate('EventScreen', {
        event,
      });
    },
    [navigation],
  );

  const now = new Date();
  let sortedEvents = [...events];

  if (filterType === EventsFilter.Upcoming) {
    sortedEvents = sortedEvents.filter(
      (event: IEvent) =>
        event.start &&
        event.timezone &&
        moment(`${event.start}${event.timezone}`).toDate() > now,
    );

    sortedEvents.sort((a: IEvent, b: IEvent) => {
      if (a.start > b.start) {
        return 1;
      } else if (a.start < b.start) {
        return -1;
      }
      return 0;
    });
  } else if (filterType === EventsFilter.Past) {
    sortedEvents = sortedEvents.filter(
      (event: IEvent) =>
        event.start &&
        event.timezone &&
        moment(`${event.start}${event.timezone}`).toDate() < now,
    );

    sortedEvents.sort((a: IEvent, b: IEvent) => {
      if (a.start < b.start) {
        return 1;
      } else if (a.start > b.start) {
        return -1;
      }
      return 0;
    });
  }

  return (
    <View style={styles.backgroundContainer}>
      <ScrollView style={styles.scrollView}>
        {connectingToFirebase || loadingEvents ? (
          <NoDataContainer
            label={connectingToFirebase ? NOTICE_CONNECTING : NOTICE_LOADING}
          />
        ) : (
          <View style={styles.container}>
            {sortedEvents.length > 0 ? (
              <View>
                <View style={styles.filterContainer}>
                  <Text>Фильтр</Text>
                  <Button
                    title="Предстоящие"
                    onPress={() => setFilterType(EventsFilter.Upcoming)}
                    style={
                      filterType === EventsFilter.Upcoming
                        ? styles.filterButtonFocused
                        : styles.filterButton
                    }
                    selected={filterType === EventsFilter.Upcoming}
                  />
                  <Button
                    title="Прошедшие"
                    onPress={() => setFilterType(EventsFilter.Past)}
                    style={
                      filterType === EventsFilter.Past
                        ? styles.filterButtonFocused
                        : styles.filterButton
                    }
                    selected={filterType === EventsFilter.Past}
                  />
                </View>
                {sortedEvents.map((event: IEvent) => {
                  return (
                    <EventsListItem
                      key={event.id}
                      event={event}
                      onPress={() => onEventPress(event)}
                    />
                  );
                })}
              </View>
            ) : (
              <View>
                <Text style={styles.emptyLabel}>Список пуст</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 30,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: calcSize(300),
  },
  filterButton: {
    backgroundColor: '#EC7B28',
    color: '#eee',
    width: 130,
    marginLeft: 10,
    marginBottom: 10,
  },
  filterButtonFocused: {
    backgroundColor: '#903e01',
    width: 130,
    marginLeft: 10,
    marginBottom: 10,
  },
  emptyLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#404040',
    textAlign: 'center',
  },
});
