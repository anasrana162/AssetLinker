import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, TextInput, NativeModules } from 'react-native'
import React from 'react'
const { StatusBarManager: { HEIGHT } } = NativeModules;
const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height - HEIGHT
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';


const LocationDropDown = ({ showModal, title, titleMain }) => {

    return (
        <>
            <View style={styles.mainContainer}>
                <Text style={styles.title}>{titleMain}</Text>
                <TouchableOpacity
                    onPress={showModal}
                    style={styles.dropdown_cont}>
                    <EvilIcons name="location" size={24} color="black" />
                    {console.log("Title", title)}
                    <Text style={{ color: 'black', fontWeight: "500", fontSize: 18 }}>
                        {title == "DHA, DHA City Karachi" ? "DHA City Karachi" : title}
                    </Text>
                    <AntDesign name="down" size={24} color="grey" />

                </TouchableOpacity>
            </View>



        </>
    )
}

export default LocationDropDown

const styles = StyleSheet.create({
    mainContainer: {
        width: width,
        alignItems: "flex-start",
        marginTop: 10,
        marginBottom: 20,
    },
    dropdown_cont: {
        marginLeft: 10,
        width: width - 80,
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "black",
        marginLeft: 10,
        marginBottom: 5,
    },

})