import { Text, StyleSheet, ScrollView, View, NativeModules, Dimensions, TouchableOpacity, Image, ImageBackground, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import AssetLinkers, * as Api from '../../api/AssetLinkers'
const { StatusBarManager: { HEIGHT } } = NativeModules;
const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height - HEIGHT

// imports
import { Colors, size, WP } from '../../config';
import AuthTextIput from './Components/AuthTextIput';

{/* {---------------Redux Imports------------} */ }
import { connect } from 'react-redux';
import * as userActions from "../../redux/actions/user"
import { bindActionCreators } from 'redux';
class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loader: false,
            password: null,
            mobile: this.props.route?.params?.mobile,
            confirmPassword: null,
        };
    }

    onChangeText = (val, key) => {
        switch (key) {
            case "password":
                setImmediate(() => {
                    this.setState({
                        password: val,
                    })
                })
                break;

            case "confirm_password":
                setImmediate(() => {
                    this.setState({
                        confirmPassword: val,
                    })
                })
                break;

        }
    }

    onSubmitPress = () => {
        setImmediate(() => {
            this.setState({ loader: true })
        })

        var { mobile, password, confirmPassword } = this.state

        if (mobile.length == 0) {
            return alert("Mobile number is empty ")
        }
        if (password == null || password == "") {
            return alert("Enter correct Password")
        }
        if (confirmPassword !== password) {
            return alert("Password does not match!")
        }

        AssetLinkers.post("/reset/password", {
            phone: mobile,
            password: password,
            password_confirmation: confirmPassword
        }).then((response) => {
            console.log("Reset Password Api Response:|||", response?.data)
            setImmediate(() => {
                this.setState({ loader: false })
            })
        }).catch((err) => {
            console.log("Reset Password Api Error:|||" + "  " + err + "  ", err?.response)
        })

    }

    render() {
        console.log("props", this.props.route.params)
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


                    {/* Password Textinput */}
                    <AuthTextIput
                        placeholder={"Password"}
                        placeholderTextColor={Colors.secondary}
                        onChangeText={(text) => this.onChangeText(text, "password")}
                        style={{ marginTop: 60 }}
                        showEye={true}
                    />
                    <Text style={styles.warning_text}>Password must be 6 characters long, should contain atleast 1 uppercase,1 lowercase and 1 digit</Text>
                    {/* Confirm Password Textinput */}
                    <AuthTextIput
                        placeholder={"Confirm Password"}
                        placeholderTextColor={Colors.secondary}
                        onChangeText={(text) => this.onChangeText(text, "confirm_password")}
                        style={{ marginBottom: 20 }}
                        showEye={true}
                    />


                    {/* Submit Button */}

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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)

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
        marginVertical: 20,
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
    warning_text: {
        fontSize: 12,
        fontWeight: "500",
        color: Colors.black,
        width: width - 96,
        alignSelf: "center",
        marginTop: 10,
        marginBottom: -5
    }
})
