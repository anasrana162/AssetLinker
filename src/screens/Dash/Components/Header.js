import { StyleSheet, Text, View, NativeModules, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
const { StatusBarManager: { HEIGHT } } = NativeModules;
const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height - HEIGHT
import { Colors } from '../../../config';
import Feather from "react-native-vector-icons/Feather"
const Header = () => {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Assets Linkers</Text>
            <TouchableOpacity style={styles.touchable}>
                <Feather name="search" size={24} color={"white"} />
            </TouchableOpacity>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    mainContainer: {
        width: width,
        // height: 60,
        backgroundColor: Colors.main,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        alignItems: "center",
        paddingTop:5,
        paddingBottom:10
    },
    title: {
        fontSize: 25,
        fontWeight: "700",
        color: "white",
    },
    touchable: {
        width: 30,
        height: 24,
        justifyContent: "center",
        alignItems: "center"
    }
})