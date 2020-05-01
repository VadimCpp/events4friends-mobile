import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { calcSize } from '../../utils/Misc';

export default function MainBackground() {
  return (
    <View style={styles.background}>
      <Image
        style={styles.imgBgTop}
        source={require('../../assets/img/main_bg_top_x4.png')}
      />
      <Image
        style={styles.imgBgWave}
        source={require('../../assets/img/main_bg_wave_x4.png')}
      />
      <Image
        style={styles.imgBgWave2}
        source={require('../../assets/img/main_bg_wave2_x4.png')}
      />
      <Image
        style={styles.imgBgBottom}
        source={require('../../assets/img/main_bg_bottom_x4.png')}
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
  imgBgTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: calcSize(236),
  },
  imgBgWave: {
    position: 'absolute',
    top: calcSize(177),
    left: 0,
    width: '100%',
    height: calcSize(60),
  },
  imgBgWave2: {
    position: 'absolute',
    top: calcSize(227),
    left: 0,
    width: '100%',
    height: calcSize(227),
  },
  imgBgBottom: {
    position: 'absolute',
    top: calcSize(443),
    left: 0,
    width: '100%',
    height: calcSize(502),
  },
});
