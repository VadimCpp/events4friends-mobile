import React from 'react';
import {StyleSheet, View} from 'react-native';

// components
import Button from "../../../../components/Button";

// local components
import Header from "../Header";

interface ChatsBlockProps {
  onCommunitiesClick: () => void;
}

const FooterBlock = (props: ChatsBlockProps) => {
  const { onCommunitiesClick } = props;

  return (
    <View style={styles.lastContainer}>
      <Header
        title={"Дополнительно"}
        subTitle={"Для смены сообщества нажмите кнопку «Другие сообщества»"}
      />
      <Button
        title={"Другие сообщества"}
        onPress={onCommunitiesClick}
        style={styles.simpleButton}
        textStyle={styles.simpleButtonText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  lastContainer: {
    marginTop: 30,
    marginBottom: 50,
  },
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

export default FooterBlock;
