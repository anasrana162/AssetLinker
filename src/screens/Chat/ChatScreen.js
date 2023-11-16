import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import uuid from "react-native-uuid";
import Colors from "../../config/Colors";
import { GiftedChat } from "react-native-gifted-chat";

const { height, width } = Dimensions.get("window");

const ChatScreen = ({ route }) => {
  const [messageList, setMessageList] = useState([]);

  const api = route?.params?.data;
  const firebase = route?.params?.fireStore;
  const db = firestore();

  const senderID = "" + route?.params?.id;
  const receiverID = api?.user_id ? "" + api?.user_id : firebase.receiverID;
  const postID = api?.id ? "" + api?.id : firebase.postID;
  // const receiverID = uuid.v4();

  // console.log(senderID, "   ", receiverID, "   ", postID);
  // console.log(route?.params?.data, "---------API DATA----");
  console.log(firebase?.receiverID, "---------fireStore", postID);

  const onSend = useCallback((messages = []) => {
    // Get already signup user
    // db.collection("users")
    //   .where("receiverID", "==", receiverID)
    //   .get()
    //   .then((res) => {
    //     if (res.docs != []) {
    //       console.log(
    //         JSON.stringify(res.docs[0].data()),
    //         "     Get already signup user"
    //       );
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("user not found");
    //     console.log("FAILED GET ID: ", error.message);
    //   });

    // Signup User
    if (!firebase?.receiverID) {
      db.collection("users")
        .doc(receiverID + postID)
        .set({
          postID: postID,
          name: api?.name,
          email: api?.email,
          postTitle: "Post title is most important",
          receiverID: receiverID,
        })
        .then((res) => {
          console.log(res, "==========firebase SIGNUP SUCCESS");
        })
        .catch((error) => {
          console.log(error, "==========firebase SIGNUP ERROR");
        });
    }

    const msg = messages[0];
    const myMsg = {
      ...msg,
      sendBy: senderID,
      sendTo: receiverID,
      createdAt: Date.parse(msg?.createdAt),
    };

    setMessageList((previousMessages) =>
      GiftedChat.append(previousMessages, myMsg)
    );

    // Access For Sender
    db.collection("chats")
      .doc(senderID + receiverID)
      .collection("post")
      .doc(postID)
      .collection("messages")
      .add(myMsg);

    // Access For Receiver
    // db.collection("chats")
    //   .doc("" + receiverID + senderID)
    //   .collection("messages")
    //   .add(myMsg);
  }, []);

  useEffect(() => {
    const subscriber = db
      .collection("chats")
      .doc(senderID + receiverID)
      .collection("post")
      .doc(postID)
      .collection("messages")
      .orderBy("createdAt", "desc");

    subscriber.onSnapshot((querysnapshot) => {
      const allmessages = querysnapshot.docs.map((item) => {
        console.log(item, "==========firebase SUCCESS");
        return { ...item._data, createdAt: item._data.createdAt };
      });
      setMessageList(allmessages);
    });

    return () => subscriber;
  }, []);

  return (
    <View style={styles.main}>
      <GiftedChat
        messages={messageList}
        onSend={(messages) => onSend(messages)}
        textInputStyle={styles.chatInput}
        multi
        user={{
          _id: senderID,
        }}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: Colors.white,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ddd",
    position: "absolute",
    bottom: 0,
    height: height / 16,
    width: width - 10,
    borderRadius: 50,
    marginBottom: 5,
    columnGap: 8,
    paddingHorizontal: 20,
  },
  chatInput: {
    color: "#000",
    marginBottom: -1,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 100,
    paddingTop: 0,
    paddingBottom: 5,
  },
});
