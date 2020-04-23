import React from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import SingleBackground from '../../components/SingleBackground';

const { width } = Dimensions.get('screen');

const FIGMA_WIDTH = 375;

interface ServiceSingleScreenParams {
  route: any;
  navigation: any;
}

export default function ServiceSingleScreen(props: ServiceSingleScreenParams) {
  const { route } = props;
  const { service } = route.params;

  return (
    <View style={styles.container}>
      <SingleBackground />
      <ScrollView
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.innerContainer}>
          <Text>{service.service}</Text>
          <Text>{service.name}</Text>
          <Text>{service.description}</Text>
        </View>
      </ScrollView>
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
  scrollViewContainer: {
    width: '100%',
  },
  contentContainer: {
    alignItems: 'center',
  },
  innerContainer: {
    width: width * (315 / FIGMA_WIDTH),
    backgroundColor: 'white',
    marginTop: 30,
    marginBottom: 50,
    marginHorizontal: width * (30 / FIGMA_WIDTH),
    borderRadius: width * (10 / FIGMA_WIDTH),

    shadowColor: '#444',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
});
