import React, { useContext, useCallback } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

// components
import NoDataContainer from '../../components/NoDataContainer';

// constants
import {
  NOTICE_CONNECTING,
  NOTICE_LOADING,
  DEFAUTL_ACTIVE_OPACITY,
} from '../../utils/constants';

// contexts
import AuthContext from '../../context/AuthContext';
import DataContext from '../../context/DataContext';

// utils
import { ICommunity } from '../../utils/interfaces';

export default function WelcomeScreen() {
  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);

  const { connectingToFirebase } = authContext;
  const { communities } = dataContext;

  const onPress = useCallback((communityId: string) => {
    console.log('TODO:', communityId);
  }, []);

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
            <Text>Выберите сообщество</Text>
            {communities.map((community: ICommunity) => {
              var base64Icon = `data:image/png;base64,${community.logo}`;
              return (
                <View key={community.id}>
                  <TouchableOpacity
                    onPress={() => onPress(community.id)}
                    style={styles.button}
                    activeOpacity={DEFAUTL_ACTIVE_OPACITY}
                  >
                    <Image style={styles.logo} source={{ uri: base64Icon }} />
                    <Text style={styles.text}>{community.name}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
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
  button: {
    width: 310,
    height: 80,
    borderRadius: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: 'grey',
    borderWidth: 1,
    marginTop: 30,
  },
  text: {
    color: 'black',
    fontSize: 32,
  },
  logo: {
    width: 64,
    height: 64,
    borderColor: 'red',
    marginLeft: 10,
    marginRight: 10,
  },
});
