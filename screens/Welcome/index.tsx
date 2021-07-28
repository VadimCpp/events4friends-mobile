import React, { useContext, useCallback, useEffect } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// components
import NoDataContainer from '../../components/NoDataContainer';
import CommunityButton from '../../components/CommunityButton';

// constants
import {
  NOTICE_CONNECTING,
  NOTICE_LOADING,
} from '../../utils/constants';

// contexts
import AuthContext from '../../context/AuthContext';
import DataContext from '../../context/DataContext';

// utils
import { ICommunity, INavigation } from '../../utils/interfaces';

interface WelcomeScreenParams {
  navigation: INavigation;
}

export default function WelcomeScreen(props: WelcomeScreenParams) {
  const { navigation } = props;

  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);

  const { connectingToFirebase } = authContext;
  const { communities } = dataContext;

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@communityId');
        if (value !== null) {
          //
          // NOTE!
          // value previously stored, navigate home
          //
          navigation.navigate('Home');
        }
      } catch (e) {
        console.warn('Error reading value, skip:', e);
      }
    };

    getData().then();
  }, [navigation]);

  const onPress = useCallback(
    (communityId: string) => {
      const storeData = async (value: string) => {
        try {
          await AsyncStorage.setItem('@communityId', value);
          navigation.navigate('Home');
        } catch (e) {
          console.warn('Saving error, skip:', e);
        }
      };

      storeData(communityId).then();
    },
    [navigation],
  );

  return (
    <View style={styles.backgroundContainer}>
      <ScrollView style={styles.scrollView} bounces={false}>
        {connectingToFirebase || communities.length === 0 ? (
          <View style={styles.container}>
            <NoDataContainer
              label={connectingToFirebase ? NOTICE_CONNECTING : NOTICE_LOADING}
            />
          </View>
        ) : (
          <View style={styles.container}>
            {/* TODO: style text */}
            <Text style={styles.title}>Выберите сообщество</Text>
            {communities.map((community: ICommunity) =>
              <CommunityButton key={community.id} community={community} onPress={onPress}/>)}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  container: {
    width: '100%',
    height: 500,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 30,
  },
  title: {
    color: '#404040',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
