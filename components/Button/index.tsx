import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// utils
import { DEFAULT_ACTIVE_OPACITY } from '../../utils/constants';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: Object;
  textStyle?: Object;
  disabled?: boolean;
  selected?: boolean;
}

function Button(props: ButtonProps) {
  const { title, onPress, selected, style, textStyle, disabled } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || false}
      style={[styles.button, style]}
      activeOpacity={DEFAULT_ACTIVE_OPACITY}
    >
      {selected ? (
        <View style={styles.circleWrap}>
          <View style={styles.circle} />
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </View>
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
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

export default Button;
