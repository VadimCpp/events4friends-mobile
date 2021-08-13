import React from 'react';
import { StyleSheet } from 'react-native';

// components
import Button from '../../../../components/Button';

// interfaces
import { ICommunity, INavigation } from '../../../../utils/interfaces';

// local components
import Header from '../Header';
import { calcSize } from '../../../../utils/misc';

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
    borderColor: '#EC7B28',
    backgroundColor: 'rgba(236,123,40,0.2)',
  },
  simpleButtonServices: {
    borderColor: '#24BA7B',
    backgroundColor: 'rgba(36,186,123,0.2)',
  },
  simpleButtonText: {
    color: '#404040',
    fontSize: 28,
    textAlign: 'center',
  },
});

export default MainBlock;
