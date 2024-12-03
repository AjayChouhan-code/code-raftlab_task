import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import tw from "twrnc"; 

import { fetchProile }  from "../../../network/apiService";
import { propertiesAtom } from "../../stateManagment/propertyStore";
import Header from "../../../components/header/_layout";
import Strings from "../../../constants/Strings";

import Loader from "@/components/loader/_layout";
import usePropertyStore from "@/app/stateManagment/propertyBooking";

const ProfileScreen:React.FC=()=> {

  //const {setProfile,profile}  = usePropertyStore.getState();
  const { profile ,setProfile} = usePropertyStore((state) => state);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProile,
  });


  useEffect(() => {
    if (data && JSON.stringify(profile) !== JSON.stringify(data)) {
      setProfile(data); 
    }
  }, [data]); 

  
  return (
    <SafeAreaView style={styles.container}>
      <Header title={Strings.proile} />
  
      <View style={styles.subContainer}>
        <View
          style={styles.circleView}
        >
          <View
            style={styles.circleStyle} >
            <Text style={styles.circleTextStyle}>{profile?.name[0]||"R"}</Text>
          </View>
        </View>
       
        {/* Profile Details Section */}
        <View style={styles.profileDetailView}>
          <View style={styles.proileDetailsubView}>
            {profile?.name && (
              <>
                <Text style={styles.namelabelStyle}>{Strings.name}</Text>
                <Text style={styles.nameStyle}>{profile?.name}</Text>
              </>
            )}

            {profile?.email && (
              <>
                <Text style={styles.emaillabelStyles}>{Strings.email}</Text>
                <Text style={styles.emailStyle}>{profile?.email}</Text>
              </>
            )}

            {profile?.bookings && (
              <>
                <Text style={styles.emaillabelStyles}>{Strings.booking}</Text>
                <Text style={styles.emailStyle}>
                  {profile?.bookings?.[0] + ""}
                </Text>
              </>
            )}
          </View>
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: tw`flex-1 bg-white android:mt-10`,
  namelabelStyle: tw`text-lg font-bold`,
  nameStyle: tw`text-lg font-normal`,
  emaillabelStyles: tw`text-lg font-bold mt-9`,
  emailStyle: tw`text-lg font-normal mt-1`,
  subContainer:tw`flex-1 flex-col justify-center`,
  circleStyle:tw`bg-white w-20 h-20 rounded-full border border-gray-300 justify-center items-center`,
  circleView:tw`flex-0.3 w-full bg-orange-500 justify-center items-center`,
  circleTextStyle:tw`font-bold text-3xl`,

  profileDetailView:tw`flex-0.7 mx-4`,
  proileDetailsubView:tw`mt-12`
});


export default ProfileScreen