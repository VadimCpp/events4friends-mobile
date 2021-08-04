import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

// components
import NoDataContainer from "../../components/NoDataContainer";
import HeaderTitle from '../../components/HeaderTitle';

// contexts
import AuthContext from "../../context/AuthContext";
import DataContext from "../../context/DataContext";
import StorageContext from "../../context/StorageContext";

// constants
import { NOTICE_CONNECTING, NOTICE_LOADING } from "../../utils/constants";

// interfaces
import { ICommunity, INavigation } from '../../utils/interfaces';

// local components
import WebLinksBlock from "./components/WebLinksBlock";
import ChatsBlock from "./components/ChatsBlock";
import MainBlock from "./components/MainBlock";
import FooterBlock from './components/FooterBlock';

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

  useEffect(() => {
    if (community) {
      navigation.setOptions({
        headerTitle: () => <HeaderTitle title={community.name} logo={community.logo}/>
      })
    }
  }, [community, navigation]);

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
            <MainBlock community={community} navigation={navigation} />
            <ChatsBlock community={community} />
            <WebLinksBlock community={community} />
            <FooterBlock community={community} onCommunitiesClick={handleCommunitiesClick}/>
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
});
