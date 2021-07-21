import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from "react-native";

// constants
import { DEFAUTL_ACTIVE_OPACITY } from "../../utils/constants";

// utils
import { ICommunity } from '../../utils/interfaces';

//
// NOTE!
// В целях изучения декораторов typescript был создан Decorator Factory,
// который принимает в качестве параметра ширину границы и устанавливает ее.
//
// Лучшего примера применения классового декоратора придумать не смог.
//
// Пусть этот декоратор лежит пока в коде в ознакомительных целях.
//
// TODO: подумать над хорошим и уместным примером использования декоратора в коде
//
function BorderWidthDecorator(width: number) {
  return <T extends { new (...args: any[]): {} }>(constructor: T) => {
    return class extends constructor {
      readonly borderWidth;

      constructor(...args: any[]) {
        super(args);
        this.borderWidth = width;
      }
    };
  }
}

interface CommunityButtonProps {
  community: ICommunity,
  onPress: (id: string) => void,
}

@BorderWidthDecorator(2)
class CommunityButton extends React.Component<any, any> {
  readonly borderWidth: number;

  constructor(props: CommunityButtonProps) {
    super(props);
    this.borderWidth = 1;
  }

  render() {
    const { onPress, community: { logo, id, name } } = this.props;

    const base64Icon = `data:image/png;base64,${logo}`;

    return (
      <TouchableOpacity
        onPress={() => onPress(id)}
        style={[
          styles.button,
          {
            borderWidth: this.borderWidth,
          }
        ]}
        activeOpacity={DEFAUTL_ACTIVE_OPACITY}
      >
        <Image style={styles.logo} source={{ uri: base64Icon }} />
        <Text style={styles.text}>{name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 310,
    height: 80,
    borderRadius: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: 'grey',
    borderWidth: 1,
    marginTop: 30,
  },
  text: {
    color: 'black',
    fontSize: 32,
  },
  logo: {
    width: 64,
    height: 64,
    borderColor: 'red',
    marginLeft: 10,
    marginRight: 10,
  },
});

export default CommunityButton;
