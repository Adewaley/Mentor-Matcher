import { useNavigation } from "@react-navigation/native";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Picker,
} from "react-native";

import tw from "tailwind-rn";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";

const ModalScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [image, setImage] = useState("");
  const [age, setage] = useState(null);
  const [job, setjob] = useState(null);
  const [selectedValue, setSelectedValue] = useState("Student");

  const incompleteForm = !selectedValue || !job ||!image;
  const updateProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: image,
      job: job,
      age: age,
      selectedValue: selectedValue,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <View style={tw("flex-1 items-center pt-1")}>
      <Image
        style={tw("h-40 w-full")}
        resizerMode="contain"
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/mentmatcher-590a9.appspot.com/o/modalpics-01.png?alt=media&token=e7fee42c-9be9-4523-adb6-74c41587b767",
        }}
      />
      <Text style={tw("text-xl text-gray-500 p-2 font-bold")}>
        Welcome, {user.displayName}
      </Text>

      {/* Enter job details */}
      <Text
        style={[
          tw("text-center p-4 font-bold text-red-400"),
          { color: "#4FD0E9" },
        ]}
      >
        Interest
      </Text>
      <TextInput
        value={job}
        onChangeText={(text) => setjob(text)}
        style={tw("text-center text-xl pb-2")}
        placeholder="Enter Interest"
      ></TextInput>
      {/* Enter image details */}
      <Text
        style={[
          tw("text-center p-4 font-bold text-red-400"),
          { color: "#4FD0E9" },
        ]}
      >
        Image URL
      </Text>
      <TextInput
        value={image}
        onChangeText={(text) => setImage(text)}
        style={tw("text-center text-xl pb-2")}
        placeholder="Enter Image URL"
      ></TextInput>
      <View style={styles.container}>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Student" value="Student" />
          <Picker.Item label="Mentor" value="Mentor" />
        </Picker>
      </View>
      <TouchableOpacity
        onPress={updateProfile}
        disabled={incompleteForm}
        style={[
          tw("w-64 p-3 rounded absolute bottom-20 bg-red-400"),
          incompleteForm ? tw("bg-gray-400") : { backgroundColor: "#4FD0E9" },
        ]}
      >
        <Text style={tw("text-center text-white text-xl")}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});

export default ModalScreen;
