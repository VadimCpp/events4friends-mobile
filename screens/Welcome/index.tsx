import React, { useContext, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';

// components
import NoDataContainer from '../../components/NoDataContainer';
import CommunityButton from '../../components/CommunityButton';

// constants
import {
  NOTICE_CONNECTING,
  NOTICE_LOADING,
  COLORS,
} from '../../utils/constants';

// contexts
import AuthContext from '../../context/AuthContext';
import DataContext from '../../context/DataContext';
import StorageContext from '../../context/StorageContext';

// utils
import { ICommunity, INavigation } from '../../utils/interfaces';
import { calcSize } from '../../utils/misc';

interface WelcomeScreenParams {
  navigation: INavigation;
}

const WelcomeScreen = (props: WelcomeScreenParams) => {
  const { navigation } = props;

  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);
  const storageContext = useContext(StorageContext);

  const { connectingToFirebase } = authContext;
  const { communities } = dataContext;
  const { getCommunityID, setCommunityID } = storageContext;

  useEffect(() => {
    const communityId: number = getCommunityID();
    if (communityId) {
      navigation.navigate('Home');
    }
  }, [navigation, getCommunityID]);

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
            <Text style={styles.title}>Выберите сообщество</Text>
            {communities.map((community: ICommunity) => (
              <View key={community.id}>
                <Text style={styles.description}>{community.description}:</Text>
                <CommunityButton
                  community={community}
                  onPress={setCommunityID}
                />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    width: '100%',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 30,
  },
  title: {
    color: COLORS.DARK_GRAY,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
  },
  description: {
    marginTop: 40,
    width: calcSize(285),
  },
});

export default WelcomeScreen;
