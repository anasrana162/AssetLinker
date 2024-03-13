import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  Dimensions,
  TouchableOpacity,
  Linking,
  FlatList,
  Image,
  Platform,
} from "react-native";
import React, { useState } from "react";
const {
  StatusBarManager: { HEIGHT },
} = NativeModules;
const width = Dimensions.get("screen").width;
import { Colors } from "../../../config";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import postApi from '../../../../src1/old screensÏ/redux1/RequestTypes/post';
import moment from "moment";
import { postImageURL } from "../../../config/Common";
import { chatDeleteHandler } from "../../Chat/Chatlist";
import { deleteMessagesHandler } from "../../Chat/ChatScreen";

const AllPosts = ({
  data,
  userID,
  openDeletePostModal,
  navProps,
  onFavPress,
  refreshKey,
}) => {
  // STATES

// console.log(data == null ? "": data[0]);

  const [showOption, setShowOption] = React.useState(false);
  const [itemId, setItemId] = React.useState("");

  // Functions

  const onOptionPress = (itemID) => {
    setImmediate(() => {
      setItemId(itemID);
    });
    setShowOption(!showOption);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.flatlist_cont}>
        <FlatList
          data={data}
          key={refreshKey}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100, marginTop: 5 }}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.inner_main}
          ListEmptyComponent={() => {
            return (
              <View style={{ width: "100%", alignSelf: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 26, color: "black", marginTop: 100 }}>No Data Available</Text>
              </View>
            )
          }}
          renderItem={(item, index) => {
            const docID = item?.item?.user_id + "" + item?.item?.id;
            const postID = "" + item?.item?.id;
            var Location = "";
            if (
              item?.item?.Location !== "Null" ||
              item?.item?.Location !== ""
            ) {
              Location = JSON.parse(item?.item?.Location);
              // console.log("DATA FLATLIST IMAGES,", Location?.location)
            }
            return (
              <View

                key={String(index)}

                style={styles.itemContainer}
              >
                {userID == item?.item?.user_id && (
                  <TouchableOpacity
                    onPressIn={() => onOptionPress(item?.item?.id)}
                    style={styles.optionBtn}>
                    <Entypo
                      name="dots-three-horizontal"
                      size={25}
                      color="white"
                    />
                  </TouchableOpacity>
                )}

                {itemId == item?.item?.id && showOption == true && (
                  <TouchableOpacity
                    onPress={() => setShowOption(false)}
                    activeOpacity={0.5}
                    style={styles.fade}></TouchableOpacity>
                )}

                {itemId == item?.item?.id && showOption == true && (
                  <View style={styles.optionMenu_cont}>
                    <TouchableOpacity
                      onPress={() => {
                        // console.log("ALL POST >>>>", docID);
                        setShowOption(false);
                        openDeletePostModal(postID, docID);
                      }}
                      activeOpacity={0.5}
                      style={styles.menu_item_btn}>
                      <Text style={styles.delete_text}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* Image */}

                {item?.item.post_images[0] === "" ? (
                  <TouchableOpacity
                  style={styles.itemImage}
                    activeOpacity={0.7}
                    disabled={showOption}
                    onPress={() => {
                      console.log(item);
                      navProps.navigate("PostDetail", {
                        data: item?.item,
                        location: Location?.location,
                        subLocation: Location?.place,
                      })
                    }}
                  >

                    <Image
                      resizeMode="cover"
                      source={require("../../../../assets/Assetlinker_A.jpg")}
                      style={styles.itemImage}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                  style={styles.itemImage}
                  activeOpacity={0.7}
                  disabled={showOption}
                  onPress={() => {
                    console.log(item);
                    navProps.navigate("PostDetail", {
                      data: item?.item,
                      location: Location?.location,
                      subLocation: Location?.place,
                    })
                  }}
                  >

                    <Image
                      source={{ uri: postImageURL + item?.item.post_images[0] }}
                      style={styles.itemImage}
                    />
                  </TouchableOpacity>
                )}
                {/* Plot Category (Bulding, shop etc) */}
                {item?.item?.category == "Null" ? <></> : <Text style={styles.propertyTypeText}>
                  {item?.item?.category}
                </Text>}

                {item?.item?.property_type.toLowerCase() == "plot" ? <Text numberOfLines={1} style={[styles.propertyTypeText, { fontSize: 14, width: 160 }]}>
                  {item?.item?.phase}
                </Text> : <></>}

                {/* Property Type ("commercial",'Residential", Plot) */}
                <Text style={[styles.propertyTypeText, { fontSize: 14, fontWeight: "600", marginTop: item?.item?.category == "Null" ? 5 : 0 }]}>
                  {item?.item?.property_type} /
                  <Text style={[styles.propertyTypeText, { fontSize: 14, fontWeight: "400" }]}> {item?.item?.rent_sale}</Text>
                  {/* {item?.item?.property_type} */}
                </Text>
                {/* {item?.item?.category == "Null" ? <></> : <Text style={styles.plotCategory}>
                  Plot Category: {item?.item?.category}
                </Text>} */}

                {/* Description (details) */}
                {/* <Text numberOfLines={2} style={styles.description}>{item?.item?.details}</Text> */}

                {/* Location and Price */}
                <View style={styles.location_price_cont}>
                  {Location !== "Null" && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: 5,
                      }}>
                      <Ionicons name="location-sharp" color={Colors.blue} />
                      <Text style={styles.locationText}>
                        {Location?.location}
                      </Text>
                    </View>
                  )}
                  {/* <Text
                    style={[
                      styles.priceText,
                      { marginLeft: Location !== "Null" ? 5 : 0 },
                    ]}>
                    {item?.item?.property_type}
                  </Text> */}
                </View>
                <Text
                  style={[
                    styles.priceText,
                    { marginTop: 5, marginLeft: 5, fontSize: 15, fontWeight: "700" },
                  ]}>
                  Rs.{item?.item?.price}
                </Text>

                {/* Posted At */}
                <Text style={styles.posted_at}>
                  Posted: {moment(item?.item?.created_at).format("YYYY-MM-DD")}
                </Text>

                <View style={styles.iconCont}>
                  {/* Line */}
                  <View style={styles.line}></View>

                  {/* Icons */}
                  <View
                    style={[
                      styles.location_price_cont,
                      { justifyContent: "space-around", marginTop: 5 },
                    ]}>
                    <TouchableOpacity
                      onPress={() =>
                        onFavPress(
                          item?.item?.id,
                          item?.item?.is_favourite,
                          index,
                        )
                      }>
                      <AntDesign
                        name="heart"
                        size={20}
                        color={
                          item?.item?.is_favourite == 1 ||
                            item?.item?.is_favourite == undefined
                            ? "red"
                            :
                            Colors.DarkGrey
                        }
                      />
                    </TouchableOpacity>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}>
                      <Entypo name="eye" size={20} color={Colors.DarkGrey} />
                      <Text style={[styles.posted_at, { marginTop: 0 }]}>
                        {item?.item?.views}
                      </Text>
                    </View>
                    <TouchableOpacity>
                      <AntDesign
                        name="staro"
                        size={20}
                        color={Colors.DarkGrey}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default AllPosts;

