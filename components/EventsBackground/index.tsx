import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { calcSize } from '../../utils/Misc';

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
    top: calcSize(480),
    left: 0,
    width: '100%',
    height: calcSize(250),
  },
  wave2Style: {
    position: 'absolute',
    top: calcSize(275),
    left: 0,
    width: '100%',
    height: calcSize(154),
  },
  vectorStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: calcSize(275),
  },
});
