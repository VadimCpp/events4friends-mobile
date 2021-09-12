import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Linking from 'expo-linking';

// components
import Button from '../../components/Button';

// utils
import { COLORS, SUPPORT_WEBSITE } from '../../utils/constants';
import { calcSize } from '../../utils/misc';

const SupportBlock = () => {
  return (
    <View style={styles.lastContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{'Дополнительно'}</Text>
        <Text style={styles.subTitle}>
          {
            'Возможно, в данном разделе что-то работает не так, или у Вас есть вопросы и предложения. Напишите, пожалуйста, мне, Вадиму Канинскому:'
          }
        </Text>
      </View>
      <Button
        title={'Написать Вадиму'}
        onPress={() => Linking.openURL(SUPPORT_WEBSITE)}
        style={styles.simpleButton}
        textStyle={styles.simpleButtonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  lastContainer: {
    marginTop: 30,
    marginBottom: 50,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  titleContainer: {
    marginTop: 30,
    width: calcSize(285),
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.DARK_GRAY,
    textAlign: 'center',
    textShadowColor: COLORS.WHITE,
    textShadowRadius: 2,
    textShadowOffset: { height: 1, width: 1 },
  },
  subTitle: {
    marginTop: 10,
    color: COLORS.DARK_GRAY,
  },
  simpleButton: {
    width: calcSize(210),
    height: calcSize(55),
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    marginTop: 15,
    marginRight: 'auto',
    marginLeft: 'auto',
    borderColor: COLORS.VERY_LIGHT_BLUE,
    backgroundColor: COLORS.VERY_LIGHT_BLUE_OPACITY_02,
  },
  simpleButtonText: {
    color: COLORS.DARK_GRAY,
    fontSize: 24,
    textAlign: 'center',
  },
});

export default SupportBlock;
