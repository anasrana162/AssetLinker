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

import { Colors } from '../../config';
import Feather from "react-native-vector-icons/Feather"
const { StatusBarManager: { HEIGHT } } = NativeModules;
const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height - HEIGHT

import AssetLinkers from '../../api/AssetLinkers';


{/* {---------------Redux Imports------------} */ }
import { connect } from 'react-redux';
import * as userActions from "../../redux/actions/user"
import { bindActionCreators } from 'redux';


import AllPosts from '../Dash/Components/AllPosts';
import Toast from 'react-native-toast-message';
import TabNavigator from '../../components/TabNavigator';

class Favourite extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Posts: null,
            openDeletePostModal: false,
            postID: '',
        };
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

    deletePost = () => {
        var { userData: { user: { id } } } = this.props
        AssetLinkers.post("/delete_property", {
            user_id: id,
            post_id: this.state.postID
        }).then((res) => {
            if (res?.data) {
                this.getPosts()
                this.setState({
                    openDeletePostModal: false,
                    Posts: null,
                })
                Toast.show({
                    type: 'success',
                    text1: 'Post Deleted Successfully!',
                    visibilityTime: 3000
                });
                console.log("Delete Post API Response", res?.data)
            }
        }).catch((err) => {
            alert("Post Deletion Unsuccessful please try again")
            console.log("Delete Post API Error", err?.response)
        })

    }


    componentDidMount() {
        this.getPosts()
    }

    getPosts = () => {
        var { id } = this.props?.userData?.user

        AssetLinkers.post("https://devstaging.a2zcreatorz.com/assetLinkerProject/api/show/favourite_post", {
            user_id: id
        }).then((res) => {
            console.log("Get Favourate Post api Data:  ", res?.data)
            if (res?.data) {
                this.setState({
                    Posts: res?.data?.response
                })
            }
        }).catch((err) => {
            console.log("Get Favourate Post api Error:  ", err?.response)
        })


    }

    removeFromFavourite = (user_id, postID, is_favourite) => {


        console.log("remove like", user_id, postID)

        AssetLinkers.post("https://devstaging.a2zcreatorz.com/assetLinkerProject/api/remove/favourite_post", {
            "user_id": user_id,
            "post_id": postID,
        }).then((res) => {
            if (res?.data) {
                console.log("Remove from favourite api Response:  ", res?.data)
                Toast.show({
                    type: 'success',
                    text1: 'Removed From Favourites!',
                    visibilityTime: 2000
                });
                this.getPosts()

            }
        }).catch((err) => {
            console.log("Remove from favourite api  Error:  ", err?.response)
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
    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.headerCont}>

                    {/* Back Button */}
                    <TouchableOpacity
                        style={{ position: "absolute", left: 10 }}
                        onPress={() => this.onPress("goback")}
                    >
                        <Feather name="chevron-left" size={30} color="white" />
                    </TouchableOpacity>

                    {/* Title */}
                    <Text style={styles.headerTitle}>Favourites</Text>

                </View>
                <ScrollView>

                    {/* Posts Component */}
                    <AllPosts
                        data={this.state.Posts}
                        navProps={this.props.navigation}
                        userID={this.props.userData?.user?.id}
                        openDeletePostModal={(postID) => this.openDeletePostModal(postID)}
                        onFavPress={(user_id, postID, is_favourite) => this.removeFromFavourite(user_id, postID, is_favourite)}
                    // isFav={}
                    />

                </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Favourite)

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: width,
        height: height,
        justifyContent: "flex-start",
        alignItems: "center",
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

})