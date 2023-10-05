import React, { Component, createRef, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { globalStyles } from '../styles/GlobalStyles';
import LoginButton from '../components/Button';
import { RadioButton, CheckBox } from 'react-native-paper';
import { DropDownPicker } from 'react-native-dropdown-picker';
import TextInputCustom from '../components/TextInputCustom';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as EmailValidator from 'email-validator';
import PhoneInput from 'react-native-phone-number-input';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';




const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import ActionSheet from 'react-native-actions-sheet';
import Toast from 'react-native-toast-message';

import { Colors, size, WP } from '../config';
import CustomImagePicker from '../components/CustomImagePicker';
import { signup } from '../redux1/APIs';
class Login extends Component {
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
      address: null
    };
  }

  changeCountry(item) {
    let city = null;
    let cities;
    switch (item.value) {
      case 'fr':
        cities = [{ label: 'Paris', value: 'paris' }];
        break;
      case 'es':
        cities = [{ label: 'Madrid', value: 'madrid' }];
        break;
    }

    this.setState({
      city,
      cities,
    });
  }

  changeCity(item) {
    this.setState({
      city: item.value,
    });
  }

  render() {
    const {
      name,
      checked,
      selectArea,
      others,
      email,
      mobile,
      realEstateName,
      city,
      password,
      confirmPassword,
      flagForBuilders,
      flagForBuyer,
      flagForEstateAgent,
      role,
      landline,
      image,
      mime,
      userName,
      address
    } = this.state;
    const actionSheetAreaRef = createRef();
    const phoneInput = createRef(null);

    const listOfArea = [
      {
        name: 'Bahira Town',
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
    ];

    const submitCheck = () => {
      if (role == 'seller') {
        var area = selectArea?.name;
        const paramData = new FormData();
        paramData.append('userName', name);
        paramData.append('phone', mobile);
        paramData.append('email', email);
        paramData.append('password', password);
        paramData.append('confirm_password', confirmPassword);
        paramData.append('role', role);
        paramData.append('image', {
          uri: image,
          name: `Profile${Date.now()}.${mime?.slice(
            mime.lastIndexOf('/') + 1,
          )}`,
          type: mime,
        });
        if (!image || image == null) {
          Toast.show({
            type: 'error',
            text1: 'Please fill all fields',
          });
        } else if (!name || name == null) {
          Toast.show({
            type: 'error',
            text1: 'Please fill all fields',
          });
        } else if (!mobile) {
          Toast.show({
            type: 'error',
            text1: 'Please fill all fields ',
          });
        } else if (!email) {
          Toast.show({
            type: 'error',
            text1: 'Please fill all fields ',
          });
        } else if (!password) {
          Toast.show({
            type: 'error',
            text1: 'Please fill all fields ',
          });
        } else if (!confirmPassword) {
          Toast.show({
            type: 'error',
            text1: 'Please fill all fields ',
          });
        } else if (password != confirmPassword) {
          return Toast.show({
            type: 'error',
            text1: `Password and confirm password must be same `,
          });
        }
        else if (image == null) {
          Toast.show({
            type: 'error',
            text1: 'Please fill all fields ',
          });
        }
        else if (name == null) {
          Toast.show({
            type: 'error',
            text1: 'Please fill all fields ',
          });
        }
        else {
          signup(paramData);
        }
      } else if (role == 'builder') {
        var area = selectArea?.name;
        const paramData = new FormData();
        paramData.append('userName', name);
        paramData.append('firmName', realEstateName);
        paramData.append('phone', mobile);
        paramData.append('landline', landline);
        paramData.append('email', email);
        paramData.append('password', password);
        paramData.append('confirm_password', confirmPassword);
        paramData.append('area', area);
        paramData.append('location', address);

        paramData.append('role', role);
        paramData.append('image', {
          uri: image,
          name: `Profile${Date.now()}.${mime?.slice(
            mime.lastIndexOf('/') + 1,
          )}`,
          type: mime,
        });
        if (!image || image == null) {
          Toast.show({
            type: 'error',
            text1: 'Please fill all fields',
          });
        }
        if (!name || name == null) {
          Toast.show({
            type: 'error',
            text1: 'Please fill all fields',
          });
        }
        if (!realEstateName) {
          Toast.show({
            type: 'error',
            text1: 'Please fill all fields',
          });
        }
        if (!mobile) {
          Toast.show({
            type: 'error',
            text1: 'Please fill all fields ',
          });
        }

        if (!email) {
          Toast.show({
            type: 'error',
            text1: 'Please fill all fields ',
          });
        }
        if (!password) {
          Toast.show({
            type: 'error',
            text1: 'Please fill all fields ',
          });
        }
        if (!confirmPassword) {
          Toast.show({
            type: 'error',
            text1: 'Please fill all fields ',
          });
        }
        if (password != confirmPassword) {
          return Toast.show({
            type: 'error',
            text1: `Password and confirm password must be same `,
          });
        }

        else if (image == null) {
          Toast.show({
            type: 'error',
            text1: 'Please fill all fields ',
          });
        }
        else if (name == null) {
          Toast.show({
            type: 'error',
            text1: 'Please fill all fields ',
          });
        }
        else {
          signup(paramData);
        }
      } else if (role == 'consultant') {
        var area = selectArea?.name;
        const paramData = new FormData();
        paramData.append('userName', name);
        paramData.append('stateName', realEstateName);
        paramData.append('phone', mobile);
        paramData.append('email', email);
        paramData.append('password', password);
        paramData.append('confirm_password', confirmPassword);
        paramData.append('area', area);
        paramData.append('role', role);
        paramData.append('location', address);

        paramData.append('image', {
          uri: image,
          name: `Profile${Date.now()}.${mime?.slice(
            mime.lastIndexOf('/') + 1,
          )}`,
          type: mime,
        });
        const params = {
          name,
          stateName: realEstateName,
          phone: mobile,
          email,
          password,
          confirm_password: confirmPassword,
          area,
          role,
          image,
        };
        console.log('====================================');
        console.log(name);
        console.log('====================================');
        if (image == null) {
          Toast.show({
            type: 'error',
            text1: 'Please fill all fields',
          });
        }
        if (!name || name == null) {
          Toast.show({
            type: 'error',
            text1: 'Please fill all fields',
          });
        }
        if (!realEstateName) {
          Toast.show({
            type: 'error',
            text1: 'Please fill all fields',
          });
        }
        if (!mobile) {
          Toast.show({
            type: 'error',
            text1: 'Please fill all fields ',
          });
        }
        if (!email) {
          Toast.show({
            type: 'error',
            text1: 'Please fill all fields ',
          });
        }
        if (!password) {
          Toast.show({
            type: 'error',
            text1: 'Please fill all fields ',
          });
        }
        if (!confirmPassword) {
          Toast.show({
            type: 'error',
            text1: 'Please fill all fields ',
          });
        }
        if (password != confirmPassword) {
          return Toast.show({
            type: 'error',
            text1: `Password and confirm password must be same `,
          });
        }

        else if (image == null) {
          Toast.show({
            type: 'error',
            text1: 'Please fill all fields ',
          });
        }
        else if (name == null) {
          Toast.show({
            type: 'error',
            text1: 'Please fill all fields ',
          });
        }
        else {
          signup(paramData);
        }
      }
    };
    return (
      <ScrollView>
        <View style={styles.container}>
          <ImageBackground
            source={require('../../assets/bg_get_started.jpg')}
            resizeMode="cover"
            style={styles.image}>
            <View
              style={{
                zIndex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                // position: "absolute"
              }}>
              <View style={styles.overlay}></View>

              <Image
                source={require('../../assets/logo.png')}
                style={styles.logoImageSignIn}
              />

              <Text style={styles.textSignIn}>SIGN UP</Text>
              <View
                style={{
                  flex: 1,
                  flexWrap: 'wrap',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',

                  // marginTop: 30
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton
                    style={{}}
                    value="Real Estate Consultant"
                    status={checked === 'first' ? 'checked' : 'unchecked'}
                    onPress={() =>
                      this.setState({
                        role: 'consultant',
                        checked: 'first',
                        flagForEstateAgent: true,
                        flagForBuyer: false,
                        flagForBuilders: false,
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
                      })
                    }
                  />
                  <Text style={styles.textRadio}>Real Estate Consultant</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton
                    style={{ margin: 5 }}
                    value="Builder"
                    status={checked === 'second' ? 'checked' : 'unchecked'}
                    onPress={() =>
                      this.setState({
                        checked: 'second',
                        flagForEstateAgent: false,
                        flagForBuyer: false,
                        flagForBuilders: true,
                        role: 'builder',
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
                      })
                    }
                  />
                  <Text style={styles.textRadio}>Builder</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton
                    style={{ margin: 5 }}
                    value="Buyer/Seller"
                    status={checked === 'third' ? 'checked' : 'unchecked'}
                    onPress={() =>
                      this.setState({
                        checked: 'third',
                        flagForEstateAgent: false,
                        flagForBuyer: true,
                        flagForBuilders: false,
                        role: 'seller',
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
                      })
                    }
                  />
                  <Text style={styles.textRadio}>Buyer/Seller</Text>
                </View>
              </View>
              {this.state.flagForEstateAgent && (
                <View style={styles.container}>
                  <View
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignSelf: 'center',
                    }}>
                    <Image
                      source={
                        image
                          ? { uri: image }
                          : require('../../assets/profile.jpg')
                      }
                      // source={require('../../assets/profile.jpg')}
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 100,
                        borderColor: Colors.primary,
                        borderWidth: 5,
                      }}
                    />
                  </View>
                  <CustomImagePicker
                    style={{
                      marginTop: -30,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      left: -80,
                    }}
                    // onImageChange={(path, mime) => {
                    //   this.setState({ image: path, mime: mime });
                    // }}
                    onImageChange={(path) => {
                      console.log("path clg",path)
                      this.setState({ image: path });
                    }}

                  >
                    {/* <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                      marginTop: -30,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      left: -80,
                    }}
                    onPress={()=> console.log("LKKKLK")}
                    
                    > */}
                    <FontAwesome
                      name="camera"
                      style={{
                        backgroundColor: 'white',
                        padding: 6,
                        borderRadius: 100,
                        borderWidth: 1,
                        borderColor: 'grey',
                      }}
                      size={20}
                      color={Colors.primary}
                    />
                    {/* </TouchableOpacity> */}
                  </CustomImagePicker>
                  <TextInputCustom
                    //   value={this.state.username}
                    onChangeText={text => this.setState({ name: text })}
                    // style={styles.inputFieldsSignIn}
                    placeholder="Name*"
                  />
                  <TextInputCustom
                    //   value={this.state.username}
                    onChangeText={text => this.setState({ realEstateName: text })}
                    // style={styles.inputFieldsSignIn}
                    placeholder="Real Estate Name*"
                  />
                  <PhoneInput
                    ref={phoneInput}
                    defaultValue={mobile}
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
                      // alignSelf: 'center',
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.22,
                      shadowRadius: 2.22,
                      color: 'black',
                      elevation: 3,
                    }}
                    textContainerStyle={{
                      height: 52,

                      padding: 0,
                      backgroundColor: 'transparent',
                    }}
                    textInputStyle={{ padding: 0, fontSize: 13, color: 'black' }}
                    // onChangeText={text => {
                    //   this.setState({mobile: text});
                    // }}
                    // onChangeText={text => {
                    //   setValue(text);
                    // }}
                    onChangeFormattedText={text =>
                      this.setState({ mobile: text })
                    }
                    withDarkTheme
                    withShadow
                  />

                  <TextInputCustom
                    //   value={this.state.username}
                    onChangeText={text => this.setState({ email: text })}
                    // style={styles.inputFieldsSignIn}
                    placeholder="Email*"
                    keyboardType={'email-address'}
                  />

                  <TextInputCustom
                    //   value={this.state.username}
                    onChangeText={text => this.setState({ password: text })}
                    textType="Password"
                    isPassword
                    // style={styles.inputFieldsSignIn}
                    placeholder="Password"
                  />
                  <Text style={{ color: 'black', fontSize: 12, alignSelf: 'center' }} numberOfLines={2}>Password must be 6 characters long Contain {'\n'} atleast 1 uppercase,1 lowercase,1 digit</Text>

                  <TextInputCustom
                    //   value={this.state.username}
                    onChangeText={text =>
                      this.setState({ confirmPassword: text })
                    }
                    textType="Password"
                    isPassword
                    // style={styles.inputFieldsSignIn}
                    placeholder="Confirm Password"
                  />

                  {/* <TextInputCustom
                    //   value={this.state.username}
                       onChangeText={text => this.setState({city:text})}
                    // style={styles.inputFieldsSignIn}
                    placeholder="City"
                  /> */}
                  <TouchableOpacity
                    onPress={() => actionSheetAreaRef.current.show()}
                    style={styles.inputFieldsSignIn}>
                    <Text style={{ marginHorizontal: 15, color: Colors.black }}>
                      {selectArea ? selectArea?.name : 'Location'}
                    </Text>
                  </TouchableOpacity>





                  <TextInputCustom
                    value={this.state.address}
                    onChangeText={text => this.setState({ address: text })}
                    // style={styles.inputFieldsSignIn}
                    placeholder="Address"
                  />




                  <ActionSheet
                    ref={actionSheetAreaRef}
                    containerStyle={{ backgroundColor: 'transparent' }}>
                    <View style={{ padding: 10, paddingBottom: 20 }}>
                      <ActionSheetComponent
                        isDropdown={true}
                        title={'Select Location'}
                        dataset={listOfArea}
                        onPress={async item => {
                          actionSheetAreaRef.current.hide();
                          this.setState({
                            selectArea: item,
                          });
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => actionSheetAreaRef.current.hide()}
                        style={{
                          backgroundColor: 'white',
                          borderRadius: 10,
                          paddingVertical: 12,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: 'rgb(0,88,200)',
                            fontSize: 18,
                            fontWeight: '600',
                          }}>
                          Cancel
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </ActionSheet>
                  {/* <TextInputCustom
                    //   value={this.state.username}
                    onChangeText={text => this.setState({ others: text })}
                    // style={styles.inputFieldsSignIn}
                    placeholder="Other"
                  /> */}
                </View>
              )}
              {this.state.flagForBuilders && (
                <View style={styles.container}>
                  <View
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignSelf: 'center',
                    }}>
                    <Image
                      source={
                        image
                          ? { uri: image }
                          : require('../../assets/profile.jpg')
                      }
                      // source={require('../../assets/profile.jpg')}
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 100,
                        borderColor: Colors.primary,
                        borderWidth: 5,
                      }}
                    />
                  </View>
                  <CustomImagePicker
                    style={{
                      marginTop: -30,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      left: -80,
                    }}
                    onImageChange={(path, mime) => {
                      this.setState({ image: path, mime: mime });
                    }}>
                    {/* <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                      marginTop: -30,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      left: -80,
                    }}
                    onPress={()=> console.log("LKKKLK")}
                    
                    > */}
                    <FontAwesome
                      name="camera"
                      style={{
                        backgroundColor: 'white',
                        padding: 6,
                        borderRadius: 100,
                        borderWidth: 1,
                        borderColor: 'grey',
                      }}
                      size={20}
                      color={Colors.primary}
                    />
                    {/* </TouchableOpacity> */}
                  </CustomImagePicker>
                  <TextInputCustom
                    //   value={this.state.username}
                    onChangeText={text => this.setState({ name: text })}
                    // style={styles.inputFieldsSignIn}
                    placeholder="Name*"
                  />
                  <TextInputCustom
                    //   value={this.state.username}
                    onChangeText={text => this.setState({ realEstateName: text })}
                    // style={styles.inputFieldsSignIn}
                    placeholder="Firm Name*"
                  />
                  <PhoneInput
                    ref={phoneInput}
                    defaultValue={mobile}
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
                      this.setState({ mobile: text })
                    }
                    // onChangeText={text => {
                    //   setValue(text);
                    // }}
                    // onChangeFormattedText={text => {
                    //   setFormattedValue(text);
                    // }}
                    withDarkTheme
                    withShadow
                  />
                  <TextInputCustom
                    //   value={this.state.username}
                    onChangeText={text => this.setState({ landline: text })}
                    // style={styles.inputFieldsSignIn}
                    placeholder="Landline Number"
                    keyboardType={'numeric'}
                  />
                  <TextInputCustom
                    //   value={this.state.username}
                    onChangeText={text => this.setState({ email: text })}
                    // style={styles.inputFieldsSignIn}
                    placeholder="Email*"
                    keyboardType={'email-address'}
                  />

                  <TextInputCustom
                    //   value={this.state.username}
                    onChangeText={text => this.setState({ password: text })}
                    textType="Password"
                    isPassword
                    // style={styles.inputFieldsSignIn}
                    placeholder="Password*"
                  />
                  <Text style={{ color: 'black', fontSize: 12, alignSelf: 'center' }} numberOfLines={2}>Password must be 6 characters long Contain {'\n'} atleast 1 uppercase,1 lowercase,1 digit</Text>

                  <TextInputCustom
                    //   value={this.state.username}
                    onChangeText={text =>
                      this.setState({ confirmPassword: text })
                    }
                    textType="Password"
                    isPassword
                    // style={styles.inputFieldsSignIn}
                    placeholder="Confirm Password*"
                  />

                  <TouchableOpacity
                    onPress={() => actionSheetAreaRef.current.show()}
                    style={styles.inputFieldsSignIn}>
                    <Text style={{ marginHorizontal: 15, color: Colors.black }}>
                      {selectArea ? selectArea?.name : 'Location'}
                    </Text>
                  </TouchableOpacity>
                  <TextInputCustom
                    value={this.state.address}
                    onChangeText={text => this.setState({ address: text })}
                    // style={styles.inputFieldsSignIn}
                    placeholder="Address"
                  />
                  <ActionSheet
                    ref={actionSheetAreaRef}
                    containerStyle={{ backgroundColor: 'transparent' }}>
                    <View style={{ padding: 10, paddingBottom: 20 }}>
                      <ActionSheetComponent
                        isDropdown={true}
                        title={'Select Location'}
                        dataset={listOfArea}
                        onPress={async item => {
                          actionSheetAreaRef.current.hide();
                          this.setState({
                            selectArea: item,
                          });
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => actionSheetAreaRef.current.hide()}
                        style={{
                          backgroundColor: 'white',
                          borderRadius: 10,
                          paddingVertical: 12,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            color: 'rgb(0,88,200)',
                            fontSize: 18,
                            fontWeight: '600',
                          }}>
                          Cancel
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </ActionSheet>
                  {/* <TextInputCustom
                    //   value={this.state.username}
                    onChangeText={text => this.setState({ others: text })}
                    // style={styles.inputFieldsSignIn}
                    placeholder="Other"
                  /> */}
                </View>
              )}

              {this.state.flagForBuyer && (
                <View style={{ marginTop: 10 }}>
                  <View
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignSelf: 'center',
                    }}>
                    <Image
                      source={
                        image
                          ? { uri: image }
                          : require('../../assets/profile.jpg')
                      }
                      // source={require('../../assets/profile.jpg')}
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 100,
                        borderColor: Colors.primary,
                        borderWidth: 5,
                      }}
                    />
                  </View>
                  <CustomImagePicker
                    style={{
                      marginTop: -30,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      left: -80,
                    }}
                    onImageChange={(path, mime) => {
                      this.setState({ image: path, mime: mime });
                    }}>
                    {/* <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                      marginTop: -30,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      left: -80,
                    }}
                    onPress={()=> console.log("LKKKLK")}
                    
                    > */}
                    <FontAwesome
                      name="camera"
                      style={{
                        backgroundColor: 'white',
                        padding: 6,
                        borderRadius: 100,
                        borderWidth: 1,
                        borderColor: 'grey',
                      }}
                      size={20}
                      color={Colors.primary}
                    />
                    {/* </TouchableOpacity> */}
                  </CustomImagePicker>
                  <TextInputCustom
                    //   value={this.state.username}
                    onChangeText={text => this.setState({ name: text })}
                    // style={styles.inputFieldsSignIn}
                    placeholder="Name"
                  />
                  <PhoneInput
                    ref={phoneInput}
                    defaultValue={mobile}
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
                      this.setState({ mobile: text })
                    }
                    // onChangeText={text => {
                    //   setValue(text);
                    // }}
                    // onChangeFormattedText={text => {
                    //   setFormattedValue(text);
                    // }}
                    withDarkTheme
                    withShadow
                  />
                  <TextInputCustom
                    //   value={this.state.username}
                    onChangeText={text => this.setState({ email: text })}
                    // style={styles.inputFieldsSignIn}
                    placeholder="Email"
                    keyboardType={'email-address'}
                  />

                  <TextInputCustom
                    //   value={this.state.username}
                    onChangeText={text => this.setState({ password: text })}
                    textType="Password"
                    isPassword
                    // style={styles.inputFieldsSignIn}
                    placeholder="Password*"
                  />
                  <Text style={{ color: 'black', fontSize: 12, alignSelf: 'center' }} numberOfLines={2}>Password must be 6 characters long Contain {'\n'} atleast 1 uppercase,1 lowercase,1 digit</Text>
                  <TextInputCustom
                    //   value={this.state.username}
                    onChangeText={text =>
                      this.setState({ confirmPassword: text })
                    }
                    textType="Password"
                    isPassword
                    // style={styles.inputFieldsSignIn}
                    placeholder="Confirm Password*"
                  />
                  {/* <DropDownPicker
                  items={[
                    { label: 'Item 1', value: 'item1' },
                    { label: 'Item 2', value: 'item2' },
                  ]}
                  defaultValue="item1"
                  containerStyle={{ height: 40 }}
                  style={{ backgroundColor: '#fafafa' }}
                  dropDownStyle={{ backgroundColor: '#fafafa' }}
                  onChangeItem={item => console.log(item.label, item.value)}
                /> */}
                </View>
              )}

              <LoginButton
                title="Sign Up"
                onPress={() =>
                  // submits()
                  submitCheck()
                }
              />

              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  marginBottom: 45,
                }}>
                <Text
                  style={styles.linkButtons}
                  onPress={() => this.props.navigation.navigate('Login')}>
                  Already have an account? Sign In.
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    );
  }
}
export default Login;
const ActionSheetComponent = ({
  title = '',
  dataset = [],
  onPress = () => { },
}) => {
  return (
    <View
      style={{
        backgroundColor: 'rgba(241,241,241,0.9)',
        borderRadius: 10,
        marginBottom: 10,
        overflow: 'hidden',
      }}>
      <View
        style={{
          borderBottomWidth: 1.5,
          borderBottomColor: '#ccc',
          paddingVertical: 10,
        }}>
        <Text
          style={{
            color: 'rgb(0,88,200)',
            textAlign: 'center',
            fontSize: 18,
            fontWeight: '500',
          }}>
          {title}
        </Text>
      </View>
      <ScrollView style={{ maxHeight: 200 }} showsVerticalScrollIndicator={false}>
        {dataset.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => onPress(item)}
              style={{
                paddingVertical: 12,
                alignItems: 'center',
                borderBottomWidth: 1.5,
                borderBottomColor: '#ccc',
              }}>
              <Text style={{ color: '#000', fontSize: 16 }} numberOfLines={1}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  inputFieldsSignIn: {
    width: width * 0.7,
    height: 50,
    backgroundColor: Colors.white,
    paddingHorizontal: 5,
    borderColor: '#023661',
    padding: 10,
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    marginTop: 20,
  },

  overlay: {
    backgroundColor: 'transparent',
    opacity: 0.6,
  },
  avatarStyle: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 50,
    alignSelf: 'center',
  },
  textStyle: {
    marginTop: 10,
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  balanceContainer: {
    padding: 10,
  },
  textSignIn: {
    marginTop: 20,
    fontSize: WP('7'),
    width: WP('32'),
    alignSelf: 'center',
    color: 'black',
    fontWeight: 'bold',
    alignItems: 'center',
    alignContent: 'center',
  },
  textRadio: {
    // marginTop: 10,
    width: WP('50'),
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  linkButtons: {
    marginTop: 10,
    fontSize: 20,
    color: 'black',
    textDecorationLine: 'underline',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    // height: height,
    padding: 10,
    // opacity: 0.2,
    zIndex: 0,
    // position: 'absolute'
  },
  logoImageSignIn: {
    height: 125,
    width: width - 20,
    padding: 10,
  },
});
