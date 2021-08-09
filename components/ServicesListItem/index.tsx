import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// utils
import { DEFAULT_ACTIVE_OPACITY } from '../../utils/constants';
import { calcSize } from '../../utils/misc';

interface ServicesListItemParams {
  service: any;
  highlightName: boolean;
  onPress: () => void;
}

function ServicesListItem(props: ServicesListItemParams) {
  const { service, highlightName, onPress } = props;

  let priceTag = null;

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
      activeOpacity={DEFAULT_ACTIVE_OPACITY}
    >
      <View style={styles.serviceWrap}>
        <Text style={styles.service} numberOfLines={1}>
          {highlightName ? service.name : service.service}
        </Text>
      </View>
      <View style={styles.hr} />
      <View style={styles.nameWrap}>
        <Text style={styles.name} numberOfLines={1}>
          {highlightName ? service.service : service.name}
        </Text>
      </View>
      {priceTag && <View style={styles.priceTagContainer}>{priceTag}</View>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listItemContainer: {
    height: 110,
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
    paddingHorizontal: calcSize(13),
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
    paddingHorizontal: calcSize(13),
  },
  name: {
    fontSize: 14,
    color: '#404040',
  },
  priceTagContainer: {
    position: 'absolute',
    top: 80,
    right: calcSize(12),
  },
  serviceFree: {
    fontSize: 18,
    color: '#24BA7B',
  },
  price: {
    fontSize: 18,
    color: '#404040',
  },
});

export default ServicesListItem;
