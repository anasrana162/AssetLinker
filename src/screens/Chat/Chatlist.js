import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  NativeModules
} from "react-native";
import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../../config";
import LoadingModal from "../../components/LoadingModal";
import Swipeable from "react-native-gesture-handler/Swipeable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { postImageURL } from "../../config/Common";


{
  /* {---------------Redux Imports------------} */
}
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/user";
import { bindActionCreators } from "redux";
import Feather from "react-native-vector-icons/Feather"
const {
  StatusBarManager: { HEIGHT },
} = NativeModules;
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height - HEIGHT;


const Chatlist = (props,) => {

  // States
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chatIndex, setChatIndex] = useState(null);
  const [lastMsg, setLastMsg] = useState("");


  const db = firestore();
  const getUsers = async () => {
    var {
      userData: { user },
    } = props;
    // const res = await AsyncStorage.getItem("@assetlinker_userData");
    const data = user;
    const userID = "" + data?.detail[0].user_id;
    console.log("user",userID,data);
    if (userID) {
      const senderQuery = db
        .collection("users")
        .where("senderID", "==", userID);
      const receiverQuery = db
        .collection("users")
        .where("receiverID", "==", userID);
      // Combine results from both queries
      const senderResults = await senderQuery.get();
      const receiverResults = await receiverQuery.get();
      const combinedResults = [...senderResults.docs, ...receiverResults.docs];
      console.log("...senderResults.docs",...senderResults.docs);
      console.log("...receiverResults.docs",...receiverResults.docs);
      setLoading(false);
      setUsers(combinedResults);
      setCurrentUser(data);
      // console.log(combinedResults, "~~~~~~~~~GET USERS~~~~~~~~~");
    }
  };
  // console.log(users.length, "~~~~~~~~~GET lastMsg~~~~~~~~~");
  useEffect(() => {
    getUsers();
  }, []);
  const navHandler = (item) => {
    var { userData } = props
    // console.log(item?.data(), " :CHAT DATA");
    // console.log("currentUser DATA", currentUser?.detail[0]?.user_id)
    props.navigation.navigate("ChatScreen", {
      fireStore: item?.data(),
      // id: currentUser?.detail[0].user_id,
      id: currentUser?.detail[0]?.user_id
    });
  };
  return (
    <View style={styles.main}>
      <View style={styles.headerCont}>

        {/* Back Button */}
        <TouchableOpacity
          style={{ position: "absolute", left: 10 }}
          onPress={() => props.navigation.goBack()}
        >
          <Feather name="chevron-left" size={30} color="white" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.headerTitle}>Chats</Text>

      </View>
      <LoadingModal loading={loading} bgc="transparent" />
      {!users?.length ? (
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
          {users?.length > 0 &&
            users?.map((item, index) => {
              // console.log(item, "______________IMAGE");
              const { name, location, features, img, receiverID, senderID } =
                item?.data();
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={1}
                  onPress={() => navHandler(item)}
                  onPressIn={() => setChatIndex(index)}
                  onPressOut={() => setChatIndex(null)}
                  style={[
                    styles.userContainer,
                    {
                      backgroundColor:
                        chatIndex === index ? "#00008021" : "#fff",
                      borderBottomWidth: index === users?.length - 1 ? 0 : 1,
                    },
                  ]}>
                  {/* avatar */}
                  <View style={styles.circle}>
                    {img ? (
                      <Image
                        source={{ uri: postImageURL + img }}
                        style={styles.avatarImg}
                      />
                    ) : (
                      <Text style={{ color: "#fff", fontSize: 20, fontWeight: "500" }}>
                        {name[0]}
                      </Text>
                    )}
                  </View>
                  {/* name & title */}
                  <View>
                    <Text style={styles.name}>{name}</Text>
                    <Text
                      style={[styles.name, { width: width / 1.3 }]}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {receiverID} {location} {features}
                    </Text>
                    <Text
                      style={[
                        styles.name,
                        { fontWeight: "300", fontSize: 12, color: "#000" },
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
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "white",
  },
  headerCont: {
    width: width,
    height: 60,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.blue
  },
  avatar: { color: "#fff", fontSize: 18, fontWeight: "500" },
  avatarImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  name: { color: "#000", fontSize: 15, fontWeight: "600" },
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


{  /* {---------------redux State ------------} */ }

const mapStateToProps = (state) => ({
  userData: state.userData,
});

{
  /* {---------------redux Actions ------------} */
}
const ActionCreators = Object.assign({}, userActions);
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chatlist);

export const chatDeleteHandler = async (docID) => {
  // console.log("------chatDeleteHandler------", docID);
  if (docID) {
    try {
      await firestore().collection("users").doc(docID).delete();
      // const updatedUsers = [...users.docs];
      // updatedUsers.splice(index, 1);
      // setUsers({ docs: updatedUsers });
      console.log("successfully deleted!");
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  }
};