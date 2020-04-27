import React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import DataContext from '../../context/DataContext';
import ServicesListItem from '../../components/ServicesListItem';
import EventsBackground from '../../components/EventsBackground/';

interface ServicesScreenParams {
  navigation: any;
}

export default function ServicesScreen(props: ServicesScreenParams) {
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
  emptyLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#404040',
    textAlign: 'center',
  },
});
