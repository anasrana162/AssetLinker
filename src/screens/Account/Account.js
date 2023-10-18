import {
  Text,
  StyleSheet,
  View,
  NativeModules,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { Component } from "react";
import Colors from "../../config/Colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const {
  StatusBarManager: { HEIGHT },
} = NativeModules;
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height - HEIGHT;

export default class Account extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const LongButton = ({ label, onPress }) => (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("AccountsList")}
        activeOpacity={0.6}
        style={styles.longBTN}
      >
        <Text style={styles.btnTitle}>{label}</Text>
        <MaterialCommunityIcons
          name="chevron-right-circle"
          size={25}
          color={"#000"}
        />
      </TouchableOpacity>
    );
    return (
      <View style={styles.mainContainer}>
        <LongButton label="buyer / seller" />
        <LongButton label="builder" />
        <LongButton label="consultant" />
        <LongButton label="all" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 20,
  },
  longBTN: {
    backgroundColor: Colors.apple,
    height: 45,
    width: width - 20,
    marginBottom: 10,
    elevation: 5,
    borderRadius: 10,
    paddingHorizontal: 20,
    borderWidth: 0.5,
    borderColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btnTitle: {
    color: "#000",
    fontSize: 16,
    fontWeight: "400",
    textTransform: "uppercase",
  },
});
