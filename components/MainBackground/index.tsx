import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

//
// NOTE!
// This component look ugly on iPads
//
// TODO: fix it some day
//
// NB: The .png files have been changed for ones with x4 resolution.

const FIGMA_WIDTH = 375;

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
    height: width * (236 / FIGMA_WIDTH),
  },
  imgBgWave: {
    position: 'absolute',
    top: width * (177 / FIGMA_WIDTH),
    left: 0,
    width: '100%',
    height: width * (60 / FIGMA_WIDTH),
  },
  imgBgWave2: {
    position: 'absolute',
    top: width * (227 / FIGMA_WIDTH),
    left: 0,
    width: '100%',
    height: width * (227 / FIGMA_WIDTH),
  },
  imgBgBottom: {
    position: 'absolute',
    top: width * (443 / FIGMA_WIDTH),
    left: 0,
    width: '100%',
    height: width * (502 / FIGMA_WIDTH),
  },
});
