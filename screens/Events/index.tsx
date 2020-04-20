import React from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import DataContext from '../../context/DataContext';
import Button from '../../components/Button';

interface EventsScreenParams {
  navigation: any;
}

export default function EventsScreen(props: EventsScreenParams) {
  const { navigation } = props;

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text>Events Screen</Text>
        <DataContext.Consumer>
          {({ events }) => {
            return events.map((event: any) => {
              return (
                <View key={event.id}>
                  <Text>...</Text>
                  <Text>Тут будет компонент элемента списка EventListItem</Text>
                  <Text>...</Text>
                  <Text>{event.summary}</Text>
                  <Text>{event.description}</Text>
                </View>
              );
            });
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
