import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
const width = Dimensions.get("screen").width
const Header = () => {
    return (
        <>
            <View style={styles.header}>
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
        color: "white"
    },
    
  include_some_details: {
    height: 50,
    width: "100%",
    alignSelf:"center",
    backgroundColor: '#EEEEEE',
    alignItems: 'flex-start',

    justifyContent: 'center',
  },

  include_some_details_text: {
    fontSize: 19,
    fontWeight: '500',
    color: 'black',
    marginLeft:5
  },
})