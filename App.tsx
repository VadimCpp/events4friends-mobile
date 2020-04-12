import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import Button from './components/Button'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to events4friends!</Text>
      <Button 
        color='#EC7B28'
        onPress={() => {
          Alert.alert('Перейти к анонсам')
        }}
      />
      <Button 
        color='#24BA7B'
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
