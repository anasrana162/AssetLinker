import {
  Text,
  View,
  Dimensions,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Linking,
  RefreshControl,
  StyleSheet,
  NativeModules,
  Modal,
  Platform,
} from "react-native";
import React, { Component } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const {
  StatusBarManager: { HEIGHT },
} = NativeModules;
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height - HEIGHT;

{
  /* {---------------Redux Imports------------} */
}
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/user";
import { bindActionCreators } from "redux";
import ImageViewer from "../Dash/Components/ImageViewer";

import { Colors } from "../../config";
import moment from "moment";
import UserProfileButton from "../Dash/Components/UserProfileButton";
import BottomBar from "../Dash/Components/BottomBar";
import AssetLinkers from "../../api/AssetLinkers";
import AsyncStorage from "@react-native-async-storage/async-storage";

class PostDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: 0,
      localUserID: "",
    };
  }

  onPress = (key) => {
    var { image, name, member_since, user_id } =
      this.props?.route?.params?.data;
    switch (key) {
      case "goback":
        this.props.navigation.navigate("Dash", { refresh: "refresh" });
        break;
      case "share":
        Linking.openURL(`https://assetslinkers.com`);
        break;
      case "openUserDetail":
        this.props.navigation.navigate("AccountDetail", {
          user_id: user_id,
          created_at: member_since,
          image: image,
          name: name,
        });
        break;
    }
  };

  getLocaluser = async () => {
    const res = await AsyncStorage.getItem("@assetlinker_userData");
    const data = JSON.parse(res);
    this.setState({ localUserID: data?.detail[0].user_id });
  };

  componentDidMount = () => {
    this.runSlideShow();
    this.AddView();
    this.getLocaluser();
  };

  runSlideShow = () => {
    var { data } = this.props?.route?.params;

    this.setState({
      interval: setInterval(() => {
        this.setState({
          position:
            this.state.position === data?.post_images.length
              ? 0
              : this.state.position + 1,
        });
      }, 2000),
    });
  };

  AddView = () => {
    var {
      data: { id, user_id },
    } = this.props?.route?.params;
    var {
      userData: { user },
    } = this.props;

    if (user_id !== user?.id) {
      AssetLinkers.post("postViews", {
        post_id: id,
      })
        .then((res) => {
          console.log("View Added");
        })
        .catch((err) => {
          console.log("Add Views Api Error", err?.response);
        });
    } else {
      console.log("The user is the post creator no view added");
    }
  };

  componentWillUnmount = () => {
    clearInterval(this.state.interval);
  };

  render() {
    var { data, location, subLocation } = this.props?.route?.params;

    var user_type = "";
    switch (data?.user_type) {
      case "buyer_seller":
        user_type = "Buyer/Seller";
        break;
      case "estate_agent":
        user_type = "Consultant";
        break;
      case "builder":
        user_type = "Builder";
        break;
    }

    // console.log("=================>>>>", data);

    return (
      <View style={styles.mainContainer}>
        {/* Header */}
        <View style={styles.headerCont}>
          {/* Go back */}
          <TouchableOpacity
            style={[styles.headerBtn, { marginLeft: 5 }]}
            onPress={() => this.onPress("goback")}>
            <Ionicons name="chevron-back" size={30} color="white" />
          </TouchableOpacity>

          {/* Share Button */}
          <TouchableOpacity
            style={[styles.headerBtn, { marginRight: 15 }]}
            onPress={() => this.onPress("share")}>
            <Ionicons name="share-social" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Images Viewer */}
          <ImageViewer
            Images={data?.post_images}
            position={this.state.position}
          />

          {/* Information */}

          {/* Property Type */}
          <Text style={styles.propertyTypeText}>{data?.property_type}</Text>

          {/* Price */}
          <Text style={styles.priceText}>Price: {data?.price} PKR</Text>

          {/* Main Features */}
          <Text style={styles.posted_at}>Main Features:</Text>
          <Text
            style={[
              styles.main_features_text,
              { fontWeight: "300", fontSize: 15 },
            ]}>
            {data?.main_features}
          </Text>

          {/* Location */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                flexDirection: "row",
                width: "60%",
              }}>
              <Ionicons
                name="location-sharp"
                color={Colors.black}
                size={22}
                style={{ marginTop: 7 }}
              />
              <Text
                style={[
                  styles.posted_at,
                  { marginLeft: 0, fontWeight: "400", fontSize: 14 },
                ]}>
                {location}{subLocation == "Null" ? "" : ", " + subLocation}
              </Text>
            </View>

            {/* Posted At */}
            <Text
              style={[styles.posted_at, { fontWeight: "400", fontSize: 14 }]}>
              Posted: {moment(data?.created_at).format("DD-MM-YYYY")}
            </Text>
          </View>

          {/*  Detail */}
          <View style={styles.moreDetailCont}>
            {/* More Details Title */}
            <Text
              style={[
                styles.propertyTypeText,
                { fontSize: 18, marginBottom: 10, marginLeft: 20 },
              ]}>
              Details
            </Text>

            {/* GRID */}

            {/* Plot Category */}
            {data?.category !== "Null" && (
              <View style={styles.inner_moreDetailCont}>
                <Text style={styles.gridText2}>Category</Text>
                <Text style={styles.gridText1}>{data?.category}</Text>
              </View>
            )}

            {/* Sale/Rent*/}
            {data?.rent_sale !== "Null" && data?.property_type !== "Plot" && (
              <View style={styles.inner_moreDetailCont}>
                <Text style={styles.gridText2}>Sale/Rent</Text>
                <Text style={styles.gridText1}>{data?.rent_sale}</Text>
              </View>
            )}

            {/* Area Unit */}
            {/* {data?.area_unit !== "Null" && (
              <View style={styles.inner_moreDetailCont}>
                <Text style={styles.gridText2}>Area Unit</Text>
                <Text style={styles.gridText1}>{data?.area_unit}</Text>
              </View>
            )} */}

            {/* Yards*/}
            {data?.yards !== "Null" && (
              <View style={styles.inner_moreDetailCont}>
                <Text style={styles.gridText2}>Yards</Text>
                <Text style={styles.gridText1}>{data?.yards.toLowerCase()}</Text>
              </View>
            )}

            {/* Location */}
            {location !== "Null" && (
              <View style={styles.inner_moreDetailCont}>
                <Text style={styles.gridText2}>Location</Text>
                <Text style={styles.gridText1}>{location}{subLocation == "Null" ? "" : ", " + subLocation}</Text>
              </View>
            )}

            {/* Sub Location */}
            {/* {subLocation !== "Null" && (
              <View style={styles.inner_moreDetailCont}>
                <Text style={styles.gridText2}>Sub Location</Text>
                <Text style={styles.gridText1}>{subLocation}</Text>
              </View>
            )} */}

            {/* Construction Status */}

            {/* Corner West or east option */}

            <View style={styles.inner_moreDetailCont}>
              <Text style={styles.gridText2}>Status</Text>
              <Text
                numberOfLines={2}
                style={[styles.gridText1, { width: 100 }]}>
                {data?.corner} | {data?.open}
              </Text>
            </View>

            {/* Rooms */}
            {data?.rooms !== "Null" && (
              <View style={styles.inner_moreDetailCont}>
                <Text style={styles.gridText2}>Rooms</Text>
                <Text style={styles.gridText1}>{data?.rooms}</Text>
              </View>
            )}

            {/* Bedrooms */}
            {data?.bedrooms !== "Null" && (
              <View style={styles.inner_moreDetailCont}>
                <Text style={styles.gridText2}>Bedrooms</Text>
                <Text style={styles.gridText1}>{data?.bedrooms}</Text>
              </View>
            )}

            {/* Bathrooms */}
            {data?.bathrooms !== "Null" && (
              <View style={styles.inner_moreDetailCont}>
                <Text style={styles.gridText2}>Bathrooms</Text>
                <Text style={styles.gridText1}>{data?.bathrooms}</Text>
              </View>
            )}

            {/* Area Type */}
            {data?.phase !== "Null" && (
              <View style={styles.inner_moreDetailCont}>
                <Text style={styles.gridText2}>Area Type</Text>
                <Text style={styles.gridText1}>{data?.phase}</Text>
              </View>
            )}

            {/* Furnished */}
            {data?.furnished !== "Null" && (
              <View style={styles.inner_moreDetailCont}>
                <Text style={styles.gridText2}>Furn/Unfurn</Text>
                <Text style={styles.gridText1}>{data?.furnished}</Text>
              </View>
            )}
          </View>

          {/* Description */}
          <Text style={styles.posted_at}>Description:</Text>
          <Text style={styles.main_features_text}>{data?.details}</Text>

          {/* MSID */}
          <Text style={styles.posted_at}>MSID: {data?.ms_id}</Text>

          {/* User Type Button */}
          <TouchableOpacity
            onPress={() => this.onPress("openUserDetail")}
            style={styles.user_type_btn}>
            <Text style={styles.user_type_btn_text}>{user_type}</Text>
          </TouchableOpacity>

          {/* Address */}
          {data?.address !== "Null" && (
            <>
              <Text style={styles.posted_at}>Address:</Text>
              <Text
                style={[
                  styles.main_features_text,
                  { fontWeight: "400", fontSize: 15 },
                ]}>
                {data?.address}
              </Text>
            </>
          )}

          <UserProfileButton navProps={this.props.navigation} data={data} />
        </ScrollView>

        {data?.user_id != this.state.localUserID && (
          <BottomBar
            data={data}
            id={this.state.localUserID}
            user_cellno={data?.phone}
          />
        )}
      </View>
    );
  }
}

