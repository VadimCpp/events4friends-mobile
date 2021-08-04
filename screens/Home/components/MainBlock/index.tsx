import React from 'react';
import { StyleSheet, View } from 'react-native';

// components
import Button from "../../../../components/Button";

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
      <Button
        title={"События"}
        onPress={() => navigation.navigate('Details')}
        style={styles.simpleButton}
        textStyle={styles.simpleButtonText}
      />
      <Button
        title={"Услуги"}
        onPress={() => navigation.navigate('Services')}
        style={styles.simpleButton}
        textStyle={styles.simpleButtonText}
      />
    </>
  );
}

const styles = StyleSheet.create({
  simpleButton: {
    width: 310,
    height: 80,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: 'grey',
    borderWidth: 2,
    marginTop: 30,
  },
  simpleButtonText: {
    color: '#404040',
    fontSize: 28,
    textAlign: 'center',
  },
});

export default MainBlock;
