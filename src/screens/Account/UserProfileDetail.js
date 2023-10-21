import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  NativeModules,
} from "react-native";
import React, { useEffect, useState } from "react";
import AssetLinkers, { ImagePath } from "../../api/AssetLinkers";
import { Colors } from "../../config";
import moment from "moment";

const {
  StatusBarManager: { HEIGHT },
} = NativeModules;
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height - HEIGHT;

const UserProfileDetail = ({ route }) => {
  const [profile, setProfile] = useState();
  const id = route?.params?.user_id;
  const memberSince = moment(profile?.created_at).format("YYYY/MM/DD");

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await AssetLinkers.get(`/allUser/${id}`);

        setProfile(res?.data?.response[0]);
      } catch (error) {
        console.log("GET User Profile Error: ", error);
      }
    };
    getProfile();
  }, []);

  console.log(profile, "***********************");
  return (
    <View style={styles.mainContainer}>
      {/* Banner */}
      <View style={styles.banner}>
        <Image
          source={{ uri: `${ImagePath}/${profile?.image}` }}
          style={styles.img}
        />
        <View style={{ marginTop: 50 }}>
          <Text style={styles.name}>{profile?.name}</Text>
          <Text style={styles.memberSince}>Member Since: {memberSince}</Text>
        </View>
      </View>

      {/* Details */}
      <TextBox title="Email" label={profile?.email} />
      <TextBox title="Phone" label={profile?.phone} />
      <TextBox title="About Us" label={profile?.email} />
      <TextBox title="Email" label={profile?.email} />
    </View>
  );
};

export default UserProfileDetail;

const TextBox = ({ label, title }) => (
  <View style={styles.textBox}>
    <Text style={styles.textBoxTitle}>{title} :</Text>
    <Text style={styles.boxText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: Colors.white,
  },
  banner: {
    backgroundColor: Colors.blue,
    height: "13%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    columnGap: 20,
    // borderBottomRightRadius: 45,
    borderBottomLeftRadius: 45,
    marginBottom: 70,
  },
  img: {
    height: 110,
    width: 110,
    borderRadius: 99,
    borderColor: Colors.white,
    borderWidth: 5,
    marginTop: 60,
  },
  name: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: "600",
  },
  memberSince: {
    fontSize: 12,
    color: Colors.white,
    fontWeight: "300",
  },
  textBox: {
    width: "95%",
    height: 50,
    borderColor: "#bbb",
    borderBottomWidth: 1,
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  textBoxTitle: { color: Colors.black, fontSize: 12, fontWeight: "500" },
  boxText: { color: Colors.black, fontSize: 16, fontWeight: "300" },
});
