import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import SingleBackground from '../../components/SingleBackground';

const { width } = Dimensions.get('screen');

const FIGMA_WIDTH = 375;

interface ServiceSingleScreenParams {
  route: any;
  navigation: any;
}

export default function ServiceSingleScreen(props: ServiceSingleScreenParams) {
  const { route } = props;
  const { service } = route.params;

  return (
    <View style={styles.container}>
      <SingleBackground />
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
          {/* isFree, instagram, website, price, whatsapp, telegram, vkontakte */}
          <View style={styles.hr} />
          <View style={styles.descriptionContainer}>
            <Text>{service.description}</Text>
          </View>
          {/* TODO: download masked image from Figma and remove eventWaveContainer */}
          <View style={styles.eventWaveContainer}>
            <Image
              style={styles.eventWave}
              source={require('../../assets/img/service_wave_x4.png')}
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
    justifyContent: 'center',
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
  serviceWrap: {
    height: 40,
    paddingTop: 11,
    paddingHorizontal: 13,
  },
  service: {
    fontSize: 18,
    color: '#24BA7B',
    fontWeight: 'bold',
  },
  nameWrap: {
    height: 40,
    paddingTop: 11,
    paddingHorizontal: 13,
  },
  name: {
    fontSize: 18,
    color: '#404040',
    fontWeight: 'bold',
  },
  hr: {
    width: width * (295 / FIGMA_WIDTH),
    height: 2,
    backgroundColor: '#24BA7B',
    marginHorizontal: width * (10 / FIGMA_WIDTH),
    marginTop: 20,
  },
  descriptionContainer: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: width * (15 / FIGMA_WIDTH),
    paddingBottom: width * (70 / FIGMA_WIDTH),
  },
  eventWaveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    width: width * (315 / FIGMA_WIDTH),
    height: width * (37 / FIGMA_WIDTH),
    borderBottomLeftRadius: width * (10 / FIGMA_WIDTH),
    borderBottomRightRadius: width * (10 / FIGMA_WIDTH),
    zIndex: -1,
  },
  eventWave: {
    width: width * (315 / FIGMA_WIDTH),
    height: width * (37 / FIGMA_WIDTH),
  },
});
