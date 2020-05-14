import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Linking } from 'expo';
import { calcSize, removeTags } from '../../utils/Misc';

interface ServiceSingleScreenParams {
  route: any;
  navigation: any;
}

export default function ServiceSingleScreen(props: ServiceSingleScreenParams) {
  const { route } = props;
  const { service } = route.params;

  let priceTag = null;

  if (service.isFree) {
    priceTag = <Text style={styles.serviceFree}>бесплатно</Text>;
  } else if (service.price) {
    priceTag = <Text style={styles.price}>от {service.price} руб.</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.innerContainer}>
          <View style={styles.serviceWrap}>
            <Text style={styles.service} numberOfLines={1}>
              {service.service}
            </Text>
          </View>
          <View style={styles.nameWrap}>
            <Text style={styles.name} numberOfLines={1}>
              {service.name}
            </Text>
          </View>
          <View style={styles.hr} />
          <View style={styles.descriptionContainer}>
            <Text>{removeTags(service.description)}</Text>
          </View>
          {service.instagram && (
            <View style={styles.locationContainer}>
              <Text style={styles.locationLabel}>Инстаграм:</Text>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(service.instagram);
                }}
                style={styles.linkContainer}
              >
                <Text style={styles.link} numberOfLines={1}>
                  {service.instagram}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {service.website && (
            <View style={styles.locationContainer}>
              <Text style={styles.locationLabel}>Сайт:</Text>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(service.website);
                }}
                style={styles.linkContainer}
              >
                <Text style={styles.link} numberOfLines={1}>
                  {service.website}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {service.whatsapp && (
            <View style={styles.locationContainer}>
              <Text style={styles.locationLabel}>WhatsApp:</Text>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    `https://wa.me/${service.whatsapp}?text=${encodeURI(
                      'Привет, меня интересует услуга ' +
                        service.service +
                        ', которую я нашел на сайте events4friends.ru',
                    )}`,
                  );
                }}
                style={styles.linkContainer}
              >
                <Text style={styles.link} numberOfLines={1}>
                  {service.whatsapp}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {service.telegram && (
            <View style={styles.locationContainer}>
              <Text style={styles.locationLabel}>Telegram:</Text>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`https://tglink.ru/${service.telegram}`);
                }}
                style={styles.linkContainer}
              >
                <Text style={styles.link} numberOfLines={1}>
                  {service.telegram}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {service.vkontakte && (
            <View style={styles.locationContainer}>
              <Text style={styles.locationLabel}>VKontakte:</Text>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(service.vkontakte);
                }}
                style={styles.linkContainer}
              >
                <Text style={styles.link} numberOfLines={1}>
                  {service.vkontakte}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {priceTag && <View style={styles.priceTagContainer}>{priceTag}</View>}
          <View style={styles.paddingBottomContainer} />
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
    justifyContent: 'center',
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
  serviceWrap: {
    height: 40,
    paddingTop: 11,
    paddingHorizontal: calcSize(13),
  },
  service: {
    fontSize: 18,
    color: '#24BA7B',
    fontWeight: 'bold',
  },
  nameWrap: {
    height: 40,
    paddingTop: 11,
    paddingHorizontal: calcSize(13),
  },
  name: {
    fontSize: 18,
    color: '#404040',
    fontWeight: 'bold',
  },
  hr: {
    width: calcSize(295),
    height: 2,
    backgroundColor: '#24BA7B',
    marginHorizontal: calcSize(10),
    marginTop: 20,
  },
  descriptionContainer: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: calcSize(15),
  },
  locationContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: calcSize(15),
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
  priceTagContainer: {
    position: 'absolute',
    bottom: calcSize(20),
    right: calcSize(12),
  },
  serviceFree: {
    fontSize: 18,
    color: '#24BA7B',
  },
  price: {
    fontSize: 18,
    color: '#404040',
  },
  paddingBottomContainer: {
    paddingBottom: calcSize(20),
  },
});
