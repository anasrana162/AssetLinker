import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MultipleimagePicker from '../../../components/MultipleimagePicker'
import Video, { VideoRef } from 'react-native-video';
const ImageURL = "https://devstaging.a2zcreatorz.com/assetLinker_laravel/storage/app/public/images/property/"
const VideoURL = "https://devstaging.a2zcreatorz.com/assetLinker_laravel/storage/app/public/videos/property/"

const ImageSelector = ({
    setMultipleAssetsPost,
    multipleAssetsPost,
    multipleVideos,
    updateImageInGallery,
    remmoveAsset,
}) => {
    const videoRef = useRef(VideoRef);
    // console.log(multipleVideos);

    // STATES

    const [isPaused, setIsPaused] = useState([])
    var [keyy, setKeyy] = useState(0)

    // console.log("videoRef", videoRef.current);

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
                var temp1 = isPaused
                temp1[videoIndex].paused = false
                setIsPaused(temp1)
                videoRef?.current?.resume();
                setKeyy(keyy + 1)
                break;
        }
    }

    useEffect(() => {
        generateState()
    }, [multipleVideos])

    const generateState = () => {
        if (multipleVideos == undefined || multipleVideos == null) {
            return
        } else if (multipleVideos?.length == 0) {
            return
        } else {
            let arr = []
            for (let i = 0; i < multipleVideos.length; i++) {
                arr.push({ paused: true })
            }
            setIsPaused(arr)
        }
    }
    console.log("multipleVideos", multipleVideos);
    return (
        <>
            <View style={styles.mainContainer}>
                <View style={styles.upload_5_image}>
                    <Text style={{ color: 'black', fontSize: 15 }}>UPLOAD UP TO 5 PHOTOS</Text>
                    <AntDesign name="right" size={15} color="#000" />
                </View>

                <MultipleimagePicker
                    style={styles.multi_image_picker}
                    onImageChange={(path, mime, type) => { updateImageInGallery(path, mime, type) }}
                    uploadVideo={true}
                    isMultiple={true}>
                    <AntDesign name="pluscircleo" size={20} color="#fff" />
                    <Text style={styles.add_image_text}>
                        Add Images/Videos
                    </Text>
                </MultipleimagePicker>
            </View>
            <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10 }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginVertical: 10,
                        }}>
                        {multipleAssetsPost &&
                            multipleAssetsPost?.map((item, index) => {
                                console.log("itemn Image", item);
                                return (
                                    <View
                                        style={{ position: 'relative', marginHorizontal: 5 }}
                                        key={index + 1}>

                                        {
                                            item !== "" ?
                                                <>
                                                    {
                                                        item.includes(".png", 0) == true ?
                                                            <Image
                                                                style={{
                                                                    height: Dimensions.get('window').height * 0.11,
                                                                    width: Dimensions.get('window').height * 0.11,
                                                                    borderRadius: 10,
                                                                    resizeMode: 'cover',
                                                                }}

                                                                source={{ uri: ImageURL + item }}
                                                            /> :
                                                            <Image
                                                                style={{
                                                                    height: Dimensions.get('window').height * 0.11,
                                                                    width: Dimensions.get('window').height * 0.11,
                                                                    borderRadius: 10,
                                                                    resizeMode: 'cover',
                                                                }}

                                                                source={{ uri: item }}
                                                            />
                                                    }

                                                </>
                                                :
                                                <>

                                                </>
                                        }

                                        <TouchableOpacity
                                            onPress={() => {
                                                remmoveAsset(item, "image");
                                            }}
                                            style={{
                                                position: 'absolute',
                                                top: 8,
                                                right: 5,
                                            }}>
                                            <Text
                                                style={{
                                                    fontSize: 30,
                                                    fontWeight: 'bold',
                                                    color: 'white',
                                                }}>
                                                x
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}


                        <View></View>
                    </View>
                </ScrollView>
            </View>
            <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10 }}>
                <ScrollView

                    horizontal={true} showsHorizontalScrollIndicator={true}>
                    {multipleVideos[0] !== '' &&
                        multipleVideos.map((item, index) => {
                            // console.log("index :::", index + " :", isPaused[index]?.paused)
                            return (
                                <View
                                    style={{ position: 'relative', }}
                                    key={index + 1}>
                                    {
                                        item.includes("..mp4", 0) == true ?
                                            <View
                                                style={{ width: width - 20, justifyContent: "center", marginHorizontal: 5, alignItems: "center", height: 200, borderRadius: 20, overflow: "hidden" }}
                                            >

                                                <Video
                                                    key={keyy}
                                                    // Can be a URL or a local file.
                                                    source={{ uri: VideoURL+item }}
                                                    // Store reference  
                                                    ref={videoRef}
                                                    paused={isPaused[index]?.paused}
                                                    repeat
                                                    style={{ width: "100%", height: "100%", }}
                                                />

                                                <TouchableOpacity
                                                    style={styles.pause_play_button}
                                                    onPress={() => {
                                                        if (isPaused[index].paused == true) {
                                                            console.log("isPuased");
                                                            videoFunctions('play', index)
                                                        } else {
                                                            console.log("isResumed");
                                                            videoFunctions('pause', index)
                                                        }

                                                    }}
                                                >
                                                    {isPaused[index]?.paused ?
                                                        <Feather name="play" size={30} color="white" style={{ marginLeft: 5 }} />
                                                        :
                                                        <Feather name="pause" size={30} color="white" style={{ marginLeft: 0 }} />
                                                    }
                                                </TouchableOpacity>

                                            </View>
                                            :
                                            <View
                                                style={{ width: width - 20, justifyContent: "center", marginHorizontal: 5, alignItems: "center", height: 200, borderRadius: 20, overflow: "hidden" }}
                                            >

                                                <Video
                                                    key={keyy}
                                                    // Can be a URL or a local file.
                                                    source={{ uri: item }}
                                                    // Store reference  
                                                    ref={videoRef}
                                                    paused={isPaused[index]?.paused}
                                                    repeat
                                                    style={{ width: "100%", height: "100%", }}
                                                />

                                                <TouchableOpacity
                                                    style={styles.pause_play_button}
                                                    onPress={() => {
                                                        if (isPaused[index].paused == true) {
                                                            console.log("isPuased");
                                                            videoFunctions('play', index)
                                                        } else {
                                                            console.log("isResumed");
                                                            videoFunctions('pause', index)
                                                        }

                                                    }}
                                                >
                                                    {isPaused[index]?.paused ?
                                                        <Feather name="play" size={30} color="white" style={{ marginLeft: 5 }} />
                                                        :
                                                        <Feather name="pause" size={30} color="white" style={{ marginLeft: 0 }} />
                                                    }
                                                </TouchableOpacity>

                                            </View>
                                        // <Text>This is video</Text>

                                    }
                                    <TouchableOpacity
                                        onPress={() => {
                                            remmoveAsset(item, "video");
                                        }}
                                        style={{
                                            position: 'absolute',
                                            top: 8,
                                            right: 15,
                                            width: 40,
                                            height: 40,
                                            borderRadius: 20,
                                            justifyContent: 'center',
                                            alignItems: "center",
                                            backgroundColor: "rgba(52,52,52,0.4)"
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: 30,
                                                fontWeight: 'bold',
                                                color: 'white',
                                                marginBottom: 10
                                            }}>
                                            x
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                </ScrollView >
            </View >
        </>
    )
}

export default ImageSelector

const styles = StyleSheet.create({
    mainContainer: {
        height: 130,
        width: "95%",
        backgroundColor: '#EEEEEE',
        alignSelf: "center",
        marginTop: 20,
        elevation: 2,
        marginBottom: 20,
    },
    upload_5_image: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
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
    multi_image_picker: {
        width: '100%',
        height: 120,
        backgroundColor: '#2C74B3',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    add_image_text: {
        marginHorizontal: 5,
        color: '#fff',
        fontSize: 19,
        fontWeight: '600'
    }
})