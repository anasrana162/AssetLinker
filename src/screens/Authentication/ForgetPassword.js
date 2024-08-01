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

import AuthTextIput from './Components/AuthTextIput';
import PhoneInput from 'react-native-phone-number-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
{/* {---------------Redux Imports------------} */ }
import { connect } from 'react-redux';
import * as userActions from "../../redux/actions/user"
import { bindActionCreators } from 'redux';
class ForgetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loader: false,
            email: null,
            password: null,
        };
    }

    onChangeFormattedText = (mail) => {
        setImmediate(() => {
            this.setState({
                email: mail
            })
        })
    }

    onSubmitPress = () => {
        this.setState({ loader: true })
        if (this.state.email == null || this.state.email == "") {
            alert("Please enter email number!")
        }

        AssetLinkers.post("/forget/password", {
            "email": this.state.email
        })
            .then((res) => {
                console.log("res", res?.data);
                this.setState({ loader: false })
                this.props.navigation.navigate("OTP", { email: this.state.email, otp: res?.data?.otp })
            }).catch((err) => {
                this.setState({ loader: false })
                console.log("Err in sending email", err);
            })


    }

    render() {
        return (
            <View style={styles.mainContainer}>
                {/* Backround Image */}
                <ImageBackground
                    source={require('../../../assets/bg_get_started.jpg')}
                    resizeMode="cover"
                    style={styles.BackgroundImage}>


                    <View style={styles.header}>

                        {/* Screen Title */}
                        <Text style={styles.screenTitle}>Forgot Password</Text>

                    </View>

                    {/* Screen Text */}
                    <Text style={styles.screenText}>Enter your Email and we'll send you an OTP Code</Text>


                    {/* <PhoneInput
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
                    /> */}

                    <AuthTextIput
                        placeholder={"Email"}
                        onChangeText={(txt) => this.onChangeFormattedText(txt)}
                    />



                    {/* Signup Button */}

                    <TouchableOpacity
                        onPress={() => this.onSubmitPress()}
                        style={styles.signup_btn}>
                        {
                            this.state.loader ?
                                <ActivityIndicator size={'small'} color='white' />
                                :
                                <Text style={styles.signup_btn_text}>Submit</Text>
                        }
                    </TouchableOpacity>




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

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword)

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
    header: {
        width: width,
        height: 150,
        backgroundColor: Colors.main,
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 60,
        // borderBottomRightRadius: 30
    },
    screenTitle: {
        fontSize: 30,
        fontWeight: "600",
        color: "white",
        alignSelf: "center",
    },
    screenText: {
        width: width - 40,
        alignSelf: "center",
        color: Colors.black,
        fontWeight: "600",
        fontSize: 16,
        marginTop: 60,
        textAlign: "center",

    },
    signup_btn: {
        width: 140,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 40,
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
