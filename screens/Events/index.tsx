import React from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import DataContext from '../../context/DataContext';
import Button from '../../components/Button';

interface EventsScreenParams {
  navigation: any;
}

export default function EventsScreen(props: EventsScreenParams) {
  const { navigation } = props;

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
