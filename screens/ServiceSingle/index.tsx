import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SingBackground from '../../components/SingleBackground';

export default function ServiceSingleScreen() {
  return (
    <View style={styles.container}>
      <SingBackground />
      <Text>Single Service Screen</Text>
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
