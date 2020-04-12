import React from 'react';
import { StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';

export default function Button() {
  return (
    <TouchableOpacity
      onPress={() => Alert.alert('TODO')}
      style={styles.button} 
      activeOpacity={0.6}
    >
      <Text style={styles.text}>перейти</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 130,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#EC7B28',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
