import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../../config'
import Ionicons from 'react-native-vector-icons/Ionicons'
const AuthTextIput = ({ placeholder, placeholderTextColor, onChangeText, style,inner_view_style, keyboardType, showEye, showPhoneCode }) => {

    const [secureTextEntry, setSecureTextEntry] = React.useState(false)
    return (
        <View style={[styles.mainContainer, style]}>
            <View style={[styles.inner_view,inner_view_style]}>
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    keyboardType={keyboardType}
                    onChangeText={onChangeText}
                    style={styles.textInp_cont}
                    secureTextEntry={secureTextEntry}
                />
                {showEye &&
                    <TouchableOpacity
                        onPress={() => setSecureTextEntry(!secureTextEntry)}
                        style={styles.eye_cont}>
                        {!secureTextEntry && <Ionicons name="eye" size={20} color={Colors.main} />}
                        {secureTextEntry && <Ionicons name="eye-off" size={20} color={Colors.main} />}
                    </TouchableOpacity>}
            </View>
        </View>
    )
}

export default AuthTextIput

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor:"green"
    },
    inner_view: {
        width: "75%",
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1.5,
        borderRadius: 10,
        overflow: "hidden",
        marginTop: 20,
    },
    textInp_cont: {
        width: "85%",
        // height: "100%",
        height: 40,
        paddingLeft: 10,
        // borderWidth: 1,
        fontSize: 14,
        color: Colors.black
    },
    eye_cont: {
        width: "15%",
        height: 40,
        justifyContent: "center",
        alignItems: "center"
    }

})