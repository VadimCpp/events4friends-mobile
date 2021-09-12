import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Linking from 'expo-linking';

// components
import Button from '@components/Button';

// local components
import Header from '../Header';
import { calcSize } from '@utils/misc';

// utils
import { COLORS, SUPPORT_WEBSITE } from '@utils/constants';

const ReportErrorBlock = () => {
  return (
    <View style={styles.lastContainer}>
      <Header
        title={'Обратная связь'}
        subTitle={
          'Возможно, приложение работает неправильно, у Вас есть предложение по его улучшению или Вы — организатор сообщества и хотите разместить анонс Вашего мероприятия. В таком случае напишите мне, Вадиму Канинскому'
        }
      />
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
  },
  simpleButton: {
    width: calcSize(285),
    height: calcSize(70),
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    marginTop: 30,
    borderColor: COLORS.VERY_LIGHT_BLUE,
    backgroundColor: COLORS.VERY_LIGHT_BLUE_OPACITY_02,
  },
  simpleButtonText: {
    color: COLORS.DARK_GRAY,
    fontSize: 28,
    textAlign: 'center',
  },
});

export default ReportErrorBlock;
