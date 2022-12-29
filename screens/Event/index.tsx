import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import HTML from 'react-native-render-html';
import * as Linking from 'expo-linking';

// utils
import { COLORS } from '../../utils/constants';
import { IEvent, INavigation } from '../../utils/interfaces';
import { calcSize } from '../../utils/misc';
import {
  isCurrentEvent,
  isStartWithinAnHourEvent,
  getVerboseDate,
  getVerboseTime,
} from '../../utils/eventsLogic';

interface EventScreenParams {
  route: { params: { event: IEvent } };
  navigation: INavigation;
}

const EventScreen = (props: EventScreenParams) => {
  const { route } = props;
  const { event } = route.params;

  const startDate = getVerboseDate(event);
  const startTime = getVerboseTime(event);

  // eslint-disable-next-line no-shadow
  function onLinkPress(event: IEvent, href: string) {
    Linking.openURL(href);
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.contentContainer}
        bounces={false}
      >
        <View style={styles.labelContainer}>
          {isCurrentEvent(event) ? (
            <Text style={styles.labelText}>Идет сейчас</Text>
          ) : (
            isStartWithinAnHourEvent(event) && (
              <Text style={styles.labelText}>Начнется в течение часа</Text>
            )
          )}
        </View>
        <View style={styles.datePlaceContainer}>
          <View style={styles.datetimeContainer}>
            <Image
              style={styles.iconTime}
              source={require('../../assets/img/icon_time_x4.png')}
            />
            <View style={styles.datetimeColumn}>
              <Text>{startDate}</Text>
              <View style={styles.timeLine}>
                <Text numberOfLines={1}>{startTime}</Text>
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
          <View>
            <Text style={styles.summary}>{event.summary}</Text>
          </View>
          <ScrollView style={styles.description}>
            <HTML
              source={{html: event.description}}
              contentWidth={Dimensions.get('window').width}
              imagesMaxWidth={Dimensions.get('window').width}
              renderersProps={{ a: { onLinkPress } }}
            />
          </ScrollView>
          {event.name && (
            <View>
              <Text style={styles.description}>
                {`Организатор мероприятия:\n${event.name}`}
              </Text>
            </View>
          )}
        </View>
        {event.isOnline && (
          <View style={styles.locationContainer}>
            <Text style={styles.locationLabel}>Ссылка для подключения:</Text>
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
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    width: '100%',
  },
  scrollViewContainer: {
    width: '100%',
  },
  contentContainer: {
    alignItems: 'flex-start',
  },
  labelContainer: {
    paddingHorizontal: calcSize(13),
    paddingTop: 15,
    height: 30,
  },
  labelText: {
    color: COLORS.RED,
  },
  datePlaceContainer: {
    width: '100%',
  },
  datetimeContainer: {
    marginTop: 20,
    marginHorizontal: calcSize(10),
    flexDirection: 'row',
  },
  datetimeColumn: {
    width: calcSize(315),
    flexDirection: 'column',
  },
  iconTime: {
    width: 16,
    height: 16,
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
    width: 16,
    height: 16,
    marginTop: 2,
    marginRight: 6,
  },
  iconPlace: {
    width: 12,
    height: 17,
    marginRight: 10,
    marginLeft: 2,
    marginTop: 1,
  },
  address: {
    width: 240,
    justifyContent: 'flex-start',
  },
  hr: {
    width: calcSize(355),
    height: 2,
    backgroundColor: COLORS.BRIGHT_ORANGE,
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
    color: COLORS.DARK_GRAY,
  },
  description: {
    flex: 1,
    marginTop: 20,
    color: COLORS.DARK_GRAY,
  },
  locationContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: calcSize(15),
    paddingBottom: calcSize(30),
  },
  locationLabel: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.DARK_GRAY,
  },
  linkContainer: {
    paddingVertical: 5,
  },
  link: {
    color: COLORS.BRIGHT_BLUE,
  },
  remindButtonContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  remindBlock: {
    width: calcSize(300),
    alignItems: 'center',
    paddingHorizontal: calcSize(10),
  },
  remindLabel: {
    width: '100%',
    marginBottom: calcSize(10),
  },
  cancelRemindButton: {
    backgroundColor: COLORS.DARK_GRAY,
    width: 220,
  },
  remindButton: {
    backgroundColor: COLORS.BRIGHT_ORANGE,
    width: 130,
  },
});

export default EventScreen;
