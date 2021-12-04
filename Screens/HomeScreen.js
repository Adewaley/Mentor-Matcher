import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect , useRef} from "react";
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../hooks/useAuth";
import tw from "tailwind-rn";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
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
   const swipeRef = useRef(null)

  return (
    <SafeAreaView>
      {/* Header */}
      <View style={tw("items-center relative")}>
        <TouchableOpacity style={tw("absolute left-5 top-3")} onPress={logout}>
          <Image
            style={tw("h-10 w-10 rounded-full")}
            source={{ uri: user.photoURL }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={tw("h-14 w-14 rounded-full")}
            source={{ uri: user.photoURL }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={tw("absolute right-5 top-3")}
          onPress={() => {
            navigation.navigate("Chat");
          }}
        >
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
        </TouchableOpacity>
      </View>

      {/* Swiper   */}
      <View>
        <Swiper
        ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={DUMMY_DATA}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={()=>{
              console.log("Swipe Pass")
          }}
          onSwipedRight={()=>{
              console.log("Swipe Match")
          }}
          backgroundColor={"#4FD0E9"}
          overlayLabels={{
              left: {
                 title: "NOPE" ,
                 style:{
                     label:{
                         textAlign: "right",
                         color: "red",
                     }
                 }
              },
              right: {
                title: "MATCH" ,
                style:{
                    label:{
                        textAlign: "left",
                        color: "#4DED30",
                    }
                }
             }
          }}
          renderCard={(card) => (
            <View style={tw("bg-white h-3/4 rounded-xl")}>
              <Image
                style={tw("h-full w-full rounded-xl")}
                source={{ uri: card.photoURL }}
              />
              <View
                style={[tw(
                  "absolute bottom-0 bg-white  flex-row justify-between items-center w-full h-20 px-6 py-2 rounded-b-xl"
                ), styles.cardShadow]}
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
          )}
        />
      </View>
      <View style={tw("flex flex-row justify-evenly")}>
      <TouchableOpacity style={tw("items-center justify-center rounded-full w-16 h-16 bg-red-200")}>
          <Entypo name="cross" size={24}/>
        </TouchableOpacity>
        <TouchableOpacity style={tw("items-center justify-center rounded-full w-16 h-16 bg-green-200")}>
          <Entypo name="heart" size={24}/>
        </TouchableOpacity >
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
    cardShadow:{
        shadowColor: "#000",
        shadowOffset:{
            width:0,
            height:1,
        }, shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    }
})