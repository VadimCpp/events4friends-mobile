import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import HomeButton from '../../components/HomeButton';
import MainBackground from '../../components/MainBackground';
import { ScrollView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('screen');

const FIGMA_WIDTH = 375;

interface HomeScreenParams {
  navigation: any;
}

export default function HomeScreen(props: HomeScreenParams) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <MainBackground />
      <ScrollView>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            Добро пожаловать
          </Text>
          <Text style={styles.title} numberOfLines={1}>
            в цифровое пространство
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <HomeButton
            title="Все события"
            sourceImage={require('../../assets/img/bike.png')}
            gradientImage={require('../../assets/img/bike_gradient.png')}
            onPress={() => {
              navigation.navigate('Details');
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <HomeButton
            title="Все услуги"
            sourceImage={require('../../assets/img/brain.png')}
            gradientImage={require('../../assets/img/brain_gradient.png')}
            onPress={() => {
              navigation.navigate('Services');
            }}
          />
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
  },
  titleContainer: {
    width: width * (295 / FIGMA_WIDTH),
    height: width * (200 / FIGMA_WIDTH),
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 30,
  },
});
