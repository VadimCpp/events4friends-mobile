import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface NoDataContainerProps {
  label: string;
}

const NoDataContainer = (props: NoDataContainerProps) => {
  const { label } = props;

  return (
    <View style={styles.noDataContainer}>
      <Text>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noDataContainer: {
    height: 600,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NoDataContainer;
