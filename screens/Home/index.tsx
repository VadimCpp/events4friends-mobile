import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

// components
import NoDataContainer from '../../components/NoDataContainer';
import HeaderTitle from '../../components/HeaderTitle';

// contexts
import AuthContext from '../../context/AuthContext';
import DataContext from '../../context/DataContext';
import StorageContext from '../../context/StorageContext';

// constants
import { NOTICE_CONNECTING, NOTICE_LOADING } from '../../utils/constants';

// interfaces
import { ICommunity, INavigation } from '../../utils/interfaces';

//utils
import { COLORS } from '../../utils/constants';

// local components
import WebLinksBlock from './components/WebLinksBlock';
import ChatsBlock from './components/ChatsBlock';
import MainBlock from './components/MainBlock';
import FooterBlock from './components/FooterBlock';
import ReportErrorBlock from './components/ReportErrorBlock';

interface HomeScreenProps {
  navigation: INavigation;
}

const HomeScreen = (props: HomeScreenProps) => {
  const { navigation } = props;

  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);
  const storageContext = useContext(StorageContext);

  const { connectingToFirebase } = authContext;
  const { communities } = dataContext;
  const { getCommunityID, setCommunityID } = storageContext;

  const [community, setCommunity] = useState<ICommunity | null>(null);

  useEffect(() => {
    const anId = `${getCommunityID()}`;
    const aCommunity = communities.find(c => c.id === anId) || null;
    setCommunity(aCommunity);
  }, [communities, getCommunityID]);

  useEffect(() => {
    if (community) {
      navigation.setOptions({
        headerTitle: () => (
          <HeaderTitle title={community.name} logo_url={community.logo_url} />
        ),
      });
    }
  }, [community, navigation]);

  const handleCommunitiesClick = () => {
    console.log('Navigate WelcomeScreen');
    setCommunityID(0);
    navigation.navigate('WelcomeScreen');
  };

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
          <FooterBlock
            community={community}
            onCommunitiesClick={handleCommunitiesClick}
          />
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
