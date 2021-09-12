import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//utils
import { COLORS } from '../../utils/constants';

interface NoDataContainerProps {
  label: string;
}

const NoDataContainer = (props: NoDataContainerProps) => {
  const { label } = props;

  return (
    <View style={styles.container}>
      <View style={styles.noDataContainer}>
        <Text>{label}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    width: '100%',
  },
  noDataContainer: {
    height: 600,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NoDataContainer;
