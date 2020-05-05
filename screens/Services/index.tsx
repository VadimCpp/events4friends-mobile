import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import DataContext from '../../context/DataContext';
import ServicesListItem from '../../components/ServicesListItem';
import EventsBackground from '../../components/EventsBackground';
import Button from '../../components/Button';

interface ServicesScreenParams {
  navigation: any;
}

export default function ServicesScreen(props: ServicesScreenParams) {
  const [sortByName, setSortByName] = useState(false);
  const { navigation } = props;

  return (
    <View style={styles.backgroundContainer}>
      <EventsBackground />
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <DataContext.Consumer>
            {({ services }) => {
              if (services.length > 0) {
                return (
                  <View>
                    <View style={styles.sortContainer}>
                      <Text>Сортировка</Text>
                      <Button
                        title="Услуга"
                        onPress={() => setSortByName(false)}
                        style={
                          sortByName
                            ? styles.sortButton
                            : styles.sortButtonFocused
                        }
                      />
                      <Button
                        title="Имя"
                        onPress={() => setSortByName(true)}
                        style={
                          sortByName
                            ? styles.sortButtonFocused
                            : styles.sortButton
                        }
                      />
                    </View>
                    {services.map((service: any) => {
                      return (
                        <ServicesListItem
                          key={service.id}
                          service={service}
                          onPress={() => {
                            navigation.navigate('ServiceSingleScreen', {
                              service,
                            });
                          }}
                        />
                      );
                    })}
                  </View>
                );
              } else {
                return (
                  <View>
                    <Text style={styles.emptyLabel}>Список пуст</Text>
                  </View>
                );
              }
            }}
          </DataContext.Consumer>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 30,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortButton: {
    backgroundColor: '#24BA7B',
    width: 100,
    marginLeft: 10,
  },
  sortButtonFocused: {
    backgroundColor: '#404040',
    width: 100,
    marginLeft: 10,
  },
  emptyLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#404040',
    textAlign: 'center',
  },
});
