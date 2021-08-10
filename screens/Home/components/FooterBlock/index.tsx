import React from 'react';
import {StyleSheet, View} from 'react-native';

// components
import Button from "../../../../components/Button";

// interfaces
import { ICommunity } from "../../../../utils/interfaces";

// local components
import Header from "../Header";
import {calcSize} from "../../../../utils/misc";

interface ChatsBlockProps {
  community: ICommunity;
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
    width: calcSize(285),
    height: calcSize(70),
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    marginTop: 30,
    borderColor: '#66F',
    backgroundColor: "rgba(102,102,255,0.2)",
  },
  simpleButtonText: {
    color: '#404040',
    fontSize: 28,
    textAlign: 'center',
  },
});

export default FooterBlock;
