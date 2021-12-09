import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import useAuth from "../hooks/useAuth";
import tw from "tailwind-rn";
const LoginScreen = () => {
  const { signInWithGoogle, loading } = useAuth();
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View style={tw("flex-1")}>
      <ImageBackground
        resizeMode="cover"
        style={tw("flex-1")}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/mentmatcher-590a9.appspot.com/o/mm.png?alt=media&token=178e6a8c-18b6-4f72-ae6e-23b8e7da6a74",
        }}
      >
        <TouchableOpacity
          style={[
            tw("absolute bottom-60 w-52  p-4 rounded-2xl"),
            { marginHorizontal: "25%" },
          ]}
        >
          <Text style={tw("font-bold  text-white text-center")}>
            MENTOR MATCH
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            tw("absolute bottom-40 w-52 bg-white p-4 rounded-2xl"),
            { marginHorizontal: "25%" },
          ]}
          onPress={signInWithGoogle}
        >
          <Text style={tw("font-semibold text-center")}>
            Sign in & get Matching
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
