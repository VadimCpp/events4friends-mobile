import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import { DEFAULT_ACTIVE_OPACITY } from '../../utils/constants';
import { calcSize } from '../../utils/misc';

interface HomeButtonParams {
  title: string;
  sourceImage: Object;
  gradientImage: Object;
  onPress: () => void;
}

const HomeButton = (props: HomeButtonParams) => {
  const { title, sourceImage, gradientImage, onPress } = props;

  return (
    <TouchableOpacity
      style={styles.imageContainer}
      onPress={onPress}
      activeOpacity={DEFAULT_ACTIVE_OPACITY}
      delayPressIn={50}
    >
      <Image style={styles.imgBike} source={sourceImage} />
      <Image style={styles.imgBikeGradient} source={gradientImage} />
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: calcSize(295),
    height: calcSize(191),

    shadowColor: '#444',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  imgBike: {
    width: calcSize(295),
    height: calcSize(191),
    borderRadius: 9,
  },
  imgBikeGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: calcSize(295),
    height: calcSize(191),
    borderRadius: 9,
  },
  labelContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  label: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeButton;
