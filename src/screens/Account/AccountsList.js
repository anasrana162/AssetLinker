import {
  StyleSheet,
  Text,
  TextInput,
  View,
  NativeModules,
  Dimensions,
} from "react-native";
import React from "react";
import { Colors } from "../../config";
import { Image } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { TouchableOpacity } from "react-native";

const {
  StatusBarManager: { HEIGHT },
} = NativeModules;
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height - HEIGHT;

const AccountsList = () => {
  return (
    <View style={styles.mainContainer}>
      <SearchBar />
      <CustomerContainer />
      <CustomerContainer />
      <CustomerContainer />
    </View>
  );
};

export default AccountsList;

const SearchBar = ({ onChangeText }) => (
  <View style={styles.searchbar}>
    <TextInput
      style={styles.searchTextInput}
      placeholder="Search here..."
      placeholderTextColor="grey"
      onChangeText={onChangeText}
    />
  </View>
);

const CustomerContainer = () => (
  <View
    style={{
      width: width - 20,
      height: 80,
      borderBottomColor: "#ddd",
      borderBottomWidth: 1,
      // borderRadius: 10,
      // elevation: 3,
      // backgroundColor: "#eee",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 10,
    }}
  >
    <View style={{ width: "22%" }}>
      <Image
        source={require("../../../assets/profile.jpg")}
        style={{ width: 60, height: 60, borderRadius: 10 }}
      />
    </View>

    <View style={{ width: "48%", rowGap: 10 }}>
      <Text style={{ color: "#000", fontWeight: "300", fontSize: 18 }}>
        Mansoor Akhter
      </Text>
      <View
        style={{
          backgroundColor: Colors.blue,
          borderRadius: 20,
          width: 120,
        }}
      >
        <Text
          style={{
            color: "#fff",
            textTransform: "capitalize",
            // paddingHorizontal: 15,
            paddingVertical: 3,
            textAlign: "center",
          }}
        >
          buyer / seller
        </Text>
      </View>
    </View>

    <View style={{ width: "30%", rowGap: 10 }}>
      <Text style={{ color: "#0008", fontWeight: "600", fontSize: 16 }}>
        MS #05989
      </Text>
      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: Colors.blue,
            fontWeight: "400",
            fontSize: 14,
          }}
        >
          View Project
        </Text>
        <Entypo name="chevron-thin-right" size={14} color={Colors.blue} />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    rowGap: 10,
  },
  searchbar: {
    width: width,
    height: 52,
    backgroundColor: Colors.apple,
    padding: 5,
    paddingHorizontal: 10,
  },
  searchTextInput: {
    color: "#000",
    backgroundColor: "#fff",
    borderRadius: 50,
    paddingHorizontal: 20,
  },
});
