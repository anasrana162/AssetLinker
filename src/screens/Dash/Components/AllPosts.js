import { StyleSheet, Text, View, NativeModules, Dimensions, TouchableOpacity, Linking, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
const { StatusBarManager: { HEIGHT } } = NativeModules;
const width = Dimensions.get("screen").width
import { Colors } from '../../../config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import postApi from '../../../../src1/old screensÏ/redux1/RequestTypes/post';
import moment from 'moment';

const AllPosts = ({ data, userID, openDeletePostModal, navProps, onFavPress }) => {

    // STATES

    const [showOption, setShowOption] = React.useState(false)
    const [itemId, setItemId] = React.useState("")

    // Functions

    const onOptionPress = (itemID) => {
        setImmediate(() => {
            setItemId(itemID)
        })
        setShowOption(!showOption)
    }

    return (
        <View style={styles.mainContainer}>

            <View style={styles.flatlist_cont}>

                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100, marginTop: 20, }}
                    numColumns={2}
                    scrollEnabled={false}
                    columnWrapperStyle={styles.inner_main}
                    renderItem={(item, index) => {
                        var Location = ""
                        if (item?.item?.Location !== "Null" || item?.item?.Location !== "") {
                            Location = JSON.parse(item?.item?.Location)
                            // console.log("DATA FLATLIST IMAGES,", Location?.location)
                        }
                        return (
                            <TouchableOpacity
                                key={String(index)}
                                disabled={showOption}
                                style={styles.itemContainer}
                                onPress={() => navProps.navigate("PostDetail", { postData: item?.item, location: Location?.location, subLocation: Location?.place })}
                            >

                                {userID == item?.item?.user_id &&
                                    <TouchableOpacity
                                        onPressIn={() => onOptionPress(item?.item?.id)}
                                        style={styles.optionBtn}
                                    >
                                        <Entypo name="dots-three-horizontal" size={25} color='white' />
                                    </TouchableOpacity>
                                }

                                {((itemId == item?.item?.id) && showOption == true) &&
                                    <TouchableOpacity
                                        onPress={() => setShowOption(false)}
                                        activeOpacity={0.5}
                                        style={styles.fade}>

                                    </TouchableOpacity>
                                }

                                {((itemId == item?.item?.id) && showOption == true) &&
                                    <View style={styles.optionMenu_cont}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                openDeletePostModal(item?.item?.id)
                                                setShowOption(false)
                                            }}
                                            activeOpacity={0.5}
                                            style={styles.menu_item_btn}>
                                            <Text style={styles.delete_text}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                }



                                {/* Image */}
                                <Image
                                    source={{ uri: "https://devstaging.a2zcreatorz.com/assetLinker_laravel/storage/app/public/images/property/" + item?.item.post_images[0] }}
                                    style={styles.itemImage}
                                />

                                {/* Property Type ("commercial",'Residential", Plot) */}
                                <Text style={styles.propertyTypeText}>{item?.item?.property_type}</Text>

                                {/* Plot Category (Bulding, shop etc) */}
                                <Text style={styles.plotCategory}>Plot Category: {item?.item?.category}</Text>

                                {/* Description (details) */}
                                <Text numberOfLines={2} style={styles.description}>{item?.item?.details}</Text>

                                {/* Location and Price */}
                                <View style={styles.location_price_cont}>

                                    {Location !== "Null" && <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 5 }}>
                                        <Ionicons name='location-sharp' color={Colors.blue} />
                                        < Text style={styles.locationText}>{Location?.location}</Text>
                                    </View>}
                                    <Text style={[styles.priceText, { marginLeft: Location !== "Null" ? 5 : 0 }]}>{item?.item?.property_type}</Text>
                                </View>

                                {/* Posted At */}
                                <Text style={styles.posted_at}>Posted: {moment(item?.item?.created_at).format("YYYY-MM-DD")}</Text>

                                <View style={styles.iconCont}>

                                    {/* Line */}
                                    <View style={styles.line}></View>

                                    {/* Icons */}
                                    <View style={[styles.location_price_cont, { justifyContent: "space-around", marginTop: 10 }]}>

                                        <TouchableOpacity onPress={() => onFavPress(item?.item?.user_id, item?.item?.id)}>
                                            <AntDesign name="heart" size={20} color={Colors.DarkGrey} />
                                        </TouchableOpacity>
                                        <View>
                                            <Entypo name="eye" size={20} color={Colors.DarkGrey} />
                                        </View>
                                        <TouchableOpacity>
                                            <AntDesign name="staro" size={20} color={Colors.DarkGrey} />
                                        </TouchableOpacity>

                                    </View>
                                </View>

                            </TouchableOpacity>
                        )
                    }}
                />
            </View>

        </View >
    )
}

export default AllPosts

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
        justifyContent: "space-between"
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
        width: 80,
        // height: 40,
        borderRadius: 10,
        backgroundColor: "white",
        position: "absolute",
        right: 5,
        top: 40,
        zIndex: 150,
        justifyContent: "center",
        alignItems: "center"
    },
    fade: {
        width: "100%",
        height: "100%",
        backgroundColor: Colors.fadedBackground,
        position: "absolute",
        zIndex: 80
    },
    line: {
        width: "95%",
        height: 1,
        backgroundColor: Colors.DarkGrey,
        marginTop: 10

    },
    menu_item_btn: {
        width: "95%",
        height: 30,
        marginVertical: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    delete_text: {
        fontWeight: "600",
        fontSize: 14,
        color: "crimson"
    },
    itemContainer: {
        width: 180,
        height: 300,
        backgroundColor: "white",
        borderRadius: 10,
        // borderWidth: 1,
        marginHorizontal: 10,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginVertical: 12,
        elevation: 4,
        overflow: "hidden"
    },
    itemImage: {
        width: '100%',
        height: 120,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    propertyTypeText: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.black,
        marginTop: 5,
        marginLeft: 5
    },

    plotCategory: {
        fontWeight: "400",
        fontSize: 12,
        color: Colors.black,
        marginTop: 5,
        marginLeft: 5
    },

    description: {
        width: "95%",
        fontSize: 12,
        fontSize: 12,
        color: Colors.black,
        marginTop: 5,
        marginLeft: 5
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
        fontWeight: "400",
        fontSize: 12,
        color: Colors.black,
        marginRight: 5
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
        alignItems: "center"
    }

})