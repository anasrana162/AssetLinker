import { StyleSheet, View, Dimensions, Button, NativeModules, Platform } from "react-native";
import React, { useCallback, Component } from "react";
import firestore from "@react-native-firebase/firestore";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import uuid from "react-native-uuid";
import Colors from "../../config/Colors";
import { GiftedChat } from "react-native-gifted-chat";

const {
  StatusBarManager: { HEIGHT },
} = NativeModules;
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height - HEIGHT;

const db = firestore();

class ChatScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageList: [],
      messageList1: [],
      messageList2: [],
      api: this.props.route?.params?.data,
      firebase: this.props.route?.params?.fireStore,
      user_id: this.props.route?.params?.id,
    };
  }

  componentDidMount = () => {
    console.log("this.props.route?.params?.data", this.props.route?.params?.data);
    this.fetchChat()
  }

  fetchChat = () => {

    var { api, firebase } = this.state
    var { route } = this.props
    // const senderID = "" + route?.params?.id;
    // const receiverID = api?.user_id ? "" + api?.user_id : firebase.receiver
    const senderID = firebase?.senderID == undefined ? route?.params?.id?.toString() : firebase?.senderID;
    const receiverID = firebase?.receiverID == undefined ? api?.user_id : firebase?.receiverID;
    //  const receiverID = api?.user_id == undefined ? firebase.receiverID : api?.user_id.toString() ;
    const postID = api?.id ? "" + api?.id : firebase.postID;

    // console.log("senderID + receiverID+user_id", senderID + firebase.receiverID + " " + senderID + "      " + postID)
    console.log("fireStore", firebase)
    // console.log("receiverID + senderID", receiverID + senderID, "      " + postID)
    // console.log("receiverID + senderID", receiverID + senderID, "      " + postID)
    const subscriber = db
      .collection("chat")
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
      // console.log("allmessages",allmessages)
      this.setState({
        messageList: allmessages
      })
    });
    // console.log("SUbs",subscriber)
  }

  onSend = (messages = []) => {
    console.log("message", messages)
    var { api, firebase } = this.state
    var { route } = this.props
    // const senderID = "" + route?.params?.id;
    // const receiverID = api?.user_id ? "" + api?.user_id : firebase.receiverID;
    const senderID = firebase?.senderID == undefined ? route?.params?.id?.toString() : firebase?.senderID;
    const receiverID = firebase?.receiverID == undefined ? api?.user_id : firebase?.receiverID;
    //  const receiverID = api?.user_id == undefined ? firebase.receiverID : api?.user_id.toString() ;
    const postID = api?.id ? "" + api?.id : firebase.postID;
    // console.log("api",api);
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
      this.setState({
        messageList: [...this.state.messageList, myMsg]
      })
      // setMessageList((previousMessages) =>
      //   GiftedChat.append(previousMessages, myMsg)
      // );

      // this.fetchChat()
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
          features: api?.main_features == null ? "" : api?.main_features,
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
  };

  render() {

    var { api, firebase, messageList, messageList2, user_id } = this.state
    var { route } = this.props
    const senderID = firebase?.senderID == undefined ? route?.params?.id?.toString() : firebase?.senderID;
    const receiverID = firebase?.receiverID == undefined ? api?.user_id : firebase?.receiverID;
    // const senderID = "" + route?.params?.id;
    // const receiverID = api?.user_id ? "" + api?.user_id : firebase.receiverID;
    //  const receiverID = api?.user_id == undefined ? firebase.receiverID : api?.user_id.toString() ;
    const postID = api?.id ? "" + api?.id : firebase.postID;
    console.log("checking id", user_id?.toString());
    return (
      <View style={styles.main}>
        {/* <Button title="Delete" color={"red"} onPress={onDelete} /> */}
        {/* {console.log("messageList", messageList2)} */}
        <GiftedChat
          // key={keyChat}
          messages={messageList}
          onSend={(messages) => this.onSend(messages)}
          textInputStyle={styles.chatInput}
          multi
          messagesContainerStyle={{
            width: width,
            height: height - 80,
            marginLeft: -20,
          }}
          user={{
            _id: user_id?.toString(),
          }}
        />
      </View>
    )
  }
}



// const ChatScreen = ({ route }) => {
//   const [messageList, setMessageList] = useState([]);
//   const [messageList1, setMessageList1] = useState([]);
//   const [messageList2, setMessageList2] = useState([]);
//   // const [keyChat, setKeyChat] = useState(0);

//   const api = route?.params?.data;
//   const firebase = route?.params?.fireStore;
//   const db = firestore();

//   console.log("api?.user_id", api?.user_id, " firebase.senderID", firebase.senderID, "   firebase.receiverID", firebase.receiverID)
//   console.log("api?.user_id ?  + api?.user_id : firebase.receiverID", api?.user_id ? "" + api?.user_id : firebase.receiverID)

//   // const senderID = "" + route?.params?.id;
//   // const receiverID = api?.user_id ? "" + api?.user_id : firebase.receiverID;
//   const senderID = firebase.senderID;
//   const receiverID = firebase.receiverID;
//   //  const receiverID = api?.user_id == undefined ? firebase.receiverID : api?.user_id.toString() ;
//   const postID = api?.id ? "" + api?.id : firebase.postID;
//   // const location = JSON.parse(api?.Location);
//   // const receiverID = uuid.v4();

//   console.log("POSTID", postID);
//   // console.log(location?.valueToShow, "---------API DATA----");
//   // console.log(firebase?.receiverID, "---------fireStore", postID);

