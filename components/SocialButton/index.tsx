import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Linking } from 'expo';

// utils
import { DEFAULT_ACTIVE_OPACITY } from '../../utils/constants';
import { calcSize } from '../../utils/misc';

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
      activeOpacity={DEFAULT_ACTIVE_OPACITY}
    >
      <Image style={styles.img} source={icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: calcSize(55),
    height: calcSize(55),

    shadowColor: '#444',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  img: {
    width: calcSize(55),
    height: calcSize(55),
    borderRadius: calcSize(28),
  },
});
