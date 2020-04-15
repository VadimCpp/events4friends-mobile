import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';
import MainBackground from '../../components/MainBackground';

interface HomeScreenParams {
  navigation: any;
}

export default function HomeScreen(props: HomeScreenParams) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <MainBackground />
      <Text>Welcome to events4friends!</Text>
      <Button
        color="#EC7B28"
        title="перейти"
        onPress={() => {
          navigation.navigate('Details');
        }}
      />
      <Button
        color="#24BA7B"
        title="перейти"
        onPress={() => {
          navigation.navigate('Services');
        }}
      />
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
