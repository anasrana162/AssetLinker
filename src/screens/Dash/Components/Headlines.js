import { StyleSheet, Text, View, NativeModules, Dimensions, TouchableOpacity, Linking } from 'react-native'
import React, { useState } from 'react'
const { StatusBarManager: { HEIGHT } } = NativeModules;
const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height - HEIGHT
import { Colors } from '../../../config';
import Feather from 'react-native-vector-icons/Feather';
import TextTicker from 'react-native-text-ticker';
const Headlines = () => {
    return (
        <View
            style={styles.mainContainer}>
            <Feather name="book-open" size={20} color="black" style={{}} />
            <TouchableOpacity
                style={{ marginHorizontal: 8, }}
                activeOpacity={0.7}
                onPress={() =>
                    Linking.openURL(
                        `https://assetslinkers.com`,
                    )
                }>
                <TextTicker
                    style={{ fontSize: 15, color: 'black',alignSelf:"flex-start",width:width-50 }}
                    duration={13000}
                    loop
                    repeatSpacer={50}
                    marqueeDelay={4000}
                    scrollSpeed={5000}>
                    We are recognized for exceeding client expectations and
                    delivering great results through dedication, ease of process, and extraordinary services to our worldwide clients.
                </TextTicker>
            </TouchableOpacity>
        </View>

    )
}

export default Headlines

const styles = StyleSheet.create({
    mainContainer: {
        width: width,
        marginVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 100,
    },
})