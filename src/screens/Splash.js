import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, ImageBackground, Image, Animated, Dimensions, NativeModules } from 'react-native';

{/* {---------------Redux Imports------------} */ }
import { connect } from 'react-redux';
import * as userActions from "../redux/actions/user"
import { bindActionCreators } from 'redux';
import AssetLinkers from '../api/AssetLinkers';
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
        checkUserExist()
    }, [])

    useEffect(() => {

        // console.log("currentValue", animatedValue)
        if (currentValue >= 90) {
            Animated.spring(animatedValue, {
                toValue: 0,
                tension: 5,
                friction: 10,
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


    });

    const checkUserExist = async () => {
        var { actions, } = props
        const res = await AsyncStorage.getItem("@assetlinker_usertoken")
        // const data = await AsyncStorage.getItem("@assetlinker_userData")
        const creds = await AsyncStorage.getItem("@assetlinker_userCreds")
        // console.log("Token in App js", res)
        console.log("Creds",creds);
        if (creds == null || creds == '') {
            setTimeout(()=>{

                props.navigation.navigate("GetStarted")
            },3000)
        } else {
            await AssetLinkers.post("/loginApi", {
                "phone": JSON.parse(creds).phone,
                "password": JSON.parse(creds).password
            }).then((res) => {
                console.log("response Login Api:", res?.data)
                if (res?.data) {

                    if (res?.data?.error !== undefined) {
                        props.navigation.navigate("GetStarted")
                        return alert(res?.data?.error)
                    }
                    // save data in redux
                    actions.userToken(res?.data?.token)
                    actions.user(res?.data?.response)
                    console.log("Token", res?.data?.token)
                    AsyncStorage.setItem("@assetlinker_usertoken", JSON.stringify(res?.data?.token));

                    // AsyncStorage.setItem("@assetlinker_userData", JSON.stringify(res?.data?.response));
                    // AsyncStorage.setItem("@assetlinker_userCreds", JSON.stringify({
                    //     "phone": mobile.trim(),
                    //     "password": password.trim()
                    // }));

                    props.navigation.navigate("Dash")


                }
            }).catch((err) => {
                console.log("Login Api Error:", err)
                props.navigation.navigate("GetStarted")
            })
           
        }


        // setTimeout(() => {
        //     if (res !== null || res !== '') {
        //         // console.log("WOrking login", data, " ", actions)
        //         // actions.user(JSON.parse(data))
        //         actions.userToken(res)
        //         // props.navigation.navigate("GetStarted")
        //         props.navigation.navigate("Dash")
        //     }
        //     if (res == null) {
        //         props.navigation.navigate("GetStarted")

        //     }
        // }, 3000)
    }

    const setInterpolate = animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['360deg', '0deg'],

    });
    // console.log("setInterpolate", setInterpolate)
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
        width: width - 40,
        height: 120,
        marginBottom: 170,
        zIndex: 700
    },
});

