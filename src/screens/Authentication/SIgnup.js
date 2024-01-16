import { Text, StyleSheet, ScrollView, View, KeyboardAvoidingView, NativeModules, Dimensions, TouchableOpacity, Image, ImageBackground, ActivityIndicator } from 'react-native'
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
import { listOfArea, Location_DHA_City, Location_Bahria } from '../Post/DataArrays';

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
            LocationMain: "",
            realEstateName: '',
            mobile: null,
            email: null,
            password: null,
            confirmPassword: null,
            landline: null,
            image: null,
            mime: null,
            role: 'estate_agent',
            userName: null,
            address: null,
            userRoles: null, // new
            locationDropDownOpen: false, // new
            dropdownDataChange: false,
            dropdownSV: "",
            defaultSelectedRoleType: {
                id: 1,
                name: "Real Estate Consultant",
                role: "estate_agent",
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
        console.log("Check Value", check?.name, check?.email, check.password)

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
                    if (res.data?.email) {
                        setImmediate(() => {
                            this.setState({
                                loader: false,
                            })
                        })
                        alert("Email Already taken ")
                    }
                    if (res.data?.phone) {
                        setImmediate(() => {
                            this.setState({
                                loader: false,
                            })
                        })
                        alert("Phone Already taken ")
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
            case "estate_agent":
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

        var { name, realEstateName, mobile, email, password, confirmPassword, image, role, selectArea, LocationMain, address } = this.state


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
        if (LocationMain == "") {
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
                "email": email.toLowerCase(),
                "password": password,
                "password_confirmation": confirmPassword,
                "location": LocationMain,
                "address": address,
                "image": image
            }
        }
    }

    checkConditionsForBuilder = () => {
        var { name, firmName, mobile, email, landline, password, confirmPassword, image, selectArea, LocationMain, address } = this.state


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
        if (LocationMain == "") {
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
                "location": LocationMain,
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
                role: "estate_agent",
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
        // console.log("uri", uri)
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
                        email: text.toLowerCase()
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

    setLocation = (val, key) => {
        //  console.log("LOcatin: ",val,"     Key:  ",key)

        switch (key) {
            case "location":
                let obj = {
                    location: val,
                    place: "Null",
                    valueToShow: val,
                };
                this.setState({ selectArea: obj })
                // console.log("location recieved", val);
                break;
            case "loc_bahria":
                let objj = {
                    location: this.state.selectArea?.location,
                    place: val,
                    valueToShow: this.state.selectArea?.location + ", " + val,
                };
                this.setState({
                    selectArea: objj,
                    LocationMain: JSON.stringify(objj),
                })
                // console.log("loc_bahria: ", objj);
                break;
            case "loc_dha":
                let objjj = {
                    location: this.state.selectArea?.location,
                    place: val,
                    valueToShow: this.state.selectArea?.location + ", " + val,
                };
                this.setState({
                    selectArea: objjj,
                    LocationMain: JSON.stringify(objjj),
                })
                console.log("loc_dha: ", objjj);

                break;
        }


    }


    render() {

        return (
            <View style={styles.mainContainer}>
                {/* Backround Image */}
                <ImageBackground
                    source={require('../../../assets/bg_get_started.jpg')}
                    resizeMode="cover"
                    style={styles.BackgroundImage}>

                    <ScrollView
                        style={{ width: "100%" }}
                        showsVerticalScrollIndicator={false}
                    >

                        {/* Logo */}
                        <Image
                            source={require('../../../assets/logo.png')}
                            style={styles.logo}
                            resizeMode='contain'
                        />

                        {/* Screen Title */}
                        <Text style={styles.screenTitle}>Register</Text>
                        {/* User Roles */}
                        <RolesType
                            data={this.state.userRoles == null ? [] : this.state.userRoles}
                            onSelectUserRole={(val) => this.selectedRole(val)}
                            defaultSelected={this.state.defaultSelectedRoleType}
                        />

                        {/* Image selector */}
                        <ImageSelector imagePath={(uri) => this.imageSelected(uri)} />


                        {/* <KeyboardAvoidingView
                            style={{ flex: 1 }}
                            enabled
                            behavior='position'
                        // keyboardVerticalOffset={40}
                        > */}

                        {/* Real Estate Consultant Role */}


                        {
                            this.state.role == "estate_agent" &&
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
                        data={
                            // listOfArea
                            this.state.dropdownDataChange == false
                                ? listOfArea
                                : this.state.dropdownSV == "DHA"
                                    ? Location_DHA_City
                                    : Location_Bahria
                        }
                        show={this.state.locationDropDownOpen}
                        onDismiss={() => this.setState({
                            locationDropDownOpen: !this.state.locationDropDownOpen,
                            dropdownDataChange: false,
                            
                        })}
                        // title={"Select Location"}
                        // onSelect={(val) => this.setLocation(val)}
                        onSelect={(val) => {
                            // setLocation(val)
                            if (this.state.dropdownDataChange == false) {
                                console.log("location Value Slected:", val);
                                //   setDropdownSV(val);
                                this.setState({ dropdownSV: val })
                                if (val == "Bahria Town" || val == "DHA") {
                                    this.setState({ dropdownDataChange: true,selectArea:null })

                                }
                                this.setLocation(val, 'location')
                                // valueAssigner(val, "location");
                                if (val == "Clifton" || val == "MDA") {
                                    this.setState({ dropdownDataChange: false,selectArea:null })
                                }
                            }
                            if (this.state.dropdownSV == "Bahria Town") {

                                this.setLocation(val, "loc_bahria")
                                this.setState({
                                    dropdownDataChange: false,
                                    dropdownSV: "",
                                    locationDropDownOpen: false
                                })
                                // setDropdownDataChange(false);
                                // setDropdownSV("");
                                // setLocationDropDownOpen(false);
                            }
                            if (this.state.dropdownSV == "DHA") {
                                this.setLocation(val, "loc_dha");
                                this.setState({
                                    dropdownDataChange: false,
                                    dropdownSV: "",
                                    locationDropDownOpen: false
                                })
                                // setDropdownDataChange(false);
                                // setDropdownSV("");
                                // setLocationDropDownOpen(false);
                            }
                        }}
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
        marginTop: 30,
        alignSelf: "center"
    },
    screenTitle: {
        fontSize: 28,
        fontWeight: "600",
        color: Colors.main,
        marginTop: 20,
        alignSelf: "center"
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