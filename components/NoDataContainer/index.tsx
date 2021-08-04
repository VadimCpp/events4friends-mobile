import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface NoDataContainerProps {
  label: string;
}

export default function NoDataContainer(props: NoDataContainerProps) {
  const { label } = props;

  return (
    <View style={styles.container}>
      <View style={styles.noDataContainer}>
        <Text>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
  },
  noDataContainer: {
    height: 600,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
