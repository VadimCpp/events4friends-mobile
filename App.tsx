import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './components/Button'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Welcome to events4friends!</Text>
      <Button 
        color='#EC7B28'
      />
      <Button 
        color='#24BA7B'
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
