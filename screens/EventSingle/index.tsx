import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SingleBackground from '../../components/SingleBackground';

export default function EventSingleScreen() {
  return (
    <View style={styles.container}>
      <SingleBackground />
      <Text>Single Event Screen</Text>
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
