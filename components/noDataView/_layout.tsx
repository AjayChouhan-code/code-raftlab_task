import React from 'react';
import Strings from '@/constants/Strings';
import { View, Text, Image, StyleSheet } from 'react-native';
import tw from 'twrnc';


interface NoDataViewProps {
  message?: string; // Custom message to display
  imageSource?: any; // Optional image to show when no data
}

const NoDataView: React.FC<NoDataViewProps> = ({
  message = Strings.no_data_avialable,
  imageSource = require('../../assets/images/empty.png'), // Replace with your fallback image
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgViewStyle}>
      <Image
        source={imageSource}
        style={styles.imgStyles} // Adjust the size as needed
        resizeMode="contain"
      />
      <Text style={styles.textStyle}>{message}</Text>
      </View>
    </View>
  );
};

const styles=StyleSheet.create({
    container:tw` flex justify-center items-center `,
    imgStyles:tw`w-40 h-40 mb-4`,
    textStyle:tw`text-gray-600 text-base text-center`,
    imgViewStyle:tw`flex-1  items-center justify-center`

})

export default NoDataView;
