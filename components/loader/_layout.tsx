import React from 'react';
import {  ActivityIndicator, Text, StyleSheet, SafeAreaView } from 'react-native';
import tw from 'twrnc';

interface LoaderProps {
  size?: 'small' | 'large'; 
  color?: string;          
  message?: string;     
}

const Loader: React.FC<LoaderProps> = ({ size = 'large', color = '#000', message }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text style={styles.msgStyle}>{message}</Text>}
    </SafeAreaView>
  );
};


const styles=StyleSheet.create({
    container:{...tw`flex-1 justify-center items-center`},
    msgStyle:tw`mt-4 text-base text-gray-700`
})
export default Loader;
