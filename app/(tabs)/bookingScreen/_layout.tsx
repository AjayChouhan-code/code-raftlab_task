import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, FlatList, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header/_layout";
import tw from "twrnc";

import Strings from "@/constants/Strings";
import { fetchBooking } from "../../../network/apiService";
import Loader from "@/components/loader/_layout";
import PropertyCard from "@/components/PropertyCard/_layout";
import NoDataView from "@/components/noDataView/_layout";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "@react-navigation/native";
import usePropertyStore from "@/app/stateManagment/propertyBooking";

const BookingScreen: React.FC = () => {
  //const [propertyList, setPropertyList] = useState([]);

  const { setProperttBookingList,bookingList} = usePropertyStore((state) => state);


  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchBooking,
    staleTime: 0, // Consider data stale immediately
    refetchInterval: false,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });


  useFocusEffect(
    React.useCallback(() => {
      refetch(); // Refetch data every time the page gains focus
    }, [refetch])
  );

  useEffect(() => {
    if (data) {
      setProperttBookingList(data);
    } else if (error) {
      Toast.show({
        type: Strings.error,
        text1: error ? error.toString() : " ",
      });
    }
  }, [data, isError, error]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewStyle}>
        <Header title={Strings.booking} />

        {isLoading && (
          <View style={styles.loaderStyle}>
            <Loader />
          </View>
        )}
        <View style={tw`m-6`}>
          {bookingList && bookingList.length ? (
            <FlatList
              data={bookingList}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return <PropertyCard item={item} isBooked={true} />;
              }}
              contentContainerStyle={styles.flatlistContaintStyle}
            />
          ) : (
            !isLoading && (
              <View style={styles.noDataView}>
                <NoDataView />
              </View>
            )
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: tw`bg-white flex-1 android:mt-10`,
  viewStyle: tw`mx-2 flex-1`,
  loaderStyle: tw`flex-1 justify-center items-center mt-10`,
  noDataView: tw`items-center`,
  flatlistContaintStyle: tw`pb-20`,
});

export default BookingScreen;
