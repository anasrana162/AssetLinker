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

  const onSwipeDelete = async (index) => {
    // const docID = users?.docs[index]?.id;
    const docID = "4445";
    const postID = "29";

    if (docID) {
      try {
        // await firestore().collection("users").doc(docID).delete();

        // .collection("post")
        // .doc(postID)
        // .collection("messages")
        // .doc("GQGI4djmNJiNV9HluwgI")
        const res = await firestore().collection("chats").doc("4445").delete();

        // const updatedUsers = [...users.docs];
        // updatedUsers.splice(index, 1);

        // setUsers({ docs: updatedUsers });
        console.log(
          "Document successfully deleted! ========== ",
          res,
          " ============== ",
          docID
        );
      } catch (error) {
        console.error("Error removing document: ", error);
      }
    }
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
        firestore()
          .collection("users")
          .orderBy("postTitle", "desc")
          .get()
          .then((res) => {
            // console.log(
            //   res.docs.map((i) => i.ref._documentPath),
            //   "=================="
            // );
            // setLoading(false);
            setUsers(res);
          })
          .catch((error) => {
            // setLoading(false);
            console.log("ERROR: ", error.message);
          });
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const rightAction = (index) => {
    // console.log(index, " index");
    // console.log(progress, " progress");
    // console.log(dragX, " dragX");
    const docID = users?.docs[index]?.id;
    // console.log(users?.docs, "**********rightAction***********");
    return (
      <>
        {docID && (
          <View
            style={{
              flex: 1,
              backgroundColor: "red",
              justifyContent: "center",
              alignItems: "flex-end",
              paddingRight: 20,
            }}>
            {/* <TouchableOpacity
              // onPress={() => handleDelete()}
              // style={styles.deleteBTN}
              > */}
            <MaterialIcons name="delete" color={"white"} size={25} />
            {/* </TouchableOpacity> */}
          </View>
        )}
      </>
    );
  };

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
              const { name, postTitle, postID } = item?.data();
              return (
                <Swipeable
                  key={index}
                  onSwipeableOpen={() => onSwipeDelete(index)}
                  renderRightActions={() => rightAction(index)}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => navHandler(item)}
                    onPressIn={() => setChatIndex(index)}
                    onPressOut={() => setChatIndex(null)}
                    style={[
                      styles.userContainer,
                      {
                        // backgroundColor: chatIndex === index ? "#aaa" : "#fff",
                        backgroundColor: "#fff",
                        borderBottomWidth:
                          index === users?.docs.length - 1 ? 0 : 1,
                      },
                    ]}>
                    {/* avatar */}
                    <View style={styles.circle}>
                      <Text style={styles.avatar}>{name[0]}</Text>
                    </View>

                    {/* name & title */}
                    <View>
                      <Text style={styles.name}>{name}</Text>
                      <Text style={styles.name}>
                        {postTitle} {postID}
                      </Text>
                      {/* <Text
                          style={[
                            styles.name,
                            { fontWeight: "400", fontSize: 12, color: "#0007" },
                          ]}>
                          Final price?
                        </Text> */}
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
  name: { color: "#000", fontSize: 15, fontWeight: "700" },
  circle: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: Colors.facebook,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteBTN: {
    backgroundColor: "red",
    height: "100%",
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
});
