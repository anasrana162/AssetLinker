import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  Dimensions,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import React, { useState } from "react";
const {
  StatusBarManager: { HEIGHT },
} = NativeModules;
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height
import { Colors } from "../config";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


export default TabNavigator = ({ navProps, screenName, isLoggedIn }) => {

  const data = [
    {
      id: 1,
      label: "Home",
      navName: "Dash",
      iconName: "home",
      disable: false,
    },
    {
      id: 2,
      label: "Chat",
      navName: "Chatlist",
      iconName: "message-outline",
      disable: isLoggedIn,
    },
    {
      id: 3,
      label: "Post",
      navName: "Post",
      iconName: "plus-circle-outline",
      disable: isLoggedIn,
    },
    {
      id: 4,
      label: "Favourite",
      navName: "Favourite",
      iconName: "heart-outline",
      disable: isLoggedIn,
    },
    {
      id: 5,
      label: "Account",
      navName: "Account",
      iconName: "account-settings-outline",
      disable: isLoggedIn,
    },
  ];

  return (
    <View style={styles.mainContainer}>
      {data.map((item, index) => {
        return (
          <TouchableOpacity
            key={String(item?.id)}
            style={styles.item}
            onPress={() => {
              console.log("LOGGED IN",isLoggedIn);
              if (isLoggedIn == true) {
                return navProps.navigate("Login")
              }
              navProps.navigate(item?.navName)
            }}>
            <MaterialCommunityIcons
              name={item?.iconName}
              size={22}
              color={screenName == item?.navName ? "#FFB100" : "white"}
            />
            <Text
              style={[
                styles.item_text,
                {
                  color: screenName == item?.navName ? "#FFB100" : "white",
                },
              ]}>
              {item?.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: Colors.main,
    position: "absolute",
    bottom: Platform.OS == "ios" ? height <= 680 ? 0 : 20 : 0,
    padding: 7,
    zIndex: 1000,
  },
  item: {
    width: 70,
    alignItems: "center",
  },
  item_text: { color: "white", fontSize: 12, fontWeight: "600", marginTop: 2 },
});
