import React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import moment from 'moment';
import DataContext from '../../context/DataContext';
import EventsListItem from '../../components/EventsListItem';

interface EventsScreenParams {
  navigation: any;
}

export default function EventsScreen(props: EventsScreenParams) {
  const { navigation } = props;

  return (
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
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Выберите мероприятие</Text>
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
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Список пуст</Text>
                </View>
              );
            }
          }}
        </DataContext.Consumer>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  titleContainer: {
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#404040',
    textAlign: 'center',
  },
});
