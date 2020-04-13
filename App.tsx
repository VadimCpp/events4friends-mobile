import React from 'react';
import { StyleSheet, Text, View, Alert, Image } from 'react-native';
import Button from './components/Button'

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Image
          style={styles.imgBgTop}
          source={require('./assets/img/main_bg_top.png')}
        />
        <Image
          style={styles.imgBgWave}
          source={require('./assets/img/main_bg_wave.png')}
        />
        <Image
          style={styles.imgBgWave2}
          source={require('./assets/img/main_bg_wave2.png')}
        />
        <Image
          style={styles.imgBgBottom}
          source={require('./assets/img/main_bg_bottom.png')}
        />
      </View>      
      <Text>Welcome to events4friends!</Text>
      <Button 
        color='#EC7B28'
        title='перейти'
        onPress={() => {
          Alert.alert('Перейти к анонсам')
        }}
      />
      <Button 
        color='#24BA7B'
        title='перейти'
        onPress={() => {
          Alert.alert('Перейти к услугам')
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
  // TODO: create component
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
  imgBgTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 235,
  },
  imgBgWave: {
    position: 'absolute',
    top: 175,
    left: 0,
    width: '100%',
    height: 60, 
  },
  imgBgWave2: {
    position: 'absolute',
    top: 235,
    left: 0,
    width: '100%',
    height: 227, 
  },
  imgBgBottom: {
    position: 'absolute',
    top: 443,
    left: 0,
    width: '100%',
    height: 502,
  },
});
