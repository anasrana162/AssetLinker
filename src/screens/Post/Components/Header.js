import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
const width = Dimensions.get("screen").width
import Ionicons from "react-native-vector-icons/Ionicons";
const Header = ({ navProps }) => {
    return (
        <>

            <View style={styles.header}>
                {/* Go back */}
                <TouchableOpacity
                    style={[styles.headerBtn, { marginLeft: 5 }]}
                    onPress={() => navProps.pop()}>
                    <Ionicons name="chevron-back" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.header_text}>POST</Text>
            </View>

            <View
                style={styles.include_some_details}>

                <Text style={styles.include_some_details_text}>
                    Include some details
                </Text>
            </View>
        </>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        width: width,
        height: 50,
        backgroundColor: '#023661',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header_text: {
        fontSize: 20,
        fontWeight: "600",
        color: "white",
    },

    include_some_details: {
        height: 50,
        width: "100%",
        alignSelf: "center",
        backgroundColor: '#EEEEEE',
        alignItems: 'flex-start',

        justifyContent: 'center',
    },

    include_some_details_text: {
        fontSize: 19,
        fontWeight: '500',
        color: 'black',
        marginLeft: 10
    },
    headerBtn: {
        width: 45,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 100
    },
})