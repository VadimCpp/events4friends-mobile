import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Button,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import { Linking } from 'expo';
import SingleBackground from '../../components/SingleBackground';

const { width } = Dimensions.get('screen');

const FIGMA_WIDTH = 375;

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
          <View style={styles.hr} />
          <View style={styles.descriptionContainer}>
            <Text style={styles.summary}>{event.summary}</Text>
            <Text style={styles.description}>{event.description}</Text>
          </View>
          {event.isOnline && (
            <View style={styles.locationContainer}>
              <View>
                <Text style={styles.locationLabel}>
                  Ссылка для подключения:
                </Text>
                <Button
                  onPress={() => {
                    Linking.openURL(event.location);
                  }}
                  title={event.location}
                  color="rgb(47, 124, 246)"
                />
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
    width: width * (315 / FIGMA_WIDTH),
    backgroundColor: 'white',
    marginTop: 30,
    marginBottom: 50,
    marginHorizontal: width * (30 / FIGMA_WIDTH),
    borderRadius: width * (10 / FIGMA_WIDTH),

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
  hr: {
    width: width * (295 / FIGMA_WIDTH),
    height: 2,
    backgroundColor: '#EC7B28',
    marginHorizontal: width * (10 / FIGMA_WIDTH),
    marginTop: 20,
  },
  descriptionContainer: {
    width: '100%',
    paddingHorizontal: width * (15 / FIGMA_WIDTH),
    paddingBottom: width * (70 / FIGMA_WIDTH),
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
    paddingHorizontal: width * (15 / FIGMA_WIDTH),
    paddingBottom: width * (70 / FIGMA_WIDTH),
  },
  locationLabel: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#404040',
  },
  eventWaveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    width: width * (315 / FIGMA_WIDTH),
    height: width * (60 / FIGMA_WIDTH),
    borderBottomLeftRadius: width * (10 / FIGMA_WIDTH),
    borderBottomRightRadius: width * (10 / FIGMA_WIDTH),
    zIndex: -1,
  },
  eventWave: {
    width: width * (315 / FIGMA_WIDTH),
    height: width * (60 / FIGMA_WIDTH),
  },
});
