import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import HTML from 'react-native-render-html';
import * as Linking from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';

// components
import Button from '../../components/Button';

// contexts
import DataContext from '../../context/DataContext';

// utils
import { IEvent, INavigation } from '../../utils/interfaces';
import { removeTags, calcSize } from '../../utils/misc';
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

function EventScreen(props: EventScreenParams) {
  const { route } = props;
  const { event } = route.params;

  const [reminder, setReminder] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const startDate = getVerboseDate(event);
  const startTime = getVerboseTime(event);

  useEffect(() => {
    (async function asyncWrapper() {
      try {
        const value = await AsyncStorage.getItem(`${event.id}`);
        if (value !== null && JSON.parse(value)) {
          setReminder(true);
        }
      } catch (error) {
        console.log('error get reminder: ', error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onReminderChange(value: boolean) {
    setReminder(value);

    try {
      await AsyncStorage.setItem(`${event.id}`, JSON.stringify(value));
    } catch (error) {
      console.log('error save reminder: ', error);
    }
  }

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
              html={event.description}
              imagesMaxWidth={Dimensions.get('window').width}
              onLinkPress={onLinkPress}
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
        {/*
          NOTE!
          Этот функционал ниже отключен.
          В телеграм боте @events4friendsbot реализована команда /remind,
          которая отправляет напоминания о мероприятии.
          В астоматическом режиме напоминания не работают.

          TODO:
          реализовать сервис автоматических уведомлений и вернуть код ниже
        */}
        {/* <View style={styles.remindButtonContainer}>
          <DataContext.Consumer>
            {({ storeReminder }) => {
              return reminder ? (
                <View style={styles.remindBlock}>
                  <Text style={styles.remindLabel}>
                    Напомним Вам об этом мероприятии
                  </Text>
                  <Button
                    title="Отменить напоминание"
                    disabled={disabled}
                    onPress={() => {
                      setDisabled(true);
                      storeReminder(
                        false,
                        event.id,
                        () => {
                          setDisabled(false);
                          onReminderChange(false);
                        },
                        (error: string) => {
                          setDisabled(false);
                          Alert.alert('Ошибка', error);
                        },
                      );
                    }}
                    style={styles.cancelRemindButton}
                  />
                </View>
              ) : (
                <Button
                  title="Напомнить"
                  disabled={disabled}
                  onPress={() => {
                    setDisabled(true);
                    storeReminder(
                      true,
                      event.id,
                      () => {
                        setDisabled(false);
                        onReminderChange(true);
                      },
                      (error: string) => {
                        setDisabled(false);
                        Alert.alert('Ошибка', error);
                      },
                    );
                  }}
                  style={styles.remindButton}
                />
              );
            }}
          </DataContext.Consumer>
        </View> */}
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
    alignItems: 'flex-start',
  },
  labelContainer: {
    paddingHorizontal: calcSize(13),
    paddingTop: 15,
    height: 30,
  },
  labelText: {
    color: 'red',
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
    flex: 1,
    marginTop: 20,
    color: '#404040',
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
    color: '#404040',
  },
  linkContainer: {
    paddingVertical: 5,
  },
  link: {
    color: 'rgb(47, 124, 246)',
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
    backgroundColor: '#404040',
    width: 220,
  },
  remindButton: {
    backgroundColor: '#EC7B28',
    width: 130,
  },
});

export default EventScreen;
