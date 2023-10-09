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
} from 'react-native';
import React, { Component } from 'react'
import Header from './Components/Header';
import { Colors } from '../../config';
import MenuBar from './Components/MenuBar';
const { StatusBarManager: { HEIGHT } } = NativeModules;
const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height - HEIGHT

import AssetLinkers from '../../api/AssetLinkers';
import AsyncStorage from '@react-native-async-storage/async-storage';
{/* {---------------Redux Imports------------} */ }
import { connect } from 'react-redux';
import * as userActions from "../../redux/actions/user"
import { bindActionCreators } from 'redux';
import Headlines from './Components/Headlines';
import Slideshow from 'react-native-image-slider-show';
import TabNavigator from '../../components/TabNavigator';
import AllPosts from './Components/AllPosts';

class Dash extends Component {
    constructor(props) {
        super(props);

        this.state = {
            position: 0,
            menuDropDown: false,
            sliderImages: [
                { url: require('../../../assets/property_images/B1.jpg') },
                {
                    url: require('../../../assets/property_images/B3.jpg'),
                },
                {
                    url: require('../../../assets/property_images/B5.jpg'),
                },
            ],

            Posts: null,
        };
    }

    logout = () => {
        var { actions, userData } = this.props
        AsyncStorage.removeItem("@assetlinker_usertoken")
        AsyncStorage.removeItem("@assetlinker_userData")
        actions?.userToken('')
        actions?.user('')
        setTimeout(() => {
            this.props?.navigation.navigate("GetStarted")
        }, 1000)
    }

    componentDidMount() {
        this.getPosts()
        this.runSlideShow()
    }

    getPosts = () => {

        AssetLinkers.get("https://devstaging.a2zcreatorz.com/assetLinkerProject/api/get_property").then((res) => {
            console.log("Get Post api Data:  ", res?.data?.property.length)
            if (res?.data) {
                this.setState({
                    Posts: res?.data?.property
                })
            }
        }).catch((err) => {
            console.log("Get Post api Error:  ", err?.response)
        })


    }

    runSlideShow = () => {
        this.setState({
            interval: setInterval(() => {
                this.setState({
                    position: this.state.position === this.state.sliderImages.length ? 0 : this.state.position + 1
                });
            }, 2000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    render() {

        // console.log("Props:  ",this.props?.userData?.user)

        return (
            <View style={styles.mainContainer}>
                <ScrollView>


                    {/* Header */}
                    <Header />

                    {/* Menu Bar */}
                    <MenuBar
                        navProps={this.props.navigation}
                        logout={() => this.logout()}
                    />
                    {/* Menu Dropdown */}
                    {/* {this.state.menuDropDown && } */}

                    {/* Headlines */}
                    <Headlines />

                    {/* Slider */}
                    {/* <Slideshow
                        position={this.state.position}
                        dataSource={this.state.sliderImages}

                    /> */}

                    {/* Posts Component */}
                    <AllPosts
                        data={this.state.Posts}
                        navProps={this.props.navigation}
                    />
                </ScrollView>

                {/* Tab Navigator */}
                <TabNavigator navProps={this.props.navigation} screenName={"Dash"} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Dash)

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: width,
        height: height,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white"
    },
})