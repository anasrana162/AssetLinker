import {
  StyleSheet,
  Text,
  View,
  TextInput,
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
  // const [input, setInput] = useState("");
  const [messageList, setMessageList] = useState([]);

  const { user_id, name, email, id } = route?.params?.data;
  const db = firestore();

  const receiverID = JSON.stringify(user_id);
  const senderID = JSON.stringify(route?.params?.id);
  const postID = JSON.stringify(id);
  // const receiverID = uuid.v4();

  console.log(senderID, "   ", receiverID);
  console.log(route?.params?.data, "route?.params?.data");

  const onSend = useCallback((messages = []) => {
    // Get already signup user
    // db.collection("users")
    //   .where("receiverID", "==", receiverID)
    //   .get()
    //   .then((res) => {
    //     if (res.docs != []) {
    //       console.log(JSON.stringify(res.docs[0].data()));
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("user not found");
    //     console.log("FAILED GET ID: ", error.message);
    //   });

    // Signup User
    db.collection("users")
      .doc(receiverID + postID)
      .set({
        name: name,
        postTitle: postID,
        email: email,
        receiverID: receiverID,
      })
      .then((res) => {
        console.log(res, "==========firebase SUCCESS");
      })
      .catch((error) => {
        console.log(error, "==========firebase ERROR");
      });

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
      .doc("" + senderID + receiverID)
      .collection("post")
      .doc("" + postID)
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
      .doc("" + senderID + receiverID)
      .collection("post")
      .doc("" + postID)
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
  textInput: {
    height: "100%",
    width: "88%",
    color: "#000",
    // backgroundColor: "red",
    paddingTop: 0,
    paddingBottom: 0,
  },
});

{
  /* <View style={styles.inputContainer}>
        <TextInput
          multiline
          placeholder="Message..."
          placeholderTextColor={Colors.DarkGrey}
          onChangeText={setInput}
          style={styles.textInput}
        />

        {input && (
          <TouchableOpacity onPress={reg}>
            <FontAwesome name="send" size={25} color={Colors.blue} />
          </TouchableOpacity>
        )}
      </View> */
}
