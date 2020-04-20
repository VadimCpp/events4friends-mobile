import React from 'react';
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import DataContext from '../../context/DataContext';
import 'moment/locale/ru';

const { width } = Dimensions.get('screen');

const FIGMA_WIDTH = 375;

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
            return events.map((event: any) => {
              const startDate = moment(event.start).format('D MMMM, dddd');
              const startTime = moment(event.start).format('HH:mm');

              return (
                <View key={event.id} style={styles.listItemContainer}>
                  <View style={styles.summaryWrap}>
                    <Text style={styles.summary} numberOfLines={1}>
                      {event.summary}
                    </Text>
                  </View>
                  <View style={styles.hr} />
                  <View style={styles.datetimeContainer}>
                    <Image
                      style={styles.iconTime}
                      source={require('../../assets/img/icon_time_x4.png')}
                    />
                    <View>
                      <Text>{startDate}</Text>
                      <Text>{startTime}</Text>
                    </View>
                  </View>
                  {event.isOnline ? (
                    <View style={styles.addressContainer}>
                      <Image
                        style={styles.iconWww}
                        source={require('../../assets/img/icon_www_x4.png')}
                      />
                      <View style={styles.address}>
                        <Text numberOfLines={1}>Всемирная паутина</Text>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.addressContainer}>
                      <Image
                        style={styles.iconPlace}
                        source={require('../../assets/img/icon_place_x4.png')}
                      />
                      <View style={styles.address}>
                        <Text numberOfLines={2}>{event.location}</Text>
                      </View>
                    </View>
                  )}
                  <Image
                    style={styles.eventListItemWave}
                    source={require('../../assets/img/event_list_item_wave_x4.png')}
                  />
                </View>
              );
            });
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
  },

  //
  // TODO: move to component
  //
  listItemContainer: {
    width: 300,
    height: 200,
    borderRadius: 9,
    marginTop: 16,
    backgroundColor: 'white',

    shadowColor: '#444',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  summaryWrap: {
    height: 40,
    paddingTop: 11,
    paddingHorizontal: 13,
  },
  summary: {
    fontSize: 18,
    color: '#404040',
    fontWeight: 'bold',
  },
  hr: {
    width: 282,
    height: 2,
    backgroundColor: '#EC7B28',
    marginHorizontal: 9,
  },
  eventListItemWave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: width * (300 / FIGMA_WIDTH),
    height: width * (32 / FIGMA_WIDTH),
  },
  datetimeContainer: {
    marginTop: 50,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  iconTime: {
    width: 32,
    height: 32,
    marginTop: 2,
    marginRight: 6,
  },
  addressContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginHorizontal: 10,
    height: 38,
  },
  iconWww: {
    width: 32,
    height: 32,
    marginTop: 2,
    marginRight: 6,
  },
  iconPlace: {
    width: 24,
    height: 34,
    marginRight: 10,
    marginLeft: 4,
  },
  address: {
    width: 240,
    justifyContent: 'center',
  },
});
