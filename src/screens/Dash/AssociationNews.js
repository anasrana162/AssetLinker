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
} from "react-native";
import React, { Component } from "react";
import { Colors } from "../../config";

const {
    StatusBarManager: { HEIGHT },
} = NativeModules;
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height - HEIGHT;

import AssetLinkers from "../../api/AssetLinkers";
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/user";
import { bindActionCreators } from "redux";

export default class AssociationNews extends Component {
    constructor(props) {
        super(props);

        this.state = {

            loader: false,
        };
    }

    componentDidMount = () => {
        this.getPosts()

    }
    getPosts = () => {

        AssetLinkers.get("get_news_post").then((res) => {
            if (res) {
                console.log("Res", res?.data?.property)
            }
        })
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>Association News</Text>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: width,
        height: height,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
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