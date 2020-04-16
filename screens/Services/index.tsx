import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Button from '../../components/Button';

interface ServicesScreenParams {
  navigation: any;
}

export default function ServicesScreen(props: ServicesScreenParams) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text>Список услуг</Text>
      <Button
        color="#24BA7B"
        title="подробнее"
        onPress={() => {
          navigation.navigate('ServiceSingleScreen');
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
