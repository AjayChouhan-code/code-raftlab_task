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
import { useAtom } from "jotai";
import tw from "twrnc";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";
import Carousel from "react-native-reanimated-carousel";

import { Colors } from "@/constants/Colors";
import CustomButton from "@/components/customButton/_layout";
import { addPropertyAtom } from "../stateManagment/propertyStore";
import Strings from "@/constants/Strings";
import Header from "@/components/header/_layout";
import { addPropertyToApi } from "../../network/apiService";

const width=Dimensions.get('window').width

const PropertyDetail: React.FC = () => {
  const router = useRouter();
  const item = useLocalSearchParams();
  
  let obj;
  if (typeof item?.obj === "string") {
    obj = JSON.parse(item?.obj);
  } else {
    console.error("Data is not a string:", item?.obj);
    obj = null; // or handle accordingly
  }

  const requestPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  const regionData = {
    latitude: obj?.coordinates?.latitude,
    longitude: obj?.coordinates?.longitude,
    latitudeDelta: obj?.coordinates?.latitude,
    longitudeDelta: obj?.coordinates?.longitude,
  };

  const bookProperty = async () => {
    try {
      const response = await addPropertyToApi(obj);
      showMsg();
    } catch (error) {
      console.error("Failed to add property:", error);
    }
  };

  const showMsg = () => {
    Toast.show({
      type: Strings.success,
      text1: Strings.property_booked_successully,
    });
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

        <Text style={styles.priceStyle}>Features</Text>
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
