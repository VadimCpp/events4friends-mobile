import React from 'react';
import { StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';

interface ButtonParams {
  color: string
}

export default function Button(props: ButtonParams) {
  const { color } = props

  return (
    <TouchableOpacity
      onPress={() => Alert.alert('TODO')}
      style={[
        styles.button, 
        { 
          backgroundColor: color,
        }
      ]} 
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
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});
