import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import DataContext from '../../context/DataContext';
import Button from '../../components/Button';

interface EventsScreenParams {
  navigation: any;
}

export default function EventsScreen(props: EventsScreenParams) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text>Events Screen</Text>
      <DataContext.Consumer>
        {({ events }) => {
          const text = JSON.stringify(events);
          return <Text>{text}</Text>;
        }}
      </DataContext.Consumer>
      <Button
        color="#EC7B28"
        title="подробнее"
        onPress={() => {
          navigation.navigate('EventSingleScreen');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
