import {
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
    StyleSheet,
    NativeModules,
    Modal,
} from 'react-native';
import React, { Component } from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from "react-native-vector-icons/Feather"
import Entypo from "react-native-vector-icons/Entypo"
import { Colors } from '../../config';
import AssetLinkers from '../../api/AssetLinkers';
import ImageSelector from '../../../src1/screens/Authentication/Components/ImageSelector';
const { StatusBarManager: { HEIGHT } } = NativeModules;
const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height - HEIGHT
import { listOfArea, Location_DHA_City, Location_Bahria } from '../Post/DataArrays';
import DropDown from '../Post/Components/DropDown';

{/* {---------------Redux Imports------------} */ }
import { connect } from 'react-redux';
import * as userActions from "../../redux/actions/user"
import { bindActionCreators } from 'redux';
import RoleOptions from './Components/RoleOptions';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "NUll",
            user_name: this.props?.userData?.user?.name,
            email: this.props?.userData?.user?.email,
            prevWork: "",
            experience: "",
            office_name: "",
            address: "",
            description: "",
            location: {
                "location": "Null",
                "place": "Null",
                "valueToShow": "Null"
            },
            locationMain: "",
            locationDropDownOpen: false,
            dropdownDataChange: false,
            dropdownSV: "",
        };
    }


    onPress = (key) => {
        switch (key) {
            case "cancel":
                this.props.navigation.pop()
                break;
            case "save":
                // this.props.navigation.navigate("EditProfile")
                break;
        }
    }

    imageSelected = (uri) => {
        console.log("uri", uri)
        setImmediate(() => {
            this.setState({ image: uri })
        })
    }

    onChangeText = (val, key) => {
        switch (key) {
            case "user_name":
                setImmediate(() => {
                    this.setState({ user_name: val })
                })
                break;
            case "email":
                setImmediate(() => {
                    this.setState({ email: val })
                })
                break;
            case "prevWork":
                setImmediate(() => {
                    this.setState({ prevWork: val })
                })
                break;
            case "exp":
                setImmediate(() => {
                    this.setState({ experience: val })
                })
                break;
            case "office_name":
                setImmediate(() => {
                    this.setState({ office_name: val })
                })
                break;
            case "address":
                setImmediate(() => {
                    this.setState({ address: val })
                })
                break;
            case "desc":
                setImmediate(() => {
                    this.setState({ description: val })
                })
                break;
        }
    }

    valueAssigner = (val, key) => {
        switch (key) {


            case 'location':
                let obj = {
                    "location": val,
                    "place": "Null",
                    "valueToShow": val
                }
                setImmediate(() => {
                    this.setState({
                        location: obj,
                        locationMain: JSON.stringify(obj),
                    })
                })
                console.log("location recieved", val)
                break;
            case 'loc_bahria':
                let objj = {
                    "location": this.state.location?.location,
                    "place": val,
                    "valueToShow": this.state.location?.location + ", " + val
                }
                setImmediate(() => {
                    this.setState({
                        location: objj,
                        locationMain: JSON.stringify(objj),
                    })
                })
                // setLoc_bahria(val);

                break;
            case 'loc_dha':
                let objjj = {
                    "location": this.state.location?.location,
                    "place": val,
                    "valueToShow": this.state.location?.location + ", " + val
                }
                setImmediate(() => {
                    this.setState({
                        location: objjj,
                        locationMain: JSON.stringify(objjj),
                    })
                })
                // setLoc_dha(val);

                break;
        }
    }

    render() {
        var { userData: { user: { id, user_type } } } = this.props
        return (
            <View style={styles.mainContainer}>
                {/* Header */}
                <View style={styles.headerCont}>

                    {/* Back Button */}
                    <TouchableOpacity
                        style={{ position: "absolute", left: 10 }}
                        onPress={() => this.onPress("cancel")}
                    >
                        <Entypo name="cross" size={30} color="white" />
                    </TouchableOpacity>

                    {/* Title */}
                    <Text style={styles.headerTitle}>Edit Profile</Text>

                    <TouchableOpacity
                        style={{ position: "absolute", right: 10 }}
                        onPress={() => this.onPress("save")}
                    >
                        <Text style={[styles.headerTitle, { fontSize: 18 }]}>Save</Text>
                    </TouchableOpacity>

                </View>
                <ScrollView style={{ width: "100%" }}>


                    {/* Image selector */}
                    <View style={{ marginTop: 40 }}>
                        <ImageSelector
                            imagePath={(uri) => this.imageSelected(uri)}
                        />
                    </View>

                    {/* TextInputs Options */}
                    <RoleOptions
                        Role={user_type}
                        userNameValue={this.state.user_name}
                        emailValue={this.state.email}
                        prevWorkValue={this.state.prevWork}
                        expValue={this.state.experience}
                        openLocationDropdown={() => this.setState({ locationDropDownOpen: !this.state.locationDropDownOpen })}
                        location={this.state.location}
                        onChangeText={(txt, key) => this.onChangeText(txt, key)}
                    />


                </ScrollView>

                <DropDown
                    data={this.state.dropdownDataChange == false ? listOfArea : this.state.dropdownSV == "DHA" ? Location_DHA_City : Location_Bahria}
                    show={this.state.locationDropDownOpen}
                    onDismiss={() => this.setState({ locationDropDownOpen: !this.state.locationDropDownOpen })}
                    title={"Select Location"}
                    onSelect={(val) => {
                        // setLocation(val)
                        if (this.state.dropdownDataChange == false) {
                            console.log("location Value Slected:", val)
                            setImmediate(() => {
                                this.setState({ dropdownSV: val })
                            })

                            if (val == "Bahria Town" || val == "DHA") {
                                setImmediate(() => {
                                    this.setState({ dropdownDataChange: true })
                                })
                            }
                            this.valueAssigner(val, "location")
                            if (val == "Clifton" || val == "MDA") {
                                setImmediate(() => {
                                    this.setState({ locationDropDownOpen: false })
                                })

                            }
                        }
                        if (this.state.dropdownSV == "Bahria Town") {
                            this.valueAssigner(val, "loc_bahria")
                            setImmediate(() => {
                                this.setState({
                                    dropdownSV: "",
                                    dropdownDataChange: false,
                                    locationDropDownOpen: false
                                })
                            })

                        }
                        if (this.state.dropdownSV == "DHA") {
                            this.valueAssigner(val, "loc_dha")
                            setImmediate(() => {
                                this.setState({
                                    dropdownSV: "",
                                    dropdownDataChange: false,
                                    locationDropDownOpen: false
                                })
                            })

                        }
                    }}
                />

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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: width,
        height: height,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: "white"
    },
    headerCont: {
        width: width,
        height: 60,
        paddingVertical: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.blue
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "600",
        color: "white",
    },
})

