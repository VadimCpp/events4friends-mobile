import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import moment from 'moment';
import SingleBackground from '../../components/SingleBackground';

interface EventSingleScreenParams {
  route: any;
  navigation: any;
}

export default function EventSingleScreen(props: EventSingleScreenParams) {
  const { route } = props;
  const { event } = route.params;

  const startDate = moment(event.start).format('D MMMM, dddd');
  const startTime = moment(event.start).format('HH:mm');

  let timezone;

  switch (event.timezone) {
    case '+0200':
      timezone = ' (Клд)';
      break;
    case '+0300':
      timezone = ' (Мск)';
      break;
    default:
      timezone = '';
  }

  return (
    <View style={styles.container}>
      <SingleBackground />
      <Text>{event.summary}</Text>
      <View style={styles.datePlaceContainer}>
        <View style={styles.datetimeContainer}>
          <Image
            style={styles.iconTime}
            source={require('../../assets/img/icon_time_x4.png')}
          />
          <View>
            <Text>{startDate}</Text>
            <View style={styles.timeLine}>
              <Text>{startTime}</Text>
              <Text>{timezone}</Text>
            </View>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePlaceContainer: {
    width: '100%',
    paddingHorizontal: 30,
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
  timeLine: {
    flexDirection: 'row',
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
