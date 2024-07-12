import {
    Text,
    View,
    Dimensions,
    StatusBar,
    Image,
    FlatList,
    TouchableOpacity,
    ScrollView,
    Linking,
    RefreshControl,
    StyleSheet,
    NativeModules,
    Modal,
    ActivityIndicator,
    Platform,
    TextInput,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import { Colors } from "../../config";
import Feather from "react-native-vector-icons/Feather"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Entypo from "react-native-vector-icons/Entypo"
import Ionicons from "react-native-vector-icons/Ionicons"
import LottieView from 'lottie-react-native';
import SoundRecorder from 'react-native-sound-recorder';
import SoundPlayer from 'react-native-sound-player'
import RNFS from "react-native-fs";
import * as ImageCropPicker from 'react-native-image-crop-picker';
import Video, { VideoRef } from 'react-native-video';
const ImageURL = "https://devstaging.a2zcreatorz.com/assetLinker_laravel/storage/app/public/images/property/"
const VideoURL = "https://devstaging.a2zcreatorz.com/assetLinker_laravel/storage/app/public/videos/ceo_post/"

import {
    Image as ImageCompressor,
} from 'react-native-compressor';

const {
    StatusBarManager: { HEIGHT },
} = NativeModules;
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height - HEIGHT;

import AssetLinkers from "../../api/AssetLinkers";
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/user";
import { bindActionCreators } from "redux";
import { newsPostImageURL } from "../../config/Common";
import ImageModal from "../Post/Components/ImageModal";

class AssociationNews extends Component {


    constructor(props) {
        super(props);
        this.animationRef = React.createRef();
        this.videoRef = React.createRef();
        this.state = {
            loader: false,
            postData: [],
            mic_color: false,
            mic_pressed: false,
            isPlaying: false,
            isPaused: false,
            recorded: "",
            audioPath: "",
            recordedToShow: "",
            postText: "",
            imagesToShow: [],
            imagesToPost: [],
            videosToShow: [],
            videosToPost: [],
            selectedpostToUpdate: '',
            autoFocus: false,
            selectedAudioToPlay: "",
            posting: false,
            postDeleteID: "",
            openDeleteModal: false,
            updateModal: false,
            confirmModal: false,
            imageModal: {
                isOpen: false,
                image: "",
                index: 0,
                allImages: [],
            }
        };
    }
    _onFinishedPlayingSubscription = null

    componentDidMount = () => {

        _onFinishedPlayingSubscription = SoundPlayer.addEventListener('FinishedPlaying', ({ success }) => {
            // console.log('finished playing', success)
            this.animationRef.current?.reset();
            setImmediate(() => {
                this.setState({ isPlaying: false, selectedAudioToPlay: "" })
            })
        })
        this.getPosts()

    }

    getPosts = () => {
        this.setState({ loader: true })
        AssetLinkers.get("get_news_post").then((res) => {
            if (res?.data) {
                // console.log("Res", res?.data?.property)
                this.setState({
                    postData: res?.data?.property?.reverse(),
                    // loader: false
                })
                this.setVideoStates(res?.data?.property?.reverse())

            }
        }).catch((err) => {
            console.log("ERR Fetch CEO POSTS!", err)
        })
    }

    setVideoStates = (data) => {
        let arr = []
        var files = ''
        for (let i = 0; i < data?.length; i++) {

            if (data[i]?.videos == '') {
            } else {
                let videos = data[i]?.videos
                if (videos == '') {
                    // no vidoes also
                } else {
                    let videoArr = []
                    for (let v = 0; v < videos?.length; v++) {
                        let obj = {
                            isPaused: true,
                            value: videos[v],
                        }
                        videoArr.push(obj)
                    }
                    data[i].videos = videoArr
                }

            }
            if (data[i]?.post_images[0] == '') {
            } else {
                let images = data[i]?.post_images
                if (images[0] == '') {
                    // no vidoes also
                } else {
                    let imageArr = []
                    for (let v = 0; v < images?.length; v++) {
                        let obj = {
                            // isPaused: true,
                            value: images[v],
                        }
                        imageArr.push(obj)
                    }
                    data[i].post_images = imageArr
                }

            }


        }
        this.setState({
            postData: data?.reverse(),
            loader: false
        })

    }

    Post = () => {
        var { userData: { user } } = this.props
        setImmediate(() => {
            this.setState({
                posting: true,
            })
        })
        console.log("Images Post ---", this.state.imagesToPost);
        AssetLinkers.post("add_news_post/v1", {
            user_id: user?.id,
            post_description: this.state.postText,
            post_audio: this.state.recorded,
            images: this.state.imagesToPost,
            videos: this.state.videosToPost
        }).then((res) => {
            console.log("Association News Post API Result:", res?.data)
            this.getPosts()
            setImmediate(() => {
                this.setState({
                    recorded: "",
                    postText: "",
                    imagesToShow: [],
                    imagesToPost: [],
                    videosToPost: [],
                    videosToShow: [],
                    autoFocus: false,
                    selectedAudioToPlay: "",
                    posting: false,
                })
            })
        }).catch((err) => {
            console.log("Association News Post API ERR", err.response)
            setImmediate(() => {
                this.setState({
                    posting: false,
                })
            })
        })
    }

    deletePost = () => {
        var { userData: { user } } = this.props
        AssetLinkers.post("delete_news_post?post_id=" + this.state.postDeleteID).then((res) => {
            console.log("Delete News Association Post API Result", res?.data)
            this.setState({
                openDeleteModal: false,
                postDeleteID: "",
                confirmModal: false,
            })
            this.getPosts()
        }).catch((err) => {
            console.log("Delete News Association Post API Error", err)
        })
    }
    deleteModalOpen = (post_id) => {
        this.setState({
            postDeleteID: post_id,
            openDeleteModal: true
        })
    }

    onRecord = () => {

        if (this.state.mic_pressed == true) {
            setImmediate(() => {
                this.setState({ mic_pressed: false, mic_color: !this.state.mic_color })
            })
            SoundRecorder.stop()
                .then(async (result) => {
                    // console.log('stopped recording, audio file saved at: ', result);
                    const uri = await RNFS.readFile(result?.path, "base64")
                        .then((res) => {
                            // console.log("sound audio", res);
                            // return "data:audio/mp3;base64," + res;
                            return res
                        })
                        .catch((err) => {
                            console.log("Error IN BASE^$ Convertion", err);
                        });

                    console.log("Base 64 URI ======", uri)
                    this.setState({
                        recorded: uri
                    })

                });
        } else {

            setImmediate(() => {
                this.setState({ mic_pressed: true, mic_color: !this.state.mic_color })
            })
            // console.log("SoundRecorder.PATH_CACHE",SoundRecorder.PATH_DOCUMENT)
            var file = SoundRecorder.PATH_CACHE + '/' + this.props.userData?.user.id + '_' + new Date().getTime() + '.mp3'
            SoundRecorder.start(file)
                .then(() => {
                    setImmediate(() => {
                        this.setState({
                            audioPath: file
                        })
                    })
                    console.log('started recording');
                });

        }


    }

    playAudio = (audioPath) => {
        setImmediate(() => {
            this.setState({ isPlaying: false, selectedAudioToPlay: "" })
        })
        console.log("newsPostImageURL + audioPath", newsPostImageURL + audioPath);
        this.animationRef.current?.play();
        SoundPlayer.playUrl(newsPostImageURL + audioPath)
        // console.log(SoundPlayer.seek(2))
        setImmediate(() => {
            this.setState({ isPlaying: true, selectedAudioToPlay: audioPath })
        })
    }
    playLocalAudio = () => {
        setImmediate(() => {
            this.setState({ isPlaying: false, })
        })
        this.animationRef.current?.play();
        SoundPlayer.playUrl(this.state.audioPath)
        // console.log(SoundPlayer.seek(2))
        setImmediate(() => {
            this.setState({ isPlaying: true, })
        })
    }

    pauseAudio = () => {
        if (this.state.isPaused == true) {
            SoundPlayer.resume()
            this.animationRef.current?.play();
            this.setState({ isPaused: false })
        } else {
            SoundPlayer.pause()
            this.animationRef.current?.pause();
            this.setState({ isPaused: true })
        }
    }

    openCamera = () => {
        var { imagesToShow, imagesToPost, videosToShow, videosToPost } = this.state
        ImageCropPicker.openCamera({
            mediaType: 'any',

        }).then(async image => {

            if (image?.mime?.includes('video') == true) {
                const uri = await RNFS.readFile(image?.path, "base64")
                    .then((res) => {
                        // return "data:image/png/jpeg/jpg;base64," + res;
                        return res
                    })
                    .catch((err) => {
                        console.log("Error IN BASE^$ Convertion", err);
                    });
                videosToShow.push(image?.path)
                videosToPost.push(uri)
                this.setState({
                    videosToShow,
                    videosToPost,
                })
                return
            }
            const result = await ImageCompressor.compress(image.path, {
                quality: 0.8,

            });
            const uri = await RNFS.readFile(result, "base64")
                .then((res) => {
                    // return "data:image/png/jpeg/jpg;base64," + res;
                    return res
                })
                .catch((err) => {
                    console.log("Error IN BASE^$ Convertion", err);
                });

            imagesToShow.push(result)
            imagesToPost.push(uri)
            this.setState({
                imagesToPost,
                imagesToShow,
            })
        });
    }

    openGallery = () => {

        var { imagesToShow, imagesToPost, videosToShow, videosToPost } = this.state

        ImageCropPicker.openPicker({
            multiple: true,
            maxFiles: 5,
            mediaType: 'any',
        }).then(async image => {
            // actionSheetRef.current.hide();

            console.log("Image Picker Result", image)
            var alreadyExistingImagesToPost = [...imagesToPost]
            var alreadyExistingImagesToShow = [...imagesToShow]
            var alreadyExistingVideosToPost = [...videosToPost]
            var alreadyExistingVideosToShow = [...videosToShow]
            if (Array.isArray(image)) {

                image.map(async (data, index) => {

                    if (data?.mime?.includes('video') == true) {
                        console.log('selected data is video');
                        const uri = await RNFS.readFile(data?.path, "base64")
                            .then((res) => {
                                // return "data:image/png/jpeg/jpg;base64," + res;
                                return res
                            })
                            .catch((err) => {
                                console.log("Error IN BASE^$ Convertion", err);
                            });
                        alreadyExistingVideosToShow.push(data?.path)
                        alreadyExistingVideosToPost.push(uri)
                        this.setState({
                            videosToShow: alreadyExistingVideosToShow,
                            videosToPost: alreadyExistingVideosToPost,
                        })

                    } else {
                        const result = await ImageCompressor.compress(data.path, {
                            quality: 0.8,

                        });
                        console.log("Image COmpressor Results", result)

                        alreadyExistingImagesToShow.push(result)
                        const uri = await RNFS.readFile(result, "base64")
                            .then((res) => {
                                // return "data:image/png/jpeg/jpg;base64," + res;
                                return res
                            })
                            .catch((err) => {
                                console.log("Error IN BASE^$ Convertion", err);
                            });
                        console.log('selected data is image');



                        alreadyExistingImagesToPost.push(uri)
                        this.setState({
                            imagesToPost: alreadyExistingImagesToPost,
                            imagesToShow: alreadyExistingImagesToShow,
                        })
                    }

                    // console.log("imagesToShow", imagesToShow);


                })

            } else {
                if (image?.mime?.includes('video') == true) {
                    const uri = await RNFS.readFile(image?.path, "base64")
                        .then((res) => {
                            // return "data:image/png/jpeg/jpg;base64," + res;
                            return res
                        })
                        .catch((err) => {
                            console.log("Error IN BASE^$ Convertion", err);
                        });
                    videosToShow.push(image?.path)
                    videosToPost.push(uri)
                    this.setState({
                        videosToShow,
                        videosToPost,
                    })
                    return
                }
                const result = await ImageCompressor.compress(data.path, {
                    quality: 0.8,
                });
                imagesToShow.push(result)
                const uri = await RNFS.readFile(result, "base64")
                    .then((res) => {
                        // return "data:image/png/jpeg/jpg;base64," + res;
                        return res
                    })
                    .catch((err) => {
                        console.log("Error IN BASE^$ Convertion", err);
                    });


                imagesToPost.push(uri)
                this.setState({
                    imagesToShow,
                    imagesToPost,
                })
                console.log("imagesToShow", imagesToShow);
            }

            // onImageChange(result, image.mime, 'photo');
        });
    }

    removeImage = (selectImageIndex, type) => {
        var { imagesToShow, imagesToPost, videosToPost, videosToShow } = this.state
        switch (type) {
            case "image":
                imagesToShow.splice(selectImageIndex, 1)
                imagesToPost.splice(selectImageIndex, 1)
                this.setState({
                    imagesToPost,
                    imagesToShow,
                })
                console.log("imagesToShow after splice", imagesToShow)
                break;

            case "video":
                videosToShow.splice(selectImageIndex, 1)
                videosToPost.splice(selectImageIndex, 1)
                this.setState({
                    videosToPost,
                    videosToShow,
                })
                console.log("videosToShow after splice", videosToShow)
                break;
        }

    }

    openImageModal = (image, index, allImages) => {
        // console.log("Image Slected for Modal: ", image,
        //     `${'\n'}`,
        //     "Image Index fro Modal: ", index,
        //     `${'\n'}`,
        //     "All Images fro Modal: ", allImages
        // );

        let tempArr = []
        for (let i = 0; i < allImages.length; i++) {
            // Need only "xxxxxx.png or xxxxxxx.mp4" not [{"value": "2p2HJDHigW..png"}, {"value": "WjoCRpmDIt..png"}, {"isPaused": true, "value": "cOVQ8VNZHk..mp4"}]
            // becuase ImageModal only accepts ["2p2HJDHigW..png", "WjoCRpmDIt..png", "cOVQ8VNZHk..mp4"]
            tempArr.push(allImages[i]?.value)
        }
        // console.log("tempArr openImageModal",tempArr);

        this.setState({
            imageModal: {
                isOpen: true,
                image: image?.value,
                index: index,
                allImages: tempArr
            }
        })
    }

    closeImageModal = () => {
        this.setState({
            imageModal: {
                isOpen: false,
                image: "",
                index: 0,
                allImages: [],
            }
        })
    }

    openUpdateModal = (data) => {
        console.log("data openUpdateModal", data);
        let tempArrImg = []
        let tempArrVid = []
        if (data.post_images[0] == "") {

        } else {

            for (let i = 0; i < data?.post_images.length; i++) {
                // Need only "xxxxxx.png or xxxxxxx.mp4" not [{"value": "2p2HJDHigW..png"}, {"value": "WjoCRpmDIt..png"}, {"isPaused": true, "value": "cOVQ8VNZHk..mp4"}]
                // becuase ImageModal only accepts ["2p2HJDHigW..png", "WjoCRpmDIt..png", "cOVQ8VNZHk..mp4"]
                tempArrImg.push(data?.post_images[i]?.value)
            }
        }
        if (data.videos == "") {

        } else {

            for (let i = 0; i < data?.videos.length; i++) {
                // Need only "xxxxxx.png or xxxxxxx.mp4" not [{"value": "2p2HJDHigW..png"}, {"value": "WjoCRpmDIt..png"}, {"isPaused": true, "value": "cOVQ8VNZHk..mp4"}]
                // becuase ImageModal only accepts ["2p2HJDHigW..png", "WjoCRpmDIt..png", "cOVQ8VNZHk..mp4"]
                tempArrVid.push(data?.videos[i]?.value)
            }
        }
        // console.log("tempARR openUpdateModal", tempArrImg);
        this.setState({
            postText: data?.description,
            // recorded: data?.audio == null ? "" : data?.audio,
            // selectedAudioToPlay: data?.audio == null ? "" : newsPostImageURL + data?.audio,
            // audioPath: data?.audio == null ? "" : newsPostImageURL + data?.audio,
            imagesToShow: tempArrImg,
            imagesToPost: tempArrImg,
            videosToShow: tempArrVid,
            videosToPost: tempArrVid,
            updateModal: !this.state.updateModal,
            selectedpostToUpdate: data,
            openDeleteModal: !this.state.openDeleteModal,
        })
    }

    onUpdatePost = () => {
        // var { userData: { user } } = this.props
        var { selectedpostToUpdate } = this.state
        // setImmediate(() => {
        //     this.setState({
        //         posting: true,
        //     })
        // })
        // console.log("selectedpostToUpdate Post ---", {
        //     post_id: selectedpostToUpdate?.post_id,
        //     post_description: this.state.postText,
        //     post_audio: this.state.recorded,
        //     images: this.state.imagesToPost.toString(),
        //     videos: this.state.videosToPost.toString()
        // });
        AssetLinkers.post("update/news/post", {
            post_id: selectedpostToUpdate?.post_id,
            post_description: this.state.postText,
            post_audio: this.state.recorded,
            images: this.state.imagesToPost.toString(),
            videos: this.state.videosToPost.toString()
        }).then((res) => {
            // console.log("Association News Post API Result:", res?.data)
            this.getPosts()
            setImmediate(() => {
                this.setState({
                    recorded: "",
                    postText: "",
                    imagesToShow: [],
                    imagesToPost: [],
                    videosToPost: [],
                    videosToShow: [],
                    autoFocus: false,
                    selectedAudioToPlay: "",
                    selectedpostToUpdate: "",
                    updateModal: false,
                    posting: false,
                })
            })
        }).catch((err) => {
            console.log("Association News Post API ERR", err.response)
            setImmediate(() => {
                this.setState({
                    posting: false,
                })
            })
        })
    }

    Footer = () => {
        return (
            <View style={styles.addPostCont}>
                {this.state.mic_pressed ?
                    <View style={styles.micRecordingCont}>
                        <TouchableOpacity
                            onPress={() => this.onRecord()}
                        >
                            <LottieView source={require('../../animations/mic.json')} style={{ width: 50, height: 50, marginLeft: 10, }} autoPlay loop />
                        </TouchableOpacity>
                        <Text style={styles.recordText}>Recording</Text>
                    </View>
                    :
                    <>
                        <TouchableOpacity
                            style={[styles.micButton, {
                                // backgroundColor: this.state.mic_pressed ? Colors.color1 : "white"
                            }]}
                            onPress={() => this.onRecord()}
                            activeOpacity={0.4}
                        >
                            <Feather name="mic" size={24} color={this.state.mic_color ? "green" : "black"} />
                        </TouchableOpacity>

                        <TextInput
                            value={this.state.postText}
                            style={styles.addPostTxtInp}
                            placeholder="What's on your mind?"
                            placeholderTextColor={Colors?.timerColor}
                            autoFocus={this.state.autoFocus}
                            onChangeText={(txt) => this.setState({ postText: txt, autoFocus: true })}
                            onSubmitEditing={() => this.setState({ autoFocus: false })}
                        />
                    </>
                }
                <TouchableOpacity
                    style={[styles.micButton, {
                        // backgroundColor: this.state.mic_pressed ? Colors.color1 : "white"
                    }]}
                    onPress={() => this.openCamera()}
                    activeOpacity={0.4}
                >
                    <Feather name="camera" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.micButton, {
                        // backgroundColor: this.state.mic_pressed ? Colors.color1 : "white"
                    }]}
                    onPress={() => this.openGallery()}
                    activeOpacity={0.4}
                >
                    <MaterialIcons name="photo-library" size={28} color="black" />
                </TouchableOpacity>

            </View>
        )
    }

    render() {

        var { userData: { user } } = this.props

        const ListHeaderComponent = () => {
            return (
                <View style={styles.header}>
                    {/* Go back */}
                    <TouchableOpacity
                        style={styles.headerBtn}
                        onPress={() => this.props.navigation.navigate("Dash")}>
                        <Ionicons name="chevron-back" size={30} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Association News</Text>
                </View>
            )
        }
        const ListEmptyComponent = () => {
            return (
                <View style={{ marginTop: height / 2.2, width: width, alignItems: "center" }}>
                    {this.state.loader ?
                        <ActivityIndicator size={"large"} color={Colors.main} />
                        :
                        <Text style={{ fontSize: 24, color: "black" }}>No Content</Text>}
                </View>
            )
        }
        const renderItem = ((item) => {
            // console.log("Item", item?.item)
            var data = item?.item
            var files = ''
            if (data?.post_images == '') {
                let videos = data?.videos == '' ? [] : data?.videos;
                files = [...videos]
                // console.log("no images");
            } else if (data?.videos == '') {
                let images = data?.post_images == '' ? [] : data?.post_images;
                files = [...images]
                // console.log("no videos");
            } else {
                let videos = data?.videos == '' ? [] : data?.videos;
                let images = data?.post_images == '' ? [] : data?.post_images;
                files = [...images, ...videos]
            }



            const videoFunctions = (key, videoIndex, mainItemIndex) => {
                switch (key) {
                    case "pause":
                        var temp = this.state.postData
                        // console.log("temp[mainItemIndex]", temp[mainItemIndex], mainItemIndex);
                        temp[mainItemIndex].videos[videoIndex].isPaused = true
                        this.videoRef?.current?.pause();
                        setImmediate(() => {
                            this.setState({ postData: temp })
                        })
                        // keyy = keyy + 1
                        break;
                    case "play":
                        var temp = this.state.postData
                        temp[mainItemIndex].videos[videoIndex].isPaused = false
                        // console.log("temp[mainItemIndex]", temp[mainItemIndex], mainItemIndex, videoIndex);
                        this.videoRef?.current?.resume();
                        setImmediate(() => {
                            this.setState({ postData: temp })
                        })
                        // keyy = keyy + 1
                        break;
                }
            }

            return (
                <View style={styles.itemContainer}>

                    {/* User Data */}
                    <View style={styles.userDataCont}>
                        <Image
                            source={{
                                uri: "https://devstaging.a2zcreatorz.com/assetLinker_laravel/storage/app/public/images/userProfile/"
                                    + data?.user_image
                            }}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 60,
                                marginHorizontal: 10,

                            }}
                        />
                        <View style={styles.userDataTextCont}>
                            <Text style={styles.userName}>{data?.name}</Text>

                            {data?.designation == undefined ||
                                data?.designation == "Null" ||
                                data?.designation == null ||
                                data?.designation == "" ?
                                <></>
                                :
                                <View style={{
                                    // width: 60,
                                    // height: 25,
                                    paddingHorizontal: 5,
                                    paddingVertical: 3,
                                    backgroundColor: Colors.blue,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 10,
                                    marginVertical: 3
                                }}>
                                    <Text style={{ fontWeight: "600", fontSize: 14, color: "white", letterSpacing: 1 }}>{data?.designation}</Text>
                                </View>}
                        </View>

                        {/* Delete Button */}
                        {user?.ms_id == data?.ms_id && (
                            <TouchableOpacity
                                onPressIn={() => this.deleteModalOpen(data?.post_id)}
                                style={styles.optionBtn}>
                                <Entypo
                                    name="dots-three-horizontal"
                                    size={25}
                                    color="white"
                                />
                            </TouchableOpacity>
                        )}
                    </View>

                    {this.state.openDeleteModal && data?.post_id == this.state.postDeleteID &&
                        <TouchableOpacity
                            onPress={() => this.setState({ openDeleteModal: false })}
                            activeOpacity={0.5}
                            style={styles.fade}></TouchableOpacity>
                    }
                    {this.state.openDeleteModal && data?.post_id == this.state.postDeleteID &&
                        <View style={styles.deleteBtn_cont}>
                            <TouchableOpacity
                                onPress={() => this.setState({ confirmModal: !this.state.confirmModal, openDeleteModal: !this.state.openDeleteModal })}
                                activeOpacity={0.5}
                                style={styles.delete_btn}>
                                <Text style={styles.delete_text}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.openUpdateModal(data)}
                                activeOpacity={0.5}
                                style={styles.delete_btn}>
                                <Text style={styles.delete_text}>Update</Text>
                            </TouchableOpacity>
                        </View>
                    }

                    {/* User Post Data */}
                    <View style={styles.postCont}>

                        {/* Description */}
                        {
                            (data?.description == "" || data?.description == null || data?.description == "NULL") ? <></> :
                                <Text style={styles.postDescription}>{data?.description}</Text>
                        }

                        {/* Image Carousal */}
                        {
                            files == "" ? <></> :
                                <View style={styles.postImageBox}>
                                    <ScrollView horizontal={true} pagingEnabled>

                                        {
                                            files.map((postData, index) => {
                                                return (
                                                    <>
                                                        {postData?.value?.includes("..png") == true ?
                                                            <>
                                                                <TouchableOpacity
                                                                    onPress={() => this.openImageModal(postData, index, files)}
                                                                >

                                                                    <Image
                                                                        source={{ uri: newsPostImageURL + postData?.value }}
                                                                        style={{ width: width - 20, height: 200 }}
                                                                        resizeMode='cover'
                                                                    />
                                                                </TouchableOpacity>
                                                            </>
                                                            :
                                                            <View style={{ width: width - 20, height: 200, borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
                                                                <Video
                                                                    // key={keyy}
                                                                    // Can be a URL or a local file.
                                                                    source={{ uri: VideoURL + postData?.value }}
                                                                    // Store reference  
                                                                     resizeMode='cover'
                                                                    ref={this.videoRef}
                                                                    paused={postData?.isPaused == undefined ? true : postData?.isPaused}
                                                                    repeat
                                                                    style={{ width: "100%", height: "100%" }}
                                                                />
                                                                <TouchableOpacity
                                                                    style={styles.pause_play_button}
                                                                    onPress={() => {
                                                                        var indexOfOriginalState = ''
                                                                        // console.log("item?.videos?::",data?.videos);
                                                                        data?.videos?.filter((itemArr, indexState) => {
                                                                            console.log();
                                                                            if (itemArr?.value == postData?.value) {
                                                                                // console.log("indexState",indexState);
                                                                                indexOfOriginalState = indexState
                                                                                // return data?.videos?.indexOf(postData?.value)
                                                                            }
                                                                        })
                                                                        // console.log("indexOfOriginalState", indexOfOriginalState);

                                                                        if (postData?.isPaused == true) {
                                                                            console.log("isPuased");
                                                                            videoFunctions('play', indexOfOriginalState, item?.index)
                                                                        } else {
                                                                            console.log("isResumed");
                                                                            videoFunctions('pause', indexOfOriginalState, item?.index)
                                                                        }

                                                                    }}
                                                                >
                                                                    {postData?.isPaused ?
                                                                        <Feather name="play" size={30} color="white" style={{ marginLeft: 5 }} />
                                                                        :
                                                                        <Feather name="pause" size={30} color="white" style={{ marginLeft: 0 }} />
                                                                    }
                                                                </TouchableOpacity>
                                                            </View>

                                                        }
                                                    </>
                                                )
                                            })
                                        }
                                    </ScrollView>
                                </View>
                        }

                        {/* Audio  */}
                        {
                            (data?.audio == null || data?.audio == "" || data?.audio == "NULL") ? <></> :

                                <View style={styles.itemAudioCont}>

                                    {this.state.selectedAudioToPlay == data?.audio ?
                                        <>
                                            {this.state.isPlaying == true ?
                                                <TouchableOpacity
                                                    onPress={() => this.pauseAudio()}
                                                    style={styles.audioPlayBtn}>
                                                    <Feather name={this.state.isPaused ? "play-circle" : "pause-circle"} size={35} color="black" />
                                                </TouchableOpacity>
                                                :
                                                <TouchableOpacity
                                                    onPress={() => this.playAudio(data?.audio)}
                                                    style={styles.audioPlayBtn}>
                                                    <Feather name="play-circle" size={35} color="black" />
                                                </TouchableOpacity>
                                            }

                                            <LottieView
                                                source={require('../../animations/Audio_Playing.json')}
                                                style={{ width: 80, height: 60, marginLeft: 10, }}
                                                ref={this.animationRef}
                                                autoPlay
                                                // pause={true}
                                                loop
                                            />
                                        </>
                                        :
                                        <>
                                            <TouchableOpacity
                                                onPress={() => this.playAudio(data?.audio)}
                                                style={styles.audioPlayBtn}>
                                                <Feather name="play-circle" size={35} color="black" />
                                            </TouchableOpacity>
                                            <LottieView
                                                source={require('../../animations/Audio_Playing.json')}
                                                style={{ width: 80, height: 60, marginLeft: 10, }}
                                                // ref={this.animationRef}
                                                // autoPlay
                                                // pause={true}
                                                loop
                                            />
                                        </>
                                    }

                                </View>
                        }

                    </View>


                </View>
            )
        })

        const AddPost = () => {
            var { userData: { user } } = this.props

            const [isPaused, setIsPaused] = useState([])
            var [keyy, setKeyy] = useState(0)

            // console.log("videoRef", videoRef.current);
            useEffect(() => {
                generateState()
            }, [])

            const generateState = () => {
                if (this.state.videosToShow == undefined || this.state.videosToShow == null) {
                    return
                } else if (this.state.videosToShow?.length == 0) {
                    return
                } else {
                    // console.log("images");
                    let arr = []
                    for (let i = 0; i < this.state.videosToShow.length; i++) {
                        // console.log("ima");
                        if (this.state.videosToShow[i]?.includes("..mp4", 0) == true) {

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
                        console.log("pause videoFunc", isPaused);
                        var temp = isPaused
                        temp[videoIndex].paused = true
                        setIsPaused(temp)
                        this.videoRef?.current?.pause();
                        setKeyy(keyy + 1)
                        break;
                    case "play":
                        console.log("Play videoFunc", isPaused);
                        var temp1 = isPaused
                        console.log("Play videoFunc", temp1[videoIndex]);
                        temp1[videoIndex].paused = false
                        setIsPaused(temp1)
                        this.videoRef?.current?.resume();
                        setKeyy(keyy + 1)
                        break;
                }
            }

            return (
                <View style={styles.postPreviewCont}>
                    <View style={styles.userDataCont}>
                        <Image
                            source={{
                                uri: "https://devstaging.a2zcreatorz.com/assetLinker_laravel/storage/app/public/images/userProfile/"
                                    + user?.image
                            }}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 60,
                                marginHorizontal: 10,

                            }}
                        />
                        <View style={styles.userDataTextCont}>
                            <Text style={styles.userName}>{user?.name}</Text>
                            {user?.detail[0]?.designation == undefined ||
                                user?.detail[0]?.designation == "Null" ||
                                user?.detail[0]?.designation == null ||
                                user?.detail[0]?.designation == "" ?
                                <></>
                                :
                                <View style={{
                                    width: 60,
                                    height: 25,
                                    backgroundColor: Colors.blue,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 5,
                                    marginVertical: 3
                                }}>
                                    <Text style={{ fontWeight: "800", fontSize: 15, color: "white", letterSpacing: 1 }}>{user?.detail[0]?.designation}</Text>
                                </View>}
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    recorded: "",
                                    postText: "",
                                    imagesToPost: [],
                                    videosToPost: [],
                                })
                            }}
                            style={styles.cross}>
                            <Entypo name="cross" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{ width: "95%" }}>
                        {/* <Text style={{ fontWeight: "500", fontSize: 16, color: Colors.black, letterSpacing: 1 }}>Description: </Text> */}
                        <Text style={{ fontWeight: "500", fontSize: 14, color: Colors.black, letterSpacing: 1, }}>{this.state.postText}</Text>

                        {/* Images Selected */}
                        {this.state.imagesToShow.length != 0 && <View style={styles.postImageBox}>
                            <ScrollView horizontal={true} pagingEnabled>

                                {
                                    this.state?.imagesToShow.map((image, index) => {
                                        // console.log("image", image)
                                        return (
                                            <View>
                                                <Image
                                                    source={{ uri: image }}
                                                    style={{ width: width - 20, height: 200 }}
                                                    resizeMode='cover'
                                                />
                                                <TouchableOpacity
                                                    onPress={() => this.removeImage(index, "image")}
                                                    style={{
                                                        width: 30,
                                                        height: 30,
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        backgroundColor: "white",
                                                        borderRadius: 40,
                                                        position: "absolute",
                                                        right: 10,
                                                        top: 10,
                                                        zIndex: 200
                                                    }}>
                                                    <Entypo name="cross" size={30} color="black" />
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    })
                                }
                            </ScrollView>
                        </View>}
                        {/* Videos Selected */}
                        {this.state.videosToShow.length != 0 && <View style={[styles.postImageBox]}>
                            <ScrollView horizontal={true} pagingEnabled>

                                {
                                    this.state?.videosToShow.map((video, index) => {
                                        // console.log("video", video)
                                        return (
                                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                                <Video
                                                    key={keyy}
                                                    // Can be a URL or a local file.
                                                    source={{ uri: video }}
                                                    // Store reference  
                                                     resizeMode='cover'
                                                    ref={this.videoRef}
                                                    paused={isPaused[index]?.paused}
                                                    repeat
                                                    style={{ width: width - 20, height: 200, borderRadius: 20 }}
                                                />
                                                <TouchableOpacity
                                                    onPress={() => this.removeImage(index, "video")}
                                                    style={{
                                                        width: 30,
                                                        height: 30,
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        backgroundColor: "white",
                                                        borderRadius: 40,
                                                        position: "absolute",
                                                        right: 10,
                                                        top: 10,
                                                        zIndex: 200
                                                    }}>
                                                    <Entypo name="cross" size={30} color="black" />
                                                </TouchableOpacity>

                                                {/* Pause/Play Button */}
                                                <TouchableOpacity
                                                    style={styles.pause_play_button}
                                                    onPress={() => {
                                                        if (isPaused[index]?.paused == true) {
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
                                        )
                                    })
                                }
                            </ScrollView>
                        </View>}

                        {/* Audio Selected */}
                        {
                            this.state.recorded == "" ? <></> :

                                <View style={[styles.itemAudioCont, { width: "40%" }]}>

                                    {this.state.isPlaying == true ?
                                        <TouchableOpacity
                                            onPress={() => this.pauseAudio()}
                                            style={styles.audioPlayBtn}>
                                            <Feather name={this.state.isPaused ? "play-circle" : "pause-circle"} size={35} color="black" />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity
                                            onPress={() => this.playLocalAudio()}
                                            style={styles.audioPlayBtn}>
                                            <Feather name="play-circle" size={35} color="black" />
                                        </TouchableOpacity>
                                    }

                                    <LottieView
                                        source={require('../../animations/Audio_Playing.json')}
                                        style={{ width: 80, height: 60, marginLeft: 10, }}
                                        ref={this.animationRef}
                                        // autoPlay
                                        // pause={true}
                                        loop
                                    />
                                </View>
                        }

                        <TouchableOpacity
                            onPress={() => this.Post()}
                            style={{
                                width: 150,
                                height: 45,
                                backgroundColor: Colors.main,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 10,
                                marginTop: 30,
                                alignSelf: "center"
                            }}>
                            {
                                this.state.posting ?
                                    <ActivityIndicator size={"large"} color={"white"} />
                                    :
                                    <Text style={{ fontSize: 16, fontWeight: "600", color: "white", letterSpacing: 0.5 }}>Post</Text>
                            }
                        </TouchableOpacity>

                    </ScrollView>
                </View >
            )
        }
        const UpdatePost = () => {
            var { userData: { user } } = this.props

            const [isPaused, setIsPaused] = useState([])
            var [keyy, setKeyy] = useState(0)

            // console.log("videoRef", videoRef.current);
            useEffect(() => {
                generateState()
            }, [])

            const generateState = () => {
                if (this.state.videosToShow == undefined || this.state.videosToShow == null) {
                    return
                } else if (this.state.videosToShow?.length == 0) {
                    return
                } else {
                    // console.log("images");
                    let arr = []
                    for (let i = 0; i < this.state.videosToShow.length; i++) {
                        // console.log("ima");
                        if (this.state.videosToShow[i]?.includes("..mp4", 0) == true) {

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
                        console.log("pause videoFunc", isPaused);
                        var temp = isPaused
                        temp[videoIndex].paused = true
                        setIsPaused(temp)
                        this.videoRef?.current?.pause();
                        setKeyy(keyy + 1)
                        break;
                    case "play":
                        console.log("Play videoFunc", isPaused);
                        var temp1 = isPaused
                        console.log("Play videoFunc", temp1[videoIndex]);
                        temp1[videoIndex].paused = false
                        setIsPaused(temp1)
                        this.videoRef?.current?.resume();
                        setKeyy(keyy + 1)
                        break;
                }
            }

            return (
                <View style={styles.postPreviewCont}>
                    <View style={styles.userDataCont}>
                        <Image
                            source={{
                                uri: "https://devstaging.a2zcreatorz.com/assetLinker_laravel/storage/app/public/images/userProfile/"
                                    + user?.image
                            }}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 60,
                                marginHorizontal: 10,

                            }}
                        />
                        <View style={styles.userDataTextCont}>
                            <Text style={styles.userName}>{user?.name}</Text>
                            {user?.detail[0]?.designation == undefined ||
                                user?.detail[0]?.designation == "Null" ||
                                user?.detail[0]?.designation == null ||
                                user?.detail[0]?.designation == "" ?
                                <></>
                                :
                                <View style={{
                                    width: 60,
                                    height: 25,
                                    backgroundColor: Colors.blue,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 5,
                                    marginVertical: 3
                                }}>
                                    <Text style={{ fontWeight: "800", fontSize: 15, color: "white", letterSpacing: 1 }}>{user?.detail[0]?.designation}</Text>
                                </View>}
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    updateModal: !this.state.updateModal,
                                    recorded: "",
                                    postText: "",
                                    imagesToPost: [],
                                    videosToPost: [],
                                    imagesToShow: [],
                                    videosToShow: [],

                                })
                            }}
                            style={styles.cross}>
                            <Entypo name="cross" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{ width: "95%" }}>
                        {/* <Text style={{ fontWeight: "500", fontSize: 16, color: Colors.black, letterSpacing: 1 }}>Description: </Text> */}
                        <Text style={{ fontWeight: "500", fontSize: 14, color: Colors.black, letterSpacing: 1, }}>{this.state.postText}</Text>

                        {/* Images Selected */}
                        {/* {console.log("this.state.imagesToShow.:", this.state.imagesToShow)} */}
                        {this.state.imagesToShow?.length != 0 && <View style={styles.postImageBox}>
                            <ScrollView horizontal={true} pagingEnabled>

                                {
                                    this.state?.imagesToShow?.map((image, index) => {
                                        // console.log("image", `${newsPostImageURL} + ${image}`)
                                        return (
                                            <View>
                                                {image.includes("file:") ?
                                                    <>
                                                        <Image
                                                            source={{ uri: image }}
                                                            style={{ width: width - 20, height: 200 }}
                                                            resizeMode='cover'
                                                        />
                                                    </>
                                                    :
                                                    <>
                                                        <Image
                                                            source={{ uri: `${newsPostImageURL}${image}` }}
                                                            style={{ width: width - 20, height: 200 }}
                                                            resizeMode='cover'
                                                        />
                                                    </>
                                                }
                                                <TouchableOpacity
                                                    onPress={() => this.removeImage(index, "image")}
                                                    style={{
                                                        width: 30,
                                                        height: 30,
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        backgroundColor: "white",
                                                        borderRadius: 40,
                                                        position: "absolute",
                                                        right: 10,
                                                        top: 10,
                                                        zIndex: 200
                                                    }}>
                                                    <Entypo name="cross" size={30} color="black" />
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    })
                                }
                            </ScrollView>
                        </View>}
                        {/* Videos Selected */}
                        {this.state.videosToShow.length != 0 && <View style={[styles.postImageBox]}>
                            <ScrollView horizontal={true} pagingEnabled>

                                {
                                    this.state?.videosToShow.map((video, index) => {
                                        // console.log("video", video)
                                        return (
                                            <View style={{ justifyContent: "center", alignItems: "center" }}>

                                                {video.includes("file:") ?
                                                    <>
                                                        <Video
                                                            key={keyy}
                                                            // Can be a URL or a local file.
                                                            source={{ uri: video }}
                                                            // Store reference  
                                                            ref={this.videoRef}
                                                            resizeMode='cover'
                                                            paused={isPaused[index]?.paused}
                                                            repeat
                                                            style={{ width: width - 20, height: 200, borderRadius: 20 }}
                                                        />
                                                    </>
                                                    :
                                                    <>
                                                        <Video
                                                            key={keyy}
                                                            // Can be a URL or a local file.
                                                            source={{ uri: VideoURL + video }}
                                                            // Store reference 
                                                            resizeMode='cover'
                                                            ref={this.videoRef}
                                                            paused={isPaused[index]?.paused}
                                                            repeat
                                                            style={{ width: width - 20, height: 200, borderRadius: 20 }}
                                                        />
                                                    </>
                                                }

                                                <TouchableOpacity
                                                    onPress={() => this.removeImage(index, "video")}
                                                    style={{
                                                        width: 30,
                                                        height: 30,
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        backgroundColor: "white",
                                                        borderRadius: 40,
                                                        position: "absolute",
                                                        right: 10,
                                                        top: 10,
                                                        zIndex: 200
                                                    }}>
                                                    <Entypo name="cross" size={30} color="black" />
                                                </TouchableOpacity>

                                                {/* Pause/Play Button */}
                                                <TouchableOpacity
                                                    style={styles.pause_play_button}
                                                    onPress={() => {
                                                        if (isPaused[index]?.paused == true) {
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
                                        )
                                    })
                                }
                            </ScrollView>
                        </View>}

                        {/* Audio Selected */}
                        {
                            this.state.recorded == "" ? <></> :

                                <View style={[styles.itemAudioCont, { width: "40%" }]}>

                                    {this.state.isPlaying == true ?
                                        <TouchableOpacity
                                            onPress={() => this.pauseAudio()}
                                            style={styles.audioPlayBtn}>
                                            <Feather name={this.state.isPaused ? "play-circle" : "pause-circle"} size={35} color="black" />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.playLocalAudio()
                                                // if (this.state.recorded.includes(".mp3") == true) {
                                                //     this.playAudio(this.state.recorded)
                                                // } else {

                                                // }
                                            }}
                                            style={styles.audioPlayBtn}>
                                            <Feather name="play-circle" size={35} color="black" />
                                        </TouchableOpacity>
                                    }

                                    <LottieView
                                        source={require('../../animations/Audio_Playing.json')}
                                        style={{ width: 80, height: 60, marginLeft: 10, }}
                                        ref={this.animationRef}
                                        // autoPlay
                                        // pause={true}
                                        loop
                                    />
                                </View>
                        }

                        <TouchableOpacity
                            onPress={() => this.onUpdatePost()}
                            style={{
                                width: 150,
                                height: 45,
                                backgroundColor: Colors.main,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 10,
                                marginTop: 30,
                                alignSelf: "center"
                            }}>
                            {
                                this.state.posting ?
                                    <ActivityIndicator size={"large"} color={"white"} />
                                    :
                                    <Text style={{ fontSize: 16, fontWeight: "600", color: "white", letterSpacing: 0.5 }}>Update</Text>
                            }
                        </TouchableOpacity>

                    </ScrollView>
                </View >
            )
        }

        return (
            <View style={styles.mainContainer} >

                {/* Header */}
                < ListHeaderComponent />

                {
                    (this.state.recorded == "" &&
                        this.state.postText == "" &&
                        this.state.imagesToPost.length == 0 && this.state.videosToPost.length == 0) ?
                        <>
                            {/* Content List */}
                            <FlatList
                                data={this.state.postData}
                                // ListHeaderComponent={ListHeaderComponent}
                                ListEmptyComponent={ListEmptyComponent}
                                renderItem={renderItem}
                            />
                        </>
                        :
                        <>
                            {/* Modal Add Post */}
                            {
                                this.state.updateModal == false &&
                                < AddPost />
                            }
                        </>
                }
                {this.state.updateModal &&
                    <UpdatePost />
                }

                {/* Footer For CEO Posting  */}
                {
                    user?.allow_to_post == 1 &&
                    <this.Footer />
                }

                {/* Image Modal */}
                {
                    this.state.imageModal?.isOpen == true &&
                    <ImageModal
                        imageSelected={this.state.imageModal?.image}
                        indexSelected={this.state.imageModal?.index}
                        images={this.state.imageModal?.allImages}
                        closeModal={() => this.closeImageModal()}
                        imageLink={newsPostImageURL}
                        videoLink={VideoURL}
                    />
                }

                {/* Modal Delete Post */}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.confirmModal}>
                    <TouchableOpacity
                        style={styles.confirmModalCont}
                        onPress={() =>
                            this.setState({ confirmModal: false })
                        }></TouchableOpacity>
                    <View style={styles.confirmModal_mainCont}>
                        <Text style={styles.confirmModalTitle}>
                            Are you Sure you want to delete this Post? , this can't be undone!
                        </Text>

                        <View style={styles.flex_direc}>
                            <TouchableOpacity
                                onPress={() => this.deletePost()}
                                style={styles.yes_no_btn}>
                                <Text style={styles.yes_no_text}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.setState({ confirmModal: false })}
                                style={styles.yes_no_btn}>
                                <Text style={styles.yes_no_text}>NO</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </View >
        )
    }
}

