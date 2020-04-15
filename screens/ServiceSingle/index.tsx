import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function ServiceSingleScreen() {
  return (
    <View style={styles.container}>
      <Text>Single Service Screen</Text>
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
