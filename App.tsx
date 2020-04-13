import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Button from './components/Button'
import MainBackground from './components/MainBackground'

export default function App() {
  return (
    <View style={styles.container}>
      <MainBackground />
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
});
