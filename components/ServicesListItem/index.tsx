import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from 'react-native';
import { DEFAUTL_ACTIVE_OPACITY } from '../../utils/Constants';

const { width } = Dimensions.get('screen');

const FIGMA_WIDTH = 375;

interface ServicesListItemParams {
  service: any;
  onPress: () => void;
}

export default function ServicesListItem(props: ServicesListItemParams) {
  const { service, onPress } = props;

  let priceTag;

  if (service.isFree) {
    priceTag = <Text style={styles.serviceFree}>бесплатно</Text>;
  } else if (service.price) {
    priceTag = <Text style={styles.summary}>от {service.price} руб.</Text>;
  }

  return (
    <TouchableOpacity
      key={service.id}
      style={styles.listItemContainer}
      onPress={onPress}
      activeOpacity={DEFAUTL_ACTIVE_OPACITY}
    >
      {/* TODO: rename summary* to service* */}
      <View style={styles.summaryWrap}>
        <Text style={styles.summary} numberOfLines={1}>
          {service.service}
        </Text>
      </View>
      <View style={styles.hr} />
      <View style={styles.priceTagContainer}>{priceTag}</View>
      {/* TODO: download masked image from Figma and remove eventWaveContainer */}
      <View style={styles.serviceWaveContainer}>
        <Image
          style={styles.serviceListItemWave}
          source={require('../../assets/img/service_list_item_wave_x4.png')}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItemContainer: {
    height: 200,
    width: width * (300 / FIGMA_WIDTH),
    borderRadius: width * (10 / FIGMA_WIDTH),
    marginTop: 16,
    backgroundColor: 'white',

    shadowColor: '#444',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  summaryWrap: {
    height: 40,
    paddingTop: 11,
    paddingHorizontal: 13,
  },
  summary: {
    fontSize: 18,
    color: '#404040',
    fontWeight: 'bold',
  },
  serviceFree: {
    fontSize: 18,
    color: '#24BA7B',
    fontWeight: 'bold',
  },
  hr: {
    width: width * (282 / FIGMA_WIDTH),
    height: 2,
    backgroundColor: '#24BA7B',
    marginHorizontal: width * (9 / FIGMA_WIDTH),
  },
  priceTagContainer: {
    position: 'absolute',
    top: 120,
    right: 12,
  },
  serviceWaveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    width: width * (300 / FIGMA_WIDTH),
    height: width * (37 / FIGMA_WIDTH),
    borderBottomLeftRadius: width * (10 / FIGMA_WIDTH),
    borderBottomRightRadius: width * (10 / FIGMA_WIDTH),
    zIndex: -1,
  },
  serviceListItemWave: {
    width: width * (300 / FIGMA_WIDTH),
    height: width * (37 / FIGMA_WIDTH),
  },
});
