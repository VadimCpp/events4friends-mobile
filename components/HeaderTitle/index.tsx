import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

//utils
import { COLORS } from '@utils/constants';

interface HeaderTitleProps {
  logo: string;
  title: string;
}

const HeaderTitle = (props: HeaderTitleProps) => {
  const { title, logo } = props;
  const base64Icon: string = `data:image/png;base64,${logo}`;

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={{ uri: base64Icon }} />
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 24,
    height: 24,
    borderColor: COLORS.RED,
    marginRight: 5,
  },
  title: {
    color: COLORS.BLACK,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HeaderTitle;
