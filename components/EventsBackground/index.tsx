import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

const FIGMA_WIDTH = 375;

export default function EventSingleBackground() {
  return (
    <View style={styles.background}>
      <Image
        style={styles.wave1Style}
        source={require('../../assets/img/wave1Events_x4.png')}
      />
      <Image
        style={styles.wave2Style}
        source={require('../../assets/img/wave2Events_x4.png')}
      />
      <Image
        style={styles.vectorStyle}
        source={require('../../assets/img/VectorEvents_x4.png')}
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
    top: width * (480 / FIGMA_WIDTH),
    left: 0,
    width: '100%',
    height: width * (250 / FIGMA_WIDTH),
  },
  wave2Style: {
    position: 'absolute',
    top: width * (275 / FIGMA_WIDTH),
    left: 0,
    width: '100%',
    height: width * (154 / FIGMA_WIDTH),
  },
  vectorStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: width * (275 / FIGMA_WIDTH),
  },
});
