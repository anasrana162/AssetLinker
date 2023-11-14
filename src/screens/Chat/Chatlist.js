import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../../config";
import LoadingModal from "../../components/LoadingModal";
import Swipeable from "react-native-gesture-handler/Swipeable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Chatlist = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, seCurrentUser] = useState([]);

  const getUsers = async () => {
    const res = await AsyncStorage.getItem("@assetlinker_userData");
    const data = JSON.parse(res);
    const tempData = [];
    firestore()
      .collection("users")
      .where("email", "!=", data?.email)
      .get()
      .then((res) => {
        if (res?.docs != []) {
          res.docs.map((item) => {
            tempData.push(item.data());
          });
        }
        setUsers(tempData);
        seCurrentUser(data);
        // console.log(data, "currentUser");
      })
      .catch((error) => {
        console.log("ERROR: ", error.message);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const onSwipeDelete = () => {
    console.log("onSwipeDelete");
  };

  const handleDelete = () => {
    console.log("handleDelete");
  };

  const rightAction = () => {
    return (
      <View
        style={{
          justifyContent: "center",
        }}>
        <TouchableOpacity
          onPress={() => handleDelete()}
          style={styles.deleteBTN}>
          <MaterialIcons name="delete" color={"white"} size={25} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    // {/* <LoadingModal bgc="transparent" /> */}
    <View style={styles.main}>
      {users.length == 0 ? (
        <Text
          style={{
            color: "grey",
            textAlign: "center",
            marginTop: 55,
            fontSize: 16,
          }}>
          Chat list is empty
        </Text>
      ) : (
        <ScrollView>
          {users.map((item, index) => {
            console.log(item);
            return (
              <Swipeable
                key={index}
                onSwipeableOpen={onSwipeDelete}
                renderRightActions={rightAction}>
                <User
                  name={item?.name}
                  navHandler={() =>
                    navigation.navigate("ChatScreen", {
                      data: item,
                      id: currentUser?.detail[0].user_id,
                    })
                  }
                />
              </Swipeable>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default Chatlist;

const User = ({ name, navHandler }) => (
  <TouchableOpacity
    onPress={navHandler}
    activeOpacity={0.8}
    style={styles.userContainer}>
    <View style={styles.circle}>
      <Text style={{ color: "#fff", fontSize: 18, fontWeight: "500" }}>
        {name[0]}
      </Text>
    </View>
    <Text style={{ color: "#000", fontSize: 16, fontWeight: "600" }}>
      {name}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    columnGap: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: ",#fff",
  },
  circle: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: "dodgerblue",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteBTN: {
    backgroundColor: "red",
    height: "100%",
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
