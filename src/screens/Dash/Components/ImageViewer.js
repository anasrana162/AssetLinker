import { StyleSheet, Text, View, Dimensions, ScrollView, Image, Pressable } from 'react-native'
import React from 'react'
import Slideshow from 'react-native-image-slider-show'
import { Colors } from '../../../config'
const width = Dimensions.get("screen").width
const height = Dimensions.get('screen').height
const ImageViewer = ({ Images, position, openImageModal }) => {
    // console.log("Images COmp", position)

    var imageSet = []


    // for (let i = 0; i < Images.length; i++) {
    //     imageSet.push({
    //         url:  + Images[i]
    //     })
    // }


    return (
        <View style={styles.mainContainer}>

            {
                Images[0] == "" ?
                    <View style={{
                        width: width,
                        height: height / 3.2,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>

                        <Image
                            source={require("../../../../assets/Assetlinker_A.jpg")}
                            // resizeMode='cover'
                            style={{
                                width: 150,
                                height: 150,
                            }}
                        />
                    </View>
                    :

                    <Pressable
                        onPress={() => openImageModal(Image[position], position)}
                        style={styles.imagCont}>
                        {/* Images */}
                        <Image
                            resizeMode='cover'
                            source={{ uri: "https://devstaging.a2zcreatorz.com/assetLinker_laravel/storage/app/public/images/property/" + Images[position] }}
                            style={{ width: "100%", height: "100%" }}
                        />
                        {/* Pagination */}
                        <View style={styles.paginationCont}>
                            {
                                Images.map((item, index) => {
                                    return (
                                        <View style={[styles.dots, {
                                            backgroundColor: index == position ? Colors.white : Colors.DarkGrey
                                        }]}>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </Pressable>

            }

        </View>
    )
}

export default ImageViewer

const styles = StyleSheet.create({
    mainContainer: {
        width: width,
        //marginTop: 80,
        // height: 300,
        justifyContent: "center",
        alignItems: "center"
    },
    imagCont: {
        width: width,
        height: height / 3.2,
        justifyContent: "center",
        alignItems: 'center',
    },
    imageViewerCont: {
        width: width,
        // height: 270,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
    },
    paginationCont: {
        paddingHorizontal: 5,
        paddingVertical: 3,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        zIndex: 200,
        bottom: 10,
        backgroundColor: "rgba(52,52,52,0.2)"
    },
    dots: {
        width: 12,
        height: 12,
        borderRadius: 15,
        backgroundColor: Colors.grey,
        marginHorizontal: 2,
    },
})