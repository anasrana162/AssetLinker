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
import React, { Component } from "react";
import { Colors } from "../../config";
import Feather from "react-native-vector-icons/Feather"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import LottieView from 'lottie-react-native';

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

class AssociationNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            postData: [],
            mic_color: false,
            mic_pressed_color: false,
        };
    }

    componentDidMount = () => {
        this.getPosts()
    }

    getPosts = () => {
        this.setState({ loader: true })
        AssetLinkers.get("get_news_post").then((res) => {
            if (res?.data) {
                // console.log("Res", res?.data?.property)
                this.setState({
                    postData: res?.data?.property,
                    loader: false
                })
            }
        }).catch((err) => {
            console.log("ERR Fetch CEO POSTS!", err)
        })
    }

    onRecord = () => {
        setImmediate(() => {
            this.setState({ mic_pressed_color: !this.state.mic_pressed_color, mic_color: !this.state.mic_color })
        })
    }

    render() {

        var { userData: { user } } = this.props

        const ListHeaderComponent = () => {
            return (
                <View style={styles.header}>
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
            // console.log("Item", item?.item?.post_images.length)
            var data = item?.item
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
                            <View style={{
                                width: 60,
                                height: 25,
                                backgroundColor: Colors.blue,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 5,
                                marginVertical: 3
                            }}>
                                <Text style={{ fontWeight: "800", fontSize: 15, color: "white", letterSpacing: 1 }}>{data?.designation}</Text>
                            </View>
                        </View>
                    </View>
                    {/* User Post Data */}
                    <View style={styles.postCont}>
                        {
                            (data?.description == "" || data?.description == null || data?.description == "NULL") ? <></> :
                                <Text style={styles.postDescription}>{data?.description}</Text>
                        }
                        {
                            data?.post_images == "" ? <></> :
                                <View style={styles.postImageBox}>
                                    <ScrollView horizontal={true} pagingEnabled>

                                        {
                                            data?.post_images.map((image, index) => {
                                                // console.log("image", image)
                                                return (
                                                    <Image
                                                        source={{ uri: newsPostImageURL + image }}
                                                        style={{ width: width - 20, height: 200 }}
                                                        resizeMode='cover'
                                                    />
                                                )
                                            })
                                        }
                                    </ScrollView>
                                </View>
                        }

                    </View>
                </View>
            )
        })

        return (
            <View style={styles.mainContainer}>
                <ListHeaderComponent />
                <FlatList
                    data={this.state.postData}
                    // ListHeaderComponent={ListHeaderComponent}
                    ListEmptyComponent={ListEmptyComponent}
                    renderItem={renderItem}
                />

                <View style={styles.addPostCont}>
                    {this.state.mic_pressed_color ?
                        <View style={styles.micRecordingCont}>
                            <TouchableOpacity
                            onPress={()=>this.onRecord()}
                            >

                            <LottieView source={require('../../animations/mic.json')} style={{width:50,height:50,marginLeft:10,}} autoPlay loop />
                            </TouchableOpacity>
                            <Text style={styles.recordText}>Recording</Text>
                        </View>
                        :
                        <>
                            <TouchableOpacity
                                style={[styles.micButton, {
                                    // backgroundColor: this.state.mic_pressed_color ? Colors.color1 : "white"
                                }]}
                                onPress={() => this.onRecord()}
                                activeOpacity={0.4}
                            >
                                <Feather name="mic" size={24} color={this.state.mic_color ? "green" : "black"} />
                            </TouchableOpacity>

                            <TextInput
                                style={styles.addPostTxtInp}
                                placeholder="What's on your mind?"
                                placeholderTextColor={Colors.lightGrey}
                            />
                        </>
                    }
                            <TouchableOpacity
                                style={[styles.micButton, {
                                    // backgroundColor: this.state.mic_pressed_color ? Colors.color1 : "white"
                                }]}
                                // onPress={() => this.onRecord()}
                                activeOpacity={0.4}
                            >
                                <Feather name="camera" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.micButton, {
                                    // backgroundColor: this.state.mic_pressed_color ? Colors.color1 : "white"
                                }]}
                                // onPress={() => this.onRecord()}
                                activeOpacity={0.4}
                            >
                                <MaterialIcons name="photo-library" size={28} color="black" />
                            </TouchableOpacity>

                </View>

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
    itemContainer: {
        width: width,
        // height: 300,
        marginVertical: 5,
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
    micRecordingCont: {
        width: "60%",
        height: 40,
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center"
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
    recordText:{
        color: "crimson",
        fontSize: 16,
        fontWeight: "500",
        marginLeft:10,
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
        marginTop: 20
    },
    userDataCont: {
        width: "100%",
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    userDataTextCont: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "80%",
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