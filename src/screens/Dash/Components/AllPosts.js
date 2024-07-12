import React, { PureComponent, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Colors } from "../../../config";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import moment from "moment";
import { postImageURL } from "../../../config/Common";


const { width, height } = Dimensions.get("screen");


class AllPosts extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showOption: false,
      itemId: "",
      slicedLength: 10,
      slicedLoader: false,
    
    };
  }

  onOptionPress = (itemID) => {
    this.setState((prevState) => ({
      itemId: itemID,
      showOption: !prevState.showOption,
    }));
  };

  renderSeparator = (index) => {
    const { builderData } = this.props;
    const rowIndex = Math.floor(index / 2);

    if (rowIndex > 0 && rowIndex % 3 === 0) {
      if (!builderData) {
        return null;
      }
      return (
        <View style={styles.builderListMainCont}>

          {/* <ScrollView horizontal={true}> */}

          <FlatList
            data={this.props.builderData || []}
            // keyExtractor={(index) => index}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            scrollEnabled={true}
            renderItem={({ item, index }) => {
              // console.log("Item",item);
              const docID = item?.user_id + "" + item?.id;
              const postID = item?.property_id;
              let Location = "";
              if (item?.Location !== "Null" || item?.Location !== "") {
                Location = JSON.parse(item?.Location);
              }
              return (
                <View
                  key={index}
                  style={styles.builderlist}
                >

                  <TouchableOpacity
                    onPressIn={() => this.onOptionPress(item?.id)}
                    style={styles.optionBtn}
                  >
                    <Entypo
                      name="dots-three-horizontal"
                      size={25}
                      color="white"
                    />
                  </TouchableOpacity>

                  {this.state.itemId == item?.id && this.state.showOption == true && (
                    <TouchableOpacity
                      onPress={() => this.setState({ showOption: false })}
                      activeOpacity={0.5}
                      style={styles.fade}
                    ></TouchableOpacity>
                  )}

                  {this.state.itemId == item?.id && this.state.showOption == true && (
                    <View style={[styles.optionMenu_cont, { top: 55, borderRadius: 10 }]}>
                      {this.state.userID == item?.user_id && (
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({ showOption: false })
                            this.props.openDeletePostModal(postID, docID);
                          }}
                          activeOpacity={0.5}
                          style={styles.menu_item_btn}
                        >
                          <Text style={styles.delete_text}>Delete</Text>
                        </TouchableOpacity>
                      )}
                      {this.state.userID == item?.user_id && (
                        <TouchableOpacity
                          onPress={() => {
                            this.props.ƒnavProps.navigate("PostUpdate", { data: item });
                            this.setState({ showOption: false })
                          }}
                          activeOpacity={0.5}
                          style={styles.menu_item_btn}
                        >
                          <Text style={[styles.delete_text, { color: Colors.black }]}>
                            Update
                          </Text>
                        </TouchableOpacity>)}

                      {this.state.itemId !== item?.user_id && (
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({ showOption: false })
                            this.props.openReportModal(item);
                          }}
                          activeOpacity={0.5}
                          style={styles.menu_item_btn}
                        >
                          <Text style={styles.delete_text}>Report</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}

                  <TouchableOpacity
                    // style={styles.itemImage}
                    activeOpacity={0.7}
                    disabled={this.state.showOption}
                    onPress={() => {
                      this.props.navProps.navigate("PostDetail", {
                        data: item,
                        location: Location?.location,
                        subLocation: Location?.place,
                        index: index,
                      });
                    }}
                  >

                    <Image
                      source={{ uri: postImageURL + item?.post_images[0] }}
                      style={{ width: width / 2.15, height: 100, borderRadius: 10 }}
                    />
                  </TouchableOpacity>
                  {item?.category == "Null" ? (
                    <></>
                  ) : (
                    <Text style={styles.propertyTypeText}>
                      {item?.category}
                    </Text>
                  )}

                  {item?.property_type.toLowerCase() == "plot" ? (
                    <Text
                      numberOfLines={1}
                      style={[styles.propertyTypeText, { fontSize: 14, width: 160 }]}
                    >
                      {item?.phase}
                    </Text>
                  ) : (
                    <></>
                  )}

                  <Text
                    style={[
                      styles.propertyTypeText,
                      { fontSize: 14, fontWeight: "600", marginTop: item?.category == "Null" ? 5 : 0 }
                    ]}
                  >
                    {item?.property_type}
                    <Text style={[styles.propertyTypeText, { fontSize: 14, fontWeight: "400" }]}>
                      {" "}/{" "}
                      {item?.rent_sale}
                    </Text>
                  </Text>

                  {Location !== "Null" && (
                    <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 5, marginTop: 5 }}>
                      <Ionicons name="location-sharp" color={Colors.blue} />
                      <Text style={styles.locationText}>
                        {Location?.location}
                      </Text>
                      {
                        (Location?.place == null || Location?.place == "Null") ?
                          <></>
                          :
                          <Text style={styles.locationText}>
                            ,{" "} {Location?.place}
                          </Text>
                      }
                    </View>
                  )}
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignSelf: "flex-start", marginLeft: 5, width: "90%", marginTop: 5 }}>
                    <Text
                      style={[
                        styles.propertyTypeText,
                        { fontSize: 14, fontWeight: "600", marginTop: item?.category == "Null" ? 5 : 0 }
                      ]}
                    >
                      {item?.name}
                    </Text>
                    <Text style={[styles.propertyTypeText, { fontSize: 12, fontWeight: "500", marginTop: 0 }]}>
                      {item?.user_type?.toUpperCase()}
                    </Text>
                  </View>

                </View>
              )
            }}
          />
          {/* </ScrollView> */}
        </View>
      );
    }
    return null;
  };

  render() {
    const { data, refreshKey, allowBuilders, showBuilderList, builderData } =
      this.props;
    const { slicedLoader, slicedLength } = this.state;
    // console.log("Rendering");
    return (
      <View style={styles.mainContainer}>
        <View style={styles.flatlist_cont}>
          <FlatList
            data={data.slice(0, slicedLength)}
            key={refreshKey}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100, marginTop: 5 }}
            numColumns={2}
            initialNumToRender={10}
            scrollEnabled={false}
            columnWrapperStyle={styles.inner_main}
            ListEmptyComponent={() => (
              <View
                style={{
                  width: "100%",
                  alignSelf: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 26, color: "black", marginTop: 100 }}>
                  No Data Available
                </Text>
              </View>
            )}
            ListFooterComponent={() =>
              slicedLoader && (
                <View
                  style={{
                    backgroundColor: "#f0f0f0",
                    width: width,
                    height: 60,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size="small" color="black" />
                </View>
              )
            }
            renderItem={({ item, index }) => {
              const docID = item?.user_id + "" + item?.id;
              const postID = "" + item?.id;
              let Location = "";
              if (item?.Location !== "Null" || item?.Location !== "") {
                Location = JSON.parse(item?.Location);
              }

              return (
                <>
                  <View
                    key={String(index)}
                    style={[
                      styles.itemContainer,
                      {
                        marginBottom:
                          (index + 1) % 6 === 0 && index !== data.length - 1
                            ? showBuilderList === false
                              ? 5
                              : builderData === null
                                ? 5
                                : 250
                            : 5,
                        opacity:
                          item?.experied === "expired" || item?.day_difference === 0
                            ? 0.6
                            : 1,
                      },
                    ]}
                  >
                    {(item?.experied == "expired" || item?.day_difference == 0) && <View style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      zIndex: 100
                    }}>

                    </View>}
                    <TouchableOpacity
                      style={styles.optionBtn}
                      onPressIn={() => this.onOptionPress(item?.id)}
                    >
                      <Entypo
                        name="dots-three-horizontal"
                        size={25}
                        color="white"
                      />
                    </TouchableOpacity>

                    {this.state.itemId == item?.id && this.state.showOption && (
                      <TouchableOpacity
                        onPress={() => this.setState({ showOption: false })}
                        activeOpacity={0.5}
                        style={styles.fade}
                      ></TouchableOpacity>
                    )}

                    {this.state.itemId == item?.id && this.state.showOption && (
                      <View
                        style={[
                          styles.optionMenu_cont,
                          { top: 55, borderRadius: 10 },
                        ]}
                      >
                        {this.props.userID == item?.user_id && (
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({ showOption: false });
                              this.props.openDeletePostModal(postID, docID);
                            }}
                            activeOpacity={0.5}
                            style={styles.menu_item_btn}
                          >
                            <Text style={styles.delete_text}>Delete</Text>
                          </TouchableOpacity>
                        )}
                        {this.props.userID == item?.user_id && (
                          <TouchableOpacity
                            onPress={() => {
                              this.props.navProps.navigate("PostUpdate", {
                                data: item,
                              });
                              this.setState({ showOption: false });
                            }}
                            activeOpacity={0.5}
                            style={styles.menu_item_btn}
                          >
                            <Text
                              style={[
                                styles.delete_text,
                                { color: Colors.black },
                              ]}
                            >
                              Update
                            </Text>
                          </TouchableOpacity>
                        )}

                        {this.props.userID !== item?.user_id && (
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({ showOption: false });
                              this.props.openReportModal(item);
                            }}
                            activeOpacity={0.5}
                            style={styles.menu_item_btn}
                          >
                            <Text style={styles.delete_text}>Report</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    )}

                    {item?.post_images[0] === "" ? (
                      <TouchableOpacity
                        style={styles.itemImage}
                        activeOpacity={0.7}
                        disabled={this.state.showOption}
                        onPress={() => {
                          console.log("obj on navigate:",
                            {
                              data: item,
                              location: Location?.location,
                              subLocation: Location?.place,
                              index: index,
                            }
                          );
                          this.props.navProps.navigate("PostDetail", {
                            data: item,
                            location: Location?.location,
                            subLocation: Location?.place,
                            index: index,
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
                        disabled={this.state.showOption}
                        onPress={() => {
                          this.props.navProps.navigate("PostDetail", {
                            data: item,
                            location: Location?.location,
                            subLocation: Location?.place,
                            index: index,

                          });
                        }}
                      >
                        <Image
                          source={{ uri: postImageURL + item?.post_images[0] }}
                          style={styles.itemImage}
                        />
                      </TouchableOpacity>
                    )}

                    {item?.category == "Null" ? (
                      <></>
                    ) : (
                      <Text style={styles.propertyTypeText}>
                        {item?.category}
                      </Text>
                    )}

                    {item?.property_type.toLowerCase() == "plot" ? (
                      <Text
                        numberOfLines={1}
                        style={[styles.propertyTypeText, { fontSize: 14, width: 160 }]}
                      >
                        {item?.phase}
                      </Text>
                    ) : (
                      <></>
                    )}

                    <Text
                      style={[
                        styles.propertyTypeText,
                        { fontSize: 14, fontWeight: "600", marginTop: item?.category == "Null" ? 5 : 0 }
                      ]}
                    >
                      {item?.property_type}
                      <Text style={[styles.propertyTypeText, { fontSize: 14, fontWeight: "400" }]}>
                        {" "}/{" "}
                        {item?.rent_sale}
                      </Text>
                    </Text>

                    {Location !== "Null" && (
                      <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 5, marginTop: 5 }}>
                        <Ionicons name="location-sharp" color={Colors.blue} />
                        <Text style={styles.locationText}>
                          {Location?.location}
                        </Text>
                        {
                          (Location?.place == null || Location?.place == "Null") ?
                            <></>
                            :
                            <Text style={styles.locationText}>
                              ,{" "} {Location?.place}
                            </Text>
                        }
                      </View>
                    )}

                    <Text
                      style={[
                        styles.priceText,
                        { marginTop: 5, marginLeft: 5, fontSize: 15, fontWeight: "700", }
                      ]}
                    >
                      Rs.{item?.price}
                    </Text>

                    <Text style={styles.posted_at}>
                      Posted: {moment(item?.created_at).format("YYYY-MM-DD")}
                    </Text>
                    {item?.experied == "expired" || item?.day_difference == 0 ?
                      <Text style={[styles.posted_at, { color: "crimson", fontWeight: "600" }]}>
                        Expired
                      </Text>
                      :
                      <Text style={styles.posted_at}>
                        Expires in: {item?.day_difference} days
                      </Text>}

                    <View style={styles.iconCont}>
                      <View style={styles.line}></View>

                      <View
                        style={[
                          styles.location_price_cont,
                          { justifyContent: "space-around", marginTop: 5 },
                        ]}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            this.props.onFavPress(item?.id, item?.is_favourite, index)
                          }
                        >
                          <AntDesign
                            name="heart"
                            size={20}
                            color={
                              item?.is_favourite == 1 || item?.is_favourite == undefined
                                ? "red"
                                : Colors.DarkGrey
                            }
                          />
                        </TouchableOpacity>

                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                          <Entypo name="eye" size={20} color={Colors.DarkGrey} />
                          <Text style={[styles.posted_at, { marginTop: 0 }]}>
                            {item?.views}
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
                  {/* Render separator "Hello" after every 4th item */}
                  {this.props.showBuilderList == false && this.props.builderData == null ? null : this.renderSeparator(index)}
                </>
              );
            }}
            // onEndReached={() => {
            //   // if (this.props.allowBuilders && showBuilderList) {
            //   //   if (builderData.length === slicedLength) {
            //   console.log("length increased");
            //   this.setState({ slicedLength: slicedLength + 10 });
            //   //   }
            //   // }
            // }}
            // onEndReachedThreshold={0.1}
          />
        </View>
      </View>
    );
  }
}
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
    justifyContent: "space-between",
  },
  builderlist: {
    width: width / 2.15,
    height: 200,
    // borderWidth: 1,
    marginRight: 13,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 5,
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
    borderRadius: 10,
    backgroundColor: "white",
    position: "absolute",
    top: 100,
    alignSelf: "center",
    zIndex: 150,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  builderListMainCont: {
    width: width - 20,
    left: 5,
    // height: 120,
    position: "absolute",
    top: -230,
    backgroundColor: "white",
    paddingVertical: 10,
    // borderWidth: 1,
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
    marginTop: 5,
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
    height: 340,
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
    height: 140,
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
    letterSpacing: 0.5,
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