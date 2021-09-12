import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// utils
import { COLORS } from '../../../../utils/constants';
import { calcSize } from '../../../../utils/misc';

interface HeaderProps {
  title?: string;
  subTitle?: string;
}

const Header = (props: HeaderProps) => {
  const { title, subTitle } = props;

  const atLeastOneTitle = Boolean(title || subTitle);
  if (!atLeastOneTitle) {
    return null;
  }

  return (
    <View style={styles.titleContainer}>
      {Boolean(title) && <Text style={styles.title}>{title}</Text>}
      {Boolean(subTitle) && <Text style={styles.subTitle}>{subTitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Header;
