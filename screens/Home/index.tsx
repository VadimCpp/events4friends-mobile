import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import HomeButton from '../../components/HomeButton';
import SocialButton from '../../components/SocialButton';
import { calcSize } from '../../utils/Misc';

interface HomeScreenParams {
  navigation: any;
}

export default function HomeScreen(props: HomeScreenParams) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcome} numberOfLines={1}>
            Добро пожаловать
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <HomeButton
            title="Все события"
            sourceImage={require('../../assets/img/bike.png')}
            gradientImage={require('../../assets/img/bike_gradient.png')}
            onPress={() => {
              navigation.navigate('Details');
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <HomeButton
            title="Все услуги"
            sourceImage={require('../../assets/img/brain.png')}
            gradientImage={require('../../assets/img/brain_gradient.png')}
            onPress={() => {
              navigation.navigate('Services');
            }}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Выберите чат</Text>
        </View>
        <View style={styles.socialsContainer}>
          <SocialButton
            icon={require('../../assets/img/icon_viber_x4.png')}
            url={
              'https://invite.viber.com/?g2=AQBA7jF9Y7%2BXBkqTI0PoYF%2BmnEMluxPdGZy8wJQ3PRPBLT%2BMeh344RxBuBUTVc6B'
            }
          />
          <SocialButton
            icon={require('../../assets/img/icon_telegram_x4.png')}
            url={'https://tglink.ru/events4friends'}
          />
          <SocialButton
            icon={require('../../assets/img/icon_whatsapp_x4.png')}
            url={'https://chat.whatsapp.com/DWUaZ1bsuxwJLALyvBYTt8'}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
  },
  scrollViewContainer: {
    width: '100%',
  },
  contentContainer: {
    alignItems: 'center',
  },
  welcomeContainer: {
    width: calcSize(295),
    height: calcSize(100),
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  welcome: {
    color: '#404040',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
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
  buttonContainer: {
    marginTop: 30,
  },
  socialsContainer: {
    marginTop: 30,
    marginBottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: calcSize(285),
  },
});