const styles = StyleSheet.create({
  mainContainer: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },

  flatlist_cont: {
    width: width,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  inner_main: {
    // width: "100%",
    // alignItems: "center",
    // width:"100%",
    // backgroundColor:"green",
    justifyContent: "space-between",
  },

  optionBtn: {
    paddingHorizontal: 4,
    paddingVertical: 1,
    backgroundColor: Colors.fadedBackground,
    position: "absolute",
    right: 5,
    top: 5,
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  optionMenu_cont: {
    width: "70%",
    // height: 40,
    borderRadius: 10,
    backgroundColor: "white",
    position: "absolute",
    top: 100,
    alignSelf: "center",
    zIndex: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  fade: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.fadedBackground,
    position: "absolute",
    zIndex: 80,
  },
  line: {
    width: "95%",
    height: 1,
    backgroundColor: Colors.DarkGrey,
    marginTop: 10,
  },
  menu_item_btn: {
    width: "95%",
    height: 30,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  delete_text: {
    fontWeight: "600",
    fontSize: 14,
    color: "crimson",
  },
  itemContainer: {
    width: width / 2.15,
    height: 320,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.blue,
    marginHorizontal: 5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginVertical: 5,
    elevation: 4,
    overflow: "hidden",
  },
  itemImage: {
    width: "100%",
    height: 160,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: "#0002",
  },
  propertyTypeText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
    marginTop: 5,
    marginLeft: 5,
    letterSpacing: 0.5,
  },

  plotCategory: {
    fontWeight: "400",
    fontSize: 12,
    color: Colors.black,
    marginTop: 5,
    marginLeft: 5,
  },

  description: {
    width: "95%",
    fontSize: 12,
    fontSize: 12,
    color: Colors.black,
    marginTop: 5,
    marginLeft: 5,
  },

  location_price_cont: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 5,
  },

  locationText: {
    fontWeight: "400",
    fontSize: 12,
    color: Colors.black,
  },
  priceText: {
    fontWeight: "600",
    fontSize: 12,
    color: Colors.black,
    marginRight: 5,
    letterSpacing: 0.5
  },
  posted_at: {
    fontWeight: "600",
    fontSize: 12,
    color: Colors.black,
    marginLeft: 5,
    marginTop: 5,
  },
  iconCont: {
    width: "100%",
    position: "absolute",
    bottom: 5,
    alignItems: "center",
  },
});
