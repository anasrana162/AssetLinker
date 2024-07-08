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
import { chatDeleteHandler } from "../Chat/Chatlist";
import { deleteMessagesHandler } from "../Chat/ChatScreen";
import Back_handler from "../../components/BackHandler";
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'

class Dash extends Component {
  constructor(props) {
    super(props);
    var { userData: { homeposts } } = this.props;
    this.state = {
      position: 0,
      menuDropDown: false,
      sliderImages: [
        {
          url: require("../../../assets/property_images/banner1.jpg"),
        },
        {
          url: require("../../../assets/property_images/banner2.jpg"),
        },
        { url: require("../../../assets/property_images/B1.jpg") },
        {
          url: require("../../../assets/property_images/B3.jpg"),
        },
        {
          url: require("../../../assets/property_images/B5.jpg"),
        },
      ],
      openDeletePostModal: false,
      openReportPostModal: false,
      reportPostData: null,
      postID: "",
      docID: "",
      Posts: null,
      FilteredPosts: null,
      openSearchBar: false,
      openPreFilterModal: false,
      searched: "",
      loader: false,
      key: 0,
      searchText: "",
    };
  }

  checkCallBacks = () => {
    this.props.navigation.addListener("focus", async () => {
      // console.log("checkcallbacks", this.props?.route?.params);
      if (this.props?.route?.params == undefined) {
        console.log("No callabacks");
      } else {
        var { refresh } = this.props?.route?.params;
        // console.log("refresh", refresh)
        if (refresh == "refresh") {
          console.log("Callbacks initiated");
          this.props.navigation.setParams({ refresh: null });
          this.setState({ Posts: null, FilteredPosts: null })
          this.getPosts();
        }

        //this.ScrollToRefresh();
      }
      //  console.log("Refreshing");
    });
  };

  logout = () => {
    var { actions, userData } = this.props;
    AsyncStorage.removeItem("@assetlinker_usertoken");
    AsyncStorage.removeItem("@assetlinker_userCreds");
    actions?.userToken("");
    setTimeout(() => {
      actions?.user("");
      this.getPosts()
      // this.props?.navigation.navigate("GetStarted");
    }, 1000);
  };

  openDeletePostModal = (postID, docID) => {
    // console.log("POST TO DELETE:", docID);
    if (Object.keys(this.props.userData?.user).length == 0) {
      return this.props.navigation.navigate("Login")
    }
    setImmediate(() => {
      this.setState({
        openDeletePostModal: true,
        postID: postID,
        docID: docID,
      });
    });
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
          chatDeleteHandler(this.state.docID);
          deleteMessagesHandler(this.state.docID, this.state.postID);
          // console.log("Delete Post API Response", res?.data);
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
    var { userData: { user: { id }, homeposts, }, actions } = this.props;
    this.setState({ loader: true })
    console.log("user", id);
    if (id == undefined) {
      AssetLinkers.get(
        "get_propertyV2"
      )
        .then((res) => {
          // console.log("Get Post api Data:  ", res?.data?.property) 
          if (res?.data) {
            actions.homePosts((res?.data?.property).reverse())
            setImmediate(() => {
              this.setState({
                Posts: homeposts,
                FilteredPosts: homeposts,
                loader: false,
                key: this.state.key + 1
              });
            })
          }
        })
        .catch((err) => {
          this.setState({ loader: false })
          console.log("Get Post api Error:  ", err?.response);
        });
    } else {
      AssetLinkers.post(
        "get_propertyV3", {
        id: id
      }
      )
        .then((res) => {
          // console.log("Get Post api Data:  ", res?.data?.property) 
          if (res?.data) {
            actions.homePosts((res?.data?.property).reverse())
            setImmediate(() => {
              this.setState({
                Posts: homeposts,
                FilteredPosts: homeposts,
                loader: false,
                key: this.state.key + 1
              });
            })
          }
        })
        .catch((err) => {
          this.setState({ loader: false })
          console.log("Get Post api Error:  ", err?.response);
        });
    }

  };

