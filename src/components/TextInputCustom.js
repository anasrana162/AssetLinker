import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Dimensions,
  Text,
  Platform
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'

import { Colors, HP, size, WP } from '../config';
const { width } = Dimensions.get('window');
export function CustomTextInputWithHeading(props) {
  const [hidden, setHidden] = useState(props?.isPassword);
  return (
    <View style={{ width: '100%', marginTop: 10, alignItems: 'center' }}>
      <View
        style={{
          width: width - 60,
          height: 60,
          backgroundColor: Colors.background,
          marginTop: 8,
          borderWidth: 1,
          borderColor: Colors.secondary,
          borderRadius: 30,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
          flexDirection: 'row',
          paddingHorizontal: 15,
        }}>
        {/* <Image
          source={props?.icon}
          style={{
            width: 18,
            height: 18,
            resizeMode: 'contain',
            tintColor: Colors.icon,
          }}
        /> */}
        <TextInput

          style={{
            flex: 1,
            height: 50,
            color: Colors.secondary,
          }}
          placeholderTextColor={Colors.secondary}
          secureTextEntry={hidden}
          {...props}
        />
        {props?.isPassword && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setHidden(!hidden)}>

            <Entypo name={hidden ? 'eye-with-line' : 'eye'} size={20} style={{
              width: 30,
              height: 30,
              resizeMode: 'contain',
              tintColor: Colors.DarkGrey,
            }} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
export default function CustomTextInput(props) {
  const [hidden, setHidden] = useState(props?.isPassword);

  return (
    <View style={{ width: '100%', marginTop: 15, alignItems: 'center' }}>
      <View
        style={{
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
        }}>
        {/* <Image
          source={props?.icon}
          style={{
            width: 18,
            height: 18,
            resizeMode: 'contain',
            tintColor: Colors.icon,
          }}
        /> */}
        <TextInput

          keyboardType={props?.keyboardType}
           onChangeText={props?.onChangeText}

          style={{
            marginLeft: 10,
            flex: 1,
            height: 50,
            color: Colors.secondary,
          }}
          placeholderTextColor={Colors.secondary}
          secureTextEntry={hidden}
          {...props}
        />
        {props?.isPassword && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center', }}
            onPress={() => setHidden(!hidden)}>
            {/* <Image
              source={hidden ? Icons.eyeHidden : Icons.eyeShown}
              style={{
                width: 25,
                height: 25,
                resizeMode: 'contain',
                tintColor: Colors.DarkGrey,
              }}
            /> */}
            <Entypo name={hidden ? 'eye-with-line' : 'eye'} size={20} style={{
              width: 25,
              height: 25,
              resizeMode: 'contain',
              tintColor: Colors.DarkGrey,
            }} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export function AuthTextInput(props) {
  const [hidden, setHidden] = useState(props.isPassword);
  return (
    <View
      style={[{
        // width: '100%',
        marginTop: 10,
        borderWidth: 1.5,
        borderColor: Colors.black,
        borderRadius: 30,
        padding: Platform.OS === 'ios' ? 0 : 0,
      }, props.buttonStyle]}>
      <View
        style={{
          alignSelf: 'center',
          marginHorizontal: 20,
          // width: WP('80%'),
          borderRadius: 82,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            padding: HP('0.6%'),
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            alignContent: 'center',
          }}>
          {props?.icon ? (
            <Image
              source={props?.icon}
              style={{
                width: 22,
                height: 22,
                resizeMode: 'contain',
                tintColor: Colors.color6,
                marginRight: 15,
                marginHorizontal: 10

              }}
            />
          ) : null}
          <TextInput

            placeholder={props.label}
            style={{
              fontSize: size.xsmall,
              flex: 1,
              height: props?.multiline ? 150 : 50,
              color: Colors.DarkGrey,
            }}
            placeholderTextColor={Colors.DarkGrey}
            secureTextEntry={hidden}
            {...props}
            keyboardType={props.keyboardType}
            // onChangeText={props?.Onchange}
            multiline={props.multiline ? true : false}
            numberOfLines={props.multiline == true ? 20 : null}
            textAlignVertical={props?.multiline ? 'top' : null}
          //             placeholder={props.label}
          //             numberOfLines={props.linesNumber}
          //             // inputPadding={0}
          //             style={{
          //               flex: 1,
          //               color: Colors.black,
          //               fontSize: 17,
          //             }}
          //             // inputStyle={{color: Colors.black, fontSize: 17}}
          //             placeholderTextColor={Colors.black}
          // // secureTextEntry
          //             secureTextEntry={hidden}
          //             {...props}
          />
          {props?.isPassword && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setHidden((hidden) => !hidden)}>

              <Entypo name={hidden ? 'eye-with-line' : 'eye'} size={10} style={{
                width: 25,
                height: 25,
                resizeMode: 'contain',
                marginHorizontal: Platform.OS == 'android' ? 10 : 0,
                tintColor: Colors.color6,
              }} />

            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}