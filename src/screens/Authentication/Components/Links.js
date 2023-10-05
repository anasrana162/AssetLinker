import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../config'

const Links = ({ navProps, text, navToScreenName, style }) => {
    return (
        <TouchableOpacity
            onPress={() => navProps.navigate(navToScreenName)}
            style={[styles.mainContainer,style]}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

export default Links

const styles = StyleSheet.create({
    mainContainer: {
        width: "80%",
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        // marginBottom: 50,
        marginTop: 10,
    },
    text: {
        fontSize: 14,
        fontWeight: "600",
        color: Colors.black
    }
})