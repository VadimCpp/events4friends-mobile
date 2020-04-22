import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Button from '../../components/Button';
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
      <View style={styles.imageContainer}>
        <Image
          style={styles.imgBike}
          source={require('../../assets/img/bike.png')}
        />
        <Image
          style={styles.imgBikeGradient}
          source={require('../../assets/img/bike_gradient.png')}
        />
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Все события</Text>
        </View>
      </View>
      <Button
        color="#EC7B28"
        title="перейти"
        onPress={() => {
          navigation.navigate('Details');
        }}
      />
      <Button
        color="#24BA7B"
        title="перейти"
        onPress={() => {
          navigation.navigate('Services');
        }}
      />
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
  imageContainer: {
    width: 295,
    height: 191,
  },
  imgBike: {
    width: 295,
    height: 191,
    borderRadius: 9,
  },
  imgBikeGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 295,
    height: 191,
    borderRadius: 9,
  },
  labelContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  label: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
