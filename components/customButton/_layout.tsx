
import React from 'react';
import { Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import styles from './styles';


export type props = {
    title?: string,
    tochableStyle?: ViewStyle
    iconWidth?: number,
    iconHeight?: number,
    onTouchablePress?: () => void,
    lableStyle?: TextStyle,

}

const CustomButton: React.FC<props> = ({
    title,
    tochableStyle,
    onTouchablePress,
    lableStyle
}) => {
    return (
        <TouchableOpacity
            onPress={onTouchablePress}
            style={[styles.tochableStyle, { ...tochableStyle }]}>
            <Text style={[styles.lableStyle,{...lableStyle}]}>{title}</Text>
        </TouchableOpacity>
    );
}

export default CustomButton


