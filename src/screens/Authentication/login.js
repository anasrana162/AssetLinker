import { Text, StyleSheet, ScrollView, View, NativeModules, Dimensions, TouchableOpacity, Image, ImageBackground, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import React, { Component } from 'react'
import AssetLinkers, * as Api from '../../api/AssetLinkers'
const { StatusBarManager: { HEIGHT } } = NativeModules;
const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height - HEIGHT

// imports
import { Colors, size, WP } from '../../config';

import Toast from 'react-native-toast-message';
import Links from './Components/Links';
import { AuthTextInput } from '../../components/TextInputCustom';
import AuthTextIput from './Components/AuthTextIput';
import PhoneInput from 'react-native-phone-number-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
{/* {---------------Redux Imports------------} */ }
import { connect } from 'react-redux';
import * as userActions from "../../redux/actions/user"
import { bindActionCreators } from 'redux';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loader: false,
            mobile: null,
            password: null,
        };
    }

    onChangeFormattedText = (no) => {
        console.log("Phone Number:", no)
        setImmediate(() => {
            this.setState({ mobile: no })
        })
    }

    onChangeText = (val) => {
        console.log("Password:", val)
        setImmediate(() => {
            this.setState({ password: val })
        })
    }

    cancelRequest = () => {
        const controller = new AbortController();
        setTimeout(() => {

            controller.abort()
            setImmediate(() => {
                this.setState({
                    loader: false,
                })
            })
            //  alert("Network Error PLease Try again")
        }, 6000)
    }

    onLoginPress = async () => {
        var { actions } = this.props
        var { mobile, password } = this.state

        setImmediate(() => {
            this.setState({
                loader: true
            })
        })

        if (mobile == null || mobile.length == 0) {
            setImmediate(() => {
                this.setState({
                    loader: false
                })
            })
            return alert("Enter mobile number")
        }

        if (password.length <= 1 || password == null) {
            setImmediate(() => {
                this.setState({
                    loader: false
                })
            })
            return alert("Enter correct password")
        }

        // console.log("Mobile NUmber Fianl", "0" + mobile.slice(3))
        this.cancelRequest()
        await AssetLinkers.post("/loginApi", {
            "phone": mobile.trim(),
            "password": password.trim()
        }).then((res) => {
            console.log("response Login Api:", res?.data)
            if (res?.data) {

                if (res?.data?.error !== undefined) {
                    this.setState({
                        loader: false
                    })
                    return alert(res?.data?.error)
                }
                // save data in redux
                actions.userToken(res?.data?.token)
                actions.user(res?.data?.response)
                console.log("Token", res?.data?.token)
                AsyncStorage.setItem("@assetlinker_usertoken", JSON.stringify(res?.data?.token));
                AsyncStorage.setItem("@assetlinker_userData", JSON.stringify(res?.data?.response));
                setTimeout(() => {
                    this.setState({
                        loader: false
                    })
                    this.props.navigation.navigate("Dash")
                }, 2000)

            }
        }).catch((err) => {
            this.setState({
                loader: false
            })
            console.log("Login Api Error:", err.response)
        })

    }

    render() {
        // console.log(this.props.actions)
        return (
            <View style={styles.mainContainer}>
                {/* Backround Image */}
                <ImageBackground
                    source={require('../../../assets/bg_get_started.jpg')}
                    resizeMode="cover"
                    style={styles.BackgroundImage}>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ width: "100%", }}>


                        {/* Logo */}
                        <Image
                            source={require('../../../assets/logo.png')}
                            style={styles.logo}
                            resizeMode='contain'
                        />


                        {/* Screen Title */}
                        <Text style={styles.screenTitle}>Login</Text>

                        <KeyboardAvoidingView
                            style={{ flex: 1 }}
                            enabled
                            behavior='position'
                        // keyboardVerticalOffset={40}
                        >


                            <PhoneInput
                                // ref={phoneInput}
                                defaultValue={''}
                                defaultCode="PK"
                                layout="first"
                                containerStyle={styles.PhoneTxtInp_cont}
                                textContainerStyle={{
                                    // height: 50,
                                    height: 45,
                                    // marginTop: -5,
                                    alignItems: "center",
                                    // borderWidth: 1,
                                    backgroundColor: 'transparent',
                                    color: "black"
                                }}

                                codeTextStyle={{ height: 45, marginTop: 20 }}
                                textInputStyle={{ fontSize: 13, color: 'black', width: "100%", height: 45, }}
                                onChangeFormattedText={(txt) => this.onChangeFormattedText(txt)}
                            />
                            {/* <AuthTextIput
                            placeholder={"Phone"}
                            placeholderTextColor={Colors.secondary}
                            onChangeText={(text) => this.onChangeFormattedText(text)}
                            // style={{ marginBottom: 20 }}
                            // showEye={true}
                        /> */}

                            <AuthTextIput
                                placeholder={"Password"}
                                placeholderTextColor={Colors.secondary}
                                onChangeText={(text) => this.onChangeText(text)}
                                style={{ marginBottom: 20 }}
                                showEye={true}
                            />

                        </KeyboardAvoidingView>

                        {/* Signup Button */}

                        <TouchableOpacity
                            onPress={() => this.onLoginPress()}
                            disabled={this.state.loader}
                            style={styles.signup_btn}>
                            {
                                this.state.loader ?
                                    <ActivityIndicator size={'small'} color='white' />
                                    :
                                    <Text style={styles.signup_btn_text}>Login</Text>
                            }
                        </TouchableOpacity>

                        {/* Linked Buttons */}

                        <Links
                            text={"Create an Account"}
                            navProps={this.props.navigation}
                            navToScreenName={"SignUp"}
                        // style={{ marginBottom: 400 }}
                        />
                        <Links
                            text={"Forget Passsword"}
                            navProps={this.props.navigation}
                            navToScreenName={"Forgot"}
                        // style={{ marginBottom: 400 }}
                        />

                    </ScrollView>
                    <View style={{ width: width, height: 45, position: "absolute", bottom: 0, backgroundColor: Colors.main }}></View>



                </ImageBackground>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: width,
        height: height,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white"
    },
    BackgroundImage: {
        width: width,
        height: height,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    logo: {
        width: width - 80,
        height: 100,
        marginTop: 100,
        alignSelf: "center",
    },
    screenTitle: {
        fontSize: 28,
        fontWeight: "600",
        color: Colors.main,
        marginTop: 50,
        alignSelf: "center",
    },
    signup_btn: {
        width: 140,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        backgroundColor: "#3081bf",
        alignSelf: "center",
        borderRadius: 10,
    },
    signup_btn_text: {
        fontSize: 18,
        fontWeight: "600",
        color: "white"
    },
    PhoneTxtInp_cont: {
        width: width - 95,
        alignSelf: "center",
        height: 45,
        borderColor: Colors.black,
        justifyContent: "flex-start",
        alignItems: "center",
        borderWidth: 1.5,
        marginTop: 40,
        borderRadius: 10,
        // flexDirection: 'row',
        color: 'black',

    },
})