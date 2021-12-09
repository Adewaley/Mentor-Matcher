import React from "react";
import { Foundation, Ionicons } from "@expo/vector-icons";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import tw from "tailwind-rn";

const Header = ({ title, calEnabled }) => {
  const navigation = useNavigation();
  return (
    <View style={tw("p-2 flex-row items-center justify-between")}>
      <View style={tw("flex flex-row items-center")}> 
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw("p-2")}>
          <Ionicons name="chevron-back-outline" size={34} color="#00aeef" />
        </TouchableOpacity>
        <Text style={tw("text-2xl font-bold pl-2")}>{title}</Text>
      </View>
      {calEnabled && (
           <TouchableOpacity onPress={() => navigation.goBack()} style={tw("p-2")}>
           <Foundation name="telephone" size={34} color="#00aeef" />
         </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
