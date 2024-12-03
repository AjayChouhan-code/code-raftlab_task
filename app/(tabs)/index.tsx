import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView, FlatList } from "react-native";
import tw from "twrnc";
import { useQuery } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import PropertyCard from "@/components/PropertyCard/_layout";
import Header from "@/components/header/_layout";
import Strings from "@/constants/Strings";
import { fetchProperties } from "../../network/apiService";
import SearchBar from "@/components/searchBar/_layout";

import Loader from "@/components/loader/_layout";
import NoDataView from "@/components/noDataView/_layout";
import usePropertyStore from "../stateManagment/propertyBooking";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen() {
  const { setPropertyList, propertyList } =
    usePropertyStore((state) => state);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
    staleTime: 0,
    refetchInterval: false,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const searchProperty = (text: string) => {
    let list = data?.filter((e: any) =>
      e.title.toLowerCase().startsWith(text?.toLowerCase())
    );
    setPropertyList(list || []);
  };

  useFocusEffect(
    React.useCallback(() => {
      refetch(); // Refetch data every time the page gains focus
    }, [refetch])
  );

  useEffect(() => {
    if (data) {
      setPropertyList(data);
    } else if (error) {
      Toast.show({
        type: Strings.error,
        text1: error ? error.toString() : " ", // Properly separated by a comma
      });
    }
  }, [data, isError, error]);

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <Header title={Strings.home} />
      <SearchBar
        placeholder={Strings.search_here}
        onSearch={(text) => searchProperty(text)}
      />
      {isLoading && <Loader />}
      {propertyList.length ? (
        <View style={tw`m-6`}>
          <FlatList
            data={propertyList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return <PropertyCard item={item} />;
            }}
            contentContainerStyle={styles.flatlistContaintStyle}
          />
        </View>
      ) : (
        !isLoading && (
          <View style={styles.noDataView}>
            <NoDataView />
          </View>
        )
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaStyle: {
    ...tw`bg-white flex-1 android:mt-10`,
  },
  noDataView: tw`items-center`,
  flatlistContaintStyle: tw`pb-20`,
});
