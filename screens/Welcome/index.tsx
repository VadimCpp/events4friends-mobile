import React, { useContext, useCallback, useEffect } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
} from 'react-native';

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
import StorageContext from "../../context/StorageContext";

// utils
import { ICommunity, INavigation } from '../../utils/interfaces';

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
            {communities.map((community: ICommunity) =>
              <CommunityButton key={community.id} community={community} onPress={setCommunityID} />)}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

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

export default WelcomeScreen;
