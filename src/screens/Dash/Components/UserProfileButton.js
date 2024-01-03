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

const UserProfileButton = ({ navProps, data, screenName }) => {
  // console.log("data", data)
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() =>
        navProps.navigate("UserProfileDetail", { user_id: data?.id })
      }
      style={styles.mainContainer}>
      <Image
        source={{
          uri:
            "https://devstaging.a2zcreatorz.com/assetLinker_laravel/storage/app/public/images/userProfile/" +
            data?.image,
        }}
        style={styles.image}
      />
      <View style={styles.inner_cont}>

        {/* if real _estate_name is empty show firm_name */}
        {/* Real Estate Name */}
        {(data?.detail[0]?.frim_name == undefined || data?.detail[0]?.frim_name == "" || data?.detail[0]?.frim_name == null) ? <></> :
          <Text style={[styles.text, { fontWeight: "700" }]}>{data?.detail[0]?.frim_name}</Text>}

        {/* if firm_name is empty show real_estate_name */}
        {/* Firm Name */}
        {(data?.detail[0]?.real_estate_name == undefined || data?.detail[0]?.real_estate_name == "" || data?.detail[0]?.real_estate_name == null) ? <></> :
          <Text style={[styles.text, { fontWeight: "700" }]}>{data?.detail[0]?.real_estate_name}</Text>}

        {/* Designation */}

        {/* User Name */}
        {/* <View style={{
          flexDirection: "row",
          marginTop: (data?.detail[0]?.designation == undefined ||
            data?.detail[0]?.designation == "") ? 0 : 10,
          marginBottom: (data?.detail[0]?.designation == undefined ||
            data?.detail[0]?.designation == "") ? 0 : 10,
          alignItems: "center"
        }}>

          {(
            data?.detail[0]?.designation == undefined ||
            data?.detail[0]?.designation == "") ?
            <></>
            : */}

        {/* } */}




        {/* </View> */}
        <Text style={[styles.text, {
          fontWeight: "500",
          marginBottom: (data?.detail[0]?.designation == undefined ||
            data?.detail[0]?.designation == "" || data?.detail[0]?.designation == null || data?.detail[0]?.designation == "NULL") ? -3 : 3,
        }]}
        >{data?.name}</Text>

        {(data?.detail[0]?.designation == undefined ||
          data?.detail[0]?.designation == "" || data?.detail[0]?.designation == null || data?.detail[0]?.designation == "NULL") ? <></>
          :
          <View style={{
            width: 60,
            height: 25,
            backgroundColor: Colors.blue,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            // marginVertical: 3
          }}>
            <Text style={[styles.text, { fontWeight: "800", fontSize: 15, color: "white", letterSpacing: 1 }]}>{data?.detail[0]?.designation}</Text>
          </View>}

        {/* <View style={{ flexDirection: "row", columnGap: 5 }}>
          <Text style={[styles.text, { fontWeight: "600" }]}>
            Member Since:
          </Text>
          <Text style={[styles.text, { fontWeight: "400" }]}>
            {moment(data?.member_since).format("YYYY-MM-DD")}
          </Text>
        </View> */}


        {/* See Profile Button */}
        <TouchableOpacity
          onPress={() => {
            navProps.navigate("AccountDetail", {
              user_id: data?.id,
              created_at: data?.member_since,
              image: data?.image,
              name: data?.name,
            });
          }}
          style={{
            marginTop: (data?.detail[0]?.designation == undefined ||
              data?.detail[0]?.designation == "") ? -5 : 5,
            flexDirection: "row",
            // marginLeft: 2
          }}>

          <Text style={styles.seeProfileText}>See Profile </Text>

          <Feather
            name="chevron-right"
            size={20}
            color="black"
          // style={{ position: "absolute", right: 30 }}
          />

        </TouchableOpacity>
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
    height: 90,
    // borderWidth: 1,
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 90,
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
    color: "black",
  },
});
