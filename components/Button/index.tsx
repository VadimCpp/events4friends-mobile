import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonParams {
  color: string;
  title: string;
  onPress: () => void;
}

export default function Button(props: ButtonParams) {
  const { color, title, onPress } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: color,
        },
      ]}
      activeOpacity={0.6}
    >
      <Text style={styles.text}>{title}</Text>
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
