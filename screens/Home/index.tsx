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
      <View>
        <Image
          style={styles.imgBike}
          source={require('../../assets/img/bike.png')}
        />
        <Image
          style={styles.imgBikeGradient}
          source={require('../../assets/img/bike_gradient.png')}
        />
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
});
