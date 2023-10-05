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
import React, {useState} from 'react';
import TextInputCustom from '../components/TextInputCustom';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {resetPassword} from '../redux1/APIs';

const {width, height} = Dimensions.get('window');

const ChangePassword = ({route}) => {
  const data = route?.params;
  console.log(data, 'Dataaa');
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');

  const submitChangePassword = () => {
    resetPassword(data?.user_id, password, cpassword);

    //     const passwordre = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    //   if(password==''){

    //   return  Toast.show({
    //         type: 'error',
    //         text1:"Password is required"
    //     })
    // }
    //  if(cpassword==''){

    //  return   Toast.show({
    //         type: 'error',
    //         text1:"Confirm Password is required"
    //     })
    // }
    // if(password!= cpassword){
    //   return    Toast.show({
    //         type: 'error',
    //         text1:"Password and Confirm password must be same"
    //     })
    // }
    //  if(passwordre.test(password)){
    //     return  Toast.show({
    //         type: 'error',
    //         text1:"Use Strong Password"
    //     })
    // }
    // else{
    //    resetPassword(data?.user_id,password,cpassword)
    // }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
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
          <Text style={{color: '#fff', fontSize: 25, fontWeight: '600'}}>
            Reset password{' '}
          </Text>
        </View>
        <ScrollView>
          <View
            style={{
              alignItems: 'center',
              height: 40,
              width: 280,
              marginTop: 100,
              alignSelf: 'center',

              paddingLeft: 10,
            }}>
            <TextInputCustom
              placeholder="New-Password"
              placeholderTextColor="#000"
              style={{height: 40, width: 280, paddingHorizontal: 20}}
              onChangeText={text => setPassword(text)}
            />
          </View>

          <View
            style={{
              alignItems: 'center',
              height: 40,
              width: 280,
              marginTop: 30,
              alignSelf: 'center',

              paddingLeft: 10,
            }}>
            <TextInputCustom
              placeholder="Confirm-Password"
              placeholderTextColor="#000"
              style={{height: 40, width: 280, paddingHorizontal: 20}}
              onChangeText={text => setCPassword(text)}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}
            onPress={() => submitChangePassword()}>
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

export default ChangePassword;
