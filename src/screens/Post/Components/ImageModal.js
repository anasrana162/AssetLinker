import { StyleSheet, Text, View, Dimensions, ScrollView, Image, Pressable, NativeModules, TouchableOpacity } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { Colors } from '../../../config'
import AntDesign from "react-native-vector-icons/AntDesign"
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import Feather from 'react-native-vector-icons/Feather';
import Video, { VideoRef } from 'react-native-video';

const {
    StatusBarManager: { HEIGHT },
} = NativeModules;

const width = Dimensions.get("screen").width
const height = Dimensions.get('screen').height - HEIGHT

const ImageModal = ({ imageSelected, indexSelected, images, closeModal, imageLink,videoLink }) => {
    const videoRef = useRef(VideoRef);

    //States
    const [imageIndex, setImageIndex] = useState(indexSelected)
    const [isPaused, setIsPaused] = useState([])
    var [keyy, setKeyy] = useState(0)

    // console.log("videoRef", videoRef.current);
    useEffect(() => {
        generateState()
    }, [])

    const generateState = () => {
        if (images == undefined || images == null) {
            return
        } else if (images?.length == 0) {
            return
        } else {
            // console.log("images before",images);
            let arr = []
            for (let i = 0; i < images.length; i++) {
                if (images[i]?.includes("..mp4", 0) == true) {

                    arr.push({ paused: true })
                } else {
                    arr.push({ image: true })
                }
            }
            setIsPaused(arr)
        }
    }
    const videoFunctions = (key, videoIndex) => {
        switch (key) {
            case "pause":

                var temp = isPaused
                temp[videoIndex].paused = true
                setIsPaused(temp)
                videoRef?.current?.pause();
                setKeyy(keyy + 1)
                break;
            case "play":
                console.log("Play videoFunc", isPaused);
                var temp1 = isPaused
                console.log("Play videoFunc", temp1[videoIndex]);
                temp1[videoIndex].paused = false
                setIsPaused(temp1)
                videoRef?.current?.resume();
                setKeyy(keyy + 1)
                break;
        }
    }



    const onNext = () => {
        console.log("ImageIndex", images);
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

                {
                    images[imageIndex]?.includes("..mp4", 0) == true ?
                        <View style={{ width: "70%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                            <Video
                                key={keyy}
                                // Can be a URL or a local file.
                                source={{ uri: videoLink + images[imageIndex] }}
                                // Store reference  
                                ref={videoRef}
                                paused={isPaused[imageIndex]?.paused}
                                repeat
                                style={{ width: "100%", height: "100%", }}
                            />

                            <TouchableOpacity
                                style={styles.pause_play_button}
                                onPress={() => {
                                    if (isPaused[imageIndex].paused == true) {
                                        console.log("isPuased");
                                        videoFunctions('play', imageIndex)
                                    } else {
                                        console.log("isResumed");
                                        videoFunctions('pause', imageIndex)
                                    }

                                }}
                            >
                                {isPaused[imageIndex]?.paused ?
                                    <Feather name="play" size={30} color="white" style={{ marginLeft: 5 }} />
                                    :
                                    <Feather name="pause" size={30} color="white" style={{ marginLeft: 0 }} />
                                }
                            </TouchableOpacity>
                        </View>
                        :
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
                }


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
    },
    pause_play_button: {
        width: 50,
        height: 50,
        backgroundColor: "rgba(52,52,52,0.4)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        position: 'absolute',

    },
})