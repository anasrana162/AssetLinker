import React, { useEffect } from 'react';
import { View,SafeAreaView, StyleSheet, ImageBackground, Image, Animated, Dimensions, NativeModules } from 'react-native';

{/* {---------------Redux Imports------------} */ }
import { connect } from 'react-redux';
import * as userActions from "../redux/actions/user"
import { bindActionCreators } from 'redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

const { StatusBarManager: { HEIGHT } } = NativeModules;
const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height - HEIGHT


const Splash = (props, { navigation }) => {
    let animatedValue = new Animated.Value(0);
    let currentValue = 0;

    animatedValue.addListener(({ value }) => {
        currentValue = value;
    });

    useEffect(() => {

        console.log("currentValue",animatedValue)
                if (currentValue >= 90) {
                    Animated.spring(animatedValue, {
                        toValue: 0,
                        tension: 5,
                        friction: 5,
                        duration: 5000,
                        useNativeDriver: false,
                    }).start();
                } else {
                    Animated.spring(animatedValue, {
                        toValue: 180,
                        tension: .1,
                        friction: .5,
                        duration: 5000,

                        useNativeDriver: false,
                    }).start();
                }

        checkUserExist()
    });

    const checkUserExist = async () => {
        var { actions } = props
        const res = await AsyncStorage.getItem("@assetlinker_usertoken")
        const data = await AsyncStorage.getItem("@assetlinker_userData")
        console.log("Token in App js", res)
        if (res !== null || res !== '') {
            console.log("WOrking login", data, " ", actions)
            actions.user(JSON.parse(data))
            actions.userToken(res)
            // props.navigation.navigate("Dash")
        }
        else {
            setTimeout(() => {
                props.navigation.navigate("GetStarted")
            }, 3000)
        }
    }

        const setInterpolate = animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['360deg', '0deg'],
            
        });
    console.log("setInterpolate",setInterpolate)
        const rotateYAnimatedStyle = {
            // width:width-50,
            
            transform: [{ rotateY: setInterpolate }],
        };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/watermark2.jpg')}
                style={[styles.backgroundImage]}>
                <Animated.Image
            
                    // source={{
                    //     uri: 'https://www.nicesnippets.com/image/imgpsh_fullsize.png',
                    // }}
                    source={require('../../assets/logo.png')}
                    style={[
                        rotateYAnimatedStyle,
                        styles.logoImageSignIn]}
                />

            </ImageBackground>
        </View>
    );
};
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

export default connect(mapStateToProps, mapDispatchToProps)(Splash)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white"
    },
    buttonStyle: {
        backgroundColor: 'black',
        padding: 5,
        marginTop: 32,
        minWidth: 200,
    },
    backgroundImage: {
        width: width,
        height: height,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonTextStyle: {
        padding: 5,
        color: 'white',
        textAlign: 'center',
    },
    imageStyle: {
        width: 150,
        height: 150,
        borderRadius: 6,
    },
    logoImageSignIn: {
        width: width-40,
        height: 120, 
        marginBottom: 170
    },
});

