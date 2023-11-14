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

  const { user_id, name, email } = route?.params?.data;
  const receiverID = JSON.stringify(user_id);
  const senderID = JSON.stringify(route?.params?.id);
  // const receiverID = uuid.v4();
  console.log(senderID, "   ", receiverID);

  const onSend = useCallback((messages = []) => {
    // firestore()
    //   .collection("users")
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

    // firestore()
    //   .collection("users")
    //   .doc(receiverID)
    //   .set({
    //     name: name,
    //     email: email,
    //     receiverID: receiverID,
    //   })
    //   .then((res) => {
    //     console.log(res, "==========firebase SUCCESS");
    //   })
    //   .catch((error) => {
    //     console.log(error, "==========firebase ERROR");
    //   });

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
    firestore()
      .collection("chats")
      .doc("" + senderID + receiverID)
      .collection("messages")
      .add(myMsg);

    // Access For Receiver
    // firestore()
    //   .collection("chats")
    //   .doc("" + receiverID + senderID)
    //   .collection("messages")
    //   .add(myMsg);
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection("chats")
      .doc(senderID + receiverID)
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
