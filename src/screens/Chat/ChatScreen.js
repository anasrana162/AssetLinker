import { StyleSheet, View, Dimensions, Button } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import uuid from "react-native-uuid";
import Colors from "../../config/Colors";
import { GiftedChat } from "react-native-gifted-chat";

const { height, width } = Dimensions.get("window");

const ChatScreen = ({ route }) => {
  const [messageList, setMessageList] = useState([]);
  const [messageList1, setMessageList1] = useState([]);
  const [messageList2, setMessageList2] = useState([]);

  const api = route?.params?.data;
  const firebase = route?.params?.fireStore;
  const db = firestore();

  const senderID = "" + route?.params?.id;
  const receiverID = api?.user_id ? "" + api?.user_id : firebase.receiverID;
  const postID = api?.id ? "" + api?.id : firebase.postID;
  // const location = JSON.parse(api?.Location);
  // const receiverID = uuid.v4();

  console.log(senderID, "   ", receiverID, "   ", postID);
  // console.log(location?.valueToShow, "---------API DATA----");
  // console.log(firebase?.receiverID, "---------fireStore", postID);

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

    const chatHandler = () => {
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
      db.collection("chat")
        .doc(senderID + receiverID)
        .collection("post")
        .doc(postID)
        .collection("messages")
        .add(myMsg);
    };

    // Signup User
    if (!firebase?.receiverID) {
      db.collection("users")
        .doc(receiverID + postID)
        .set({
          postID: postID,
          name: api?.name,
          email: api?.email,
          img: api?.post_images[0],
          location: JSON.parse(api?.Location)?.valueToShow,
          features: api?.main_features,
          receiverID: receiverID,
          senderID: senderID,
        })
        .then((res) => {
          console.log(res, "==========firebase SIGNUP SUCCESS");
          chatHandler();
        })
        .catch((error) => {
          console.log(error, "==========firebase SIGNUP ERROR");
        });
    } else {
      chatHandler();
    }

    // Access For Receiver
    // db.collection("chats")
    //   .doc("" + receiverID + senderID)
    //   .collection("messages")
    //   .add(myMsg);
  }, []);

  // useEffect(() => {
  //   console.log("senderID + receiverID",senderID + receiverID)
  //   const subscriber = db
  //     .collection("chat")
  //     .doc(senderID + receiverID)
  //     .collection("post")
  //     .doc(postID)
  //     .collection("messages")
  //     .orderBy("createdAt", "desc");

  //   subscriber.onSnapshot((querysnapshot) => {
  //     const allmessages = querysnapshot.docs.map((item) => {
  //       // console.log(item, "==========firebase SUCCESS");
  //       return { ...item._data, createdAt: item._data.createdAt };
  //     });
  //     setMessageList(allmessages);
  //   });

  //   return () => subscriber;
  // }, []);
  useEffect(() => {
    console.log("senderID + receiverID", senderID + receiverID)
    const subscriber = db
      .collection("chat")
      .doc(senderID + receiverID)
      .collection("post")
      .doc(postID)
      .collection("messages")
      .orderBy("createdAt", "desc");

    console.log("subscriber", subscriber.onSnapshot)
    var messages1 = []
    subscriber.onSnapshot((querysnapshot) => {
      console.log("querysnapshot", querysnapshot.docs)
      const allmessages = querysnapshot.docs
      // .map((item) => {
      //   console.log(item, "==========firebase SUCCESS");
      //   return { ...item._data, createdAt: item._data.createdAt }
      //   // { ...item._data, createdAt: item._data.createdAt };
      // });
      console.log("allmessages", allmessages)
      // messageList.push(allmessages)
      setMessageList1(allmessages)
      // messages1 = allmessages
      // setMessageList(allmessages);
      // return querysnapshot.docs
    });

    const subscriber1 = db
      .collection("chat")
      .doc(receiverID + senderID)
      .collection("post")
      .doc(postID)
      .collection("messages")
      .orderBy("createdAt", "desc");

    var messages2 = []
    subscriber1.onSnapshot(async (querysnapshot) => {
      const allmessages = querysnapshot.docs
      // .map((item) => {
      //   // console.log(item, "==========firebase SUCCESS");
      //   return { ...item._data, createdAt: item._data.createdAt }
      //   // ;
      // });
      // messages2 = allmessages
      setMessageList(allmessages)
      // messageList.push(allmessages)
      //;

    });
    var mergeResult = [...messageList, ...messageList1]
    var arr
    mergeResult.map((item) => {
      // console.log(item, "==========firebase SUCCESS");
      messageList2.push({ ...item._data, createdAt: item._data.createdAt })
      // ;
    })
    setMessageList2(messageList2)






    // setMessageList(...messages1,...messages2)

    // return () => finalmes;
  }, []);

  return (
    <View style={styles.main}>
      {/* <Button title="Delete" color={"red"} onPress={onDelete} /> */}
      {console.log("messageList", messageList)}
      <GiftedChat
        messages={messageList2}
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

// =====================================================\

export const deleteMessagesHandler = async (docID, postID) => {
  // const docID = users?.docs[index]?.id;

  if (docID) {
    try {
      const messagesCollection = firestore()
        .collection("chats")
        .doc(docID)
        .collection("post")
        .doc(postID)
        .collection("messages");

      const messagesSnapshot = await messagesCollection.get();
      // messagesSnapshot.forEach((doc) => {
      //   // const res = await messagesCollection.doc(doc.id).delete();
      // });
      console.log("CHAT successfully deleted!:    ", docID, "----", postID);
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  }
};
// =====================================================
