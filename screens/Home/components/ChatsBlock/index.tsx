import React from 'react';
import { StyleSheet, View } from 'react-native';

// components
import SocialButton from '../../../../components/SocialButton';

// interfaces
import { ICommunity } from '../../../../utils/interfaces';

// utils
import { calcSize } from '../../../../utils/misc';

// local components
import Header from '../Header';

interface ChatsBlockProps {
  community: ICommunity;
}

const ChatsBlock = (props: ChatsBlockProps) => {
  const {
    community: { telegram, whatsapp, viber },
  } = props;
  const atLeastOneChat = Boolean(telegram || whatsapp || viber);

  if (!atLeastOneChat) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Header title={'Чаты сообщества'} />
      <View style={styles.socialsContainer}>
        {Boolean(viber) && (
          <View style={styles.socialWrap}>
            <SocialButton
              icon={require('../../../../assets/img/icon_viber_x4.png')}
              url={`${viber}`}
            />
          </View>
        )}
        {Boolean(telegram) && (
          <View style={styles.socialWrap}>
            <SocialButton
              icon={require('../../../../assets/img/icon_telegram_x4.png')}
              url={`${telegram}`}
            />
          </View>
        )}
        {Boolean(whatsapp) && (
          <View style={styles.socialWrap}>
            <SocialButton
              icon={require('../../../../assets/img/icon_whatsapp_x4.png')}
              url={`${whatsapp}`}
            />
          </View>
        )}
      </View>
    </View>
  );
};

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
});

export default ChatsBlock;
