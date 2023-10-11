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

class PostDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            position: 0,
        };
    }


    onPress = (key) => {
        switch (key) {
            case "goback":
                this.props.navigation.goBack()
                break;
            case "share":
                Linking.openURL(
                    `https://assetslinkers.com`,
                )
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

        var { postData } = this.props?.route?.params

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
    propertyTypeText: {
        fontSize: 26,
        fontWeight: "600",
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