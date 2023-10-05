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


import AsyncStorage from '@react-native-async-storage/async-storage';
{/* {---------------Redux Imports------------} */ }
import { connect } from 'react-redux';
import * as userActions from "../../redux/actions/user"
import { bindActionCreators } from 'redux';
import Headlines from './Components/Headlines';
import Slideshow from 'react-native-image-slider-show';
import TabNavigator from '../../components/TabNavigator';

class Dash extends Component {
    constructor(props) {
        super(props);

        this.state = {
            position: 0,
            sliderImages: [
                { url: require('../../../assets/property_images/B1.jpg') },
                {
                    url: require('../../../assets/property_images/B3.jpg'),
                },
                {
                    url: require('../../../assets/property_images/B5.jpg'),
                },
            ],
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
        this.runSlideShow()
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



        return (
            <View style={styles.mainContainer}>
                {/* Header */}
                <Header />

                {/* Menu Bar */}
                <MenuBar
                    navProps={this.props.navigation}
                    logout={() => this.logout()}
                />
                {/* Headlines */}
                <Headlines />

                {/* Slider */}
                <Slideshow position={this.state.position} dataSource={this.state.sliderImages} />

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