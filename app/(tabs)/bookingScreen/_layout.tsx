import React from "react";
import { StyleSheet, SafeAreaView, FlatList, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header/_layout";
import tw from "twrnc";

import Strings from "@/constants/Strings";
import { fetchBooking } from "../../../network/apiService";
import Loader from "@/components/loader/_layout";
import PropertyCard from "@/components/PropertyCard/_layout";
import NoDataView from "@/components/noDataView/_layout";

const BookingScreen: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchBooking,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewStyle}>
        <Header title={Strings.booking} />

        {isLoading && (
            <View style={tw`flex-1 justify-center items-center mt-10`}>
              <Loader />
            </View>
          )}
        <View style={tw`m-6`}>
         
          {data && data.length ? (
            <FlatList
              data={data}
              renderItem={({ item, index }) => {
                return <PropertyCard item={item} isBooked={true} />;
              }}
            />
          ) : (
            !isLoading && (
              <View>
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
  viewStyle: tw`mx-2`,
});

export default BookingScreen;
