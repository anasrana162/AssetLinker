import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    ImageBackground, Dimensions, NativeModules
} from 'react-native';
import { globalStyles } from '../styles/GlobalStyles';
import LoginButton from '../components/Button';
import Button from '../components/GetStartedButton'
const { StatusBarManager: { HEIGHT } } = NativeModules;
const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height - HEIGHT


class GetStarted extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/bg_get_started_.jpg')} resizeMode="cover" style={styles.image}>
                    <Image
                        source={require('../../assets/logo.png')}
                        style={styles.logoImageSignIn}
                    /> 
                    {/* <Text style={styles.textSignIn}>Get Started</Text> */}

                    <View style={{ marginTop: height * 0.1 }}>

                        <Button title="Login" onPress={() => this.props.navigation.navigate('Login')} />
                        <Button title="Sign Up" onPress={() => this.props.navigation.navigate('SignUp')} />

                    </View>
                </ImageBackground>
            </View>
        );
    }
}
export default GetStarted;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        width: width,
        height: height,
        backgroundColor: "white"
    },
    inputFieldsSignIn: {
        marginTop: 10,
        borderColor: '#642515',
        padding: 10,
        borderWidth: 2,
        backgroundColor: '#FFFFFF',
        margin: 10,
        width: 250,
        borderRadius: 30,
    },

    image: {

        width: width,
        height: height,
        justifyContent: "center",
        alignContent: 'center',
        alignItems: 'center',
        // padding: 10,
    },
    textSignIn: {
        marginTop: 40,
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
    },
    linkButtons: {
        marginTop: 10,
        fontSize: 20,
        color: 'white',
        textDecorationLine: 'underline',
        alignItems: 'center',
    },
    logoImageSignIn: {
        height: 125,
        width: 350,
        padding: 10,
        resizeMode: 'contain'
    },
});
