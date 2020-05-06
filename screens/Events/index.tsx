import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import moment from 'moment';
import DataContext from '../../context/DataContext';
import EventsListItem from '../../components/EventsListItem';
import EventsBackground from '../../components/EventsBackground/';
import Button from '../../components/Button';
import { calcSize } from '../../utils/Misc';

enum EventsFilter {
  Upcoming = 'UPCOMING_EVENTS',
  Past = 'PAST_EVENTS',
  // TODO: add more types here
}

interface EventsScreenParams {
  navigation: any;
}

export default function EventsScreen(props: EventsScreenParams) {
  const { navigation } = props;
  const [filterType, setFilterType] = useState(EventsFilter.Upcoming);

  return (
    <View style={styles.backgroundContainer}>
      <EventsBackground />
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <DataContext.Consumer>
            {({ events }) => {
              const now = new Date();
              let sortedEvents = [...events];

              if (filterType === EventsFilter.Upcoming) {
                sortedEvents = sortedEvents.filter((event: any) => {
                  return event.start
                    ? moment(event.start).toDate() > now
                    : false;
                });

                sortedEvents.sort((a: any, b: any) => {
                  if (a.start > b.start) {
                    return 1;
                  } else if (a.start < b.start) {
                    return -1;
                  }
                  return 0;
                });
              } else if (filterType === EventsFilter.Past) {
                sortedEvents = sortedEvents.filter((event: any) => {
                  return event.start
                    ? moment(event.start).toDate() < now
                    : false;
                });

                sortedEvents.sort((a: any, b: any) => {
                  if (a.start < b.start) {
                    return 1;
                  } else if (a.start > b.start) {
                    return -1;
                  }
                  return 0;
                });
              }

              if (sortedEvents.length > 0) {
                return (
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
                      />
                      <Button
                        title="Прошедшие"
                        onPress={() => setFilterType(EventsFilter.Past)}
                        style={
                          filterType === EventsFilter.Past
                            ? styles.filterButtonFocused
                            : styles.filterButton
                        }
                      />
                    </View>
                    {sortedEvents.map((event: any) => {
                      return (
                        <EventsListItem
                          key={event.id}
                          event={event}
                          onPress={() => {
                            navigation.navigate('EventSingleScreen', { event });
                          }}
                        />
                      );
                    })}
                  </View>
                );
              } else {
                return (
                  <View>
                    <Text style={styles.emptyLabel}>Список пуст</Text>
                  </View>
                );
              }
            }}
          </DataContext.Consumer>
        </View>
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
    width: 130,
    marginLeft: 10,
    marginBottom: 10,
  },
  filterButtonFocused: {
    backgroundColor: '#404040',
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
