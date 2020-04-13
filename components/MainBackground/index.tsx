import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

//
// NOTE!
// This component look ugly on iPads
//
// TODO: fix it some day
//
export default function MainBackground() {
  return (
    <View style={styles.background}>
      <Image
        style={styles.imgBgTop}
        source={require('../../assets/img/main_bg_top.png')}
      />
      <Image
        style={styles.imgBgWave}
        source={require('../../assets/img/main_bg_wave.png')}
      />
      <Image
        style={styles.imgBgWave2}
        source={require('../../assets/img/main_bg_wave2.png')}
      />
      <Image
        style={styles.imgBgBottom}
        source={require('../../assets/img/main_bg_bottom.png')}
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
    height: 235,
  },
  imgBgWave: {
    position: 'absolute',
    top: 175,
    left: 0,
    width: '100%',
    height: 60, 
  },
  imgBgWave2: {
    position: 'absolute',
    top: 235,
    left: 0,
    width: '100%',
    height: 227, 
  },
  imgBgBottom: {
    position: 'absolute',
    top: 443,
    left: 0,
    width: '100%',
    height: 502,
  },
});
