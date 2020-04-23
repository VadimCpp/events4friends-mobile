import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SingBackground from '../../components/SingleBackground';

interface ServiceSingleScreenParams {
  route: any;
  navigation: any;
}

export default function ServiceSingleScreen(props: ServiceSingleScreenParams) {
  const { route } = props;
  const { service } = route.params;

  return (
    <View style={styles.container}>
      <SingBackground />
      <Text>{service.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
