import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import * as Linking from 'expo-linking';

// components
import HomeButton from '../../components/HomeButton';
import SocialButton from '../../components/SocialButton';
import Button from '../../components/Button';
import NoDataContainer from "../../components/NoDataContainer";

// contexts
import AuthContext from "../../context/AuthContext";
import DataContext from "../../context/DataContext";
import StorageContext from "../../context/StorageContext";

// constants
import { NOTICE_CONNECTING, NOTICE_LOADING } from "../../utils/constants";

// interfaces
import { ICommunity, INavigation } from '../../utils/interfaces';

// utils
import { calcSize } from '../../utils/misc';

// local components
import WebLinksBlock from "./components/WebLinksBlock";
import ChatsBlock from "./components/ChatsBlock";

interface HomeScreenProps {
  navigation: INavigation;
}

export default function HomeScreen(props: HomeScreenProps) {
  const { navigation } = props;

  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);
  const storageContext = useContext(StorageContext);

  const { connectingToFirebase } = authContext;
  const { communities } = dataContext;
  const { getCommunityID, setCommunityID } = storageContext;

  const [ community, setCommunity ] = useState<ICommunity | null>(null);

  useEffect(() => {
    const anId = `${getCommunityID()}`;
    const aCommunity = communities.find((c) => c.id === anId) || null;
    setCommunity(aCommunity);
  }, [communities, getCommunityID]);

  const handleLinkClick = async (slug: string, url: string) => {
    try {
      console.log(`Opening ${slug}: ${url}`);
      await Linking.openURL(url);
    }
    catch (e) {
      alert(`Ошибка! Не могу открыть ${slug}: ${url}`);
    }
  };
  
  const handleCommunitiesClick = () => {
    console.log('Navigate WelcomeScreen');
    setCommunityID(0);
    navigation.navigate('WelcomeScreen');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.contentContainer}
        bounces={false}
      >
        {connectingToFirebase || community === null ? (
          <View style={styles.container}>
            <NoDataContainer
              label={connectingToFirebase ? NOTICE_CONNECTING : NOTICE_LOADING}
            />
          </View>
        ) : (
          <>
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcome} numberOfLines={2}>
                {`Добро пожаловать в «${community.name}»`}
              </Text>
              <Text style={styles.subTitle}>{community.description}</Text>
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
            <WebLinksBlock community={community} />
            <ChatsBlock community={community} />
            <View style={styles.lastContainer}>
              <Button
                title={"Другие сообщества"}
                onPress={handleCommunitiesClick}
                style={styles.simpleButton}
                textStyle={styles.simpleButtonText}
              />
            </View>
          </>
        )}
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
    height: calcSize(150),
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  welcome: {
    color: '#404040',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
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
  subTitle: {
    marginTop: 10,
    color: '#404040',
  },
  buttonContainer: {
    marginTop: 30,
  },
  lastContainer: {
    marginTop: 30,
    marginBottom: 50,
  },
  simpleButton: {
    width: 310,
    height: 80,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: 'grey',
    borderWidth: 2,
    marginTop: 30,
  },
  simpleButtonText: {
    color: '#404040',
    fontSize: 28,
    textAlign: 'center',
  }
});
