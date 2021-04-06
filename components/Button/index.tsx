import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// utils
import { DEFAUTL_ACTIVE_OPACITY } from '../../utils/constants';

interface ButtonParams {
  title: string;
  onPress: () => void;
  style?: Object;
  disabled?: boolean;
  selected?: boolean;
}

export default function Button(props: ButtonParams) {
  const { title, onPress, selected } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={props.disabled || false}
      style={[styles.button, props.style ? props.style : null]}
      activeOpacity={DEFAUTL_ACTIVE_OPACITY}
    >
      {selected ? (
        <View style={styles.circleWrap}>
          <View style={styles.circle} />
          <Text style={styles.text}>{title}</Text>
        </View>
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
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
  circleWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    backgroundColor: 'white',
    borderRadius: 3,
    width: 6,
    height: 6,
    marginRight: 4,
  },
});
