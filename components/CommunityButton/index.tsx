import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from "react-native";

// constants
import { DEFAUTL_ACTIVE_OPACITY } from "../../utils/constants";

// utils
import { ICommunity } from '../../utils/interfaces';

interface CommunityButtonProps {
    community: ICommunity,
    onPress: (id: string) => void,
}

class CommunityButton extends React.Component<any, any> {
    constructor(props: CommunityButtonProps) {
        super(props);
    }

    render() {
        const { onPress, community: { logo, id, name } } = this.props;

        const base64Icon = `data:image/png;base64,${logo}`;

        return (
            <TouchableOpacity
                onPress={() => onPress(id)}
                style={styles.button}
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
