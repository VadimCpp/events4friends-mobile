import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

// components
import SocialButton from "../../../../components/SocialButton";

// interfaces
import { ICommunity } from "../../../../utils/interfaces";

// utils
import { calcSize } from "../../../../utils/misc";

interface ChatsBlockProps {
  community: ICommunity;
}

const ChatsBlock = (props: ChatsBlockProps) => {
  const { community: { telegram, whatsapp, viber } } = props;
  const atLeastOneChat = Boolean(telegram || whatsapp || viber);

  if (!atLeastOneChat) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Чаты сообщества</Text>
      </View>

      <View style={styles.socialsContainer}>
        { Boolean(viber) && (
          <View style={styles.socialWrap}>
            <SocialButton
              icon={require('../../../../assets/img/icon_viber_x4.png')}
              url={viber || ''}
            />
          </View>
        )}
        { Boolean(telegram) && (
          <View style={styles.socialWrap}>
            <SocialButton
              icon={require('../../../../assets/img/icon_telegram_x4.png')}
              url={telegram || ''}
            />
          </View>
        )}
        { Boolean(whatsapp) && (
          <View style={styles.socialWrap}>
            <SocialButton
              icon={require('../../../../assets/img/icon_whatsapp_x4.png')}
              url={whatsapp || ''}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    width: calcSize(285),
  },
  socialsContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    width: calcSize(285),
  },
  socialWrap: {
    marginLeft: 20,
    marginRight: 20,
  },
  titleContainer: {
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#404040',
    textAlign: 'center',
    textShadowColor: 'white',
    textShadowRadius: 2,
    textShadowOffset: { height: 1, width: 1 },
  },
});

export default ChatsBlock;
