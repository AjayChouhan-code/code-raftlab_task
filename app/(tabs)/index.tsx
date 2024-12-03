import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
} from "react-native";
import tw from "twrnc";
import { useQuery } from "@tanstack/react-query";
import PropertyCard from "@/components/PropertyCard/_layout";
import Header from "@/components/header/_layout";
import Strings from "@/constants/Strings";
import { fetchProperties } from "../../network/apiService";
import SearchBar from "@/components/searchBar/_layout";
import Toast from "react-native-toast-message";
import Loader from "@/components/loader/_layout";
import NoDataView from "@/components/noDataView/_layout";

export default function HomeScreen() {


  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["properties"], 
    queryFn: fetchProperties,
  });
  const [propertyList,setPropertyList]=useState([])



const searchProperty=(text:string)=>{
 let list= data.filter((e:any)=>e.title.toLowerCase().startsWith(text?.toLowerCase()))
 setPropertyList(list)
}

useEffect(()=>{
  if(data){
  setPropertyList(data)
  }else if(error){
    Toast.show({
      type: Strings.error, 
      text1: error?error.toString():" ", // Properly separated by a comma
    });
  }
  
},[data,isError,error])


  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <Header title={Strings.home} />
      <SearchBar
      placeholder={Strings.search_here}
      onSearch={(text)=>searchProperty(text)}
      />
      {isLoading&&<Loader/>}
      {propertyList.length?
      <View style={tw`m-6`}>
      <FlatList
        data={propertyList}
        renderItem={({ item, index }) => {
          return <PropertyCard item={item} />;
        }}
      />
      </View>:!isLoading&&<NoDataView/>
}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaStyle: {
    ...tw`bg-white flex-1 android:mt-10`,
  }
});