{
  /* {---------------redux State ------------} */
}
const mapStateToProps = (state) => ({
  userData: state.userData,
});

{
  /* {---------------redux Actions ------------} */
}
const ActionCreators = Object.assign({}, userActions);
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    width: width,
    // height: height,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "white",
  },
  headerCont: {
    width: width,
    height: 45,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 0,
    zIndex: 200,
    backgroundColor: Colors.fadedBackground,
  },
  headerBtn: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },

  moreDetailCont: {
    width: width - 40,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "flex-start",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#aaa",
    marginTop: 20,
    paddingBottom: 10,
  },
  inner_moreDetailCont: {
    width: "90%",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  user_type_btn: {
    width: width - 40,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: Colors.blue,
    borderRadius: 10,
    marginVertical: 15,
  },
  user_type_btn_text: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
  },
  gridText1: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.black,
    textAlign: "right",
  },
  gridText2: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
  },
  propertyTypeText: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.black,
    marginTop: 20,
    marginLeft: 10,
  },
  priceText: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.black,
    marginTop: 10,
    marginLeft: 10,
  },

  posted_at: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.black,
    marginTop: 10,
    marginLeft: 10,
  },

  main_features_text: {
    fontSize: 15,
    fontWeight: "400",
    color: Colors.black,
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 10,
    width: width - 40,
  },
});
