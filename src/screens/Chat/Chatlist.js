import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../../config";
import LoadingModal from "../../components/LoadingModal";
import Swipeable from "react-native-gesture-handler/Swipeable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { postImageURL } from "../../config/Common";

const Chatlist = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chatIndex, setChatIndex] = useState(null);
  const db = firestore();

  const getUsers = async () => {
    const res = await AsyncStorage.getItem("@assetlinker_userData");
    const data = JSON.parse(res);
    // const tempData = [];
    // .where("email", "!=", data?.email)

    db.collection("users")
      .orderBy("postID", "desc")
      .get()
      .then((res) => {
        setLoading(false);
        setUsers(res);
        setCurrentUser(data);
      })
      .catch((error) => {
        setLoading(false);
        console.log("ERROR: ", error.message);
      });
  };

  var lastMsg = "";
  console.log(lastMsg, "~~~~~~~~~GET lastMsg~~~~~~~~~");
  const getLastMsg = async () => {
    try {
      const res = await db
        .collection("chats")
        .doc("4445")
        .collection("post")
        .doc("29")
        .collection("messages")
        .doc("kyc5hWtHLqjXyPrTufUC")
        .get();

      if (res?._data?.text) {
        lastMsg = res?._data?.text;
      }
      console.log("GET MSG: ", lastMsg);
    } catch (error) {
      console.log("GET LAST MSG: ", error);
    }
  };

  useEffect(() => {
    getUsers();
    getLastMsg();
  }, []);

  const navHandler = (item) => {
    console.log(item?.data(), " :CHAT DATA");
    navigation.navigate("ChatScreen", {
      fireStore: item?.data(),
      id: currentUser?.detail[0].user_id,
    });
  };

  return (
    <View style={styles.main}>
      <LoadingModal loading={loading} bgc="transparent" />
      {users?.docs?.length == 0 ? (
        <Text
          style={{
            color: "grey",
            textAlign: "center",
            fontWeight: "600",
            marginTop: 85,
            fontSize: 18,
          }}>
          Chat list is empty
        </Text>
      ) : (
        <ScrollView>
          {users?.docs?.length > 0 &&
            users?.docs.map((item, index) => {
              const { name, location, features, img } = item?.data();
              {
                /* console.log(img, "______________IMAGE"); */
              }
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => navHandler(item)}
                  onPressIn={() => setChatIndex(index)}
                  onPressOut={() => setChatIndex(null)}
                  style={[
                    styles.userContainer,
                    {
                      backgroundColor:
                        chatIndex === index ? "#00008021" : "#fff",
                      borderBottomWidth:
                        index === users?.docs.length - 1 ? 0 : 1,
                    },
                  ]}>
                  {/* avatar */}
                  <View style={styles.circle}>
                    <Image
                      source={{ uri: postImageURL + img }}
                      style={styles.avatarImg}
                    />
                  </View>

                  {/* name & title */}
                  <View>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.name}>
                      {location} {features}
                    </Text>
                    <Text
                      style={[
                        styles.name,
                        { fontWeight: "300", fontSize: 12, color: "#0007" },
                      ]}>
                      {lastMsg}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      )}
    </View>
  );
};

export default Chatlist;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#eee",
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    columnGap: 20,
    padding: 10,
    borderColor: "#ddd",
  },
  avatar: { color: "#fff", fontSize: 18, fontWeight: "500" },
  avatarImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  name: { color: "#000", fontSize: 15, fontWeight: "800" },
  circle: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: Colors.facebook,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  deleteBTN: {
    backgroundColor: "red",
    height: "100%",
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
});
