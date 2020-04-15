import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function ServicesScreen() {
  return (
    <View style={styles.container}>
      <Text>Список услуг</Text>
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
