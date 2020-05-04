import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import { Linking } from 'expo';
import SingleBackground from '../../components/SingleBackground';
import { removeTags, calcSize } from '../../utils/Misc';

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
      <ScrollView
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.innerContainer}>
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
                  <Text numberOfLines={1}>Онлайн</Text>
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
          <View style={styles.hr} />
          <View style={styles.descriptionContainer}>
            <Text style={styles.summary}>{event.summary}</Text>
            <Text style={styles.description}>
              {removeTags(event.description)}
            </Text>
          </View>
          {event.isOnline && (
            <View style={styles.locationContainer}>
              <View>
                <Text style={styles.locationLabel}>
                  Ссылка для подключения:
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(event.location);
                  }}
                  style={styles.linkContainer}
                >
                  <Text style={styles.link} numberOfLines={1}>
                    {event.location}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {/* TODO: download masked image from Figma and remove eventWaveContainer */}
          <View style={styles.eventWaveContainer}>
            <Image
              style={styles.eventWave}
              source={require('../../assets/img/event_wave_x4.png')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
  },
  scrollViewContainer: {
    width: '100%',
  },
  contentContainer: {
    alignItems: 'center',
  },
  innerContainer: {
    width: calcSize(315),
    backgroundColor: 'white',
    marginTop: 30,
    marginBottom: 50,
    marginHorizontal: calcSize(30),
    borderRadius: calcSize(10),

    shadowColor: '#444',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  datePlaceContainer: {
    width: '100%',
  },
  datetimeContainer: {
    marginTop: 50,
    marginHorizontal: calcSize(10),
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
    marginHorizontal: calcSize(10),
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
  hr: {
    width: calcSize(295),
    height: 2,
    backgroundColor: '#EC7B28',
    marginHorizontal: calcSize(10),
    marginTop: 20,
  },
  descriptionContainer: {
    width: '100%',
    paddingHorizontal: calcSize(15),
    paddingBottom: calcSize(70),
  },
  summary: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#404040',
  },
  description: {
    marginTop: 20,
    color: '#404040',
  },
  locationContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: calcSize(15),
    paddingBottom: calcSize(70),
  },
  locationLabel: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#404040',
  },
  linkContainer: {
    paddingVertical: 5,
  },
  link: {
    color: 'rgb(47, 124, 246)',
  },
  eventWaveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    width: calcSize(315),
    height: calcSize(60),
    borderBottomLeftRadius: calcSize(10),
    borderBottomRightRadius: calcSize(10),
    zIndex: -1,
  },
  eventWave: {
    width: calcSize(315),
    height: calcSize(60),
  },
});
