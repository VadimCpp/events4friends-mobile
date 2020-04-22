import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('screen');

const FIGMA_WIDTH = 375;

interface HomeButtonParams {
  sourceImage: Object;
  gradientImage: Object;
  onPress: () => void;
}

export default function HomeButton(props: HomeButtonParams) {
  const { sourceImage, gradientImage, onPress } = props;

  return (
    <TouchableOpacity style={styles.imageContainer} onPress={onPress}>
      <Image style={styles.imgBike} source={sourceImage} />
      <Image style={styles.imgBikeGradient} source={gradientImage} />
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Все события</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: width * (295 / FIGMA_WIDTH),
    height: width * (191 / FIGMA_WIDTH),

    shadowColor: '#444',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  imgBike: {
    width: width * (295 / FIGMA_WIDTH),
    height: width * (191 / FIGMA_WIDTH),
    borderRadius: 9,
  },
  imgBikeGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * (295 / FIGMA_WIDTH),
    height: width * (191 / FIGMA_WIDTH),
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
