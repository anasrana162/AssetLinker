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
} from 'react-native';
import React, { Component } from 'react'

const { StatusBarManager: { HEIGHT } } = NativeModules;
const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height - HEIGHT

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from "react-native-vector-icons/Feather"
import { Colors } from '../../config';
import AssetLinkers from '../../api/AssetLinkers';
import AllPosts from './Components/AllPosts';

{/* {---------------Redux Imports------------} */ }
import { connect } from 'react-redux';
import * as userActions from "../../redux/actions/user"
import { bindActionCreators } from 'redux';

class UserProfileDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Posts: null,
            openDeletePostModal: false,
            postID: '',
        };
    }

    componentDidMount = () => {
        this.getUserPosts()
    }

    getUserPosts = () => {
        console.log("Working")
        var { user_id } = this.props?.route?.params
        AssetLinkers.get("https://devstaging.a2zcreatorz.com/assetLinkerProject/api/get_property/" + user_id).then((res) => {
            if (res?.data) {
                console.log("Get User Post api Data:  ", res?.data?.property[0])
                this.setState({
                    Posts: res?.data?.property
                })
            }
        }).catch((err) => {
            console.log("Get Post api Error:  ", err?.response)
        })
    }

    onPress = (key) => {
        switch (key) {
            case "goback":
                this.props.navigation.goBack()
                break;
            // case "share":
            //     Linking.openURL(
            //         `https://assetslinkers.com`,
            //     )
            //     break;
        }
    }

    openDeletePostModal = (postID) => {
        console.log("POST TO DELETE:", postID)
        setImmediate(() => {
            this.setState({
                openDeletePostModal: true,
                postID: postID
            })
        })
    }

    render() {

        var { user_id, name, image, member_since } = this.props?.route?.params

        return (
            <View style={styles.mainContainer}>
                <ScrollView>
                    {/* Header */}
                    <View style={styles.headerCont}>

                        {/* Back Button */}
                        <TouchableOpacity
                            style={{ position: "absolute", left: 10 }}
                            onPress={() => this.onPress("goback")}
                        >
                            <Feather name="chevron-left" size={30} color="white" />
                        </TouchableOpacity>

                        {/* Title */}
                        <Text style={styles.headerTitle}>User Profile</Text>

                    </View>

                    {/* Profile Info Cont */}

                    <View style={styles.pContainer}>

                        <Image
                            source={{ uri: image }}
                            style={styles.image}
                        />
                        <View style={styles.inner_cont}>

                            <Text style={styles.text}>{name}</Text>
                            <View>

                                <Text style={styles.text}>Member Since:</Text>
                                <Text style={styles.text}>{member_since}</Text>
                            </View>
                        </View>


                    </View>

                    {/* User Posts  */}
                    <View style={styles.headerCont}>

                        {/* Title */}
                        <Text style={styles.headerTitle}>Projects</Text>

                    </View>

                    {/* Posts Component */}
                    <AllPosts
                        data={this.state.Posts}
                        navProps={this.props.navigation}
                        userID={user_id}
                        openDeletePostModal={(postID) => this.openDeletePostModal(postID)}
                    />

                </ScrollView>

                {/* Modal Delete Post */}

                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.openDeletePostModal}

                >
                    <TouchableOpacity
                        style={styles.deletePostModal}
                        onPress={() => this.setState({ openDeletePostModal: false })}
                    >
                    </TouchableOpacity>
                    <View style={styles.deletePost_mainCont}>
                        <Text style={styles.deletePost_title}>Are you Sure you want to delete this Post? , this can't be undone!</Text>

                        <View style={styles.flex_direc}>
                            <TouchableOpacity
                                onPress={() => this.deletePost()}
                                style={styles.yes_no_btn}>
                                <Text style={styles.yes_no_text}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.setState({ openDeletePostModal: false })}
                                style={styles.yes_no_btn}>
                                <Text style={styles.yes_no_text}>NO</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </Modal>

            </View>
        )
    }
}

{/* {---------------redux State ------------} */ }
const mapStateToProps = state => ({
    userData: state.userData
});

{/* {---------------redux Actions ------------} */ }
const ActionCreators = Object.assign(
    {},
    userActions,
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileDetail)


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: width,
        height: height,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: "white"
    },
    headerCont: {
        width: width,
        height: 60,
        paddingVertical: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.blue
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "600",
        color: "white",
    },
    pContainer: {
        width: width,
        height: 130,
        // borderWidth: 1,
        marginVertical: 20,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",

    },
    inner_cont: {
        width: "60%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        // borderWidth: 1
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 80,
        marginLeft: 10,
        marginRight: 30
    },
    text: {
        fontSize: 20,
        fontWeight: "600",
        color: Colors.black
    },
    deletePostModal: {
        width: width,
        height: Dimensions.get("screen").height,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.fadedBackground
    },
    deletePost_mainCont: {
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
        zIndex: 200
    },
    deletePost_title: {
        fontWeight: "600",
        color: Colors.black,
        fontSize: 16,
        width: "80%",
        alignSelf: "center",
        textAlign: "left",
    },
    flex_direc: {
        width: "40%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

    },
    yes_no_btn: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.blue,
        borderRadius: 10,
        marginTop: 10
    },
    yes_no_text: {
        fontSize: 16,
        fontWeight: "600",
        color: "white",
    },
})