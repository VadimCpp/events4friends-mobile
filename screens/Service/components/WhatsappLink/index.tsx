import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Linking from 'expo-linking';

// utils
import { COLORS } from '@utils/constants';
import { calcSize } from '@utils/misc';

interface WhatsappLinkProps {
  whatsapp: string;
  service: string;
}

const WhatsappLink = (props: WhatsappLinkProps) => {
  const { whatsapp, service } = props;
  const textToEncode = `Привет, меня интересует услуга ${service}, которую я нашел на сайте events4friends.ru`;
  const url = `https://wa.me/${whatsapp}?text=${encodeURI(textToEncode)}`;

  return (
    <View style={styles.waContainer}>
      <Text style={styles.waLabel}>WhatsApp:</Text>
      <TouchableOpacity
        onPress={() => Linking.openURL(url)}
        style={styles.linkContainer}
      >
        <Text style={styles.link} numberOfLines={1}>
          {whatsapp}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  waContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: calcSize(15),
  },
  waLabel: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.DARK_GRAY,
  },
  linkContainer: {
    paddingVertical: 5,
  },
  link: {
    color: COLORS.BRIGHT_BLUE,
  },
});

export default WhatsappLink;
