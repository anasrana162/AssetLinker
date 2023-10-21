import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Colors } from "../../../config";
import moment from "moment";
import Feather from "react-native-vector-icons/Feather";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const UserProfileButton = ({ navProps, data }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() =>
        navProps.navigate("UserProfileDetail", { user_id: data?.user_id })
      }
      style={styles.mainContainer}
    >
      <Image
        source={{
          uri:
            "https://devstaging.a2zcreatorz.com/assetLinker_laravel/storage/app/public/images/userProfile/" +
            data?.image,
        }}
        style={styles.image}
      />
      <View style={styles.inner_cont}>
        <Text style={[styles.text, { fontWeight: "700" }]}>{data?.name}</Text>
        <View style={{ flexDirection: "row", columnGap: 10 }}>
          <Text style={[styles.text, { fontWeight: "600" }]}>
            Member Since:
          </Text>
          <Text style={[styles.text, { fontWeight: "400" }]}>
            {moment(data?.member_since).format("YYYY-MM-DD")}
          </Text>
        </View>

        <Text style={styles.seeProfileText}>See Profile </Text>
      </View>

      <Feather
        name="chevron-right"
        size={30}
        color="black"
        style={{ position: "absolute", right: 30 }}
      />
    </TouchableOpacity>
  );
};

export default UserProfileButton;

const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: 100,
    // borderWidth: 1,
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 100,
  },
  inner_cont: {
    width: "60%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start",
    // borderWidth: 1
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 80,
    marginLeft: 10,
    marginRight: 15,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
  },
  seeProfileText: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.black,
  },
});
