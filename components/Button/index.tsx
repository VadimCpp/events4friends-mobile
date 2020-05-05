import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { DEFAUTL_ACTIVE_OPACITY } from '../../utils/Constants';

interface ButtonParams {
  title: string;
  onPress: () => void;
  style?: Object;
}

export default function Button(props: ButtonParams) {
  const { title, onPress } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, props.style ? props.style : null]}
      activeOpacity={DEFAUTL_ACTIVE_OPACITY}
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
