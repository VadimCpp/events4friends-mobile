import React, { useState, useContext, useCallback, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';

// components
import EventsListItem from '../../components/EventsListItem';
import Button from '../../components/Button';
import NoDataContainer from '../../components/NoDataContainer';

// constants
import { NOTICE_CONNECTING, NOTICE_LOADING } from '../../utils/constants';

// contexts
import AuthContext from '../../context/AuthContext';
import DataContext from '../../context/DataContext';

// utils
import { EventsFilter } from '../../utils/enums';
import { IEvent, INavigation } from '../../utils/interfaces';
import { calcSize } from '../../utils/misc';
import { getSortedEvents } from '../../utils/eventsLogic';

interface EventsScreenParams {
  navigation: INavigation;
}

function EventsScreen(props: EventsScreenParams) {
  const { navigation } = props;
  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);
  const { connectingToFirebase } = authContext;
  const { events, loadingEvents } = dataContext;
  const [filterType, setFilterType] = useState(EventsFilter.Upcoming);
  const [sortedEvents, setSortedEvents] = useState<Array<IEvent>>([]);

  const onEventPress = useCallback(
    event => {
      navigation.navigate('EventScreen', {
        event,
      });
    },
    [navigation],
  );

  useEffect(() => {
    setSortedEvents(getSortedEvents(events, filterType));
  }, [events, filterType]);

  return (
    <View style={styles.backgroundContainer}>
      <ScrollView style={styles.scrollView} bounces={false}>
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

export default EventsScreen;