//   const onSend = useCallback((messages = []) => {
//     // Get already signup user
//     // db.collection("users")
//     //   .where("receiverID", "==", receiverID)
//     //   .get()
//     //   .then((res) => {
//     //     if (res.docs != []) {
//     //       console.log(
//     //         JSON.stringify(res.docs[0].data()),
//     //         "     Get already signup user"
//     //       );
//     //     }
//     //   })
//     //   .catch((error) => {
//     //     console.log("user not found");
//     //     console.log("FAILED GET ID: ", error.message);
//     //   });

//     const chatHandler = () => {
//       const msg = messages[0];
//       const myMsg = {
//         ...msg,
//         sendBy: senderID,
//         sendTo: receiverID,
//         createdAt: Date.parse(msg?.createdAt),
//       };

//       setMessageList((previousMessages) =>
//         GiftedChat.append(previousMessages, myMsg)
//       );

//       // Access For Sender
//       db.collection("chat")
//         .doc(senderID + receiverID)
//         .collection("post")
//         .doc(postID)
//         .collection("messages")
//         .add(myMsg);
//     };

//     // Signup User
//     if (!firebase?.receiverID) {
//       db.collection("users")
//         .doc(receiverID + postID)
//         .set({
//           postID: postID,
//           name: api?.name,
//           email: api?.email,
//           img: api?.post_images[0],
//           location: JSON.parse(api?.Location)?.valueToShow,
//           features: api?.main_features,
//           receiverID: receiverID,
//           senderID: senderID,
//         })
//         .then((res) => {
//           console.log(res, "==========firebase SIGNUP SUCCESS");
//           chatHandler();
//         })
//         .catch((error) => {
//           console.log(error, "==========firebase SIGNUP ERROR");
//         });
//     } else {
//       chatHandler();
//     }

//     // Access For Receiver
//     // db.collection("chats")
//     //   .doc("" + receiverID + senderID)
//     //   .collection("messages")
//     //   .add(myMsg);
//   }, []);

//   // useEffect(() => {
//   //   console.log("senderID + receiverID", senderID + receiverID, "      " + postID)
//   //   console.log("receiverID + senderID", receiverID + senderID, "      " + postID)
//   //   const subscriber = db
//   //     .collection("chat")
//   //     .doc(senderID + receiverID)
//   //     .collection("post")
//   //     .doc(postID)
//   //     .collection("messages")
//   //     .orderBy("createdAt", "desc");

//   //   subscriber.onSnapshot((querysnapshot) => {
//   //     const allmessages = querysnapshot.docs.map((item) => {
//   //       // console.log(item, "==========firebase SUCCESS");
//   //       return { ...item._data, createdAt: item._data.createdAt };
//   //     });
//   //     setMessageList(allmessages);
//   //   });
//   //   // console.log("SUbs",subscriber)

//   //   return () => subscriber;
//   // }, []);

//   useEffect(() => {
//     console.log("senderID + receiverID", senderID + receiverID, "      " + postID)
//     console.log("receiverID + senderID", receiverID + senderID, "      " + postID)
//     var arr1 = []
//     const subscriber = db
//       .collection("chat")
//       .doc(senderID + receiverID)
//       .collection("post")
//       .doc(postID)
//       .collection("messages")
//       .orderBy("createdAt", "desc");
//     const subscriber1 = db
//       .collection("chat")
//       .doc(receiverID + senderID)
//       .collection("post")
//       .doc(postID)
//       .collection("messages")
//       .orderBy("createdAt", "desc");



//     subscriber.onSnapshot((querysnapshot) => {
//       const allmessages = querysnapshot.docs
//       // console.log("Allmessages", allmessages)
//       setMessageList(allmessages)
//       setKeyChat(keyChat + 1)
//       // setMessageList(allmessages);
//     });
//     // console.log("SUbs", messageList1)
//     subscriber1.onSnapshot((querysnapshot) => {
//       const allmessages = querysnapshot.docs
//       // console.log("Allmessages", allmessages)
//       setMessageList1(allmessages)
//       setKeyChat(keyChat + 1)
//       // setMessageList(allmessages);
//     });

//     var mergeResult = [...messageList, ...messageList1]
//     // var arr
//     mergeResult.map((item) => {
//       // console.log(item, "==========firebase SUCCESS"); 
//       messageList2.push({ ...item._data, createdAt: item._data.createdAt })
//       // ;
//     })
//     setMessageList2(messageList2)
//     setKeyChat(keyChat + 1)

//     console.log("SUbs1", messageList2)

//     // return () => { subscriber, subscriber1 };
//   }, []);





//   return (
//     <View style={styles.main}>
//       {/* <Button title="Delete" color={"red"} onPress={onDelete} /> */}
//       {/* {console.log("messageList", messageList2)} */}
//       <GiftedChat
//         key={keyChat}
//         messages={messageList2}
//         onSend={(messages) => onSend(messages)}
//         textInputStyle={styles.chatInput}
//         multi
//         user={{
//           _id: senderID,
//         }}
//       />
//     </View>
//   );
// };

export default ChatScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // alignItems: "center",
    width: width,
    height: height,
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
    alignSelf: "center",
    borderRadius: 50,
    marginBottom: 5,
    columnGap: 8,
    // paddingHorizontal: 20,
  },
  chatInput: {
    color: "#000",
    marginBottom: Platform.OS == "ios" ? 40 : 0,
    justifyContent: "center",
    alignItems: "center",
    maxHeight: Platform.OS == "ios" ? 150 : 100,
    width: width,
    paddingTop: 10,
    alignSelf: "center",
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
