import { StyleSheet, Text, View, Dimensions, ScrollView, Image, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { Colors } from '../../../config'
const width = Dimensions.get("screen").width
const height = Dimensions.get('screen').height
import AntDesign from "react-native-vector-icons/AntDesign"
import Feather from 'react-native-vector-icons/Feather';
import Video, { VideoRef } from 'react-native-video';


const ImageURL = "https://devstaging.a2zcreatorz.com/assetLinker_laravel/storage/app/public/images/property/"
const VideoURL = "https://devstaging.a2zcreatorz.com/assetLinker_laravel/storage/app/public/videos/property/"


const ImageViewer = ({ Images, openImageModal }) => {
    // console.log("Images COmp", Images)
    const videoRef = useRef(VideoRef);
    const [position, setPosition] = useState(0)
    const [isPaused, setIsPaused] = useState([])
    var [keyy, setKeyy] = useState(0)

    // console.log("videoRef", videoRef.current);
    useEffect(() => {
        generateState()
    }, [])

    const generateState = () => {
        if (Images == undefined || Images == null) {
            return
        } else if (Images?.length == 0) {
            return
        } else {
            let arr = []
            for (let i = 0; i < Images.length; i++) {
                if (Images[i]?.includes("..mp4", 0) == true) {

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


    const onNext = (prevPos) => {
        console.log("next func image arr", Images[prevPos + 1]);
        if (Images[prevPos + 1] == undefined) {
            console.log("pos end");
            setPosition(0)
        } else {
            console.log("pos +");
            setPosition(prevPos + 1)

        }
    }

    const onPrev = (prevPos) => {
        console.log("Prev func image arr", Images[prevPos - 1]);
        if (Images[prevPos - 1] == undefined) {
            console.log("pos end prev func");
            setPosition(0)
        } else {
            console.log("pos -");
            setPosition(prevPos - 1)

        }
    }




    return (
        <View style={styles.mainContainer}>

            {
                Images[position] == "" ?
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

                    <>

                        {console.log("Images[position]",Images[position] )}
                        {
                            Images[position].includes("..mp4", 0) == true ?
                                <>
                                    <Pressable
                                        onPress={() => openImageModal(Images[position], position)}
                                        style={styles.imagCont}
                                    >

                                        <Video
                                            key={keyy}
                                            // Can be a URL or a local file.
                                            source={{ uri: VideoURL + Images[position] }}
                                            // Store reference  
                                            ref={videoRef}
                                            paused={isPaused[position]?.paused}
                                            repeat
                                            resizeMode='cover'
                                            style={{ width: "100%", height: "100%", }}
                                        />

                                        <TouchableOpacity
                                            style={styles.pause_play_button}
                                            onPress={() => {
                                                if (isPaused[position].paused == true) {
                                                    console.log("isPuased");
                                                    videoFunctions('play', position)
                                                } else {
                                                    console.log("isResumed");
                                                    videoFunctions('pause', position)
                                                }

                                            }}
                                        >
                                            {isPaused[position]?.paused ?
                                                <Feather name="play" size={30} color="white" style={{ marginLeft: 5 }} />
                                                :
                                                <Feather name="pause" size={30} color="white" style={{ marginLeft: 0 }} />
                                            }
                                        </TouchableOpacity>
                                        {/* Next Button */}
                                        <TouchableOpacity
                                            onPress={() => onNext(position)}
                                            style={styles.next_btn}>
                                            <AntDesign name="right" size={25} color={Colors.white} style={{ marginLeft: 5 }} />
                                        </TouchableOpacity>

                                        {/* Previous Button */}
                                        <TouchableOpacity
                                            onPress={() => onPrev(position)}
                                            style={styles.prev_btn}>
                                            <AntDesign name="left" size={25} color={Colors.white} style={{ marginRight: 5 }} />
                                        </TouchableOpacity>

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
                                </>
                                :
                                <Pressable
                                    onPress={() => openImageModal(Images[position], position)}
                                    style={styles.imagCont}>

                                    {/* Next Button */}
                                    <TouchableOpacity
                                        onPress={() => onNext(position)}
                                        style={styles.next_btn}>
                                        <AntDesign name="right" size={25} color={Colors.white} style={{ marginLeft: 5 }} />
                                    </TouchableOpacity>

                                    {/* Previous Button */}
                                    <TouchableOpacity
                                        onPress={() => onPrev(position)}
                                        style={styles.prev_btn}>
                                        <AntDesign name="left" size={25} color={Colors.white} style={{ marginRight: 5 }} />
                                    </TouchableOpacity>

                                    {/* Images */}
                                    <Image
                                        resizeMode='cover'
                                        source={{ uri: ImageURL + Images[position] }}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                    {/* Pagination */}
                                    <View style={styles.paginationCont}>
                                        {
                                            Images.map((item, index) => {
                                                return (
                                                    <>
                                                    {
                                                        index <=12 &&
                                                        <View style={[styles.dots, {
                                                            backgroundColor: index == position ? Colors.white : Colors.DarkGrey
                                                        }]}>
                                                        </View>
                                                    }
                                                    </>
                                                )
                                            })
                                        }
                                    </View>
                                </Pressable>
                        }
                    </>


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
    pause_play_button: {
        width: 50,
        height: 50,
        backgroundColor: "rgba(52,52,52,0.4)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
        position: 'absolute',

    },
    next_btn: {
        width: 40,
        height: 40,
        backgroundColor: "rgba(52,52,52,0.7)",
        borderRadius: 30,
        position: "absolute",
        zIndex: 100,
        justifyContent: "center",
        alignItems: "center",
        right: 20
    },
    prev_btn: {
        width: 40,
        height: 40,
        backgroundColor: "rgba(52,52,52,0.7)",
        borderRadius: 30,
        position: "absolute",
        zIndex: 100,
        justifyContent: "center",
        alignItems: "center",
        left: 20
    },
    paginationCont: {
        // maxWidth: 130,
        // overflow:"scroll",
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