import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import hoistNonReactStatic from 'hoist-non-react-statics';

// constants
import { DEFAULT_ACTIVE_OPACITY } from '../../utils/constants';

// utils
import { ICommunity } from '../../utils/interfaces';
import { COLORS } from '../../utils/constants';
import { calcSize } from '../../utils/misc';

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
  return function decorator<ComponentType>(
    Component: ComponentType,
  ): ComponentType {
    class HOC extends React.Component<any, any> {
      render() {
        return (
          <>
            {/* @ts-ignore */}
            <Component {...this.props} />
            <Text style={styles.bottomText}>{label}</Text>
          </>
        );
      }
    }

    hoistNonReactStatic(HOC, Component as any);

    return (HOC as any) as ComponentType;
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
  };
}

@BottomTextDecorator('* - позже можно изменить')
@BorderWidthDecorator(2)
class CommunityButton extends React.Component<any, any> {
  readonly borderWidth: number;

  constructor(props: CommunityButtonProps) {
    super(props);
    this.borderWidth = 1;
  }

  render() {
    const {
      onPress,
      community: { logo_url, id, name },
    } = this.props;

    const anId: number = parseInt(id) || 0;

    return (
      <TouchableOpacity
        onPress={() => onPress(anId)}
        style={[
          styles.button,
          {
            borderWidth: this.borderWidth,
          },
        ]}
        activeOpacity={DEFAULT_ACTIVE_OPACITY}
      >
        <Image style={styles.logo} source={{ uri: logo_url }} />
        <Text style={styles.text}>{name}</Text>
      </TouchableOpacity>
    );
  }
}

interface CommunityButtonProps {
  community: ICommunity;
  onPress: (id: string) => void;
}

const styles = StyleSheet.create({
  button: {
    width: calcSize(285),
    height: calcSize(70),
    borderRadius: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    marginTop: 15,
    borderColor: COLORS.LIGHT_BLUE,
    backgroundColor: COLORS.LIGHT_BLUE_OPACITY_02,
  },
  text: {
    color: COLORS.DARK_GRAY,
    fontSize: 28,
    textAlign: 'center',
  },
  logo: {
    width: calcSize(35),
    height: calcSize(35),
    borderColor: COLORS.RED,
    marginLeft: calcSize(20),
    marginRight: calcSize(10),
  },
  bottomText: {
    marginTop: 5,
  },
});

export default CommunityButton;
