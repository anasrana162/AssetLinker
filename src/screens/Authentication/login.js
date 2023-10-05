import { Text, StyleSheet, ScrollView, View, NativeModules, Dimensions, TouchableOpacity, Image, ImageBackground, ActivityIndicator } from 'react-native'
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
        setImmediate(() => {
            this.setState({ mobile: no })
        })
    }

    onChangeText = (val) => {
        setImmediate(() => {
            this.setState({ password: val })
        })
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

        if (/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password) == false) {
            setImmediate(() => {
                this.setState({
                    loader: false
                })
            })
            return alert("Enter correct password")
        }

        await AssetLinkers.post("/loginApi", {
            "phone": mobile,
            "password": password
        }).then((res) => {
            console.log("response Login Api:", res?.data)
            if (res?.data) {
                setImmediate(() => {
                    this.setState({
                        loader: false
                    })
                })
                if (res?.data?.error !== undefined) {
                    return alert(res?.data?.error)
                }
                // save data in redux
                actions.userToken(res?.data?.token)
                actions.user(res?.data?.response)
                console.log("Token",res?.data?.token)
                AsyncStorage.setItem("@assetlinker_usertoken", JSON.stringify(res?.data?.token));
                AsyncStorage.setItem("@assetlinker_userData",JSON.stringify(res?.data?.response));
                this.props.navigation.navigate("Dash")

            }
        }).catch((err) => {
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

                        <PhoneInput
                            // ref={phoneInput}
                            defaultValue={''}
                            defaultCode="PK"
                            layout="first"
                            containerStyle={styles.PhoneTxtInp_cont}
                            textContainerStyle={{
                                // height: 50,
                                height: 52,
                                marginTop: -5,
                                // borderWidth:1,
                                backgroundColor: 'transparent',
                            }}
                            textInputStyle={{ fontSize: 13, color: 'black' }}
                            onChangeFormattedText={(txt) => this.onChangeFormattedText(txt)}
                        />
                        <AuthTextIput
                            placeholder={"Password"}
                            placeholderTextColor={Colors.secondary}
                            onChangeText={(text) => this.onChangeText(text)}
                            style={{ marginBottom: 20 }}
                            showEye={true}
                        />


                        {/* Signup Button */}

                        <TouchableOpacity
                            onPress={() => this.onLoginPress()}
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
                            style={{ marginBottom: 400 }}
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
        marginTop: 150,
        alignSelf: "center",
    },
    screenTitle: {
        fontSize: 28,
        fontWeight: "600",
        color: Colors.main,
        marginTop: 60,
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
        borderWidth: 1.5,
        marginTop: 40,
        borderRadius: 10,
        // flexDirection: 'row',
        color: 'black',

    },
})