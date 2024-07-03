import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useState } from "react";
const {
  StatusBarManager: { HEIGHT },
} = NativeModules;
const width = Dimensions.get("screen").width;
import { Colors } from "../../../config";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const MenuBar = ({ navProps, logout, disable }) => {
  // States
  const [value, setValue] = useState(null);
  const [openDropdown, setOpenDropDown] = useState(false);
  const data = [
    {
      label: "Profile",
      value: "2",
      icon: "supervised-user-circle",
      disable: disable,
    },
    {
      label: "Contact Us",
      value: "2",
      icon: "supervised-user-circle",
      disable: false,
    },
    // {label: 'Notification', value: '1', icon: 'notifications-none'},
    { label: "Logout", value: "2", icon: "logout", disable: disable },
  ];

  const onPress = (key) => {
    switch (key) {
      case "magazine":
        Linking.openURL(`https://assetslinkers.com`);
        break;
      case "Contact Us":
        navProps.navigate("ContactUS");
        break;
      case "Menu":
        if (disable == true) {
          return navProps.navigate("Login");
        }
        setOpenDropDown(!openDropdown);
        break;

      case "Profile":
        setOpenDropDown(false);
        navProps.navigate("MyProfile");
        break;

      case "Logout":
        setOpenDropDown(false);
        logout();
        break;

      case "news":
        navProps.navigate("AssociationNews");
      // Linking.openURL(
      //     `https://assetslinkers.com/association-news/`,
      // )
    }
  };

  return (
    <View style={styles.componentCont}>
      <View style={styles.mainContainer}>
        {/* Magazine */}
        <TouchableOpacity
          onPress={() => onPress("magazine")}
          style={styles.touchable}
        >
          <Text style={styles.touchable_text}>Magazine</Text>
          <MaterialCommunityIcons
            name={"book-open-page-variant-outline"}
            size={24}
            color={"white"}
          />
        </TouchableOpacity>

        {/* Association News */}
        <TouchableOpacity
          onPress={() => onPress("news")}
          style={styles.touchable}
        >
          <Text style={styles.touchable_text}>Association News</Text>
          <MaterialCommunityIcons
            name={"microphone"}
            size={24}
            color={"white"}
          />
        </TouchableOpacity>

        {/* Notifications */}
        <TouchableOpacity style={styles.touchable}>
          <Ionicons name={"notifications-sharp"} size={20} color={"white"} />
        </TouchableOpacity>

        {/* Menu */}
        <TouchableOpacity onPress={() => onPress("Menu")}>
          <Ionicons name="menu-sharp" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      {openDropdown && (
        <View style={styles.dropdown}>
          {data.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => onPress(item?.label)}
                disabled={item?.disable}
                style={styles.item}
              >
                <Text style={styles.item_text}>{item?.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default MenuBar;

const styles = StyleSheet.create({
  componentCont: {
    width: width,
    backgroundColor: Colors.backgroundColor,
  },
  mainContainer: {
    width: "100%",
    // height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 10,
  },
  touchable: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent:"center"
  },
  touchable_text: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
    marginTop: 3,
    marginRight: 5,
  },
  dropdown: {
    width: 80,
    //  height: 100,
    backgroundColor: "white",
    alignSelf: "flex-end",
    marginRight: 5,
    // position: "absolute",
    // right: 5,
    // bottom: -61,
    zIndex: 200,
    borderWidth: 1,
  },
  item: {
    width: "100%",
    height: 30,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  item_text: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.black,
  },
});
