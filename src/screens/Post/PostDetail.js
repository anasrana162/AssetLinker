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
import Share from 'react-native-share';

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
import RNFS from "react-native-fs";
import ImageModal from "./Components/ImageModal";

class PostDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: 0,
      localUserID: "",
      postUserData: "",
      imageModal: {
        isOpen: false,
        image: "",
        index: 0,
      }
    };
  }

  onPress = async (key) => {
    var { image, name, member_since, user_id, post_images, category, details, property_type, price, address, rent_sale } =
      this.props?.route?.params?.data;
    var { data } = this.props?.route?.params;

    switch (key) {
      case "goback":
        this.props.navigation.navigate("Dash");
        break;
      case "share":


        const options = {
          title: category,
          subject: property_type,
          message: ` ${category} ${'\n'} ${'\n'}Category: ${property_type} ${'\n'} ${'\n'}${details} ${'\n'} ${address} ${'\n'} ${'\n'}Price: ${price} ${'\n'} ${'\n'}Rent/Sale: ${rent_sale} ${'\n'} ${'\n'} Download the App: ${'\n'} https://play.google.com/store/apps/details?id=com.assetlinker1 `,
          // url: "https://devstaging.a2zcreatorz.com/assetLinker_laravel/storage/app/public/images/property/" + post_images[0]
        };

        Share.open(options)

        break;
      case "openUserDetail":
        this.props.navigation.navigate("AccountDetail", {
          user_id: user_id,
          created_at: member_since,
          image: image,
          name: name,
          // designation: designation
        });
        break;
      case "update":
        this.props.navigation.navigate("PostUpdate", {
          data: data,
        });
        break;
    }
  };

  getLocaluser = async () => {
    var {
      userData: { user },
    } = this.props;
    const res = user
    // const data = JSON.parse(res);
    // console.log(res,"data in getLocal User");
    this.setState({ localUserID: res?.detail[0].user_id, });
  };

  componentDidMount = () => {
    this.runSlideShow();
    this.AddView();
    this.getLocaluser();
    this.getPostUserDetail()
  };

  getPostUserDetail = () => {
    var { data, location, subLocation } = this.props?.route?.params;
    console.log("data?.user_id", data?.user_id);
    AssetLinkers.post('/single_user', {
      user_id: data?.user_id
    }).then((res) => {
      console.log("specifix user detail API Post detail screen Res:", res?.data)
      setImmediate(() => {
        this.setState({
          postUserData: res?.data?.response[0]
        })
      })
    }).catch(err => {
      console.log("specifix user detail API Post detail screen err", err.response?.data)
    })
  }

  // getUserDetail = async () => {
  //   const res = await AssetLinkers.get("/allUser");
  // }

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
      data: { id, user_id }, index
    } = this.props?.route?.params;

    var {
      userData: { user, homeposts }, actions
    } = this.props;
    console.log("this.props?.route?.params;", this.props?.route?.params);
    if (Object.keys(user).length == 0) {

    } else {

      if (user_id !== user?.id) {
        AssetLinkers.post("postViews", {
          post_id: id,
        })
          .then((res) => {
            // console.log("View Added", homeposts[index]);

            homeposts[index].views = homeposts[index]?.views + 1

            actions.homePosts(homeposts)

          })
          .catch((err) => {
            console.log("Add Views Api Error", err?.response);
          });
      } else {
        console.log("The user is the post creator no view added");
      }
    }
  };

  openImageModal = (image, index) => {
    console.log("Image Slected for Modal: ", image,
      `${'\n'}`,
      "Image Index fro Modal: ", index
    );
    this.setState({
      imageModal: {
        isOpen: true,
        image: image,
        index: index,
      }
    })
  }

  closeImageModal = () => {
    this.setState({
      imageModal: {
        isOpen: false,
        image: "",
        index: 0,
      }
    })
  }

  componentWillUnmount = () => {
    clearInterval(this.state.interval);
  };

  render() {
    var { data, location, subLocation } = this.props?.route?.params;
    // console.log(data,"jkabdhjbjshdc");
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

          <View style={{ flexDirection: "row" }}>

            {/* Share Button */}
            <TouchableOpacity
              style={[styles.headerBtn, { marginRight: 15 }]}
              onPress={() => this.onPress("share")}>
              <Ionicons name="share-social" size={30} color="white" />
            </TouchableOpacity>

            {/* Update Button */}
            {/* {data?.user_id == this.props.userData?.user?.id && <TouchableOpacity
              style={[styles.headerBtn, { marginRight: 15 }]}
              onPress={() => this.onPress("update")}>
              <Ionicons name="pencil" size={25} color="white" />
            </TouchableOpacity>} */}
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={{ width: width }}>

          {/* {console.log("post_images",data?.post_images)} */}

          {/* Images Viewer */}
          <ImageViewer
            Images={data?.videos == null ? [...data?.post_images] : [...data?.post_images, ...data?.videos]}
            // Videos={data?.videos}
            position={data?.post_images?.length == 1 ? 0 : this.state.position}
            openImageModal={(image, index) => this.openImageModal(image, index)}
          />

          {/* Information */}

          {/* Property Type */}
          <Text style={styles.propertyTypeText}>{data?.property_type}</Text>

          {/* Price */}
          <Text style={styles.priceText}>Price: {data?.price} PKR</Text>

          {/* Main Features */}
          {/* <Text style={styles.posted_at}>Main Features:</Text>
          <Text
            style={[
              styles.main_features_text,
              { fontWeight: "300", fontSize: 15 },
            ]}>
            {data?.main_features}
          </Text> */}

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
                <Text style={styles.gridText2}>Area Unit</Text>
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

            {(data?.corner == "Null" && data?.open == "Null") ||
              (data?.corner == "" && data?.open == "") ? <></> :
              < View style={styles.inner_moreDetailCont}>
                <Text style={styles.gridText2}>Status</Text>
                <Text
                  numberOfLines={2}
                  style={[styles.gridText1, { width: 100 }]}>
                  {data?.corner} | {data?.open}
                </Text>
              </View>}

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

            {/* Plot Status */}
            {data?.phase !== "Null" && (
              <View style={styles.inner_moreDetailCont}>
                <Text style={styles.gridText2}>Plot Status</Text>
                <Text style={[styles.gridText1, { width: 150 }]}>{data?.phase}</Text>
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
          {/* Address */}
          {
            data?.address !== "Null" && (
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
            )
          }


          {/* User Type Button */}
          <TouchableOpacity
            onPress={() => this.onPress("openUserDetail")}
            style={styles.user_type_btn}>
            <Text style={styles.user_type_btn_text}>{user_type}</Text>
          </TouchableOpacity>

          {/* MSID */}
          {/* {console.log("data?.ms_id", data)} */}
          <Text style={styles.posted_at}>MSID: {data?.ms_id}</Text>

          <View style={{ flexDirection: "row", columnGap: 5, marginLeft: 10, marginTop: 5 }}>
            <Text style={[styles.text, { fontWeight: "600" }]}>
              Member Since:
            </Text>
            <Text style={[styles.text, { fontWeight: "400" }]}>
              {moment(data?.member_since).format("YYYY-MM-DD")}
            </Text>
          </View>

          {
            !this.state.postUserData == "" &&
            <UserProfileButton
              navProps={this.props.navigation}
              data={this.state.postUserData}
            />
          }

        </ScrollView >

        {/* Chat, Whatsapp, call */}
        {data?.user_id != this.state.localUserID && (
          <BottomBar
            data={data}
            id={this.state.localUserID}
            user_cellno={this.state.postUserData?.phone}
            disableChat={Object.keys(this.props.userData?.user).length == 0 ? true : false}
          />
        )
        }

        {/* Image Modal */}
        {
          this.state.imageModal?.isOpen == true &&
          <ImageModal
            imageSelected={this.state.imageModal?.image}
            indexSelected={this.state.imageModal?.index}
            images={data?.videos == null ? data?.post_images[0] == "" ? [] : data?.post_images : [...data?.post_images, ...data?.videos]}
            closeModal={() => this.closeImageModal()}
            videoLink={"https://devstaging.a2zcreatorz.com/assetLinker_laravel/storage/app/public/videos/property/"}
            imageLink={"https://devstaging.a2zcreatorz.com/assetLinker_laravel/storage/app/public/images/property/"}
          />
        }

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
    zIndex: 50,
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
    fontSize: 14,
    fontWeight: "400",
    color: Colors.black,
    textAlign: "right",
  },
  gridText2: {
    fontSize: 14,
    fontWeight: "500",
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
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
  },
});
