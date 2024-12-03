import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import tw from "twrnc";
import Carousel from "react-native-reanimated-carousel";
import { useRouter } from "expo-router";

import { Colors } from "@/constants/Colors";
import Strings from "@/constants/Strings";

const PropertyCard: React.FC<PropertyInterface> = ({ item, isBooked }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      key={item?.id}
      // onPress={()=>router.push("/(propertyDetail)")}
      onPress={() => {
        item.isBooked = isBooked;
        let obj = JSON.stringify(item);
        router.push({ pathname: `/propertyDetail`, params: { obj } });
      }}
      style={styles.container}
    >
      <Carousel
        loop
        width={345}
        height={180}
        autoPlay={true}
        data={item?.images || [" "]}
        scrollAnimationDuration={2000}
        onSnapToItem={(index) => {}}
        renderItem={({ index }) => (
          <View>
            <Image
              style={styles.imageStyle}
              source={
                item?.images && item?.images[index]
                  ? { uri: item.images[index] }
                  : require("../../assets/images/no_img.png") // Fallback image
              }
              resizeMode="cover"
            />
          </View>
        )}
      />
      <View style={styles.titleView}>
        <Text style={styles.titleStyle}>{item?.title}</Text>
        <Text style={[styles.addressStyle]}>
          {Strings.address} {item?.location?.address}
        </Text>
        <Text style={styles.priceStyle}>
          {Strings.price} {"$" + item?.price || "---"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...tw`h-68 rounded-4 bg-white shadow-md mt-4`,
  },
  titleStyle: {
    ...tw`text-4 font-400 mt-1`,
    color: Colors.eirie_black,
  },
  imageStyle: {
    ...tw`h-55`,
  },
  titleView: { ...tw`p-4` },
  priceStyle: {
    ...tw`text-4 font-bold mt-2`,
    color: Colors.eirie_black,
  },
  addressStyle: { ...tw`text-3 font-normal mt-1`, color: Colors.eirie_black },
});

export default PropertyCard;
