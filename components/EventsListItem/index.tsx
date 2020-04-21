import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from 'react-native';
import moment from 'moment';

const { width } = Dimensions.get('screen');

const FIGMA_WIDTH = 375;

interface EventsListItemParams {
  event: any;
  onPress: () => void;
}

export default function EventsListItem(props: EventsListItemParams) {
  const { event, onPress } = props;
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
    <TouchableOpacity
      key={event.id}
      style={styles.listItemContainer}
      onPress={onPress}
    >
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
      <Image
        style={styles.eventListItemWave}
        source={require('../../assets/img/event_list_item_wave_x4.png')}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
