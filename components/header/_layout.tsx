import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import tw from 'twrnc'; 

import { ARROW_LEFT } from '@/assets/svg';

interface HeaderInterface {
  title?: string;
  isShow?: boolean;
  onPress?: () => void,
}

const Header: React.FC<HeaderInterface> = ({ title, isShow,onPress }) => {
  return (
    <View style={styles.container}>
      {isShow && (
        <TouchableOpacity
         onPress={onPress}>
          <ARROW_LEFT width={40} height={40} />
        </TouchableOpacity>
      )}

      <Text style={styles.textStyle}>{title}</Text>
    </View>
  );
};


const styles=StyleSheet.create({
  container:tw`flex-row 
    items-center h-10 android:h-16 bg-white border-b border-b-gray-200`,
    textStyle:tw`text-black text-center flex-1 font-bold text-5 `
})

export default Header;


