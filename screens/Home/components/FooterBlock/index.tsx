import React from 'react';
import { StyleSheet, View } from 'react-native';

// components
import Button from '../../../../components/Button';

// interfaces
import { ICommunity } from '../../../../utils/interfaces';

// local components
import Header from '../Header';

//utils
import { calcSize } from '../../../../utils/misc';
import { COLORS } from '../../../../utils/constants';

interface FooterBlockProps {
  community: ICommunity;
  onCommunitiesClick: () => void;
}

const FooterBlock = (props: FooterBlockProps) => {
  const { onCommunitiesClick } = props;

  return (
    <View style={styles.constiner}>
      <Header
        title={'Дополнительно'}
        subTitle={'Для смены сообщества нажмите кнопку «Другие сообщества»'}
      />
      <Button
        title={'Другие сообщества'}
        onPress={onCommunitiesClick}
        style={styles.simpleButton}
        textStyle={styles.simpleButtonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  constiner: {
    marginTop: 30,
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
    borderColor: COLORS.LIGHT_BLUE,
    backgroundColor: COLORS.LIGHT_BLUE_OPACITY_02,
  },
  simpleButtonText: {
    color: COLORS.DARK_GRAY,
    fontSize: 28,
    textAlign: 'center',
  },
});

export default FooterBlock;
