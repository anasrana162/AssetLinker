import { StyleSheet, Text, View, NativeModules, Dimensions, TouchableOpacity, Linking, Platform } from 'react-native'
import React, { useState } from 'react'
const { StatusBarManager: { HEIGHT } } = NativeModules;
const width = Dimensions.get("screen").width
import { Colors } from '../config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default TabNavigator = ({ navProps, screenName }) => {

    const data = [
        {
            id: 1,
            label: "Home",
            navName: "Dash",
            iconName: "home",
        },
        {
            id: 2,
            label: "Chat",
            navName: "Chat",
            iconName: "message-outline",
        },
        {
            id: 3,
            label: "Post",
            navName: "Post",
            iconName: "plus-circle-outline",
        },
        {
            id: 4,
            label: "Favourite",
            navName: "Favourite",
            iconName: "heart-outline",
        },
        {
            id: 2,
            label: "Account",
            navName: "Account",
            iconName: "account-settings-outline",
        },

    ]

    return (
        <View style={styles.mainContainer}>
            {
                data.map((item, index) => {
                    return (

                        <TouchableOpacity
                            key={String(item?.id)}
                            style={styles.item}
                            onPress={() => navProps.navigate(item?.navName)}
                        >
                            <MaterialCommunityIcons name={item?.iconName} size={22} color={screenName == item?.navName ? "#FFB100" : "white"} />
                            <Text style={[styles.item_text, {
                                color: screenName == item?.navName ? "#FFB100" : "white",
                            }]}>{item?.label}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        width: width,
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: Colors.main,
        position: "absolute",
        bottom: Platform.OS == "ios" ? 20 : 0,
        padding: 7,
        zIndex: 1000
    },
    item: {
        width: 70,
        alignItems: 'center',
    },
    item_text: { color: 'white', fontSize: 12, fontWeight: "600", marginTop: 2 }
})