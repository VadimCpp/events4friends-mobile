import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeButton from '../../components/HomeButton';
import MainBackground from '../../components/MainBackground';

interface HomeScreenParams {
  navigation: any;
}

export default function HomeScreen(props: HomeScreenParams) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <MainBackground />
      <Text>Welcome to events4friends!</Text>
      <View style={styles.buttonContainer}>
        <HomeButton
          sourceImage={require('../../assets/img/bike.png')}
          gradientImage={require('../../assets/img/bike_gradient.png')}
          onPress={() => {
            navigation.navigate('Details');
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <HomeButton
          sourceImage={require('../../assets/img/brain.png')}
          gradientImage={require('../../assets/img/brain_gradient.png')}
          onPress={() => {
            navigation.navigate('Services');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 30,
  },
});
