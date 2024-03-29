import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Platform,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";
import { useRoute } from "@react-navigation/native";
import tw from "tailwind-rn";
import ReceiverMessage from "../components/ReceiverMessage";
import SenderMessage from "../components/SenderMessage";
import { addDoc, collection, query,onSnapshot, orderBy } from "firebase/firestore";
import { serverTimestamp } from "@firebase/firestore";
import { db } from "../firebase";

const MessagesScreen = () => {
  const { user } = useAuth();
  const { params } = useRoute();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const { matchDetails } = params;
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [matchDetails, db]
  );
  const sendMessage = () => {
    addDoc(collection(db, "matches", matchDetails.id, "messages"), {
      timestamp: serverTimestamp(),
      userId: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      message: input,
    });
    setInput("");
  };
  return (
    <SafeAreaView style={tw("flex-1")}>
      <Header
        title={getMatchedUserInfo(matchDetails?.users, user.uid).displayName}
        calEnabled
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw("flex-1")}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            inverted={-1}
            style={tw("pl-4")}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) =>
              message.userId === user.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>

        <View
          style={tw(
            "flex-row justify-between items-center border-t border-gray-200 px-5 py-2"
          )}
        >
          <TextInput
            style={tw("h-10 text-lg")}
            placeholder="Send Message..."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          <Button onPress={sendMessage} title="Send" color="#00aeef" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessagesScreen;
