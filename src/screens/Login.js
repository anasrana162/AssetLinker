import React, { Component, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ImageBackground,
  Dimensions
} from 'react-native';
import { globalStyles } from '../styles/GlobalStyles';
import LoginButton from '../components/Button';
import Toast from 'react-native-toast-message';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import TextInputCustom from '../components/TextInputCustom';
import { useNavigation } from '@react-navigation/native'
import PhoneInput from 'react-native-phone-number-input';

import Loader from '../config/Helpers/Loader';
import { Colors, NavService } from '../config';
import { login } from '../redux1/APIs';
const Login = () => {
  const [email, setEmail] = useState('')
  const phoneInput = useRef(null);

  const [password, setPassword] = useState('')
  const navigation = useNavigation()
  const loginFunction = () => {


    if (email == '') {

      Toast.show({
        type: 'error',
        text1: 'Phone Number is required',
        visibilityTime: 2000
      });
    }
    else if (password == '') {
      Toast.show({
        type: 'error',
        text1: 'Password is required',
        visibilityTime: 2000

      });
    }
    else {
      login(email, password)
    }
  }


  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/bg_get_started.jpg')} resizeMode="cover" style={styles.image}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logoImageSignIn}
        />
        <Text style={styles.textSignIn}>LOGIN</Text>

        {/* <Image
            source={require('../../assets/watermark.png')}
            style={styles.waterMark}
          /> */}
        <PhoneInput
          ref={phoneInput}
          defaultValue={email}
          defaultCode="PK"
          layout="first"
          containerStyle={{
            width: width * 0.7,
            height: 52,
            backgroundColor: Colors.white,
            // paddingHorizontal: 5,
            borderColor: '#023661',
            borderWidth: 1,
            marginTop: 15,
            borderRadius: 15,
            flexDirection: 'row',
            alignSelf: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
          }}
          textContainerStyle={{
            height: 52,

            padding: 0,
            backgroundColor: 'transparent',
          }}
          textInputStyle={{ padding: 0, fontSize: 13, color: 'black' }}

          onChangeFormattedText={text =>
            setEmail(text)
          }
          withDarkTheme
          withShadow
        />



        <TextInputCustom
          //   value={this.state.username}
          onChangeText={text => setPassword(text)}

          placeholder="Password"
          isPassword


        />
        <LoginButton title="Login" onPress={() =>
          loginFunction()
          // this.props.navigation.navigate("Home")
        }

        />

        <View
          style={{

            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={styles.linkButtons}
            onPress={() => navigation.navigate('SignUp')}>
            Create Account
          </Text>

          <Text
            style={styles.linkButtons}
            onPress={() => navigation.navigate('Forgot')}
          >
            Forget Password
          </Text>
        </View>

      </ImageBackground>
    </View>
  );
}

export default Login;





const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

  },
  inputFieldsSignIn: {
    marginTop: 10,
    borderColor: '#023661',
    padding: 10,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    margin: 10,
    width: 250,
    borderRadius: 20,
  },

  image: {
    flex: 1,
    justifyContent: "center",
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  textSignIn: {
    marginTop: 20,
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    top: -80
  },
  linkButtons: {
    marginTop: 10,
    fontSize: 20,
    color: 'black',
    textDecorationLine: 'underline',
    alignItems: 'center',
  },
  logoImageSignIn: {
    height: 125,
    width: 350,
    padding: 10,
    top: -80
  },
  waterMark: {
    height: 100,
    width: 100,
    padding: 10,
    // bottom: -80,
    // right: width/2
  },
});
