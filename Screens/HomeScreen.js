import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  unstable_batchedUpdates,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../hooks/useAuth";
import tw from "tailwind-rn";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";

const DUMMY_DATA = [
  {
    id: 1913,
    firstName: "Sonny",
    lastName: "Man",
    occupation: "Software Developer",
    photoURL:
      "https://upload.wikimedia.org/wikipedia/commons/a/a5/Red_Kitten_01.jpg",
    age: 21,
  },
  {
    id: 129837,
    firstName: "Ajayi",
    lastName: "MGSUan",
    occupation: "Software ENg",
    photoURL:
      "https://cdn1.tedsby.com/tb/large/storage/3/1/3/313774/stuffed-animal-cat-red-kitten-by-anastasia-snagovskaya.jpg",
    age: 30,
  },
  {
    id: 30812,
    firstName: "Sonny",
    lastName: "Man",
    occupation: "Software Test",
    photoURL: "https://thumb.mp-farm.com/90447251/preview.jpg",
    age: 20,
  },
];
const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [profile, setprofile] = useState([]);
  const swipeRef = useRef(null);
  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        if (!snapshot.exists()) {
          navigation.navigate("Modal");
        }
      }),
   []);
  return (
    <SafeAreaView style={tw("flex-1")}>
      {/* Header */}
      <View style={tw("items-center flex-row justify-between px-5")}>
        <TouchableOpacity onPress={logout}>
          <Image
            style={tw("h-10 w-10 rounded-full")}
            source={{ uri: user.photoURL }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Modal");
          }}
        >
          <Image
            style={tw("h-14 w-14 rounded-full")}
            source={{ uri: user.photoURL }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Chat");
          }}
        >
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
        </TouchableOpacity>
      </View>

      {/* Swiper   */}
      <View style={tw("flex-1 -mt-6")}>
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={profile}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={() => {
            console.log("Swipe Pass");
          }}
          onSwipedRight={() => {
            console.log("Swipe Match");
          }}
          backgroundColor={"#4FD0E9"}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  textAlign: "left",
                  color: "#4DED30",
                },
              },
            },
          }}
          renderCard={(card) =>
            card ? (
              <View style={tw("bg-white h-3/4 rounded-xl")}>
                <Image
                  style={tw("h-full w-full rounded-xl")}
                  source={{ uri: card.photoURL }}
                />
                <View
                  style={[
                    tw(
                      "absolute bottom-0 bg-white  flex-row justify-between items-center w-full h-20 px-6 py-2 rounded-b-xl"
                    ),
                    styles.cardShadow,
                  ]}
                >
                  <View>
                    <Text style={tw("text-xl font-bold")}>
                      {card.firstName} {card.lastName}
                    </Text>

                    <Text>{card.occupation}</Text>
                  </View>
                  <Text style={tw("text-2xl font-bold")}>{card.age}</Text>
                </View>
              </View>
            ) : (
              <View
                style={[
                  tw(
                    "relative bg-white h-3/4 rounded-xl justify-center items-center"
                  ),
                  styles.cardShadow,
                ]}
              >
                <Text style={tw("font-bold pb-5")}>The end</Text>
                <Image
                  style={tw("h-20 w-full")}
                  height={100}
                  width={100}
                  source={{
                    uri: "https://cdn.shopify.com/s/files/1/1061/1924/products/Emoji_Icon_-_Sad_Emoji_1024x1024.png?v=1571606093.png",
                  }}
                />
              </View>
            )
          }
        />
      </View>
      <View style={tw(" flex flex-row justify-evenly")}>
        <TouchableOpacity
          style={tw(
            "items-center justify-center rounded-full w-16 h-16 bg-red-200"
          )}
          onPress={() => swipeRef.current.swipeLeft()}
        >
          <Entypo name="cross" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          style={tw(
            "items-center justify-center rounded-full w-16 h-16 bg-green-200"
          )}
          onPress={() => swipeRef.current.swipeRight()}
        >
          <Entypo name="heart" size={24} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
