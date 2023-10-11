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

{/* {---------------Redux Imports------------} */ }
import { connect } from 'react-redux';
import * as userActions from "../../redux/actions/user"
import { bindActionCreators } from 'redux';
import ImageViewer from './Components/ImageViewer';

import { Colors } from '../../config';
import moment from 'moment';
import UserProfileButton from './Components/UserProfileButton';

class PostDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            position: 0,
        };
    }


    onPress = (key) => {
        var { postData } = this.props?.route?.params
        switch (key) {
            case "goback":
                this.props.navigation.goBack()
                break;
            case "share":
                Linking.openURL(
                    `https://assetslinkers.com`,
                )
                break;
            case "openUserDetail":
                this.props.navigation.navigate("UserProfileDetail", {
                    user_id: postData?.user_id,
                    name: postData?.name,
                    image: "https://devstaging.a2zcreatorz.com/assetLinker_laravel/storage/app/public/images/userProfile/" + postData?.image,
                    member_since: moment(postData?.member_since).format("YYYY-MM-DD"),
                })
                break;
        }
    }

    runSlideShow = () => {
        var { postData } = this.props?.route?.params

        this.setState({
            interval: setInterval(() => {
                this.setState({
                    position: this.state.position === postData?.post_images.length ? 0 : this.state.position + 1
                });
            }, 2000)
        });
    }

    componentDidMount = () => {
        this.runSlideShow()
    }

    componentWillUnmount = () => {
        clearInterval(this.state.interval);
    }


    render() {

        var { postData, location, subLocation } = this.props?.route?.params

        var user_type = ""
        switch (postData?.user_type) {
            case "buyer_seller":
                user_type = "Buyer/Seller"
                break;
            case "consultant":
                user_type = "Consultant"
                break;
            case "builder":
                user_type = "Builder"
                break;
        }
        // console.log("location", subLocation)
        return (
            <View style={styles.mainContainer}>

                {/* Header */}
                <View style={styles.headerCont}>

                    {/* Go back */}
                    <TouchableOpacity
                        style={[styles.headerBtn, { marginLeft: 5, }]}
                        onPress={() => this.onPress("goback")}
                    >
                        <Ionicons name="chevron-back" size={35} color="white" />
                    </TouchableOpacity>

                    {/* Share Button */}
                    <TouchableOpacity
                        style={[styles.headerBtn, { marginRight: 15, }]}
                        onPress={() => this.onPress("share")}
                    >
                        <Ionicons name="share-social" size={35} color="white" />
                    </TouchableOpacity>
                </View>

                <ScrollView>



                    {/* Images Viewer */}
                    <ImageViewer Images={postData?.post_images} position={this.state.position} />

                    {/* Information */}

                    {/* Property Type */}
                    <Text style={styles.propertyTypeText}>{postData?.property_type}</Text>

                    {/* Price */}
                    <Text style={styles.priceText}>Price: {postData?.price} PKR</Text>

                    {/* Posted At */}
                    <Text style={styles.posted_at}>Posted: {moment(postData?.created_at).format("YYYY-MM-DD")}</Text>

                    {/* Main Features */}
                    <Text style={styles.posted_at}>Main Features:</Text>
                    <Text style={styles.main_features_text}>{postData?.main_features}</Text>

                    {/* Location */}
                    <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 10, marginTop: 10 }}>
                        <Ionicons name='location-sharp' color={Colors.blue} size={24} />
                        < Text style={styles.posted_at}>{location}</Text>
                    </View>

                    {/* More Detail */}

                    <View style={styles.moreDetailCont}>
                        {/* More Details Title */}
                        <Text style={[styles.propertyTypeText, { fontSize: 22, marginBottom: 10 }]}>More Details</Text>

                        {/* GRID */}

                        {/* Plot Category */}
                        {postData?.category !== "Null" &&
                            < View style={styles.inner_moreDetailCont}>
                                <Text style={styles.gridText1}>{postData?.category}</Text>
                                <Text style={styles.gridText2}>Plot Category</Text>
                            </View>}

                        {/* Sale/Rent*/}
                        {postData?.rent_sale !== "Null" &&
                            < View style={styles.inner_moreDetailCont}>
                                <Text style={styles.gridText1}>{postData?.rent_sale}</Text>
                                <Text style={styles.gridText2}>Sale/Rent</Text>
                            </View>}

                        {/* Area Unit */}
                        {postData?.area_unit !== "Null" &&
                            < View style={styles.inner_moreDetailCont}>
                                <Text style={styles.gridText1}>{postData?.area_unit}</Text>
                                <Text style={styles.gridText2}>Area Unit</Text>
                            </View>}

                        {/* Yards*/}
                        {postData?.area_unit !== "Null" &&
                            < View style={styles.inner_moreDetailCont}>
                                <Text style={styles.gridText1}>{postData?.yards}</Text>
                                <Text style={styles.gridText2}>Yards</Text>
                            </View>}

                        {/* Location */}
                        {location !== "Null" &&
                            < View style={styles.inner_moreDetailCont}>
                                <Text style={styles.gridText1}>{location}</Text>
                                <Text style={styles.gridText2}>Location</Text>
                            </View>}

                        {/* Sub Location */}
                        {subLocation !== "Null" &&
                            < View style={styles.inner_moreDetailCont}>
                                <Text style={styles.gridText1}>{subLocation}</Text>
                                <Text style={styles.gridText2}>Sub Location</Text>
                            </View>}

                        {/* Construction Status */}

                        {/* Corner West or east option */}

                        < View style={styles.inner_moreDetailCont}>
                            <Text numberOfLines={2} style={[styles.gridText1, { width: 100 }]}>{postData?.corner}, {postData?.open}</Text>
                            <Text style={styles.gridText2}>Construction Staus</Text>
                        </View>

                        {/* Rooms */}
                        {postData?.rooms !== "Null" &&
                            < View style={styles.inner_moreDetailCont}>
                                <Text style={styles.gridText1}>{postData?.rooms}</Text>
                                <Text style={styles.gridText2}>Rooms</Text>
                            </View>}

                        {/* Bedrooms */}
                        {postData?.bedrooms !== "Null" &&
                            < View style={styles.inner_moreDetailCont}>
                                <Text style={styles.gridText1}>{postData?.bedrooms}</Text>
                                <Text style={styles.gridText2}>Bedrooms</Text>
                            </View>}

                        {/* Bathrooms */}
                        {postData?.bathrooms !== "Null" &&
                            < View style={styles.inner_moreDetailCont}>
                                <Text style={styles.gridText1}>{postData?.rooms}</Text>
                                <Text style={styles.gridText2}>Bathrooms</Text>
                            </View>}

                        {/* Rooms */}
                        {postData?.phase !== "Null" &&
                            < View style={styles.inner_moreDetailCont}>
                                <Text style={styles.gridText1}>{postData?.phase}</Text>
                                <Text style={styles.gridText2}>Phase</Text>
                            </View>}

                        {/* Furnished */}
                        {postData?.furnished !== "Null" &&
                            < View style={styles.inner_moreDetailCont}>
                                <Text style={styles.gridText1}>{postData?.furnished}</Text>
                                <Text style={styles.gridText2}>Furnished</Text>
                            </View>}

                    </View>

                    {/* Description */}
                    <Text style={styles.posted_at}>Description:</Text>
                    <Text style={styles.main_features_text}>{postData?.details}</Text>

                    {/* MSID */}
                    <Text style={styles.posted_at}>MSID: lnf654</Text>

                    {/* User Type Button */}
                    <TouchableOpacity
                        onPress={() => this.onPress("openUserDetail")}
                        style={styles.user_type_btn}>
                        <Text style={styles.user_type_btn_text}>{user_type}</Text>
                    </TouchableOpacity>

                    {/* Address */}
                    {postData?.address !== "Null" &&
                        <>
                            <Text style={styles.posted_at}>Address:</Text>
                            <Text style={styles.main_features_text}>{postData?.address}</Text>
                        </>}

                    <UserProfileButton
                        navProps={this.props.navigation}
                        data={postData}
                    />

                </ScrollView>

            </View >
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

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)

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
        height: 45,
        paddingVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        top: 0,
        zIndex: 200,
        backgroundColor: Colors.fadedBackground
    },
    headerBtn: {
        width: 45,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,

    },
    moreDetailCont: {
        width: width - 40,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "flex-start",
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginTop: 20,
        paddingBottom: 10,
    },
    inner_moreDetailCont: {
        width: "90%",
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,

    },
    user_type_btn: {
        width: width - 40,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: Colors.blue,
        borderRadius: 10,
        marginVertical: 15
    },
    user_type_btn_text: {
        fontSize: 18,
        fontWeight: "700",
        color: "white"
    },
    gridText1: {
        fontSize: 18,
        fontWeight: "400",
        color: Colors.black
    },
    gridText2: {
        fontSize: 18,
        fontWeight: "600",
        color: Colors.black
    },
    propertyTypeText: {
        fontSize: 26,
        fontWeight: "700",
        color: Colors.black,
        marginTop: 20,
        marginLeft: 10,
    },
    priceText: {
        fontSize: 20,
        fontWeight: "600",
        color: Colors.black,
        marginTop: 10,
        marginLeft: 10,
    },

    posted_at: {
        fontSize: 18,
        fontWeight: "600",
        color: Colors.black,
        marginTop: 10,
        marginLeft: 10,
    },

    main_features_text: {
        fontSize: 18,
        fontWeight: "500",
        color: Colors.black,
        marginTop: 5,
        marginLeft: 10,
        width: width - 40,
    }
})