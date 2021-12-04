import { useNavigation } from "@react-navigation/native";
import { serverTimestamp, setDoc ,doc} from "firebase/firestore";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-rn";
import {db} from "../firebase"
import useAuth from "../hooks/useAuth";

const ModalScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [image, setimage] = useState("https://picsum.photos/200");
  const [age, setage] = useState(null);
  const [job, setjob] = useState(null);
  const incompleteForm = !image || !job || !age;
  const updateProfile = () => {
    setDoc(doc(db, 'users', user.uid),{
        id: user.uid,
        displayName: user.displayName,
        photoURL: image,
        job: job,
        age:age,
        timestamp: serverTimestamp()
    }).then(()=>{
        navigation.navigate("Home")
    }).catch(error => {
        alert(error.message);
    })
  };
  return (
    <View style={tw("flex-1 items-center pt-1")}>
      <Image
        style={tw("h-20 w-full")}
        resizerMode="contain"
        source={{ uri: "https://links.papareact.com/2pf" }}
      />
      <Text style={tw("text-xl text-gray-500 p-2 font-bold")}>
        Welcome {user.displayName}
      </Text>

      {/* form start */}
      <Text style={tw("text-center p-4 font-bold text-red-400")}>
        Profile Pic
      </Text>
      <TextInput
        value={image}
        onChangeText={(text) => setimage(text)}
        style={tw("text-center text-xl pb-2")}
        placeholder="Enter profile pic"
      ></TextInput>
      <Text style={tw("text-center p-4 font-bold text-red-400")}>Job</Text>
      <TextInput
        value={job}
        onChangeText={(text) => setjob(text)}
        style={tw("text-center text-xl pb-2")}
        placeholder="Enter a job"
      ></TextInput>
      <Text style={tw("text-center p-4 font-bold text-red-400")}>Age</Text>
      <TextInput
        value={age}
        onChangeText={(text) => setage(text)}
        style={tw("text-center text-xl pb-2")}
        placeholder="Enter age"
        keyboardType="numeric"
        maxLength={2}
      ></TextInput>
      <TouchableOpacity
      onPress={updateProfile}
        disabled={incompleteForm}
        style={[
          tw("w-64 p-3 rounded absolute bottom-20 bg-red-400"),
          incompleteForm ? tw("bg-gray-400") : tw("bg-red-400"),
        ]}
      >
        <Text style={tw("text-center text-white text-xl")}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;
