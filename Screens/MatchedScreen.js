import { useNavigation, useRoute } from "@react-navigation/core";
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import tw from "tailwind-rn";

const MatchedScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { loggedInProfile, userSwiped } = params;
  return (
    <View style={[tw("h-full  pt-20"), { opacity: 0.89, backgroundColor:"#00aeef" }]}>
      <View style={tw("justify-center px-10 pt-20")}>
        <Image
              style={tw("h-20 w-full")}

          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/mentmatcher-590a9.appspot.com/o/modal-screen-match-01.png?alt=media&token=688bf3fa-70f1-44e5-b3bf-85ed21713dbd",
          }}
        />
      </View >
      <Text style={tw("text-white text-center text-lg font-bold mt-5")}>You and {userSwiped.displayName} have matched.  </Text>
      <View style={tw("flex-row justify-evenly mt-5")}>
        <Image
          style={tw("h-32 w-32 rounded-full")}
          source={{
            uri: loggedInProfile.photoURL,
          }}
        />
        <Image
          style={tw("h-32 w-32 ")}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/mentmatcher-590a9.appspot.com/o/hand-01.png?alt=media&token=0e68c298-8f6c-4985-8860-3ba4461358b4",
          }}
        />
        
        <Image
          style={tw("h-32 w-32 rounded-full")}
          source={{
            uri: userSwiped.photoURL,
          }}
        />
      </View>
      <TouchableOpacity style={tw("bg-white m-5 px-10 py-8 rounded-full mt-20")}
      onPress={()=>{
          navigation.goBack();
          navigation.navigate("Chat");
      }}
      >
          <Text style={tw("text-center")}>Send a message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchedScreen;
