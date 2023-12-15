import { StyleSheet, Text, View, Dimensions, ScrollView, Image } from 'react-native'
import React from 'react'
import Slideshow from 'react-native-image-slider-show'
const width = Dimensions.get("screen").width
const height = Dimensions.get('screen').height
const ImageViewer = ({ Images, position }) => {
    // console.log("Images COmp", position)

    var imageSet = []


    for (let i = 0; i < Images.length; i++) {
        imageSet.push({
            url: "https://devstaging.a2zcreatorz.com/assetLinker_laravel/storage/app/public/images/property/" + Images[i]
        })
    }


    return (
        <View style={styles.mainContainer}>

            {
                Images[0] == "" ?
                    <View style={{
                        width:width,
                        height:height/3.2,
                        justifyContent:"center",
                        alignItems:"center"
                    }}>

                        <Image
                            source={require("../../../../assets/Assetlinker_A.png")}
                            // resizeMode='cover'
                            style={{
                                width: 150,
                                height: 150,
                            }}
                        />
                    </View>
                    :
                    <Slideshow
                        dataSource={imageSet}
                        height={height / 3.2}
                        position={position}
                    />
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
    imageViewerCont: {
        width: width,
        // height: 270,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
    }
})