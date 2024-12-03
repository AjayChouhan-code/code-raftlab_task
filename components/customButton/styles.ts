import {  StyleSheet, TextStyle, ViewStyle } from "react-native";
import tw from "twrnc";


interface styles {
  tochableStyle: ViewStyle;
  lableStyle: TextStyle;
}
const styles = StyleSheet.create({
  tochableStyle: {
   ... tw`bg-green-500 rounded-lg my-6 h-10 w-3/5 flex-row justify-center items-center self-center`
  },
  lableStyle: {
   ...tw`mx-2.5 text-base text-white`
   
  },
});
export default styles;
