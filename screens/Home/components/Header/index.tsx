import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// utils
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
    color: '#404040',
    textAlign: 'center',
    textShadowColor: 'white',
    textShadowRadius: 2,
    textShadowOffset: { height: 1, width: 1 },
  },
  subTitle: {
    marginTop: 10,
    color: '#404040',
  },
});

export default Header;
