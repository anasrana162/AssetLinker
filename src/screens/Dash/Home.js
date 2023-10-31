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
import Header from "./Components/Header";
import { Colors } from "../../config";
import MenuBar from "./Components/MenuBar";
const {
  StatusBarManager: { HEIGHT },
} = NativeModules;
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height - HEIGHT;

import AssetLinkers from "../../api/AssetLinkers";
import AsyncStorage from "@react-native-async-storage/async-storage";
{
  /* {---------------Redux Imports------------} */
}
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/user";
import { bindActionCreators } from "redux";
import Headlines from "./Components/Headlines";
import Slideshow from "react-native-image-slider-show";
import TabNavigator from "../../components/TabNavigator";
import AllPosts from "./Components/AllPosts";
import Toast from "react-native-toast-message";
import { ActivityIndicator } from "react-native";
import SearchBar from "./Components/SearchBar";
import FilterModal from "./Components/FilterModal";

class Dash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: 0,
      menuDropDown: false,
      sliderImages: [
        { url: require("../../../assets/property_images/B1.jpg") },
        {
          url: require("../../../assets/property_images/B3.jpg"),
        },
        {
          url: require("../../../assets/property_images/B5.jpg"),
        },
      ],
      openDeletePostModal: false,
      postID: "",
      Posts: null,
      FilteredPosts: null,
      openSearchBar: false,
      openPreFilterModal: false,
      searched: ''
    };
  }

  checkCallBacks = () => {
    this.props.navigation.addListener("focus", async () => {
      if (this.props?.route?.params != undefined) {
        var { refresh } = this.props?.route?.params;
        if (refresh == "refresh") {
          console.log("Callbacks initiated");
          this.getPosts();
        }
      } else {
        console.log("No callabacks");
        //this.ScrollToRefresh();
      }
      //  console.log("Refreshing");
    });
  };

  logout = () => {
    var { actions, userData } = this.props;
    AsyncStorage.removeItem("@assetlinker_usertoken");
    AsyncStorage.removeItem("@assetlinker_userData");
    actions?.userToken("");
    actions?.user("");
    setTimeout(() => {
      this.props?.navigation.navigate("GetStarted");
    }, 1000);
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

  componentDidMount() {
    this.getPosts();
    this.runSlideShow();
    this.checkCallBacks();
  }

  getPosts = () => {
    AssetLinkers.get(
      "https://devstaging.a2zcreatorz.com/assetLinkerProject/api/get_property"
    )
      .then((res) => {
        // console.log("Get Post api Data:  ", res?.data?.property[0])
        if (res?.data) {
          this.setState({
            Posts: res?.data?.property,
            FilteredPosts: res?.data?.property,
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
              this.getPosts();
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
                text1: "Removed From Favourites!",
                visibilityTime: 2000,
              });
              this.getPosts();
            }
          })
          .catch((err) => {
            console.log("Add to favourite api  Error:  ", err?.response);
          });
        break;
    }
  };

  runSlideShow = () => {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position:
            this.state.position === this.state.sliderImages.length
              ? 0
              : this.state.position + 1,
        });
      }, 2000),
    });
  };

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  onSearchOpen = (key) => {

    switch (key) {
      case 'search bar':
        setImmediate(() => {
          this.setState({
            openSearchBar: !this.state.openSearchBar,
          })
        })
        break;

      case 'filter':
        setImmediate(() => {
          this.setState({
            openPreFilterModal: !this.state.openPreFilterModal,
          })
        })
        break;
    }

  }

  onSearch = (txt) => {
    var { Posts } = this.state

    const filterData = Posts.filter((data) => {

      const matches_property_type = data?.property_type.toLowerCase().includes(txt.toLowerCase());
      const matches_category = data?.category.toLowerCase().includes(txt.toLowerCase());
      const matches_rent_sale = data?.rent_sale.toLowerCase().includes(txt?.toLowerCase())
      const matches_open = data?.open.toLowerCase().includes(txt?.toLowerCase())
      const matches_price = data?.price.toLowerCase().includes(txt?.toLowerCase())
      const matches_location = JSON.parse(data?.Location).location.toLowerCase().includes(txt?.toLowerCase())
      const matches_place = JSON.parse(data?.Location).place.toLowerCase().includes(txt?.toLowerCase())
      //  console.log("data?.open",data?.open.replace(/\s/g, ""))
      // console.log(".toLowerCase().includes(txt?.toLowerCase())", JSON.parse(data?.Location).location.toLowerCase())
      return matches_property_type || matches_category || matches_rent_sale || matches_open || matches_price || matches_location || matches_place
      // || matches_rent_sale | matches_price 


    })

    setImmediate(() => {
      this.setState({
        FilteredPosts: filterData
      })
    })

    // console.log("filterData", filterData)
    // console.log("filterData LEngth", filterData?.length)
  }

  render() {
    // console.log("Props:  ",this.props?.userData?.user?.detail[0])

    return (
      <View style={styles.mainContainer}>
        {/* Header */}
        <Header onSearchOpen={() => this.onSearchOpen("search bar")} />

        {/* Search Bar */}
        {this.state.openSearchBar && <SearchBar
          onCancelSearch={() => this.onSearchOpen("search bar")}
          onChangeText={(txt) => this.onSearch(txt)}
          onFilterPress={() => this.onSearchOpen("filter")}
        />}

        {/* Search Bar Filter Modal */}

        <FilterModal
          visible={this.state.openPreFilterModal}
          onFilterPress={() => this.onSearchOpen("filter")}
          onSearch={(txt) => this.onSearch(txt)}
        />


        {/* Menu Bar */}
        <MenuBar
          navProps={this.props.navigation}
          logout={() => this.logout()}
        />

        {/* Headlines */}
        <Headlines />

        <ScrollView>
          {/* Slider */}
          <Slideshow
            position={this.state.position}
            dataSource={this.state.sliderImages}
          />

          {/* Posts Component */}
          {this?.state?.Posts ? (
            <AllPosts
              data={this.state.openSearchBar ? this.state.FilteredPosts : this.state.Posts}
              navProps={this.props.navigation}
              userID={this.props.userData?.user?.id}
              openDeletePostModal={(postID) => this.openDeletePostModal(postID)}
              onFavPress={(user_id, postID, is_favourite) =>
                this.addToFavourite(user_id, postID, is_favourite)
              }
            // isFav={}
            />
          ) : (
            <ActivityIndicator
              size="large"
              color={Colors.blue}
              style={{ marginTop: 90 }}
            />
          )}
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

        {/* Tab Navigator */}
        <TabNavigator navProps={this.props.navigation} screenName={"Dash"} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Dash);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
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
