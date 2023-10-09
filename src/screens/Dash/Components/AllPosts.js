import { StyleSheet, Text, View, NativeModules, Dimensions, TouchableOpacity, Linking, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
const { StatusBarManager: { HEIGHT } } = NativeModules;
const width = Dimensions.get("screen").width
import { Colors } from '../../../config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AllPosts = ({ data }) => {

    return (
        <View style={styles.mainContainer}>

            <View style={styles.flatlist_cont}>

                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100, marginTop: 20 }}
                    numColumns={2}
                    scrollEnabled={false}
                    columnWrapperStyle={styles.inner_main}
                    renderItem={(item, index) => {
                        //  var loc1 = Location
                        var Location = ""
                        // var temp
                        // console.log("DATA TYPE:",typeof  null)
                        // if (item?.item?.Location !== null || item?.item?.Location !== ""  ) {
                        //     Location = JSON.parse(item?.item?.Location)
                        //     // Location =
                        //     console.log("DATA FLATLIST IMAGES,", Location)
                        // }
                        return (
                            <TouchableOpacity
                                key={String(index)}
                                style={styles.itemContainer}
                            >

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

                                    {item?.item?.Location !== null && < Text style={styles.locationText}>Hello</Text>}
                                    <Text style={styles.priceText}>{item?.item?.property_type}</Text>
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
        backgroundColor: "white"
    },
    inner_main: {
        // width: "50%",
        // alignItems: "center",
        justifyContent: "space-between"
    },

    itemContainer: {
        width: "47%",
        height: 250,
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginVertical: 12,
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
        justifyContent: "space-around",
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
    },

})