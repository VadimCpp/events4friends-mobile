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
import StorageContext from "../../context/StorageContext";

// utils
import { EventsFilter } from '../../utils/enums';
import { ICommunity, IEvent, INavigation } from '../../utils/interfaces';
import { calcSize } from '../../utils/misc';
import { getSortedEvents } from '../../utils/eventsLogic';

interface EventsScreenParams {
  navigation: INavigation;
}

const EventsScreen = (props: EventsScreenParams) => {
  const { navigation } = props;

  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);
  const storageContext = useContext(StorageContext);

  const { connectingToFirebase } = authContext;
  const { events, loadingEvents, communities } = dataContext;
  const { getCommunityID } = storageContext;

  const [community, setCommunity] = useState<ICommunity | null>(null);
  const [filterType, setFilterType] = useState(EventsFilter.Upcoming);
  const [sortedEvents, setSortedEvents] = useState<Array<IEvent>>([]);

  useEffect(() => {
    const anId = `${getCommunityID()}`;
    const aCommunity = communities.find((c) => c.id === anId) || null;
    setCommunity(aCommunity);
  }, [communities, getCommunityID]);

  const onEventPress = useCallback(
    event => {
      navigation.navigate('EventScreen', {
        event,
      });
    },
    [navigation],
  );

  useEffect(() => {
    navigation.setOptions({
      headerBackTitle: "На главную",
    })
  }, [navigation]);

  useEffect(() => {
    // Номер сообщества по умолчанию - 1 - events4friends
    const DEFAULT_COMMUNITY_ID = "1";
    const communityId = community?.id;
    if (communityId) {
      const eventsOfCommunity = events.filter((e: IEvent) => {
        return (e.communityId || DEFAULT_COMMUNITY_ID) === communityId;
      })
      setSortedEvents(getSortedEvents(eventsOfCommunity, filterType));
    }
  }, [events, filterType, community]);

  return (
    <View style={styles.backgroundContainer}>
      <ScrollView style={styles.scrollView} bounces={false}>
        {connectingToFirebase || loadingEvents ? (
          <NoDataContainer
            label={connectingToFirebase ? NOTICE_CONNECTING : NOTICE_LOADING}
          />
        ) : (
          <View style={styles.container}>
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
                  textStyle={
                    filterType === EventsFilter.Upcoming
                    ? {
                      color: '#404040',
                    }
                    : {
                      color: '#AAA',
                    }
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
                  textStyle={
                    filterType === EventsFilter.Past
                      ? {
                        color: '#404040',
                      }
                      : {
                        color: '#AAA',
                      }
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
              {sortedEvents.length === 0 && (
                <View>
                  <Text style={styles.emptyLabel}>Список пуст</Text>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#FFF',
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
    borderColor: '#EC7B28',
    borderWidth: 2,
    backgroundColor: 'rgba(236,123,40,0.2)',
    width: 130,
    marginLeft: 10,
    marginBottom: 10,
  },
  filterButtonFocused: {
    borderColor: '#903e01',
    borderWidth: 2,
    backgroundColor: 'rgba(144,62,1,0.2)',
    width: 130,
    marginLeft: 10,
    marginBottom: 10,
  },
  emptyLabel: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#404040',
    textAlign: 'center',
  },
});

export default EventsScreen;
