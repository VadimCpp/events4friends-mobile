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
          <Text>{service.service}</Text>
          <Text>{service.name}</Text>
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
  descriptionContainer: {
    marginBottom: 100,
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
