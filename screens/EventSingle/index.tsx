import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  Alert,
  Dimensions,
} from 'react-native';
import HTML from 'react-native-render-html';
import moment from 'moment';
import { Linking } from 'expo';
import { removeTags, calcSize, timeZoneToCityName } from '../../utils/Misc';
import Button from '../../components/Button';
import DataContext from '../../context/DataContext';

interface EventSingleScreenParams {
  route: any;
  navigation: any;
}

export default function EventSingleScreen(props: EventSingleScreenParams) {
  const { route } = props;
  const { event } = route.params;

  const [reminder, setReminder] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const startDate = moment(`${event.start}`).format('D MMMM, dddd');
  const startTime = `${moment(event.start).format(
    'HH:mm',
  )} ${timeZoneToCityName(event.timezone)}`;

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

  return (
    <View style={styles.container}>
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
          <View style={styles.remindButtonContainer}>
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
