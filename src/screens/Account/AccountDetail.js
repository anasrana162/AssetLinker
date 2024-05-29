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
} from "react-native";
import React, { Component } from "react";

const {
  StatusBarManager: { HEIGHT },
} = NativeModules;
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height - HEIGHT;

import Entypo from 'react-native-vector-icons/Entypo'
import Feather from "react-native-vector-icons/Feather";
import { Colors } from "../../config";
import AssetLinkers, { ImagePath } from "../../api/AssetLinkers";
import AllPosts from "../Dash/Components/AllPosts";
import Toast from "react-native-toast-message";
{
  /* {---------------Redux Imports------------} */
}
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/user";
import { bindActionCreators } from "redux";
import moment from "moment";
import { ActivityIndicator } from "react-native-paper";
import axios from "axios";
import { resolveScrollRef } from "react-native-actions-sheet/dist/src/hooks/use-scroll-handlers";

class AccountDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Posts: null,
      openDeletePostModal: false,
      openReportPostModal: false,
      reportPostData: null,
      postID: "",
      loader: false,
      openDotModal: false,
    };
  }

  getUserPosts = async () => {
    console.log("Working");
    const { user_id } = this.props?.route?.params;
    setImmediate(() => {
      this.setState({ loader: true })
    })
    try {
      const res = await AssetLinkers.get(`get_property/${user_id}`);
      if (res?.data) {
        console.log("Get User Post api Data:  ", res?.data?.property);
        this.setState({
          Posts: res?.data?.property,
          loader: false,
        });
      }
    } catch (error) {
      console.log("Get Post api Error:  ", error);
      setImmediate(() => {
        this.setState({ loader: false })
      })
    }
  };

  addToFavourite = (user_id, postID, is_favourite) => {
    if (Object.keys(this.props.userData?.user).length == 0) {
      return this.props.navigation.navigate("Login")
    }
    switch (is_favourite) {
      case 0:
        AssetLinkers.post(
          "https://devstaging.a2zcreatorz.com/assetLinkerProject/api/save/favourite_post",
          {
            user_id: user_id,
            post_id: postID,
          }
        )
          .then((res) => {
            if (res?.data) {
              console.log("Add to favourite api Response:  ", res?.data);
              Toast.show({
                type: "success",
                text1: "Added to Favourites!",
                visibilityTime: 2000,
              });
              this.getUserPosts();
            }
          })
          .catch((err) => {
            console.log("Add to favourite api  Error:  ", err?.response);
          });
        break;

      case 1:
        console.log("remove like", user_id, postID);

        AssetLinkers.post(
          "https://devstaging.a2zcreatorz.com/assetLinkerProject/api/remove/favourite_post",
          {
            user_id: user_id,
            post_id: postID,
          }
        )
          .then((res) => {
            if (res?.data) {
              console.log("Add to favourite api Response:  ", res?.data);
              Toast.show({
                type: "success",
                text1: "Added to Favourites!",
                visibilityTime: 2000,
              });
              this.getUserPosts();
            }
          })
          .catch((err) => {
            console.log("Add to favourite api  Error:  ", err?.response);
          });
        break;
    }
  };

  onPress = (key) => {
    var { user_id } = this.props?.route?.params;
    var { userData: { user } } = this.props
    switch (key) {
      case "goback":
        this.props.navigation.goBack();
        break;

      case "block_user":

        AssetLinkers.post("/block", {
          "user_id": user?.id,
          "block_user_id": user_id
        }).then((res) => {
          console.log("res user block api", res?.data);
          alert("User blocked Successfully")
          this.props.navigation.navigate("Account", { refresh: "refresh" })
        }).catch((err) => {
          console.log("Err user block api", err);
        })


        break;
      // case "share":
      //     Linking.openURL(
      //         `https://assetslinkers.com`,
      //     )
      //     break;
    }
  };

  openDeletePostModal = (postID) => {
    if (Object.keys(this.props.userData?.user).length == 0) {
      return this.props.navigation.navigate("Login")
    }
    // console.log("POST TO DELETE:", postID);
    setImmediate(() => {
      this.setState({
        openDeletePostModal: true,
        postID: postID,
      });
    });
  };

  deletePost = () => {
    var {
      userData: {
        user: { id },
      },
    } = this.props;
    AssetLinkers.post("/delete_property", {
      user_id: id,
      post_id: this.state.postID,
    })
      .then((res) => {
        if (res?.data) {
          this.getPosts();
          this.setState({
            // openDeletePostModal: false,
            Posts: null,
          });
          Toast.show({
            type: "success",
            text1: "Post Deleted Successfully!",
            visibilityTime: 3000,
          });
          console.log("Delete Post API Response", res?.data);
        }
      })
      .catch((err) => {
        alert("Post Deletion Unsuccessful please try again");
        console.log("Delete Post API Error", err?.response);
      });
  };

  componentDidMount = () => {
    this.getUserPosts();
  };
  openReportModal = (item) => {
    if (Object.keys(this.props.userData?.user).length == 0) {
      return this.props.navigation.navigate("Login")
    }
    console.log("POST TO Report:", item);
    setImmediate(() => {
      this.setState({
        openReportPostModal: true,
        reportPostData: item,

      });
    });
  };

  reportAd = (complaintName) => {

    var { reportPostData } = this.state
    var { userData: { user } } = this.props

    AssetLinkers.post("/block/post", {
      "user_id": user?.id,
      "post_id": reportPostData?.id,
      "user_post_id": reportPostData?.user_id,
      "comment": complaintName
    }).then((res) => {
      // console.log("res block Post", res?.data);
      setImmediate(() => {
        this.setState({
          openReportPostModal: false,
          reportPostData: null
        })
      })
      alert("Post Reported Successfully")
    }).catch((err) => {
      console.log("Err block post", err);
    })

  }
  render() {
    var { user_id, name, image, created_at, designation, user_type } = this.props?.route?.params;
    // console.log(this.props?.route?.params);
    const memberSince = moment(created_at).format("YYYY/MM/DD");
    var { userData: { user } } = this.props
    const reportTypes = [
      {
        name: "Misleading or scam"
      },
      {
        name: "Offensive"
      },
      {
        name: "Violence"
      },
      {
        name: "Advertiser's pretending to be someone else"
      },
      {
        name: "Spam"
      },
      {
        name: "False news"
      },
    ]
    // console.log(memberSince);
    // console.log(user_id, "~~~~~~~~~~~~~", memberSince);
    // console.log("-----------+_+_+_+_+-------------", this.props?.userData?.user?.id)
    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          {/* Header */}
          <View style={styles.headerCont}>
            {/* Back Button */}
            <TouchableOpacity
              style={{ position: "absolute", left: 10 }}
              onPress={() => this.onPress("goback")}>
              <Feather name="chevron-left" size={30} color="white" />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.headerTitle}>User Profile</Text>
            {Object.keys(user)?.length == 0 ?
              <></> :
              <>
                {user_id !== user?.detail[0]?.user_id && <TouchableOpacity
                  style={{ position: "absolute", right: -5, padding: 10 }}
                  onPress={() => { this.setState({ openDotModal: !this.state.openDotModal }) }}
                >
                  <Feather name="more-vertical" size={25} color="white" />
                </TouchableOpacity>}
              </>
            }
          </View>
          {/* Dot Modal */}

          {this.state.openDotModal && < View style={styles.dotModal}>
            <TouchableOpacity
              onPress={() => this.onPress("block_user")}
              style={styles.dotMenuBtn}>
              <Text style={[styles.headerTitle, { fontSize: 16 }]}>Block this user</Text>
            </TouchableOpacity>
          </View>}


          {/* Profile Info Cont */}

          <View style={styles.pContainer}>
            <Image
              source={{ uri: `${ImagePath}/${image}` }}
              style={styles.image}
            />
            {console.log("designation", user_type)}
            <View style={styles.inner_cont}>
              {user_type == "" || user_type == undefined ?
                <></>
                :
                <Text style={[styles.text, { fontWeight: "600", fontSize: 15, color: "black", letterSpacing: 1 }]}>{user_type}</Text>}
              <Text style={styles.text}>{name}</Text>
              {designation == "" || designation == undefined ? <></> :
                <View style={{
                  width: 60,
                  height: 25,
                  backgroundColor: Colors.blue,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                  marginVertical: 3
                  // marginVertical: 3
                }}>
                  <Text style={[styles.text, { fontWeight: "800", fontSize: 15, color: "white", letterSpacing: 1 }]}>{designation}</Text>
                </View>}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 5,
                }}>
                <Text
                  style={[styles.text, { fontSize: 13, fontWeight: "300" }]}>
                  Member Since:
                </Text>
                <Text
                  style={[styles.text, { fontSize: 13, fontWeight: "300" }]}>
                  {memberSince}
                </Text>
              </View>
            </View>
          </View>

          {/* User Posts  */}
          <View style={styles.headerCont}>
            {/* Title */}
            <Text style={styles.headerTitle}>Projects</Text>
          </View>
          {/* Posts Component */}
          {
            this?.state?.loader == false ? (
              <AllPosts
                userID={user?.id}
                data={this.state.Posts}
                navProps={this.props.navigation}
                openDeletePostModal={(postID) => this.openDeletePostModal(postID)}
                onFavPress={(id, postID, is_favourite) =>
                  this.addToFavourite(id, postID, is_favourite)
                }
                openReportModal={(item) => this.openReportModal(item)}
              />
            ) : (
              <ActivityIndicator
                size="small"
                color={Colors.blue}
                style={{ marginTop: 75 }}
              />
            )
          }
        </ScrollView >

        {/* Modal Delete Post */}
        < Modal
          animationType="slide"
          transparent={true}
          visible={this.state.openDeletePostModal} >
          <TouchableOpacity
            style={styles.deletePostModal}
            onPress={() =>
              this.setState({ openDeletePostModal: false })
            }></TouchableOpacity>
          <View style={styles.deletePost_mainCont}>
            <Text style={styles.deletePost_title}>
              Are you Sure you want to delete this Post? , this can't be undone!
            </Text>

            <View style={styles.flex_direc}>
              <TouchableOpacity
                onPress={() => this.deletePost()}
                style={styles.yes_no_btn}>
                <Text style={styles.yes_no_text}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ openDeletePostModal: false })}
                style={styles.yes_no_btn}>
                <Text style={styles.yes_no_text}>NO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal >

        {/* Report Post Modal */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.openReportPostModal} //
        >
          <View style={styles.reportModalCont}>
            <View style={[styles.flex_direc, { width: "100%", borderBottomWidth: 1 }]}>
              <Text style={styles.reportModalTitle}>Report this Ad</Text>
              <TouchableOpacity
                onPress={() => this.setState({ openReportPostModal: false, reportPostData: null })}
                style={{ padding: 5 }}>

                <Entypo name="cross" size={28} color={Colors.black} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={reportTypes}
              contentContainerStyle={{
                marginTop: 20
              }}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.reportAd(item?.name)}
                    style={styles.reportItemCont}>
                    <Text style={styles.reportItemText}>{item?.name}</Text>
                    <Entypo name="chevron-right" size={28} color={"black"} />
                  </TouchableOpacity>
                )
              }}
            />
          </View>


        </Modal>
      </View >
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetail);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "white",
  },
  headerCont: {
    width: width,
    height: 60,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.blue,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "white",
  },
  pContainer: {
    width: width,
    height: 130,
    // borderWidth: 1,
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inner_cont: {
    width: "60%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    // borderWidth: 1
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 80,
    marginLeft: 10,
    marginRight: 30,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.black,
  },
  reportModalCont: {
    width: width,
    height: height / 2,
    position: "absolute",
    backgroundColor: "white",
    bottom: 0,
    zIndex: 200,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
  },
  reportModalTitle: {
    fontWeight: "600",
    color: Colors.black,
    fontSize: 16,
    // width: "80%",
    alignSelf: "center",
    textAlign: "left",
  },
  reportItemCont: {
    width: width - 40,
    alignSelf: "center",
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    marginTop: 5
  },
  reportItemText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.black
  },
  deletePostModal: {
    width: width,
    height: Dimensions.get("screen").height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.fadedBackground,
  },
  deletePost_mainCont: {
    width: width - 100,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    position: "absolute",
    top: height / 2.2,

    left: 50,
    // right: 0,
    zIndex: 200,
  },
  deletePost_title: {
    fontWeight: "600",
    color: Colors.black,
    fontSize: 16,
    width: "80%",
    alignSelf: "center",
    textAlign: "left",
  },
  flex_direc: {
    width: "40%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  yes_no_btn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.blue,
    borderRadius: 10,
    marginTop: 10,
  },
  yes_no_text: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  dotModal: {
    width: 180,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 60,
    right: 0,
    zIndex: 200,
    borderBottomLeftRadius: 20,
    backgroundColor: Colors.blue
  },
  dotMenuBtn: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",

  },
});
