import { StyleSheet, Text, View, Dimensions, ScrollView, Image, Pressable, NativeModules, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../../config'
import AntDesign from "react-native-vector-icons/AntDesign"
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
const {
    StatusBarManager: { HEIGHT },
} = NativeModules;

const width = Dimensions.get("screen").width
const height = Dimensions.get('screen').height - HEIGHT

const ImageModal = ({ imageSelected, indexSelected, images, closeModal, imageLink }) => {
    const [imageIndex, setImageIndex] = useState(indexSelected)

    const onNext = () => {
        if (imageIndex == images.length - 1) {
            setImageIndex(0)
        } else {
            setImageIndex(imageIndex + 1)
        }
    }
    const onBack = () => {
        if (imageIndex == 0) {
            setImageIndex(0)
        } else {
            setImageIndex(imageIndex - 1)
        }
    }
    // console.log("indexSelected", indexSelected, '\n', imageSelected);

    return (
        <View
            style={styles.mainCont}>
            <Pressable
                onPress={closeModal}
                style={styles.innerMainCont}>


            </Pressable>
            <View style={styles.flexRow}>
                <TouchableOpacity
                    onPress={() => onBack()}
                    style={{ padding: 10, }}>
                    <AntDesign name="left" size={30} color={Colors.white} />
                </TouchableOpacity>
                <ReactNativeZoomableView
                    maxZoom={30}
                    // Give these to the zoomable view so it can apply the boundaries around the actual content.
                    // Need to make sure the content is actually centered and the width and height are
                    // dimensions when it's rendered naturally. Not the intrinsic size.
                    // For example, an image with an intrinsic size of 400x200 will be rendered as 300x150 in this case.
                    // Therefore, we'll feed the zoomable view the 300x150 size.
                    contentWidth={width}
                    contentHeight={height - 400}
                >
                    <Image
                        resizeMode='contain'
                        source={{ uri: imageLink + images[imageIndex] }}
                        style={{ width: "100%", height: "100%", }}
                    />
                </ReactNativeZoomableView>

                <TouchableOpacity
                    onPress={() => onNext()}
                    style={{ padding: 10, }}>
                    <AntDesign name="right" size={30} color={Colors.white} />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default ImageModal

const styles = StyleSheet.create({
    mainCont: {
        width: width,
        height: height,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",

    },
    innerMainCont: {
        width: width,
        height: height,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        backgroundColor: "rgba(52,52,52,0.9)"
    },
    flexRow: {
        width: width,
        height: height - 400,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        alignSelf: "center",
        // backgroundColor: "red"
    }
})