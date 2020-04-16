import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

const FIGMA_WIDTH = 375;

export default function EventSingleBackground() {
  return (
    <View style={styles.background}>
      <Image
        style={styles.wave1Style}
        source={require('../../assets/img/wave1SingleEvent_x4.png')}
      />
      <Image
        style={styles.wave2Style}
        source={require('../../assets/img/wave2SingleEvent_x4.png')}
      />
      <Image
        style={styles.wave3Style}
        source={require('../../assets/img/wave3SingleEvent_x4.png')}
      />
      <Image
        style={styles.vectorStyle}
        source={require('../../assets/img/VectorSingleEvent_x4.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
  wave1Style: {
    position: 'absolute',
    top: width * (517 / FIGMA_WIDTH),
    left: 0,
    width: '100%',
    height: width * (150 / FIGMA_WIDTH),
  },
  wave2Style: {
    position: 'absolute',
    top: width * (363 / FIGMA_WIDTH),
    left: 0,
    width: '100%',
    height: width * (150 / FIGMA_WIDTH),
  },
  wave3Style: {
    position: 'absolute',
    top: width * (285 / FIGMA_WIDTH),
    left: 0,
    width: '100%',
    height: width * (60 / FIGMA_WIDTH),
  },
  vectorStyle: {
    position: 'absolute',
    top: width * (18 / FIGMA_WIDTH),
    left: width * (0 / FIGMA_WIDTH),
    width: '100%',
    height: width * (226 / FIGMA_WIDTH),
  },
});
