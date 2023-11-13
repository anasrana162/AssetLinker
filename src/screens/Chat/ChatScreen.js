import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import firestore from "@react-native-firebase/firestore";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import uuid from "react-native-uuid";
import Colors from "../../config/Colors";

const { height, width } = Dimensions.get("window");

const ChatScreen = ({ route }) => {
  const [input, setInput] = useState("");

  const { user_id, name, email } = route?.params?.data;

  const userID = JSON.stringify(user_id);
  // const userID = uuid.v4();

  const reg = () => {
    firestore()
      .collection("users")
      .where("userID", "==", userID)
      .get()
      .then((res) => {
        if (res.docs != []) {
          console.log(JSON.stringify(res.docs[0].data()));
        }
      })
      .catch((error) => {
        console.log("user not found");
        console.log("FAILED GET ID: ", error.message);
      });

    // firestore()
    //   .collection("users")
    //   .doc(userID)
    //   .set({
    //     name: name,
    //     email: email,
    //     userID: userID,
    //   })
    //   .then((res) => {
    //     console.log(res, "==========firebase SUCCESS");
    //   })
    //   .catch((error) => {
    //     console.log(error, "==========firebase ERROR");
    //   });
  };

  // console.log(route?.params?.data);

  return (
    <View style={styles.main}>
      <View style={styles.inputContainer}>
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
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
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
