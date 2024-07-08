import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Colors } from "../../../config";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import moment from "moment";
import { postImageURL } from "../../../config/Common";

const { width } = Dimensions.get("screen");

const AllPosts = React.memo(
  ({
    data,
    userID,
    openDeletePostModal,
    openReportModal,
    navProps,
    onFavPress,
    refreshKey,
  }) => {
    const [showOption, setShowOption] = useState(false);
    const [itemId, setItemId] = useState("");

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
            // ListFooterComponent={()=>{
            //   return(
            //     < Text > NO DATA</Text >
            //   )
            // }}
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
            renderItem={({ item, index }) => {
              const docID = item?.user_id + "" + item?.id;
              const postID = "" + item?.id;
              let Location = "";
              if (item?.Location !== "Null" || item?.Location !== "") {
                Location = JSON.parse(item?.Location);
              }
              // console.log("index == index + 3", index + 4);
              return (
                <>
                  <View key={String(index)} style={styles.itemContainer}>
                    <TouchableOpacity
                      onPressIn={() => onOptionPress(item?.id)}
                      style={styles.optionBtn}
                    >
                      <Entypo
                        name="dots-three-horizontal"
                        size={25}
                        color="white"
                      />
                    </TouchableOpacity>

                    {itemId == item?.id && showOption == true && (
                      <TouchableOpacity
                        onPress={() => setShowOption(false)}
                        activeOpacity={0.5}
                        style={styles.fade}
                      ></TouchableOpacity>
                    )}

                    {itemId == item?.id && showOption == true && (
                      <View style={styles.optionMenu_cont}>
                        {userID == item?.user_id && (
                          <TouchableOpacity
                            onPress={() => {
                              setShowOption(false);
                              openDeletePostModal(postID, docID);
                            }}
                            activeOpacity={0.5}
                            style={styles.menu_item_btn}
                          >
                            <Text style={styles.delete_text}>Delete</Text>
                          </TouchableOpacity>
                        )}

                        <TouchableOpacity
                          onPress={() => {
                            navProps.navigate("PostUpdate", { data: item });
                            setShowOption(false);
                          }}
                          activeOpacity={0.5}
                          style={styles.menu_item_btn}
                        >
                          <Text style={[styles.delete_text, { color: Colors.black }]}>
                            Update
                          </Text>
                        </TouchableOpacity>

                        {userID !== item?.user_id && (
                          <TouchableOpacity
                            onPress={() => {
                              setShowOption(false);
                              openReportModal(item);
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
                        disabled={showOption}
                        onPress={() => {
                          navProps.navigate("PostDetail", {
                            data: item,
                            location: Location?.location,
                            subLocation: Location?.place,
                            index: index,
                          });
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
                          navProps.navigate("PostDetail", {
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

                    {/* <View style={styles.location_price_cont}> */}
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

                    {/* </View> */}
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
                            onFavPress(item?.id, item?.is_favourite, index)
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

                </>
              );
            }}
          />
        </View>
      </View >
    );
  }
);

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