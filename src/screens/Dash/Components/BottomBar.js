import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import { Colors } from "../../../config";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("screen").width;

const BottomBar = ({ data, id, user_cellno }) => {
  const navigation = useNavigation(0);
  const onPress = (key) => {
    switch (key) {
      case "chat":
        navigation.navigate("ChatScreen", { data, id });
        break;

      case "whatsapp":
        Linking.openURL(`whatsapp://send?phone=${user_cellno}`);
        break;
      case "call":
        Linking.openURL(`tel:${user_cellno}`);
        break;
    }
  };

  // console.log(typeof id, typeof data.user_id, "-----BOTTOM BAR");

  return (
    <View style={styles.bottomView}>
      {data?.user_id != id && (
        <TouchableOpacity
          onPress={() => onPress("chat")}
          style={styles.touchable}>
          <MaterialIcons name="email" size={22} color="white" />
          <Text style={styles.text_touchable}>Chat</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={() => onPress("whatsapp")}
        style={styles.touchable}>
        <FontAwesome name="whatsapp" size={22} color="white" />
        <Text style={styles.text_touchable}>WhatsApp</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onPress("call")}
        style={styles.touchable}>
        <Feather name="phone-call" size={20} color="white" />
        <Text style={styles.text_touchable}>Call</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  bottomView: {
    width: width,
    height: Platform.OS == "ios" ? 80 : 60,
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
  },

  touchable: {
    width: 110,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: Colors.blue,
    flexDirection: "row",
  },
  text_touchable: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
    marginLeft: 5,
  },
});
