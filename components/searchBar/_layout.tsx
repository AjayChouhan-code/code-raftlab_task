import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import tw from 'twrnc';


interface SearchBarProps {
  placeholder?: string;
  onSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search...", onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleTextChange = (text: string) => {
    setSearchText(text);
    onSearch(text);
  };

  return (
    <View style={styles.container}>
      <Feather name="search" size={20} color="gray" style={tw`mr-2`} />
      <TextInput
        style={styles.textInputStyle}
        placeholder={placeholder}
        placeholderTextColor="gray"
        value={searchText}
        onChangeText={handleTextChange}
      />
    </View>
  );
};

export default SearchBar;

const styles=StyleSheet.create({
container:{
...tw`flex-row items-center bg-gray-200 rounded-full px-4 h-10`
},
textInputStyle:{...tw`flex-1 text-black`}

})
