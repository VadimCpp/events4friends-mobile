import React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import moment from 'moment';
import DataContext from '../../context/DataContext';
import EventsListItem from '../../components/EventsListItem';
import EventsBackground from '../../components/EventsBackground/';

interface EventsScreenParams {
  navigation: any;
}

export default function EventsScreen(props: EventsScreenParams) {
  const { navigation } = props;

  return (
    <View style={styles.backgroundContainer}>
      <EventsBackground />
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <DataContext.Consumer>
            {({ events }) => {
              const now = new Date();
              let sortedEvents = [...events];

              //
              // TODO: add Event interface and fix eslint issues
              //
              sortedEvents = sortedEvents.filter(
                event => moment(event.start).toDate() > now,
              );

              sortedEvents.sort((a, b) => {
                if (a.start > b.start) {
                  return 1;
                } else if (a.start < b.start) {
                  return -1;
                }
                return 0;
              });

              if (sortedEvents.length > 0) {
                return (
                  <View>
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
  emptyLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#404040',
    textAlign: 'center',
  },
});
