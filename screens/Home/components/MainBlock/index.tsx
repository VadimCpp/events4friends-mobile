import React from 'react';
import { StyleSheet, View } from 'react-native';

// components
import HomeButton from "../../../../components/HomeButton";

// interfaces
import { ICommunity, INavigation } from "../../../../utils/interfaces";

// local components
import Header from "../Header";


interface ChatsBlockProps {
  community: ICommunity;
  navigation: INavigation;
}

const MainBlock = (props: ChatsBlockProps) => {
  const { community, navigation } = props;

  return (
    <>
      <Header
        title={`Добро пожаловать в «${community.name}»`}
        subTitle={community.description}
      />
      <View style={styles.buttonContainer}>
        <HomeButton
          title="Все события"
          sourceImage={require('../../../../assets/img/bike.png')}
          gradientImage={require('../../../../assets/img/bike_gradient.png')}
          onPress={() => {
            navigation.navigate('Details');
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <HomeButton
          title="Все услуги"
          sourceImage={require('../../../../assets/img/brain.png')}
          gradientImage={require('../../../../assets/img/brain_gradient.png')}
          onPress={() => {
            navigation.navigate('Services');
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 30,
  },
});

export default MainBlock;
