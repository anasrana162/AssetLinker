import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'

const width = Dimensions.get("screen").width

const CustomTextInp = ({ placeholder, onChangeText, keyboardType, titleEN, titleAR, numberOfLines, multiline }) => {
    // console.log("numoflines", numberOfLines)
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>{titleEN}</Text>
            <TextInput
                numberOfLines={numberOfLines}
                multiline={multiline}
                placeholder={placeholder}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                style={[styles.textinp_cont, {
                    height: numberOfLines !== undefined ? 100 : 40,
                }]}
            />
        </View>
    )
}

export default CustomTextInp

const styles = StyleSheet.create({
    mainContainer: {
        width: width,
        alignItems: "flex-start",
        marginTop: 10,
        marginBottom: 20,
    },
    textinp_cont: {
        marginLeft: 10,
        width: width - 80,
        borderWidth: 1,
        borderRadius: 5,
        color: "black",
        paddingLeft: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "black",
        marginLeft: 10,
        marginBottom: 5,
    },
})