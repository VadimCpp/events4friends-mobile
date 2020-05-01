import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { DEFAUTL_ACTIVE_OPACITY } from '../../utils/Constants';
import { calcSize } from '../../utils/Misc';

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
    priceTag = <Text style={styles.price}>от {service.price} руб.</Text>;
  }

  return (
    <TouchableOpacity
      key={service.id}
      style={styles.listItemContainer}
      onPress={onPress}
      activeOpacity={DEFAUTL_ACTIVE_OPACITY}
    >
      <View style={styles.serviceWrap}>
        <Text style={styles.service} numberOfLines={1}>
          {service.service}
        </Text>
      </View>
      <View style={styles.hr} />
      <View style={styles.nameWrap}>
        <Text style={styles.name} numberOfLines={1}>
          {service.name}
        </Text>
      </View>
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
    width: calcSize(300),
    borderRadius: calcSize(10),
    marginTop: 16,
    backgroundColor: 'white',

    shadowColor: '#444',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  serviceWrap: {
    height: 40,
    paddingTop: 11,
    paddingHorizontal: 13,
  },
  service: {
    fontSize: 18,
    color: '#404040',
    fontWeight: 'bold',
  },
  hr: {
    width: calcSize(282),
    height: 2,
    backgroundColor: '#24BA7B',
    marginHorizontal: calcSize(9),
  },
  nameWrap: {
    height: 40,
    paddingTop: 5,
    paddingHorizontal: 13,
  },
  name: {
    fontSize: 14,
    color: '#404040',
  },
  priceTagContainer: {
    position: 'absolute',
    top: 120,
    right: 12,
  },
  serviceFree: {
    fontSize: 18,
    color: '#24BA7B',
  },
  price: {
    fontSize: 18,
    color: '#404040',
  },
  serviceWaveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    width: calcSize(300),
    height: calcSize(37),
    borderBottomLeftRadius: calcSize(10),
    borderBottomRightRadius: calcSize(10),
    zIndex: -1,
  },
  serviceListItemWave: {
    width: calcSize(300),
    height: calcSize(37),
  },
});
