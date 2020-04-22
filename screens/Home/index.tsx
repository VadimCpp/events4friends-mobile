import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
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
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => {
          navigation.navigate('Details');
        }}
      >
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
      </TouchableOpacity>
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

    shadowColor: '#444',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
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
