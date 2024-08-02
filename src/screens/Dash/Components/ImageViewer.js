import { StyleSheet, Text, View, Dimensions, Image, Pressable, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Colors } from '../../../config';
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from 'react-native-vector-icons/Feather';
import Video from 'react-native-video';

const width = Dimensions.get("screen").width;
const height = Dimensions.get('screen').height;

const ImageURL = "https://devstaging.a2zcreatorz.com/assetLinker_laravel/storage/app/public/images/property/";
const VideoURL = "https://devstaging.a2zcreatorz.com/assetLinker_laravel/storage/app/public/videos/property/";

const ImageViewer = ({ Images, openImageModal }) => {
    const videoRef = useRef(null);
    const [position, setPosition] = useState(0);
    const [isPaused, setIsPaused] = useState([]);

    useEffect(() => {
        generateState();
    }, [Images]);

    const generateState = () => {
        if (!Images || Images.length === 0) return;
        const arr = Images.map(image => ({
            paused: image.includes("..mp4") ? true : undefined,
        }));
        setIsPaused(arr);
    };

    const videoFunctions = useCallback((key, videoIndex) => {
        setIsPaused(prevState => {
            const updated = [...prevState];
            updated[videoIndex].paused = key === "pause";
            return updated;
        });
        if (key === "pause") {
            videoRef.current?.pause();
        } else {
            videoRef.current?.play();
        }
    }, []);

    const onNext = useCallback(() => {
        setPosition(prevPos => (prevPos + 1) % Images.length);
    }, [Images.length]);

    const onPrev = useCallback(() => {
        setPosition(prevPos => (prevPos - 1 + Images.length) % Images.length);
    }, [Images.length]);

    const renderContent = () => {
        const currentItem = Images[position];
        if (!currentItem) return null;

        if (currentItem.includes("..mp4")) {
            return (
                <Pressable
                    onPress={() => openImageModal(currentItem, position)}
                    style={styles.imagCont}
                >
                    <Video
                        source={{ uri: VideoURL + currentItem }}
                        ref={videoRef}
                        paused={isPaused[position]?.paused}
                        repeat
                        resizeMode='cover'
                        style={{ width: "100%", height: "100%" }}
                    />
                    <TouchableOpacity
                        style={styles.pause_play_button}
                        onPress={() => videoFunctions(isPaused[position]?.paused ? 'play' : 'pause', position)}
                    >
                        {isPaused[position]?.paused
                            ? <Feather name="play" size={30} color="white" style={{ marginLeft: 5 }} />
                            : <Feather name="pause" size={30} color="white" style={{ marginLeft: 0 }} />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onNext}
                        style={styles.next_btn}
                    >
                        <AntDesign name="right" size={25} color={Colors.white} style={{ marginLeft: 5 }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onPrev}
                        style={styles.prev_btn}
                    >
                        <AntDesign name="left" size={25} color={Colors.white} style={{ marginRight: 5 }} />
                    </TouchableOpacity>
                    <View style={styles.paginationCont}>
                        {Images.map((_, index) => (
                            <View key={index} style={[styles.dots, {
                                backgroundColor: index === position ? Colors.white : Colors.DarkGrey
                            }]} />
                        ))}
                    </View>
                </Pressable>
            );
        } else {
            return (
                <Pressable
                    onPress={() => openImageModal(currentItem, position)}
                    style={styles.imagCont}
                >
                    <TouchableOpacity
                        onPress={onNext}
                        style={styles.next_btn}
                    >
                        <AntDesign name="right" size={25} color={Colors.white} style={{ marginLeft: 5 }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onPrev}
                        style={styles.prev_btn}
                    >
                        <AntDesign name="left" size={25} color={Colors.white} style={{ marginRight: 5 }} />
                    </TouchableOpacity>
                    <Image
                        resizeMode='cover'
                        source={{ uri: ImageURL + currentItem }}
                        style={{ width: "100%", height: "100%" }}
                    />
                    <View style={styles.paginationCont}>
                        {Images.map((_, index) => (
                            <View key={index} style={[styles.dots, {
                                backgroundColor: index === position ? Colors.white : Colors.DarkGrey
                            }]} />
                        ))}
                    </View>
                </Pressable>
            );
        }
    };

    return (
        <View style={styles.mainContainer}>
            {renderContent()}
        </View>
    );
};

export default ImageViewer;

const styles = StyleSheet.create({
    mainContainer: {
        width: width,
        justifyContent: "center",
        alignItems: "center"
    },
    imagCont: {
        width: width,
        height: height / 3.2,
        justifyContent: "center",
        alignItems: 'center',
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
});