  addToFavourite = (postID, is_favourite, indexPost) => {
    var { userData: { user } } = this.props;
    console.log("user", user);
    if (Object.keys(user).length == 0) {
      this.props.navigation.navigate("Login")
    } else {
      switch (is_favourite) {
        case 0:
          AssetLinkers.post(
            "save/favourite_post",
            {
              user_id: user?.id,
              post_id: postID,
            }
          )
            .then((res) => {
              if (res?.data) {
                // console.log("Add to favourite api Response:  ", res?.data);
                Toast.show({
                  type: "success",
                  text1: "Added to Favourites!",
                  visibilityTime: 2000,
                });
                this.getPosts();
              }
            })
            .catch((err) => {
              console.log("Add to favourite api  Error:  ", err);
            });
          break;

        case 1:
          AssetLinkers.post(
            "remove/favourite_post",
            {
              user_id: user?.id,
              post_id: postID,
            }
          )
            .then((res) => {
              if (res?.data) {
                // console.log("Remove from favourite api Response:  ", res?.data);
                Toast.show({
                  type: "success",
                  text1: "Removed From Favourites!",
                  visibilityTime: 2000,
                });
                this.getPosts();
              }
            })
            .catch((err) => {
              console.log("Remove from favourite api  Error:  ", err?.response);
            });
          break;
      }
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
    var { userData: { homeposts } } = this.props;
    switch (key) {
      case "search bar":
        setImmediate(() => {
          this.setState({
            Posts: homeposts,
            openSearchBar: !this.state.openSearchBar,
          });
        });
        break;

      case "filter":
        setImmediate(() => {
          this.setState({
            openPreFilterModal: !this.state.openPreFilterModal,
          });
        });
        break;
    }
  };

  onSearch = (txt) => {
    var { Posts } = this.state;
    //     var { userData: { homeposts } } = this.props;
    console.log("Posts in serach", Posts);
    const filterData = Posts?.filter((data) => {

      var locationParser = JSON.parse(data?.Location) == undefined ? "" : JSON.parse(data?.Location)
      // console.log("locationParser",locationParser)
      const matches_property_type = data?.property_type == undefined ? "" : data?.property_type
        .toLowerCase()
        .includes(txt.toLowerCase());
      const matches_category = data?.category == undefined ? "" : data?.category
        .toLowerCase()
        .includes(txt.toLowerCase());
      const matches_address = data?.address == undefined ? "" : data?.address
        .toLowerCase()
        .includes(txt.toLowerCase());
      const matches_rent_sale = data?.rent_sale == undefined ? "" : data?.rent_sale
        .toLowerCase()
        .includes(txt?.toLowerCase());
      // const matches_open = data?.open
      //   .toLowerCase()
      //   .includes(txt?.toLowerCase());
      const matches_price = data?.price == undefined ? "" : data?.price
        .toLowerCase()
        .includes(txt?.toLowerCase());
      const matches_location = JSON.parse(data?.Location) == undefined ? "" : JSON.parse(data?.Location)
        .location.toLowerCase()
        .includes(txt?.toLowerCase());
      console.log("data", data);
      // const matches_location_place = JSON.parse(data?.Location) == undefined ? "" : JSON.parse(data?.Location)?.place
      //   .location.toLowerCase()
      //   .includes(txt?.toLowerCase());
      const matches_place = JSON.parse(data?.Location) == undefined ? "" : JSON.parse(data?.Location)
        .place.toLowerCase()
        .includes(txt?.toLowerCase());
      const matches_place_location = JSON.parse(data?.Location) == undefined ? "" : JSON.parse(data?.Location)
        .location.toLowerCase()
        .includes(txt?.toLowerCase()) + JSON.parse(data?.Location) == undefined ? "" : JSON.parse(data?.Location)
          .place.toLowerCase()
          .includes(txt?.toLowerCase());
      // console.log("data?.open", data?.open) //.replace(/\s/g, "")
      // console.log(".toLowerCase().includes(txt?.toLowerCase())", JSON.parse(data?.Location).location.toLowerCase())
      return (
        matches_property_type ||
        matches_category ||
        matches_rent_sale ||
        // matches_open ||
        matches_price ||
        matches_location ||
        matches_place ||
        matches_address ||
        matches_place_location
        // ||
        // matches_location_place
      );
      // || matches_rent_sale | matches_price
    });

    setImmediate(() => {
      this.setState({
        FilteredPosts: filterData,
      });
    });

    // console.log("filterData", filterData)
    // console.log("filterData LEngth", filterData?.length)
  };

  render() {
    var { userData: { homeposts } } = this.props;
    // console.log("Props:  ",homeposts)
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
    return (
      <View style={styles.mainContainer}>
        {/* Header */}
        <Header onSearchOpen={() => this.onSearchOpen("search bar")} />
        <Back_handler
          navProps={this.props?.navigation}
          isGoBack={true}
        />
        {/* Search Bar */}
        {this.state.openSearchBar && (
          <SearchBar
            onCancelSearch={() => this.onSearchOpen("search bar")}
            onChangeText={(txt) => this.setState({ searchText: txt })}
            onFilterPress={() => this.onSearchOpen("filter")}
            applySearch={() => this.onSearch(this.state.searchText)}
          />
        )}

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
          disable={Object.keys(this.props.userData?.user).length == 0 ? true : false}
        />

        {/* Headlines */}
        <Headlines />

        <ScrollView>
          {/* Slider */}
          <Slideshow
            position={this.state.position}
            dataSource={this.state.sliderImages}
            containerStyle={{ marginBottom: 10 }}
          // onPress={(item,index)=>{console.log("Item from slideshow",item)}}
          />

          {/* Posts Component */}

          {homeposts == null ? (
            <ActivityIndicator
              size="large"
              color={Colors.blue}
              style={{ marginTop: 90 }}
            />
          ) : (
            // <></>
            <AllPosts
              key={this.state.key}
              data={
                this.state.openSearchBar
                  ? this.state.FilteredPosts
                  : homeposts
              }
              navProps={this.props.navigation}
              userID={this.props.userData?.user?.id}
              openDeletePostModal={(postID, docID) =>
                this.openDeletePostModal(postID, docID)
              }
              openReportModal={(item) => this.openReportModal(item)}
              onFavPress={(postID, is_favourite, index) =>
                this.addToFavourite(postID, is_favourite, index)
              }
            />
          )}
        </ScrollView>

        {/* Modal Delete Post */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.openDeletePostModal}>
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
        </Modal>

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

        {/* Tab Navigator */}
        <TabNavigator navProps={this.props.navigation} screenName={"Dash"} isLoggedIn={Object.keys(this.props.userData?.user).length == 0 ? true : false} />
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
});
