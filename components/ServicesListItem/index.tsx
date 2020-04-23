import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from 'react-native';

const { width } = Dimensions.get('screen');

const FIGMA_WIDTH = 375;

interface ServicesListItemParams {
  service: any;
  onPress: () => void;
}

export default function ServicesListItem(props: ServicesListItemParams) {
  const { service, onPress } = props;

  return (
    <TouchableOpacity
      key={service.id}
      style={styles.listItemContainer}
      onPress={onPress}
    >
      <View style={styles.summaryWrap}>
        <Text style={styles.summary} numberOfLines={1}>
          {service.service}
        </Text>
      </View>
      <View style={styles.hr} />
      <Image
        style={styles.eventListItemWave}
        source={require('../../assets/img/event_list_item_wave_x4.png')}
      />
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
  hr: {
    width: width * (282 / FIGMA_WIDTH),
    height: 2,
    backgroundColor: '#EC7B28',
    marginHorizontal: width * (9 / FIGMA_WIDTH),
  },
  eventListItemWave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: width * (300 / FIGMA_WIDTH),
    height: width * (32 / FIGMA_WIDTH),
    zIndex: -1,
  },
});
