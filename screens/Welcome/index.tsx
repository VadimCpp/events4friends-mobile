import React, { useContext } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';

// components
import NoDataContainer from '../../components/NoDataContainer';

// constants
import { NOTICE_CONNECTING, NOTICE_LOADING } from '../../utils/constants';

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

  return (
    <View style={styles.backgroundContainer}>
      <ScrollView style={styles.scrollView} bounces={false}>
        <View style={styles.container}>
          {connectingToFirebase || communities.length === 0 ? (
            <NoDataContainer
              label={connectingToFirebase ? NOTICE_CONNECTING : NOTICE_LOADING}
            />
          ) : (
            <View>
              <Text>Выберите сообщество:</Text>
              {communities.map((community: ICommunity) => {
                return (
                  <View key={community.id}>
                    <Text>{community.name}</Text>
                  </View>
                );
              })}
            </View>
          )}
        </View>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 30,
  },
});
