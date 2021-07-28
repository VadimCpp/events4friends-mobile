import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import hoistNonReactStatic from 'hoist-non-react-statics';

// constants
import { DEFAUTL_ACTIVE_OPACITY } from "../../utils/constants";

// utils
import { ICommunity } from '../../utils/interfaces';

//
// NOTE!
// В целях изучения декораторов typescript были созданы два Decorator Factory.
// Эти декораторы для ознакомительных целях.
// Возможны ошибки.
//
// BottomTextDecorator принимает в качестве параметра строку и отображает ее под компонентом.
// BorderWidthDecorator принимает в качестве параметра ширину границы и устанавливает ее.
//
// TODO: подумать над хорошим и уместным примером использования декоратора в коде
//

function BottomTextDecorator(label: string) {
  return function decorator<ComponentType>(Component: ComponentType): ComponentType {
    class HOC extends React.Component<any, any> {
      render() {
        return (
          <>
            {/* @ts-ignore */}
            <Component {...this.props}/>
            <Text style={styles.bottomText}>{label}</Text>
          </>
        );
      }
    }

    hoistNonReactStatic(HOC, Component as any);

    return HOC as any as ComponentType;
  };
}

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

@BottomTextDecorator("* - позже можно изменить")
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

interface CommunityButtonProps {
  community: ICommunity,
  onPress: (id: string) => void,
}

const styles = StyleSheet.create({
  button: {
    width: 310,
    height: 80,
    borderRadius: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: 'grey',
    borderWidth: 1,
    marginTop: 30,
  },
  text: {
    color: '#404040',
    fontSize: 28,
    textAlign: 'center',
  },
  logo: {
    width: 64,
    height: 64,
    borderColor: 'red',
    marginLeft: 10,
    marginRight: 10,
  },
  bottomText: {
    marginTop: 5,
  }
});

export default CommunityButton;
