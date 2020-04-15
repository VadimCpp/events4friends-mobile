import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function EventSingleScreen() {
  return (
    <View style={styles.container}>
      <Text>Single Event Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