{
    /* {---------------redux State ------------} */
}
const mapStateToProps = (state) => ({
    userData: state.userData,
});

{
    /* {---------------redux Actions ------------} */
}
const ActionCreators = Object.assign({}, userActions);
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssociationNews);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: width,
        height: height,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
    },
    headerBtn: {
        width: 45,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        position: "absolute",
        left: 5,
    },
    cross: {
        padding: 5,
        backgroundColor: "rgba(52,52,52,0.6)",
        marginRight: 10,
        borderRadius: 20
    },
    itemContainer: {
        width: width,
        // height: 300,
        marginVertical: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
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
    confirmModalCont: {
        width: width,
        height: Dimensions.get("screen").height,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.fadedBackground,
    },
    confirmModal_mainCont: {
        width: width - 100,
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 10,
        position: "absolute",
        top: height / 2.2,
        left: 50,
        // right: 0,
        zIndex: 200,
    },
    flex_direc: {
        width: "40%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    confirmModalTitle: {
        fontWeight: "600",
        color: Colors.black,
        fontSize: 16,
        width: "80%",
        alignSelf: "center",
        textAlign: "left",
    },
    yes_no_btn: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.blue,
        borderRadius: 10,
        marginTop: 10,
    },
    yes_no_text: {
        fontSize: 16,
        fontWeight: "600",
        color: "white",
    },
    optionBtn: {
        paddingHorizontal: 4,
        paddingVertical: 1,
        backgroundColor: Colors.fadedBackground,
        position: "absolute",
        right: 5,
        top: 10,
        zIndex: 100,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    fade: {
        width: "100%",
        height: "100%",
        backgroundColor: Colors.fadedBackground,
        position: "absolute",
        top: 10,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 80,
    },
    deleteBtn_cont: {
        width: 140,
        // height: 40,
        borderRadius: 10,
        backgroundColor: "white",
        position: "absolute",
        // top: 70,
        alignSelf: "center",
        zIndex: 150,
        justifyContent: "center",
        alignItems: "center",
    },
    delete_btn: {
        width: 120,
        height: 30,
        marginVertical: 5,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor:"red"
    },
    delete_text: {
        fontWeight: "600",
        fontSize: 14,
        color: "crimson",
    },
    postPreviewCont: {
        width: width,
        height: height - 130,
        paddingVertical: 10,
        alignItems: "center",
        backgroundColor: "white"
    },
    postCont: {
        width: "95%",
        alignSelf: "center",
        alignItems: "flex-start",
        marginTop: 10,
        marginBottom: 10,
    },
    addPostCont: {
        width: width,
        height: 60,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: Platform.OS == "ios" ? 20 : 10,
    },
    addPostTxtInp: {
        width: 220,
        height: 40,
        borderRadius: 20,
        borderWidth: 0.3,
        paddingLeft: 10,
        color: Colors.dateText
    },
    itemAudioCont: {
        // width: "70%",
        padding: 10,
        height: 55,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        borderRadius: 10,
        marginLeft: 10,
        marginTop: 20,
    },
    audioPlayBtn: {
        width: 40,
        height: 40,
        // marginLeft: 5,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    micRecordingCont: {
        width: "60%",
        height: 40,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
        // borderRadius: 20,
        // borderWidth: 0.3,
    },
    micButton: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
    },
    recordText: {
        color: "crimson",
        fontSize: 16,
        fontWeight: "500",
        marginLeft: 10,
    },
    userName: {
        color: Colors.lightblack,
        fontSize: 14,
        fontWeight: "500",
    },
    postDescription: {
        color: Colors.lightblack,
        fontSize: 14,
        fontWeight: "500",
        marginLeft: 10,
    },
    postImageBox: {
        width: "100%",
        height: 200,
        borderRadius: 20,
        overflow: "hidden",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    userDataCont: {
        width: "100%",
        // backgroundColor:"red",
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    userDataTextCont: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "70%",
    },
    header: {
        width: width,
        // height: 60,
        backgroundColor: Colors.main,
        justifyContent: "center",
        paddingHorizontal: 15,
        alignItems: "center",
        paddingTop: 5,
        paddingBottom: 10
    },
    title: {
        fontSize: 25,
        fontWeight: "600",
        color: "white",
    },
})