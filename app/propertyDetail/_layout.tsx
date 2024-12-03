import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Dimensions
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";
import Carousel from "react-native-reanimated-carousel";
import { useFocusEffect } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import { Colors } from "@/constants/Colors";
import CustomButton from "@/components/customButton/_layout";
import Strings from "@/constants/Strings";
import Header from "@/components/header/_layout";
import { addPropertyToApi, fetchBooking } from "../../network/apiService";


const width=Dimensions.get('window').width

const PropertyDetail: React.FC = () => {
 

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchBooking,
    staleTime: 0, // Consider data stale immediately
    refetchInterval: false,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });


  const router = useRouter();
  const item = useLocalSearchParams();
  let obj;
  if (typeof item?.obj === "string") {
    obj = JSON.parse(item?.obj);
  } else {
    console.error("Data is not a string:", item?.obj);
    obj = null; // or handle accordingly
  }


  useFocusEffect(
    React.useCallback(() => {
      refetch(); // Refetch data every time the page gains focus
    }, [refetch])
  );


  // Map View  regionData
  // const regionData = {
  //   latitude: obj?.coordinates?.latitude,
  //   longitude: obj?.coordinates?.longitude,
  //   latitudeDelta: obj?.coordinates?.latitude,
  //   longitudeDelta: obj?.coordinates?.longitude,
  // };


  const bookProperty = async () => {
    try {
    let findObj = data.find((e:any)=>e.id==obj.id)
    if(!findObj){
      const response = await addPropertyToApi(obj);
      showMsg( Strings.success,Strings.property_booked_successully,);
    }else{
      showMsg(Strings.error,Strings.property_alredy_added,)
    }
    } catch (error) {
      console.error("Failed to add property:", error);
    }
  };

  const showMsg = (type:string,msg:string) => {
    Toast.show({
      type: type,
      text1:msg,
    });
if(type==Strings.success){
   setTimeout(()=>{
    router.back()
   },300)
}
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={obj?.isBooked?Strings.booking_detail:Strings.booking}
        isShow={true}
        onPress={() => router.back()}
      />
      {/* <MapView style={styles.mapViewStyle} initialRegion={regionData}>
        <Marker
          coordinate={{
            latitude: data?.coordinates?.latitude,
            longitude: data?.coordinates?.longitude,
          }}
          style={styles.markerStyle}
          image={require("../../assets/images/marker.png")} // Ensure the image is correctly loaded
        />
      </MapView> */}

      <Carousel
        loop
        width={width}
        height={180}
        autoPlay={true}
        data={obj?.images || [" "]}
        scrollAnimationDuration={2000}
        onSnapToItem={(index) => {}}
        renderItem={({ index }) => (
          <View>
            <Image
              style={styles.imageStyle}
              source={
                obj?.images && obj?.images[index]
                  ? { uri: obj.images[index] }
                  : require("../../assets/images/no_img.png") // Fallback image
              }
              resizeMode="cover"
            />
          </View>
        )}
      />

      <ScrollView style={styles.scrollViewStyle}>
        <Text style={styles.priceStyle}>{obj?.title}</Text>
        <Text style={styles.addressStyle}>
          {Strings.address + ":- "}
          {obj?.location?.address}
        </Text>
        <Text style={styles.priceStyle}>
          {Strings.price + ":- "}
          {"$"}
          {obj?.price}
        </Text>

        <Text style={styles.priceStyle}>{Strings.features}{" :-"}</Text>
        {obj?.features?.map((e: any, index: number) => {
          return (
            <View
              key={index}
              style={styles.chiledViewStyle}
            >
              <Text style={styles.bulletStyle}> {". "}</Text>
              <Text style={styles.titleStyle}> {e}</Text>
            </View>
          );
        })}
      </ScrollView>

      {!obj?.isBooked && (
        <CustomButton
          onTouchablePress={() => bookProperty()}
          title={Strings.add_property}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: tw`bg-white flex-1 android mt-6`,
  scrollViewStyle: {
    ...tw`m-4`,
  },
  titleStyle: {
    ...tw`text-4 font-400 mt-1 `,
    color: Colors.eirie_black,
  },
  priceStyle: {
    ...tw`text-4 font-bold mt-2`,
    color: Colors.eirie_black,
  },
  addressStyle: { ...tw`text-4 font-normal mt-1`, color: Colors.eirie_black },

  bulletStyle: {
    ...tw`text-6 font-800 flex items-center justify-center`,
    color: Colors.eirie_black,
  },
  mapViewStyle: tw`w-full h-75`,
  markerStyle: tw`w-5 h-5`,
  imageStyle: {
    ...tw`h-55`,
  },
  chiledViewStyle:tw`mt-2 flex flex-row  `
});

export default PropertyDetail;
