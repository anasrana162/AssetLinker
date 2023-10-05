import {
  View,
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import TextInputCustom from '../components/TextInputCustom';
import Toast from 'react-native-toast-message';
import {forgetPassword} from '../redux1/APIs';
const {width, height} = Dimensions.get('window');
import {Colors} from '../config';
import PhoneInput from 'react-native-phone-number-input';

const ForgotPassword = () => {
  const Navigation = useNavigation();
  const [phone, setphone] = useState('');
  const phoneInput = useRef(null);

  const SubmitFunction = () => {
    const phonere = /\S+@\S+\.\S+/;
    if (phone == '') {
      Toast.show({
        type: 'error',
        text1: 'Phone Number is required',
      });
    } else {
      forgetPassword(phone);
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ImageBackground
        source={require('../../assets/bg_get_started.jpg')}
        style={styles.image}>
          <ScrollView>

        <View
          style={{
            width: width,
            height: 120,
            backgroundColor: '#023661',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomLeftRadius: 50,
          }}>
          <Text style={{color: '#fff', fontSize: 25, fontWeight: '600'}}>
            Forgot Password{' '}
          </Text>
        </View>

        <View
          style={{
            justifyContent: 'center',
            top: 50,
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '500',
              color: '#000',
              top: 10,
              textAlign: 'center',
              marginHorizontal: 20,
            }}>
            Enter Your Phone Number and We'll Send You {'\n'} OTP Code
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            height: 40,
            width: 280,
            marginTop: 100,
            // marginLeft: 40,
            padding: 10,
          }}>
          <PhoneInput
            ref={phoneInput}
            defaultValue={phone}
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
            textInputStyle={{padding: 0, fontSize: 13, color: 'black'}}
            onChangeFormattedText={text => setphone(text)}
            withDarkTheme
            withShadow
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{justifyContent: 'center', alignItems: 'center'}}
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
            <Text style={{fontSize: 15, color: '#fff', fontWeight: '500'}}>
              Submit
            </Text>
          </View>
        </TouchableOpacity>
        </ScrollView>

      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default ForgotPassword;
