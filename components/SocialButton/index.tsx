import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Linking } from 'expo';
import { DEFAUTL_ACTIVE_OPACITY } from '../../utils/Constants';

const { width } = Dimensions.get('screen');

const FIGMA_WIDTH = 375;

interface SocialButtonParams {
  url: string;
  icon: Object;
}

export default function SocialButton(props: SocialButtonParams) {
  const { url, icon } = props;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        Linking.openURL(url);
      }}
      activeOpacity={DEFAUTL_ACTIVE_OPACITY}
    >
      <Image style={styles.img} source={icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * (55 / FIGMA_WIDTH),
    height: width * (55 / FIGMA_WIDTH),

    shadowColor: '#444',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  img: {
    width: width * (55 / FIGMA_WIDTH),
    height: width * (55 / FIGMA_WIDTH),
    borderRadius: width * (28 / FIGMA_WIDTH),
  },
});
