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

const Chatlist = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chatIndex, setChatIndex] = useState(null);

  // console.log(chatIndex, "chat Index");

  const getUsers = async () => {
    const res = await AsyncStorage.getItem("@assetlinker_userData");
    const data = JSON.parse(res);
    // const tempData = [];

    // .where("email", "!=", data?.email)
    firestore()
      .collection("users")
      .orderBy("postTitle", "desc")
      .get()
      .then((res) => {
        console.log(
          res.docs.map((i) => i.ref._documentPath),
          "=================="
        );
        setLoading(false);
        // if (res?.docs != []) {
        //   res.docs.map((item) => {
        //     tempData.push(item.data());
        //   });
        // }
        setUsers(res);
        setCurrentUser(data);
      })
      .catch((error) => {
        setLoading(false);
        console.log("ERROR: ", error.message);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const onSwipeDelete = () => {
    console.log("onSwipeDelete");
  };

  const handleDelete = () => {
    console.log("handleDelete");
    const docId = "4730";

    firestore()
      .collection("users")
      .doc(docId)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const rightAction = () => {
    return (
      <View
        style={{
          justifyContent: "center",
        }}>
        <TouchableOpacity
          onPress={() => handleDelete()}
          style={styles.deleteBTN}>
          <MaterialIcons name="delete" color={"white"} size={25} />
        </TouchableOpacity>
      </View>
    );
  };

  const navHandler = (item) =>
    navigation.navigate("ChatScreen", {
      data: item?.data(),
      id: currentUser?.detail[0].user_id,
    });

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
              return (
                <Swipeable
                  key={index}
                  // onSwipeableOpen={onSwipeDelete}
                  renderRightActions={rightAction}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => navHandler(item)}
                    onPressIn={() => setChatIndex(index)}
                    onPressOut={() => setChatIndex(null)}
                    style={[
                      styles.userContainer,
                      {
                        backgroundColor: chatIndex === index ? "#ddd" : "#fff",
                        borderBottomWidth:
                          index === users?.docs.length - 1 ? 0 : 1,
                      },
                    ]}>
                    {/* avatar */}
                    <View style={styles.circle}>
                      <Text style={styles.avatar}>{item?.data()?.name[0]}</Text>
                    </View>

                    {/* name & title */}
                    <View>
                      <Text style={styles.name}>{item?.data()?.name}</Text>
                      <Text style={[styles.name, { fontSize: 15 }]}>
                        {item?.data()?.postTitle} 4 Room appartment in DHA 2
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Swipeable>
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
  name: { color: "#000", fontSize: 16, fontWeight: "600" },
  circle: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: "dodgerblue",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteBTN: {
    backgroundColor: "red",
    height: "100%",
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
