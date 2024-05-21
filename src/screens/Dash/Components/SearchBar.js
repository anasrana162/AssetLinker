import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity } from 'react-native'

const width = Dimensions.get("screen").width;
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons"
import Entypo from "react-native-vector-icons/Entypo"
import Feather from "react-native-vector-icons/Feather"
const SearchBar = ({ onChangeText, onCancelSearch, onFilterPress, applySearch }) => {
    return (
        <View style={styles.mainContainer}>

            <View style={styles.crossContainer}>

                <TouchableOpacity
                    onPress={onCancelSearch}
                    style={{ position: "absolute", left: 0 }} >
                    <Entypo name="cross" size={24} color="black" />
                </TouchableOpacity>

                <Text style={{ fontSize: 16, fontWeight: "600", color: "black" }} >Property Search</Text>

            </View>
            <View style={styles.inner_main}>

                <View style={styles.txtinpCont}>

                    <TextInput
                        placeholder='Search...'
                        placeholderTextColor="#bbb"
                        style={styles.textinp}
                        onChangeText={onChangeText}
                    />
                    <TouchableOpacity
                        onPress={applySearch}
                        style={{ width: "20%", height: "100%", justifyContent: "center", alignItems: "flex-end" }}>

                        <Feather name="search" size={24} color={"black"} style={{ marginRight: 10, }} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={onFilterPress}
                >
                    <Ionicons name="filter" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    mainContainer: {
        width: width,
        backgroundColor: "#f0f0f0",
        position: "absolute",
        top: 45,
        zIndex: 200,

    },
    inner_main: {
        width: "100%",
        marginTop: 35,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    textinp: {
        width: "80%",
        height: 38,
        paddingHorizontal: 10,
        color: "black",
    },
    txtinpCont: {
        width: "80%",
        height: 40,
        borderRadius: 50,
        backgroundColor: "white",
        borderWidth: 0.5,
        // paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden"
    },
    crossContainer: {
        width: "100%",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        top: 5,
        left: 5,
    }
})