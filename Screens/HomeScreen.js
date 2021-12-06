import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useEffect, useState, useRef } from "react";
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
import {
  onSnapshot,
  doc,
  collection,
  setDoc,
  query,
  where,
  getDocs,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import generateId from "../lib/generateid";
const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState([]);
  const swipeRef = useRef(null);
  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        if (!snapshot.exists()) {
          navigation.navigate("Modal");
        }
      }),
    []
  );
  useEffect(() => {
    let unsub;
    const fetchCards = async () => {
      const passes = await getDocs(
        collection(db, "users", user.uid, "passes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));
      const swipes = await getDocs(
        collection(db, "users", user.uid, "swipes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));
      const passedUserIds = passes.lenght > 0 ? passes : ["test"];
      const swipedUserIds = swipes.lenght > 0 ? swipes : ["test"];

      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds])
        ),
        (snapshot) => {
          setProfile(
            snapshot.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };
    fetchCards();
    return unsub;
  }, []);
  const swipeLeft = async (cardIndex) => {
    if (!profile[cardIndex]) return;
    const userSwiped = profile[cardIndex];
    console.log(`You swiped PASS on ${userSwiped.displayName}`);
    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  };
  const swipeRight = async (cardIndex) => {
    if (!profile[cardIndex]) return;
    const userSwiped = profile[cardIndex];
    const loggedInProfile = await (await getDoc(doc(db, "users", user.uid))).data();
    
    //  check if the user swiped on you
    getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
      (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          // user has matched with you before you matched with them
          console.log(`Hooray You MACTHED with ${userSwiped.displayName}`);
          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );

          // Create a MATCH!
          setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)),{
            users:{
              [user.uid]: loggedInProfile,
              [userSwiped.id]: userSwiped,
            },
            usersMatched:  [user.uid, userSwiped.id], 
            timestamp : serverTimestamp()
          });
          navigation.navigate("Match", {
            loggedInProfile, userSwiped
          })
        } else {
          // USer has swiped as first interaction between the two
          console.log(`You swiped on ${userSwiped.displayName} (${userSwiped.job})`);
          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );
        }
      }
    );
    console.log(
      `you swiped MATCH on ${userSwiped.displayName} (${userSwiped.job})`
    );
    setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id), userSwiped);
  };
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
            style={tw("h-16 w-16 rounded-full")}
            source={{ uri: "https://www.gsu.edu/wp-content/themes/gsu-flex-2/images/logo.png"}}
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
          onSwipedLeft={(cardIndex) => {
            console.log("Swipe Pass");
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            console.log("Swipe Match");
            swipeRight(cardIndex);
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
                      {card.displayName}
                    </Text>

                    <Text>{card.job}</Text>
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
