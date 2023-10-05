import React from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import { appIcons } from '../assets';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Colors } from '../config';
const { width } = Dimensions.get('window');

export default function CustomTextInput(props) {

  return (
    <View style={[{ width: '100%', marginTop: 10, alignItems: 'center' }]}>
      <View
        style={[{
          width: props?.drawerBtn ? 100 : width - 60,
          height: props?.drawerBtn ? 30 : 55,
          backgroundColor: Colors.white,
          paddingHorizontal: 15,
          borderRadius: 100,
          flexDirection: 'row',
          alignItems: 'center',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.16,
          shadowRadius: 2.22,
          elevation: 3,

        }]}>
        {props?.icon ? <MaterialIcons
          name='arrow-drop down'
          style={{
            width: 18,
            height: 18,
            resizeMode: 'contain',
            tintColor: Colors.icon,
            position: 'absolute',
            left: props?.drawerBtn ? 0 : width / 3.7,

          }}
        />
          : null}
        {
          props?.icon ?
            <Text style={{
              flex: 1, color: props?.value ?
                Colors.black : Colors.darkGray, textAlign: props?.textAlign,
            }}>
              {props?.value?.length ? props?.value[0] : props?.placeholder}
            </Text>
            :
            <Text style={{
              flex: 1, color: props?.value ?
                Colors.black : Colors.darkGray, textAlign: props?.textAlign,
            }}>
              {props?.value?.length ? props?.value : props?.placeholder}
            </Text>
        }

        {props?.isDropdown && (
          <MaterialIcons
            name={'arrow-drop-down'}
            style={{
              width: 15,
              height: 15,
              resizeMode: 'contain',
              tintColor: Colors.black,
            }}
          />
        )}
      </View>
    </View>
  );
}
export function AuthTextInputSelector(props) {
  const [dropdown, setDropdown] = React.useState(props?.isDropdown);
  return (
    <View
      style={[
        {
          width: '90%',
          marginTop: 15,
          alignItems: 'center',
        },
        props?.mainContainerStyle,
      ]}>
      {props?.value?.length ? (
        <Text
          style={{
            color: Colors.white,
            fontSize: 14,
            width: '100%',
          }}>
          {props?.placeholder}
        </Text>
      ) : null}
      <View
        style={{
          height: 50,
          textDecorationLine: 'underline',
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: Colors.white,
          alignItems: 'center',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.16,
          shadowRadius: 2.22,
          elevation: 3,
        }}>
        {props?.icon && (
          <MaterialIcons
            name={props?.icon}
            style={{
              width: 22,
              height: 22,
              resizeMode: 'contain',
              tintColor: Colors.primary,
              marginRight: 15,
            }}
          />
        )}
        <Text style={{ flex: 1, color: Colors.white, fontSize: 17 }}>
          {props?.value?.length ? props?.value : props?.placeholder}
        </Text>

        {props?.isDropdown && (
          <MaterialIcons
            name={'arrow-drop-down'}
            style={{
              width: 15,
              height: 15,
              resizeMode: 'contain',
              tintColor: Colors.white,
            }}
          />
        )}
      </View>
    </View>
  );
}