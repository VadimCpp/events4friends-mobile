import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SingleBackground from '../../components/SingleBackground';

interface EventSingleScreenParams {
  route: any;
  navigation: any;
}

export default function EventSingleScreen(props: EventSingleScreenParams) {
  const { route } = props;
  const { event } = route.params;

  return (
    <View style={styles.container}>
      <SingleBackground />
      <Text>{event.summary}</Text>
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
