import { Text, StyleSheet, ScrollView, View, NativeModules, Dimensions, TouchableOpacity, Image, ImageBackground, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import AssetLinkers, * as Api from '../../api/AssetLinkers'
const { StatusBarManager: { HEIGHT } } = NativeModules;
const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height - HEIGHT
import axios from 'axios';
// imports
import { Colors, size, WP } from '../../config';

import Toast from 'react-native-toast-message';
import RolesType from './Components/RolesType';
import ImageSelector from './Components/ImageSelector';
import RealStateConsultant from './Components/RealStateConsultant';
import DropDown from '../Post/Components/DropDown';
import Links from './Components/Links';
import Builder from './Components/Builder';
import Buyer_Seller from './Components/Buyer_Seller';

export default class Signup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            checked: 'first',
            flagForEstateAgent: true,
            flagForBuilders: false,
            flagForBuyer: false,
            country: null,
            city: null,
            cities: [],
            others: null,
            name: null,
            firmName: null,
            selectArea: null,
            realEstateName: '',
            mobile: null,
            email: null,
            password: null,
            confirmPassword: null,
            landline: null,
            image: null,
            mime: null,
            role: 'consultant',
            userName: null,
            address: null,
            userRoles: null, // new
            locationDropDownOpen: false, // new
            defaultSelectedRoleType: {
                id: 1,
                name: "Real Estate Consultant",
                role: "consultant",
            }, // new
            loader: false, // new
            continueSignUp: true, // new

        };
    }

    componentDidMount = () => {
        this.getRoles()
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
            // alert("Network Error PLease Try again")
        }, 6000)
    }

    onRegisterPress = async () => {

        setImmediate(() => {
            this.setState({
                loader: true,
                continueSignUp: true
            })
        })
        if (this.state.role == null) {
            return alert("Please select a role")
        }
        const check = this.checkRoleBeforeSignUp(this.state.role)
        console.log("Check Value", check)

        if (check?.check == true) {
            this.cancelRequest()
                await AssetLinkers.post('/register/user?user_type=' + this.state.role, check?.obj)
                    .then((res) => {
                        console.log("Response SignUp Api: ", res?.data)
                        if (res?.data) {
                            setImmediate(() => {
                                this.setState({
                                    loader: false,
                                })
                            })
                            if (this.state.role == "builder") {
                                alert("Please Contact AssetLinkers to activate your account ")
                            }
                            this.props.navigation.navigate("Login")
                        }
                        if(res.data?.email){
                            setImmediate(() => {
                                this.setState({
                                    loader: false,
                                })
                            })
                            alert("Email Already taken ")
                        }
                    }).catch((err) => {
                        setImmediate(() => {
                            this.setState({
                                loader: false,
                            })
                        })
                        console.log("Signup API Error: ", err?.response)
                        alert("Network Error: #SU1")
                    })
        }

    }

    checkRoleBeforeSignUp = (role) => {
        switch (role) {
            case "consultant":
                return this.checkConditionsForConsultant()
            // break;

            case "builder":
                return this.checkConditionsForBuilder()
            // break;

            case "buyer_seller":
                return this.checkConditionsForBuyer_Seller()
        }
    }

    checkConditionsForConsultant = () => {

        var { name, realEstateName, mobile, email, password, confirmPassword, image, role, selectArea, address } = this.state


        if (image == null) {
            console.log("image setting false")
            setImmediate(() => {
                this.setState({
                    loader: false,
                    continueSignUp: false
                })
            })
            return alert("Please select an Image!")
        }
        if (name == null || name.length == 0) {
            console.log("name setting false")
            setImmediate(() => {
                this.setState({
                    loader: false,
                    continueSignUp: false
                })
            })
            return alert("Please enter your name!")
        }
        if (realEstateName == null || realEstateName.length == 0) {
            console.log("realestatename setting false")
            setImmediate(() => {
                this.setState({
                    loader: false,
                    continueSignUp: false
                })
            })
            return alert("Please enter your real state name!")
        }
        if (mobile == null || mobile.length == 0) {
            console.log("mobile setting false")
            setImmediate(() => {
                this.setState({
                    loader: false,
                    continueSignUp: false
                })
            })
            return alert("Please enter your mobile number!")
        }
        if (email == null || email.length == 0) {
            console.log("email setting false")
            setImmediate(() => {
                this.setState({
                    loader: false,
                    continueSignUp: false
                })
            })
            return alert("Please enter your email address!")
        }
        if (password == null || password.length == 0) {
            console.log("password setting false")
            setImmediate(() => {
                this.setState({
                    loader: false,
                    continueSignUp: false
                })
            })
            return alert("Please enter correct password!")
        }
        if (confirmPassword !== password) {
            console.log("c_p setting false")
            setImmediate(() => {
                this.setState({
                    loader: false,
                    continueSignUp: false
                })
            })
            return alert("Password does not match!")
        }
        if (selectArea == null) {
            console.log("location setting false")
            setImmediate(() => {
                this.setState({
                    loader: false,
                    continueSignUp: false
                })
            })
            return alert("Please select a location!")
        }
        if (address == null || address.length == 0) {
            console.log("address setting false")
            setImmediate(() => {
                this.setState({
                    loader: false,
                    continueSignUp: false
                })
            })
            return alert("Please enter your address!")
        }


        console.log("Check for Signup", this.state.continueSignUp)


        return {
            check: this.state.continueSignUp,
            obj: {
                "name": name,
                "real_estate_name": realEstateName,
                "phone": mobile,
                "email": email,
                "password": password,
                "password_confirmation": confirmPassword,
                "location": selectArea,
                "address": address,
                "image": image
            }
        }
    }

    checkConditionsForBuilder = () => {
        var { name, firmName, mobile, email, landline, password, confirmPassword, image, selectArea, address } = this.state


        if (image == null) {
            console.log("image setting false")
            setImmediate(() => {
                this.setState({
                    loader: false,
                    continueSignUp: false
                })
            })
            return alert("Please select an Image!")
        }
        if (name == null || name.length == 0) {
            console.log("name setting false")
            setImmediate(() => {
                this.setState({
                    loader: false,
                    continueSignUp: false
                })
            })
            return alert("Please enter your name!")
        }
        if (firmName == null || firmName.length == 0) {
            console.log("realestatename setting false")
            setImmediate(() => {
                this.setState({
                    loader: false,
                    continueSignUp: false
                })
            })
            return alert("Please enter your firm name!")
        }
        if (mobile == null || mobile.length == 0) {
            console.log("mobile setting false")
            setImmediate(() => {
                this.setState({
                    loader: false,
                    continueSignUp: false
                })
            })
            return alert("Please enter your mobile number!")
        }
        if (landline == null || landline.length == 0) {
            console.log("Landline setting false")
            setImmediate(() => {
                this.setState({
                    loader: false,
                    continueSignUp: false
                })
            })
            return alert("Please enter your landline number!")
        }
        if (email == null || email.length == 0) {
            console.log("email setting false")
            setImmediate(() => {
                this.setState({
                    loader: false,
                    continueSignUp: false
                })
            })
            return alert("Please enter your email address!")
        }
        if (password == null || password.length == 0) {
            console.log("password setting false")
            setImmediate(() => {
                this.setState({
                    loader: false,
                    continueSignUp: false
                })
            })
            return alert("Please enter correct password!")
        }
        if (confirmPassword !== password) {
            console.log("c_p setting false")
            setImmediate(() => {
                this.setState({
                    loader: false,
                    continueSignUp: false
                })
            })
            return alert("Password does not match!")
        }
        if (selectArea == null) {
            console.log("location setting false")
            setImmediate(() => {
                this.setState({
                    loader: false,
                    continueSignUp: false
                })
            })
            return alert("Please select a location!")
        }
        if (address == null || address.length == 0) {
            console.log("address setting false")
            setImmediate(() => {
                this.setState({
                    loader: false,
                    continueSignUp: false
                })
            })
            return alert("Please enter your address!")
        }


        console.log("Check for Signup", this.state.continueSignUp)


        return {
            check: this.state.continueSignUp,
            obj: {
                "name": name,
                "frim_name": firmName,
                "phone": mobile,
                "landline_number": landline,
                "email": email,
                "password": password,
                "password_confirmation": confirmPassword,
                "location": selectArea,
                "address": address,
                "image": image
            }
        }
    }

    checkConditionsForBuyer_Seller = () => {
        var { name, mobile, email, password, confirmPassword, image } = this.state


        if (image == null) {
            console.log("image setting false")
            setImmediate(() => {
                this.setState({
                    loader: false,
                    continueSignUp: false
                })
            })
            return alert("Please select an Image!")
        }
        if (name == null || name.length == 0) {
            console.log("name setting false")
            setImmediate(() => {
                this.setState({
                    loader: false,
                    continueSignUp: false
                })
            })
            return alert("Please enter your name!")
        }

        if (mobile == null || mobile.length == 0) {
            console.log("mobile setting false")
            setImmediate(() => {
                this.setState({
                    loader: false,
                    continueSignUp: false
                })
            })
            return alert("Please enter your mobile number!")
        }

        if (email == null || email.length == 0) {
            console.log("email setting false")
            setImmediate(() => {
                this.setState({
                    loader: false,
                    continueSignUp: false
                })
            })
            return alert("Please enter your email address!")
        }
        if (password == null || password.length == 0) {
            console.log("password setting false")
            setImmediate(() => {
                this.setState({
                    loader: false,
                    continueSignUp: false
                })
            })
            return alert("Please enter correct password!")
        }
        if (confirmPassword !== password) {
            console.log("c_p setting false")
            setImmediate(() => {
                this.setState({
                    loader: false,
                    continueSignUp: false
                })
            })
            return alert("Password does not match!")
        }
        console.log("Check for Signup", this.state.continueSignUp)
        return {
            check: this.state.continueSignUp,
            obj: {
                "name": name,
                "phone": mobile,
                "email": email,
                "password": password,
                "password_confirmation": confirmPassword,
                "image": image
            }
        }
    }

    getRoles = () => {
        var roles = [
            {
                id: 1,
                name: "Real Estate Consultant",
                role: "consultant",
            },
            {
                id: 2,
                name: "Builder",
                role: "builder",
            },
            {
                id: 3,
                name: "Buyer/Seller",
                role: "buyer_seller",
            }
        ]
        setImmediate(() => {
            this.setState({
                userRoles: roles
            })
        })
    }

    selectedRole = (val) => {
        //  console.log("val", val)
        setImmediate(() => {
            this.setState({
                role: val,
                checked: 'first',
                flagForEstateAgent: true,
                flagForBuilders: false,
                flagForBuyer: false,
                country: null,
                city: null,
                cities: [],
                others: null,
                name: null,
                selectArea: null,
                realEstateName: '',
                mobile: null,
                email: null,
                password: null,
                confirmPassword: null,
                landline: null,
                image: null,
                mime: null,
                userName: null,
                address: null,
                locationDropDownOpen: false, // new
                // userRoles: null, // new
            })
        })
    }
    imageSelected = (uri) => {
        console.log("uri", uri)
        setImmediate(() => {
            this.setState({ image: uri })
        })
    }

    phoneNumberUsed = (no) => {
        // console.log("Mobile no: ", no)
        setImmediate(() => {
            this.setState({ mobile: no })
        })
    }

    onChangeText = (text, key) => {
        switch (key) {
            case "Name":
                setImmediate(() => {
                    this.setState({
                        name: text
                    })
                })
                break;

            case "REName":
                setImmediate(() => {
                    this.setState({
                        realEstateName: text
                    })
                })
                break;

            case "email":
                setImmediate(() => {
                    this.setState({
                        email: text
                    })
                })
                break;
            case "password":
                setImmediate(() => {
                    this.setState({
                        password: text
                    })
                })
                break;

            case "confirm_password":
                setImmediate(() => {
                    this.setState({
                        confirmPassword: text
                    })
                })
                break;

            case "address":
                setImmediate(() => {
                    this.setState({
                        address: text
                    })
                })
                break;

            case "landline_number":
                setImmediate(() => {
                    this.setState({
                        landline: text
                    })
                })
                break;

            case "firm_name":
                setImmediate(() => {
                    this.setState({
                        firmName: text
                    })
                })
                break;
        }

    }

    setLocation = (loc) => {
        //  console.log(loc)
        setImmediate(() => {
            this.setState({
                selectArea: loc,
                locationDropDownOpen: false
            })
        })
    }


    render() {

        const listOfArea = [
            {
                name: 'Bahria Town',
            },
            {
                name: 'DHA city',
            },
            {
                name: 'DHA',
            },
            {
                name: 'Clifton',
            },
            {
                name: 'MDA',
            },
        ];

        return (
            <View style={styles.mainContainer}>
                {/* Backround Image */}
                <ImageBackground
                    source={require('../../../assets/bg_get_started.jpg')}
                    resizeMode="cover"
                    style={styles.BackgroundImage}>

                    {/* Logo */}
                    <Image
                        source={require('../../../assets/logo.png')}
                        style={styles.logo}
                        resizeMode='contain'
                    />

                    {/* Screen Title */}
                    <Text style={styles.screenTitle}>Register</Text>
                    <ScrollView style={{ width: "100%" }}>
                        {/* User Roles */}
                        <RolesType
                            data={this.state.userRoles == null ? [] : this.state.userRoles}
                            onSelectUserRole={(val) => this.selectedRole(val)}
                            defaultSelected={this.state.defaultSelectedRoleType}
                        />

                        {/* Image selector */}
                        <ImageSelector imagePath={(uri) => this.imageSelected(uri)} />




                        {/* Real Estate Consultant Role */}

                        {
                            this.state.role == "consultant" &&
                            <RealStateConsultant
                                onChangeFormattedText={(text) => this.phoneNumberUsed(text)}
                                onChangeText={(text, key) => this.onChangeText(text, key)}
                                onLocBtnPress={() => this.setState({ locationDropDownOpen: !this.state.locationDropDownOpen })}
                                selectedLocation={this.state.selectArea}
                            />
                        }

                        {/* Builder Role */}

                        {
                            this.state.role == "builder" &&
                            <Builder
                                onChangeFormattedText={(text) => this.phoneNumberUsed(text)}
                                onChangeText={(text, key) => this.onChangeText(text, key)}
                                onLocBtnPress={() => this.setState({ locationDropDownOpen: !this.state.locationDropDownOpen })}
                                selectedLocation={this.state.selectArea}
                            />
                        }

                        {/* Buyer/Seller Role */}

                        {
                            this.state.role == "buyer_seller" &&
                            <Buyer_Seller
                                onChangeFormattedText={(text) => this.phoneNumberUsed(text)}
                                onChangeText={(text, key) => this.onChangeText(text, key)}
                            />
                        }
                        {/* Signup Button */}

                        <TouchableOpacity
                            onPress={() => this.onRegisterPress()}
                            disabled={this.state.loader}
                            style={styles.signup_btn}>
                            {
                                this.state.loader ?
                                    <ActivityIndicator size={'small'} color='white' />
                                    :
                                    <Text style={styles.signup_btn_text}>Register</Text>
                            }
                        </TouchableOpacity>

                        {/* Linked Buttons */}

                        <Links
                            text={"Already have an Account?"}
                            navProps={this.props.navigation}
                            navToScreenName={"Login"}
                        />

                    </ScrollView>



                    {/* Dropdown for Location */}

                    <DropDown
                        data={listOfArea}
                        show={this.state.locationDropDownOpen}
                        onDismiss={() => this.setState({ locationDropDownOpen: !this.state.locationDropDownOpen })}
                        // title={"Select Location"}
                        onSelect={(val) => this.setLocation(val)}
                    />
                    <View style={{ width: width, height: 45, position: "absolute", bottom: 0, backgroundColor: "#3081bf" }}></View>

                </ImageBackground>
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
        marginTop: 30
    },
    screenTitle: {
        fontSize: 28,
        fontWeight: "600",
        color: Colors.main,
        marginTop: 20,
    },
    signup_btn: {
        width: 140,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 200,
        backgroundColor: Colors.main,
        alignSelf: "center",
        borderRadius: 10,
    },
    signup_btn_text: {
        fontSize: 18,
        fontWeight: "600",
        color: "white"
    }
})