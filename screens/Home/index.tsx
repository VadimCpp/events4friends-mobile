import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

// components
import NoDataContainer from '../../components/NoDataContainer';
import HeaderTitle from '../../components/HeaderTitle';

// contexts
import AuthContext from '../../context/AuthContext';
import DataContext from '../../context/DataContext';

// constants
import { NOTICE_CONNECTING, NOTICE_LOADING, EVENTS4FRIENDS_ID } from '../../utils/constants';

// interfaces
import { ICommunity, INavigation } from '../../utils/interfaces';

//utils
import { COLORS } from '../../utils/constants';

// local components
import WebLinksBlock from './components/WebLinksBlock';
import ChatsBlock from './components/ChatsBlock';
import MainBlock from './components/MainBlock';
import ReportErrorBlock from './components/ReportErrorBlock';

interface HomeScreenProps {
  navigation: INavigation;
}

const HomeScreen = (props: HomeScreenProps) => {
  const { navigation } = props;

  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);

  const { connectingToFirebase } = authContext;
  const { communities } = dataContext;

  const [community, setCommunity] = useState<ICommunity | null>(null);

  useEffect(() => {
    const aCommunity = communities.find((c: ICommunity) => c.id === EVENTS4FRIENDS_ID) || null;
    setCommunity(aCommunity);
  }, [communities]);

  useEffect(() => {
    if (community) {
      navigation.setOptions({
        headerTitle: () => (
          <HeaderTitle title={community.name} logo_url={community.logo_url} />
        ),
      });
    }
  }, [community, navigation]);

  return (
    <ScrollView
      style={styles.scrollViewContainer}
      contentContainerStyle={styles.contentContainer}
      bounces={false}
    >
      {connectingToFirebase || community === null ? (
        <NoDataContainer
          label={connectingToFirebase ? NOTICE_CONNECTING : NOTICE_LOADING}
        />
      ) : (
        <>
          <MainBlock community={community} navigation={navigation} />
          <ChatsBlock community={community} />
          <WebLinksBlock community={community} />
          <ReportErrorBlock />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    width: '100%',
    backgroundColor: COLORS.WHITE,
  },
  contentContainer: {
    alignItems: 'center',
  },
});

export default HomeScreen;
