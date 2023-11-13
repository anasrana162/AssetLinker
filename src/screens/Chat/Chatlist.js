import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../../config";

const Chatlist = () => {
  const getUsers = async () => {
    const res = await AsyncStorage.getItem("@assetlinker_userData");
    const data = JSON.parse(res);

    firestore()
      .collection("users")
      .where("email", "!=", data?.email)
      .get()
      .then((res) => {
        console.log(JSON.stringify(res.docs[0].data()));
      })
      .catch((error) => {
        console.log("ERROR: ", error.message);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View style={styles.main}>
      <ScrollView>
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
        <User />
      </ScrollView>
    </View>
  );
};

export default Chatlist;

const User = () => (
  <TouchableOpacity
    activeOpacity={0.8}
    style={{
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      columnGap: 15,
      padding: 10,
      borderBottomWidth: 1,
      borderColor: "#ddd",
    }}>
    <View
      style={{
        width: 45,
        height: 45,
        backgroundColor: "dodgerblue",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Text style={{ color: "#fff", fontSize: 18, fontWeight: "500" }}>R</Text>
    </View>
    <Text style={{ color: "#000", fontSize: 18, fontWeight: "600" }}>Name</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
