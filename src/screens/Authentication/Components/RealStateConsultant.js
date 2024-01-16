import { StyleSheet, Text, View, NativeModules, Dimensions, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React from 'react'
import AuthTextIput from './AuthTextIput'
import { Colors } from '../../../config'
import PhoneInput from 'react-native-phone-number-input';
const { StatusBarManager: { HEIGHT } } = NativeModules;
const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height - HEIGHT


const RealStateConsultant = ({ onChangeFormattedText, onChangeText, selectedLocation, onLocBtnPress }) => {

    const [locationDropDownOpen, setLocationDropDownOpen] = React.useState(false)

    return (
        <View style={styles.mainContainer}>
            <KeyboardAvoidingView
                enabled
                behavior='position'
            >
                {/* Name */}
                <AuthTextIput
                    placeholder={"Name*"}
                    placeholderTextColor={Colors.secondary}
                    onChangeText={(text) => onChangeText(text, "Name")}
                    inner_view_style={{ width: width - 95 }}
                />


                {/* Real Estate Name */}
                <AuthTextIput
                    placeholder={"Real Estate Name*"}
                    placeholderTextColor={Colors.secondary}
                    onChangeText={(text) => onChangeText(text, "REName")}
                    inner_view_style={{ width: width - 95 }}
                />

                {/* Mobile no */}
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
                    onChangeFormattedText={onChangeFormattedText}
                />
                {/* 
            <AuthTextIput
                placeholder={"Phone"}
                placeholderTextColor={Colors.secondary}
                onChangeText={onChangeFormattedText}
                // style={{ marginBottom: 20 }}
            // showEye={true}
            /> */}

                {/* Email */}
                <AuthTextIput
                    placeholder={"Email*"}
                    placeholderTextColor={Colors.secondary}
                    onChangeText={(text) => onChangeText(text, "email")}
                    inner_view_style={{ width: width - 95 }}
                />

                {/* Password */}
                <AuthTextIput
                    placeholder={"Password*"}
                    placeholderTextColor={Colors.secondary}
                    onChangeText={(text) => onChangeText(text, "password")}
                    showEye={true}
                    inner_view_style={{ width: width - 95 }}
                />

                <Text style={styles.warning_text}>Password must be 6 characters long, should contain atleast 1 uppercase,1 lowercase and 1 digit</Text>

                {/* Confrim Password */}
                <AuthTextIput
                    placeholder={"Confirm Password*"}
                    placeholderTextColor={Colors.secondary}
                    onChangeText={(text) => onChangeText(text, "confirm_password")}
                    showEye={true}
                    inner_view_style={{ width: width - 95 }}
                />

                {/* Location button */}
                {/* {console.log(selectedLocation)} */}
                <TouchableOpacity
                    onPress={onLocBtnPress}
                    style={styles.location_btn}>
                    <Text style={styles.location_btn_text}>{selectedLocation !== null ? selectedLocation?.valueToShow : "Location*"}</Text>
                </TouchableOpacity>




                {/* Address */}
                <AuthTextIput
                    placeholder={"Address*"}
                    placeholderTextColor={Colors.secondary}
                    onChangeText={(text) => onChangeText(text, "address")}
                    inner_view_style={{ width: width - 95 }}
                />
            </KeyboardAvoidingView>
        </View>
    )
}

export default RealStateConsultant

const styles = StyleSheet.create({
    mainContainer: {
        width: width,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        marginBottom: 30,
        zIndex: 400
    },
    PhoneTxtInp_cont: {
        width: width - 95,
        height: 45,
        borderColor: Colors.black,
        borderWidth: 1.5,
        marginTop: 20,
        borderRadius: 10,
        // flexDirection: 'row',
        color: 'black',

    },
    location_btn: {
        width: width - 96,
        height: 40,
        borderWidth: 1.5,
        borderColor: "black",
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "flex-start"
    },
    location_btn_text: {
        fontSize: 14,
        fontWeight: "400",
        color: Colors.secondary,
        marginLeft: 15
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