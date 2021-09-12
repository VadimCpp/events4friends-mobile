import React from 'react';
import { StyleSheet } from 'react-native';

// components
import Button from '../../../../components/Button';

// interfaces
import { ICommunity, INavigation } from '../../../../utils/interfaces';

// local components
import Header from '../Header';

//utils
import { calcSize } from '../../../../utils/misc';
import { COLORS } from '../../../../utils/constants';

interface ChatsBlockProps {
  community: ICommunity;
  navigation: INavigation;
}

const MainBlock = (props: ChatsBlockProps) => {
  const { community, navigation } = props;

  return (
    <>
      <Header
        title={`Добро пожаловать в «${community.name}»`}
        subTitle={community.description}
      />
      <Button
        title={'События'}
        onPress={() => navigation.navigate('Details')}
        style={[styles.simpleButton, styles.simpleButtonEvents]}
        textStyle={styles.simpleButtonText}
      />
      <Button
        title={'Услуги'}
        onPress={() => navigation.navigate('Services')}
        style={[styles.simpleButton, styles.simpleButtonServices]}
        textStyle={styles.simpleButtonText}
      />
    </>
  );
};

const styles = StyleSheet.create({
  simpleButton: {
    width: calcSize(285),
    height: calcSize(70),
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    marginTop: 30,
  },
  simpleButtonEvents: {
    borderColor: COLORS.BRIGHT_ORANGE,
    backgroundColor: COLORS.BRIGHT_ORANGE_OPACITY_02,
  },
  simpleButtonServices: {
    borderColor: COLORS.STRONG_CYAN,
    backgroundColor: COLORS.STRONG_CYAN_OPACITY_02,
  },
  simpleButtonText: {
    color: COLORS.DARK_GRAY,
    fontSize: 28,
    textAlign: 'center',
  },
});

export default MainBlock;
