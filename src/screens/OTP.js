import React, { Component, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { Colors } from '../config';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { verifyForgetCode } from '../redux1/APIs';
import OTPTextView from 'react-native-otp-textinput';
const OTP = ({ route }) => {
  const passedData = route?.params;
  console.log('passedData', passedData);
  const width = Dimensions.get('window').width;
  const [code, setCode] = useState();
  const [timerCode, setTimerCode] = useState(5);
  const [resend, setResend] = useState(false);
  const [res, setRes] = useState(false);

  const otpContainerWidth = width - 110;
  const otpsingle = (otpContainerWidth - 25) / 6;
  let timer = null;
  const startInterval = () => {
    clearInterval(timer);
    timer = setInterval(() => {
      setTimerCode(timerCode => {
        if (timerCode > 0) {
          return timerCode - 1;
        } else {
          setResend(true);
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);
  };
  useEffect(() => {
    startInterval();
    return () => {
      clearInterval(timer);
    };
  }, []);

  const SubmitFunction = () => {
    console.log('otpcode ', code);
    verifyForgetCode(passedData?.user_id, code)
  }
  return (
    // <View></View>
    <ImageBackground
      source={require('../../assets/bg_get_started.jpg')}
      style={styles.image}>
      <View
        style={{
          width: width,
          height: 120,
          backgroundColor: '#023661',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomLeftRadius: 50,
        }}>
        <Text style={{ color: '#fff', fontSize: 25, fontWeight: '600' }}>
          OTP Verification{' '}
        </Text>
      </View>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{ flexGrow: 1 }}
        contentContainerStyle={{
          // alignItems: 'center',
          flexGrow: 1,
          // paddingHorizontal: 40,
        }}>
        <Text
          style={{
            textAlign: 'center',
            paddingHorizontal: 20,
            fontSize: 18,
            marginVertical: 40,
            color: '#000',
          }}>
          We have sent you a six-digits verification code with instructions.
          Please follow the instructions to verify your account.
          Your OTP Code is 123456
        </Text>

        <OTPTextView
          // ref={(e) => (ref = e)}
          keyboardType="numeric"
          // style={{
          //   width: '80%',
          //   height: 20,
          //   alignSelf: 'center',
          //   marginVertical: 40,
          // }}
          handleTextChange={(text) => setCode(text)}
          containerStyle={ styles.textInputContainer}
          textInputStyle={styles.roundedTextInput}
          inputCount={6}

        />

        {/* <OTPInputView
            keyboardType="numeric"
            style={{
              width: '80%',
              height: 20,
              alignSelf: 'center',
              marginVertical: 40,
            }}
            // pinCount={6}
            // autoFocusOnLoad={true}
            // onCodeChanged={(text) => setCode(text)}
            // codeInputFieldStyle={styles.underlineStyleBase}
            //codeInputHighlightStyle={styles.underlineStyleHighLighted}
            // onCodeFilled={c => {
            //   console.log(`Code is ${c}, you are good to go!`);
            //   setCode(c);
            // }}
            
            // code={code}
          /> */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() => SubmitFunction()}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 50,
              backgroundColor: '#023661',
              height: 45,
              width: 150,
              borderRadius: 10,
            }}>
            <Text style={{ fontSize: 15, color: '#fff', fontWeight: '500' }}>
              Submit
            </Text>
          </View>
        </TouchableOpacity>
        {/* <Image style={styles.time} source={Icons.clock} /> */}

        {/* <CustomGradientButton
          title={'Submit'}
        //   onPress={async () =>
        //     // await verifyForgetCode(passedData?.user_id, code, passedData?.role)
          
        //   }
          buttonStyle={{marginBottom: 40}}
        /> */}
      </ScrollView>
    </ImageBackground>
  );
};

export default OTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cartoonTaxi: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  selectRole: {
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
    // fontFamily: fonts.RobotoMedium
  },
  btn: {
    width: '85%',
    alignSelf: 'center',
    padding: 18,
    borderColor: '#ffffff',
    borderWidth: 2,
    borderRadius: 6,
    marginVertical: 10,
  },
  textInputContainer: {
    marginBottom: 20,
    padding: 10,

  },
  roundedTextInput: {
   // borderRadius: 10,
    borderBottomWidth: 4,
  },
  btnText: {
    color: '#ffffff',
    textAlign: 'center',
    // fontFamily: fonts.RobotoRegular,
    fontSize: 21,
  },
  text: {
    fontSize: 19,
    // fontFamily: fonts.RobotoMedium
  },
  btns: {
    borderWidth: 2.5,
    borderColor: '#ffffff',
    width: '84%',
    paddingVertical: 18,
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 8,
  },
  img: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  signup: {
    color: '#1C1B7F',
    textDecorationLine: 'underline',
  },
  para: {
    textAlign: 'center',
    paddingHorizontal: 20,
    fontSize: 18,
    // fontFamily: fonts.RobotoMedium,
    color: '#000',
  },
  innerTextColor: {
    color: '#3669C9',
  },
  underlineStyleBase: {
    width: 42,
    height: 48,
    borderRadius: 8,
    borderColor: Colors.primary,
    borderWidth: 2,
    color: '#000',
    fontSize: 17,
    // fontFamily: fonts.RobotoMedium
  },
  time: {
    tintColor: Colors.color1,
    width: 50,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 14,
    marginBottom: '10%',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
});
