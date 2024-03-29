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

import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { Colors } from "../../config";
import AssetLinkers from "../../api/AssetLinkers";
import AllPosts from "../Dash/Components/AllPosts";
import Toast from "react-native-toast-message";
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

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Posts: null,
      openDeletePostModal: false,
      postID: "",
    };
  }

  componentDidMount = () => {
    this.getUserPosts();
  };

  getUserPosts = () => {
    console.log("Working");
    var { id } = this.props?.userData?.user;
    AssetLinkers.get(
      "get_property/" +
      id
    )
      .then((res) => {
        if (res?.data) {
          // console.log("Get User Post api Data:  ", res?.data?.property[0])
          this.setState({
            Posts: res?.data?.property,
          });
        }
      })
      .catch((err) => {
        console.log("Get Post api Error:  ", err?.response);
      });
  };

  addToFavourite = (user_id, postID, is_favourite) => {
    switch (is_favourite) {
      case 0:
        AssetLinkers.post(
          "save/favourite_post",
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
            console.log("Add to favourite api  Error:  ", err);
          });
        break;

      case 1:
        console.log("remove like", user_id, postID);

        AssetLinkers.post(
          "remove/favourite_post",
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
            console.log("Add to favourite api  Error:  ", err);
          });
        break;
    }
  };

  onPress = (key) => {
    switch (key) {
      case "goback":
        this.props.navigation.goBack();
        break;
      case "edit_profile":
        this.props.navigation.navigate("EditProfile");
        break;
    }
  };

  openDeletePostModal = (postID) => {
    console.log("POST TO DELETE:", postID);
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
            openDeletePostModal: false,
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

  render() {
    var { id, name, image, phone } = this.props?.userData?.user;
// console.log(his.props?.userData?.user);
    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          {/* Header */}
          <View style={styles.headerCont}>
            {/* Back Button */}
            <TouchableOpacity
              style={{ position: "absolute", left: 10 }}
              onPress={() => this.onPress("goback")}
            >
              <Feather name="chevron-left" size={30} color="white" />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.headerTitle}>My Profile</Text>
          </View>

          {/* Profile Info Cont */}

          <View style={styles.pContainer}>
            {/* User Profile Image */}
            <View
              style={{
                borderWidth: 4,
                borderColor: Colors.blue,
                borderRadius: 80,
                justifyContent: "center",
                alignItems: "center",
                width: 100,
                height: 100,
              }}
            >
              <Image
                source={require('../../../assets/placeholder.jpg')}
                style={[styles.image, { position: "absolute", }]}
              />
              <Image
                source={{
                  uri:
                    "https://devstaging.a2zcreatorz.com/assetLinker_laravel/storage/app/public/images/userProfile/" +
                    image,
                }}
                style={styles.image}
              />
            </View>

            {/* User Name */}
            <Text style={[styles.text, { marginTop: 20 }]}>{name}</Text>

            {/* Phone Number */}
            <View style={styles.inner_cont}>
              <Ionicons
                name="call"
                size={24}
                color="black"
                style={{ transform: [{ rotate: "-90deg" }] }}
              />
              <Text style={[styles.text, { fontSize: 18 }]}>{phone}</Text>
            </View>

            {/* Edit Profile Button */}
            <TouchableOpacity
              onPress={() => this.onPress("edit_profile")}
              style={styles.editProfileBtn}
            >
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* User Posts  */}
          <View style={styles.headerCont}>
            {/* Title */}
            <Text style={styles.headerTitle}>My Posts</Text>
          </View>

          {/* Posts Component */}
          <AllPosts
            data={this.state.Posts}
            navProps={this.props.navigation}
            userID={id}
            openDeletePostModal={(postID) => this.openDeletePostModal(postID)}
            onFavPress={(user_id, postID, is_favourite) =>
              this.addToFavourite(user_id, postID, is_favourite)
            }
          />
        </ScrollView>

        {/* Modal Delete Post */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.openDeletePostModal}
        >
          <TouchableOpacity
            style={styles.deletePostModal}
            onPress={() => this.setState({ openDeletePostModal: false })}
          ></TouchableOpacity>
          <View style={styles.deletePost_mainCont}>
            <Text style={styles.deletePost_title}>
              Are you Sure you want to delete this Post? , this can't be undone!
            </Text>

            <View style={styles.flex_direc}>
              <TouchableOpacity
                onPress={() => this.deletePost()}
                style={styles.yes_no_btn}
              >
                <Text style={styles.yes_no_text}>Yes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.setState({ openDeletePostModal: false })}
                style={styles.yes_no_btn}
              >
                <Text style={styles.yes_no_text}>NO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);

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
    height: 250,
    // borderWidth: 1,
    marginVertical: 20,
    // flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  editProfileBtn: {
    width: 130,
    height: 45,
    borderWidth: 2,
    borderColor: Colors.blue,
    backgroundColor: Colors.light_blue,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  editProfileText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  inner_cont: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    // borderWidth: 1
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 80,
    borderWidth: 4,
    // marginLeft: 10,
    // marginRight: 30
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black,
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
});
